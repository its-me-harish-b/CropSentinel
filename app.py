import os
import warnings
import logging

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
warnings.simplefilter(action="ignore", category=FutureWarning)

logging.getLogger("tensorflow").setLevel(logging.ERROR)
logging.getLogger("werkzeug").setLevel(logging.INFO)

# ============================================================================
# IMPORTS
# ============================================================================
import io
import re
import gc
import time
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from PIL import Image
from werkzeug.utils import secure_filename
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path
from typing import Tuple, Optional, Dict, Any
from collections import deque
from threading import Lock

# Google Gemini SDK
try:
    from google import genai
    from google.genai import types
    GEMINI_AVAILABLE = True
except ImportError:
    genai = None
    types = None
    GEMINI_AVAILABLE = False

# ============================================================================
# CONFIGURATION
# ============================================================================
class Config:
    # Paths
    MODEL_PATH = "Crop_Sentinel_EfficientNetB7.keras"
    UPLOAD_FOLDER = "uploads"
    
    # Model settings
    IMG_SIZE = (380, 380)
    CONFIDENCE_THRESHOLD = 80.0
    
    # File upload settings
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
    
    # Gemini settings
    GEMINI_MODEL = "gemini-2.0-flash-exp"
    GEMINI_MAX_IMAGE_SIZE = 1024
    GEMINI_IMAGE_QUALITY = 85
    GEMINI_RATE_LIMIT_RPM = 15  # Requests per minute (free tier)
    GEMINI_RETRY_ATTEMPTS = 2
    GEMINI_RETRY_DELAY = 2  # seconds
    
    # Class names
    CLASS_NAMES = [
    'Africanized Honey Bees (Killer Bees)',
    'Aphids',
    'Armyworms',
    'Brown Marmorated Stink Bugs',
    'Cabbage Loopers',
    'Citrus Canker',
    'Colorado Potato Beetles',
    'Corn Borers',
    'Corn Earworms',
    'Fall Armyworms',
    'Fruit Flies',
    'Spider Mites',
    'Thrips',
    'Tomato Hornworms',
    'Western Corn Rootworms'
]

# ============================================================================
# LOGGING SETUP
# ============================================================================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================================
# ENVIRONMENT & INITIALIZATION
# ============================================================================
load_dotenv(override=True)  # Force reload environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Debug: Print API key info (masked for security)
if GEMINI_API_KEY:
    masked_key = GEMINI_API_KEY[:8] + "..." + GEMINI_API_KEY[-4:] if len(GEMINI_API_KEY) > 12 else "***"
    logger.info(f"🔑 Gemini API Key loaded: {masked_key}")
else:
    logger.warning("⚠️  No Gemini API Key found in environment")

Path(Config.UPLOAD_FOLDER).mkdir(exist_ok=True)

# TensorFlow GPU memory configuration
try:
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        logger.info(f"Configured {len(gpus)} GPU(s) with memory growth")
except Exception as e:
    logger.warning(f"GPU configuration failed: {e}")

tf.config.set_soft_device_placement(True)

# ============================================================================
# RATE LIMITER FOR GEMINI API
# ============================================================================
class RateLimiter:
    """Rate limiter to respect Gemini API quotas"""
    def __init__(self, max_requests_per_minute: int):
        self.max_requests = max_requests_per_minute
        self.requests = deque()
        self.lock = Lock()
        self.quota_exhausted = False
        self.quota_reset_time = None
    
    def can_make_request(self) -> bool:
        """Check if we can make a request"""
        with self.lock:
            # Check if quota is exhausted
            if self.quota_exhausted:
                if self.quota_reset_time and time.time() >= self.quota_reset_time:
                    self.quota_exhausted = False
                    self.quota_reset_time = None
                    logger.info("Quota reset time reached, re-enabling Gemini")
                else:
                    return False
            
            # Clean old requests
            now = time.time()
            while self.requests and now - self.requests[0] > 60:
                self.requests.popleft()
            
            return len(self.requests) < self.max_requests
    
    def record_request(self):
        """Record a successful request"""
        with self.lock:
            self.requests.append(time.time())
    
    def mark_quota_exhausted(self, retry_after_seconds: Optional[float] = None):
        """Mark that API quota is exhausted"""
        with self.lock:
            self.quota_exhausted = True
            if retry_after_seconds:
                self.quota_reset_time = time.time() + retry_after_seconds
                logger.warning(f"Quota exhausted. Reset in {retry_after_seconds:.0f}s")
            else:
                # Default to 1 hour if no retry time provided
                self.quota_reset_time = time.time() + 3600
                logger.warning("Quota exhausted. Defaulting to 1 hour reset")
    
    def get_wait_time(self) -> float:
        """Get time to wait before next request"""
        with self.lock:
            if self.quota_exhausted and self.quota_reset_time:
                return max(0, self.quota_reset_time - time.time())
            
            if len(self.requests) < self.max_requests:
                return 0
            
            oldest_request = self.requests[0]
            time_since_oldest = time.time() - oldest_request
            return max(0, 60 - time_since_oldest)
    
    def get_status(self) -> Dict[str, Any]:
        """Get current rate limiter status"""
        with self.lock:
            return {
                "quota_exhausted": self.quota_exhausted,
                "can_make_request": self.can_make_request(),
                "wait_time_seconds": round(self.get_wait_time(), 1),
                "requests_in_last_minute": len(self.requests),
                "max_rpm": self.max_requests
            }

gemini_rate_limiter = RateLimiter(Config.GEMINI_RATE_LIMIT_RPM)

# ============================================================================
# GEMINI CLIENT INITIALIZATION
# ============================================================================
class GeminiClient:
    def __init__(self):
        self.client = None
        self.model_name = None
        self.available = False
        
        if not GEMINI_API_KEY:
            logger.warning("GEMINI_API_KEY not set - Gemini features disabled")
            return
        
        if not GEMINI_AVAILABLE:
            logger.warning("google-genai package not installed - Gemini features disabled")
            return
        
        try:
            self.client = genai.Client(api_key=GEMINI_API_KEY)
            
            # Try multiple model options
            available_models = [
                 "models/gemini-2.5-flash", 
                "models/gemini-2.5-flash-image", 
                "models/gemini-2.0-flash",
                "gemini-2.0-flash"
            ]
            
            for model in available_models:
                try:
                    self.model_name = model
                    logger.info(f"Testing Gemini model: {model}")
                    break
                except Exception as e:
                    logger.warning(f"Model {model} not available: {e}")
                    continue
            
            if self.model_name:
                self.available = True
                logger.info(f"✓ Gemini initialized: {self.model_name}")
            else:
                logger.error("No Gemini models available")
                
        except Exception as e:
            logger.error(f"Gemini initialization failed: {e}")
    
    def is_available(self) -> bool:
        return self.available and self.client is not None
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get current model information"""
        return {
            "available": self.available,
            "model_name": self.model_name,
            "api_key_set": GEMINI_API_KEY is not None,
            "rate_limit_status": gemini_rate_limiter.get_status()
        }

gemini_client = GeminiClient()

# ============================================================================
# MODEL MANAGEMENT (INFERENCE-ONLY)
# ============================================================================
class ModelManager:
    def __init__(self):
        self.model = None
        self._load_model()
    
    def _load_model(self):
        """Load the full saved model (architecture + weights) for inference only"""
        try:
            # Ensure clean TF state before loading
            tf.keras.backend.clear_session()
            
            if not Path(Config.MODEL_PATH).exists():
                raise FileNotFoundError(f"Model not found: {Config.MODEL_PATH}")
            
            # Load the saved model file directly (contains architecture + weights)
            self.model = tf.keras.models.load_model(Config.MODEL_PATH, compile=False)
            logger.info("✓ Model loaded successfully (architecture + weights)")
        except Exception as e:
            logger.error(f"Model loading failed: {e}")
            self.model = None
    
    def predict(self, img_array: np.ndarray) -> Tuple[str, float, np.ndarray]:
        """Run inference on preprocessed image"""
        if self.model is None:
            raise RuntimeError("Model not initialized")
        
        try:
            preds = self.model.predict(img_array, verbose=0, batch_size=1)
            idx = int(np.argmax(preds))
            confidence = float(preds[0][idx] * 100)
            
            return Config.CLASS_NAMES[idx], confidence, preds[0].copy()
        finally:
            # keep model in memory; only clean temporary prediction objects
            try:
                del img_array, preds
            except Exception:
                pass
            gc.collect()

model_manager = ModelManager()

# ============================================================================
# IMAGE PROCESSING UTILITIES
# ============================================================================
class ImageProcessor:
    @staticmethod
    def validate_and_save(file_storage, dest_path: str) -> None:
        """Validate image and save to disk"""
        try:
            img = Image.open(file_storage.stream)
            img.verify()
            file_storage.stream.seek(0)
            file_storage.save(dest_path)
        except Exception as e:
            raise ValueError(f"Invalid image file: {e}")
    
    @staticmethod
    def preprocess_for_model(img_path: str) -> np.ndarray:
        """Preprocess image for Keras model using EfficientNet preprocessing"""
        with Image.open(img_path) as img:
            img = img.convert("RGB")
            
            # Downsample large images first
            w, h = img.size
            max_dim = max(w, h)
            if max_dim > 1000:
                scale = 1000 / max_dim
                new_size = (int(w * scale), int(h * scale))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Resize to model input size
            img = img.resize(Config.IMG_SIZE, Image.Resampling.LANCZOS)
            
            # Convert to numpy array (do NOT divide by 255 here)
            img_array = np.array(img, dtype=np.float32)
            
            # Use EfficientNet preprocessing (same as training)
            img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
            
            return np.expand_dims(img_array, axis=0)
    
    @staticmethod
    def compress_for_gemini(img_path: str) -> Optional[bytes]:
        """Compress image for Gemini API"""
        try:
            with Image.open(img_path) as img:
                img = img.convert("RGB")
                
                # Resize if too large
                w, h = img.size
                max_size = Config.GEMINI_MAX_IMAGE_SIZE
                if w > max_size or h > max_size:
                    ratio = min(max_size / w, max_size / h)
                    new_size = (int(w * ratio), int(h * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Compress as JPEG
                buf = io.BytesIO()
                img.save(buf, format="JPEG", quality=Config.GEMINI_IMAGE_QUALITY, optimize=True)
                return buf.getvalue()
        except Exception as e:
            logger.error(f"Image compression failed: {e}")
            return None

# ============================================================================
# GEMINI INTEGRATION
# ============================================================================
class GeminiAnalyzer:
    PROMPT_TEMPLATE = """You are an expert agricultural pest identification assistant.

Analyze this image and identify the pest with high accuracy.

Provide your response in EXACTLY this format:
**Pest Name:** [Exact pest name]
**Confidence:** [Your confidence as percentage, e.g., 85%]

Then provide:
1. **Identification:** What pest is visible in this image?
2. **Key Features:** Visual characteristics that confirm your identification
3. **Organic Solutions:**
   - Natural predators/beneficial insects
   - Organic sprays (neem oil, insecticidal soap, horticultural oils)
   - Cultural practices (crop rotation, companion planting, sanitation)
   - DIY remedies and home solutions
   - Prevention strategies

Be specific, practical, and actionable for farmers."""
    
    @staticmethod
    def _extract_pest_name(text: str) -> Optional[str]:
        """Extract pest name from Gemini response"""
        if not text:
            return None
        
        # Try structured format first
        match = re.search(r'\*\*Pest Name:\*\*\s*([^\n]+)', text, re.IGNORECASE)
        if match:
            pest_name = match.group(1).strip()
            
            # Match against known pests
            for known_pest in Config.CLASS_NAMES:
                if (known_pest.lower() in pest_name.lower() or 
                    pest_name.lower() in known_pest.lower()):
                    return known_pest
            return pest_name
        
        # Fallback: search for known pest names in text
        text_lower = text.lower()
        for pest in Config.CLASS_NAMES:
            if pest.lower() in text_lower:
                return pest
        
        # Last resort: extract from first line
        first_line = text.split('\n')[0].strip()
        if first_line and len(first_line) < 50:
            return first_line
        
        return None
    
    @staticmethod
    def _extract_confidence(text: str) -> Optional[float]:
        """Extract confidence percentage from Gemini response"""
        if not text:
            return None
        
        patterns = [
            r'\*\*Confidence:\*\*\s*(\d+(?:\.\d+)?)\s*%',
            r'Confidence:\s*(\d+(?:\.\d+)?)\s*%',
            r'confidence[:\s]+(\d+(?:\.\d+)?)\s*%',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    conf = float(match.group(1))
                    if 0 <= conf <= 100:
                        return round(conf, 2)
                except ValueError:
                    continue
        
        return None
    
    @staticmethod
    def identify_pest(img_path: str) -> Tuple[Optional[str], Optional[float], str]:
        """Identify pest using Gemini API with rate limiting"""
        if not gemini_client.is_available():
            return None, None, "Gemini API unavailable"
        
        # Check rate limit before making request
        if not gemini_rate_limiter.can_make_request():
            wait_time = gemini_rate_limiter.get_wait_time()
            logger.warning(f"Rate limit reached. Wait time: {wait_time:.1f}s")
            
            # Format wait time nicely
            if wait_time > 3600:
                wait_msg = f"{wait_time/3600:.1f} hours"
            elif wait_time > 60:
                wait_msg = f"{wait_time/60:.1f} minutes"
            else:
                wait_msg = f"{wait_time:.0f} seconds"
            
            return None, None, f"API quota limit reached. Please wait {wait_msg} before trying again."
        
        logger.info("Requesting Gemini pest identification")
        
        # Retry logic
        for attempt in range(Config.GEMINI_RETRY_ATTEMPTS):
            try:
                # Prepare content
                contents = []
                if types:
                    contents.append(types.Part.from_text(text=GeminiAnalyzer.PROMPT_TEMPLATE))
                else:
                    contents.append(GeminiAnalyzer.PROMPT_TEMPLATE)
                
                # Add compressed image
                if Path(img_path).exists():
                    image_bytes = ImageProcessor.compress_for_gemini(img_path)
                    if image_bytes and types:
                        contents.append(types.Part.from_bytes(
                            data=image_bytes,
                            mime_type="image/jpeg"
                        ))
                
                # Record request before making it
                gemini_rate_limiter.record_request()
                
                # Call Gemini API
                response = gemini_client.client.models.generate_content(
                    model=gemini_client.model_name,
                    contents=contents
                )
                
                analysis = response.text if hasattr(response, "text") else str(response)
                
                # Extract results
                pest_name = GeminiAnalyzer._extract_pest_name(analysis)
                confidence = GeminiAnalyzer._extract_confidence(analysis)
                
                logger.info(f"✓ Gemini result (attempt {attempt + 1}): {pest_name} ({confidence}%)")
                return pest_name, confidence, analysis
                
            except Exception as e:
                error_str = str(e)
                logger.error(f"Gemini error (attempt {attempt + 1}/{Config.GEMINI_RETRY_ATTEMPTS}): {e}")
                
                # Check if it's a quota error (429 or RESOURCE_EXHAUSTED)
                if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                    # Extract retry delay from error
                    retry_match = re.search(r'retry in (\d+(?:\.\d+)?)', error_str, re.IGNORECASE)
                    if retry_match:
                        retry_delay = float(retry_match.group(1))
                        gemini_rate_limiter.mark_quota_exhausted(retry_delay)
                    else:
                        # If daily quota exhausted (limit: 0), mark for longer
                        if "limit: 0" in error_str:
                            gemini_rate_limiter.mark_quota_exhausted(86400)  # 24 hours
                            return None, None, "Daily API quota exhausted. Please try again tomorrow or upgrade your plan."
                        else:
                            gemini_rate_limiter.mark_quota_exhausted(3600)  # 1 hour default
                    
                    return None, None, "API quota exceeded. Using Keras prediction instead."
                
                # For other errors, retry with exponential backoff
                if attempt < Config.GEMINI_RETRY_ATTEMPTS - 1:
                    wait_time = Config.GEMINI_RETRY_DELAY * (2 ** attempt)
                    logger.info(f"Retrying in {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    return None, None, f"Gemini error: {error_str[:200]}"
                
            finally:
                gc.collect()
        
        return None, None, "Failed to get response from Gemini"

# ============================================================================
# FLASK APPLICATION
# ============================================================================
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = Config.UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = Config.MAX_FILE_SIZE

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173", 
                   "http://localhost:8080", "http://localhost:8081"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================
def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def validate_file_size(file_storage) -> bool:
    """Check file size before processing"""
    file_storage.seek(0, os.SEEK_END)
    size = file_storage.tell()
    file_storage.seek(0)
    return size <= Config.MAX_FILE_SIZE

# ============================================================================
# ROUTES
# ============================================================================
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # ===== 1. FILE VALIDATION =====
        if "image" not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files["image"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400
        
        if not allowed_file(file.filename):
            return jsonify({"error": f"Invalid file type. Allowed: {', '.join(Config.ALLOWED_EXTENSIONS)}"}), 400
        
        if not validate_file_size(file):
            return jsonify({"error": f"File too large. Max size: {Config.MAX_FILE_SIZE / (1024*1024):.1f}MB"}), 400
        
        # ===== 2. SAVE IMAGE =====
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_filename = f"{timestamp}_{filename}"
        img_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
        
        ImageProcessor.validate_and_save(file, img_path)
        
        # ===== 3. KERAS PREDICTION =====
        img_array = ImageProcessor.preprocess_for_model(img_path)
        pest, confidence, all_preds = model_manager.predict(img_array)
        gc.collect()
        
        logger.info(f"Keras prediction: {pest} ({confidence:.2f}%)")
        
        # ===== 4. CONFIDENCE GATE LOGIC =====
        result = {
            "success": True,
            "primary_prediction": {
                "pest": pest,
                "confidence": round(confidence, 2)
            },
            "timestamp": datetime.now().isoformat()
        }
        
        # Low confidence → Try Gemini
        if confidence < Config.CONFIDENCE_THRESHOLD:
            if gemini_client.is_available():
                # Check rate limit before attempting
                if not gemini_rate_limiter.can_make_request():
                    wait_time = gemini_rate_limiter.get_wait_time()
                    logger.warning(f"Rate limit reached. Wait: {wait_time:.1f}s")
                    result["ai_used"] = "keras"
                    result["message"] = "Low confidence - Rate limited"
                    result["note"] = f"Gemini rate limited. Using Keras prediction. Try again in {wait_time:.0f}s."
                else:
                    logger.info(f"Low confidence ({confidence:.2f}%) → Switching to Gemini")
                    
                    try:
                        gemini_pest, gemini_conf, gemini_analysis = GeminiAnalyzer.identify_pest(img_path)
                    finally:
                        gc.collect()
                    
                    if gemini_pest:
                        result["primary_prediction"]["pest"] = gemini_pest
                        result["primary_prediction"]["confidence"] = gemini_conf
                        result["ai_used"] = "gemini"
                        result["message"] = "Low confidence - Identified by Gemini AI"
                        result["gemini_analysis"] = gemini_analysis
                        result["keras_fallback"] = {"pest": pest, "confidence": round(confidence, 2)}
                    else:
                        result["ai_used"] = "gemini_failed"
                        result["message"] = "Low confidence - Using Keras fallback"
                        result["gemini_note"] = gemini_analysis
                        result["note"] = "Gemini unavailable, using Keras prediction"
            else:
                result["ai_used"] = "keras"
                result["message"] = "Low confidence (Gemini unavailable)"
                result["note"] = "Set GEMINI_API_KEY for AI-enhanced accuracy"
        else:
            # High confidence → Trust Keras
            result["ai_used"] = "keras"
            result["message"] = "High confidence prediction"
        
        # ===== 5. CLEANUP & RESPONSE =====
        gc.collect()
        
        logger.info(f"Final: {result['primary_prediction']['pest']} via {result['ai_used']}")
        return jsonify(result)
        
    except ValueError as e:
        logger.warning(f"Validation error: {e}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        gc.collect()
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model_manager.model is not None,
        "gemini_info": gemini_client.get_model_info(),
        "timestamp": datetime.now().isoformat()
    })

@app.route("/rate-limit-status", methods=["GET"])
def rate_limit_status():
    """Check Gemini API rate limit status"""
    status = gemini_rate_limiter.get_status()
    return jsonify({
        **status,
        "timestamp": datetime.now().isoformat()
    })

@app.route("/reset-rate-limit", methods=["POST"])
def reset_rate_limit():
    """Manually reset the rate limiter (admin endpoint)"""
    gemini_rate_limiter.quota_exhausted = False
    gemini_rate_limiter.quota_reset_time = None
    gemini_rate_limiter.requests.clear()
    logger.info("Rate limiter manually reset")
    return jsonify({
        "message": "Rate limiter reset successfully",
        "timestamp": datetime.now().isoformat()
    })

@app.route("/test-gemini", methods=["GET"])
def test_gemini():
    """Test Gemini API connection"""
    if not gemini_client.is_available():
        return jsonify({
            "status": "unavailable",
            "reason": "Client not initialized",
            "api_key_set": GEMINI_API_KEY is not None,
            "api_key_preview": GEMINI_API_KEY[:8] + "..." if GEMINI_API_KEY else None
        }), 503
    
    # Check rate limiter
    if not gemini_rate_limiter.can_make_request():
        return jsonify({
            "status": "rate_limited",
            "wait_time": gemini_rate_limiter.get_wait_time(),
            "quota_exhausted": gemini_rate_limiter.quota_exhausted
        }), 429
    
    # Try a simple test request
    try:
        gemini_rate_limiter.record_request()
        test_response = gemini_client.client.models.generate_content(
            model=gemini_client.model_name,
            contents=["Say 'API test successful' in exactly 3 words."]
        )
        response_text = test_response.text if hasattr(test_response, "text") else str(test_response)
        
        return jsonify({
            "status": "success",
            "model": gemini_client.model_name,
            "response": response_text[:100],
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        error_str = str(e)
        if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
            return jsonify({
                "status": "quota_exceeded",
                "error": "API quota exhausted",
                "details": error_str[:200]
            }), 429
        else:
            return jsonify({
                "status": "error",
                "error": str(e)[:200]
            }), 500

# ============================================================================
# MAIN
# ============================================================================
if __name__ == "__main__":
    if model_manager.model is None:
        logger.error("❌ Model not loaded - server will not start")
    else:
        logger.info("🚀 Starting Flask server...")
        logger.info(f"📊 Keras model: Loaded")
        logger.info(f"🤖 Gemini API: {'Available' if gemini_client.is_available() else 'Unavailable'}")
        logger.info(f"⚙️  Confidence threshold: {Config.CONFIDENCE_THRESHOLD}%")
        app.run(debug=True, host="0.0.0.0", port=5000)
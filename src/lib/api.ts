// API helper for communicating with Flask backend
// Backend runs on http://localhost:5000

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface PredictionResponse {
  success: boolean;
  primary_prediction: {
    pest: string;
    confidence: number | null;
  };
  timestamp: string;
  ai_used: 'keras' | 'gemini';
  message: string;
  gemini_analysis?: string;
  keras_prediction?: {
    pest: string;
    confidence: number;
  };
  note?: string;
  error?: string;
}

/**
 * Convert base64 data URL to Blob
 */
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * Send an image to Flask backend for pest prediction
 * @param imageDataUrl - Base64 data URL from image upload or camera capture
 * @returns Promise with prediction result
 */
export const predictPest = async (imageDataUrl: string): Promise<PredictionResponse> => {
  try {
    console.log('Starting prediction request to:', `${API_BASE_URL}/predict`);
    
    // Convert base64 data URL to Blob
    const blob = dataURLtoBlob(imageDataUrl);
    console.log('Image converted to blob, size:', blob.size, 'type:', blob.type);
    
    // Create FormData and append image file
    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');

    // Send POST request to Flask /predict endpoint
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
      // Note: Don't set Content-Type header - browser will set it automatically with boundary
    });

    console.log('Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: PredictionResponse = await response.json();
    console.log('Prediction successful:', data);
    return data;
  } catch (error) {
    console.error('Error calling prediction API:', error);
    throw error;
  }
};

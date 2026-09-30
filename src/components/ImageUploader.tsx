
import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (imageData: string) => void;
}

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Please select an image under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImagePreview(e.target.result);
        onImageSelected(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Camera not supported on this device");
        return;
      }

      // First, stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      const constraints = {
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        }
      };

      console.log('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream received:', stream);
      
      streamRef.current = stream;
      setIsCameraMode(true);
      
      // Wait for the next tick to ensure the video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Setting video srcObject...');
          videoRef.current.srcObject = stream;
          
          // Ensure video plays
          const playVideo = async () => {
            try {
              await videoRef.current?.play();
              console.log('Video is playing');
            } catch (playError) {
              console.error('Error playing video:', playError);
            }
          };
          
          // Try to play immediately
          playVideo();
          
          // Also try when metadata loads
          videoRef.current.onloadedmetadata = playVideo;
          videoRef.current.oncanplay = playVideo;
        }
      }, 100);
      
      toast.success("Camera started successfully");
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      // Provide specific error messages
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast.error("Camera access denied. Please allow camera permissions and try again.");
        } else if (error.name === 'NotFoundError') {
          toast.error("No camera found on this device.");
        } else if (error.name === 'NotReadableError') {
          toast.error("Camera is already in use by another application.");
        } else {
          toast.error(`Unable to access camera: ${error.message}`);
        }
      } else {
        toast.error("Unable to access camera. Please check permissions or use file upload.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraMode(false);
    toast.success("Camera stopped");
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImagePreview(imageData);
        onImageSelected(imageData);
        stopCamera();
        toast.success("Photo captured successfully!");
      }
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        {!imagePreview && !isCameraMode ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                onClick={handleUploadClick}
                variant="outline"
                className="flex-1 h-12"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload from Device
              </Button>
              <Button 
                onClick={startCamera}
                variant="outline"
                className="flex-1 h-12"
              >
                <Camera className="w-5 h-5 mr-2" />
                Use Camera
              </Button>
            </div>
            
            <div 
              className={`upload-dropzone rounded-lg p-8 cursor-pointer flex flex-col items-center justify-center text-center h-64 ${dragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*" 
                className="hidden"
              />
              <Upload className="w-12 h-12 text-cropGreen mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Crop Image</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>
        ) : isCameraMode ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-cropGreen">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                style={{ 
                  transform: 'scaleX(-1)', // Mirror the video for better UX
                  minHeight: '256px',
                  backgroundColor: 'transparent'
                }}
                onLoadStart={() => console.log('Video load started')}
                onLoadedMetadata={() => {
                  console.log('Video metadata loaded');
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error);
                  }
                }}
                onLoadedData={() => {
                  console.log('Video data loaded');
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error);
                  }
                }}
                onCanPlay={() => {
                  console.log('Video can play');
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error);
                  }
                }}
                onPlay={() => console.log('Video is playing')}
                onError={(e) => console.error('Video error:', e)}
              />
              {!streamRef.current && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Starting camera...</p>
                  </div>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={capturePhoto}
                className="bg-cropGreen hover:bg-cropGreen-dark"
                disabled={!streamRef.current}
              >
                <Camera className="w-5 h-5 mr-2" />
                {streamRef.current ? 'Capture Photo' : 'Starting Camera...'}
              </Button>
              <Button 
                onClick={stopCamera}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
            {!streamRef.current && (
              <div className="text-center text-sm text-gray-500">
                <p>Waiting for camera to start...</p>
                <p className="text-xs mt-1">Make sure to allow camera permissions</p>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Captured crop" 
              className="w-full h-auto rounded-lg object-cover"
            />
            <div className="absolute bottom-4 right-4">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  setImagePreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;


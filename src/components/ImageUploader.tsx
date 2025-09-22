
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (imageData: string) => void;
}

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        {!imagePreview ? (
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
        ) : (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Uploaded crop" 
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

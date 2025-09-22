
import { useState } from "react";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/ImageUploader";
import PestResult from "@/components/PestResult";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PestInfo, getPestInfo } from "@/data/pestData";
import { toast } from "@/components/ui/sonner";

const Detect = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pestResult, setPestResult] = useState<PestInfo | null>(null);

  const handleImageSelected = (imageData: string) => {
    setSelectedImage(imageData);
    setPestResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // In a real app, this would send the image to a backend API
      const result = await getPestInfo(selectedImage);
      setPestResult(result);
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPestResult(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-cropGreen-dark mb-4">
              Crop Pest Detection
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a photo of your crop to identify pests and get organic treatment recommendations.
            </p>
          </div>

          {!pestResult ? (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Upload Your Crop Image</CardTitle>
                  <CardDescription>
                    For best results, ensure the image clearly shows the affected part of the plant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader onImageSelected={handleImageSelected} />
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={!selectedImage || isAnalyzing}
                      className="bg-cropGreen hover:bg-cropGreen-dark"
                      size="lg"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Clear Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Take close-up, well-lit images that clearly show the pest or affected plant area.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Multiple Angles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      For difficult cases, upload multiple photos showing different views of the affected area.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Include Context</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      When possible, include both damaged and healthy parts of the plant for comparison.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <PestResult pestInfo={pestResult} onReset={handleReset} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Detect;

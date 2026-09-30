
import { useState } from "react";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/ImageUploader";
import PestResult from "@/components/PestResult";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PestInfo, getPestInfo } from "@/data/pestData";
import { toast } from "@/components/ui/sonner";
import { predictPest } from "@/lib/api"; // Added: API helper for backend connection
import { useLanguage } from "@/contexts/LanguageContext";

const Detect = () => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pestResult, setPestResult] = useState<PestInfo | null>(null);

  const handleImageSelected = (imageData: string) => {
    setSelectedImage(imageData);
    setPestResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error(t("detect.toast.noImage"));
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Call Flask backend API for real pest prediction
      const apiResponse = await predictPest(selectedImage);
      console.log("API Response received:", apiResponse);
      
      if (!apiResponse.success) {
        throw new Error(apiResponse.error || t("detect.toast.predictionFailed"));
      }

      // Map Flask response to PestInfo format
      const pestName = apiResponse.primary_prediction.pest;
      const confidence = apiResponse.primary_prediction.confidence || 0;
      
      console.log("Pest detected:", pestName, "Confidence:", confidence);
      
      // Confidence is already 0-100 from Flask, convert to 0-1 for PestInfo
      const result = await getPestInfo(pestName, confidence / 100);
      // Replace the stock image with the actual uploaded image
      result.imageUrl = selectedImage;
      setPestResult(result);
      
      // Show success message with AI source info
      const aiSource =
        apiResponse.ai_used === "gemini"
          ? t("detect.toast.source.gemini")
          : apiResponse.ai_used === "gemini_cached"
            ? t("detect.toast.source.geminiCached")
            : t("detect.toast.source.keras");
      toast.success(
        `${t("detect.toast.detected")}: ${pestName} (${confidence.toFixed(1)}% ${t("detect.toast.confidenceVia")} ${aiSource})`
      );
      
      // Show additional info about prediction source
      if (apiResponse.ai_used === "gemini") {
        const kerasFallback = apiResponse.keras_fallback;
        if (kerasFallback?.confidence !== undefined) {
          toast.warning(
            `${t("detect.toast.lowConfidence")} (${Number(kerasFallback.confidence).toFixed(1)}%) - ${t("detect.toast.geminiVerificationUsed")}`
          );
        }
        if (apiResponse.gemini_analysis) {
          console.log("Gemini Analysis:", apiResponse.gemini_analysis);
        }
      } else {
        toast.info(`${t("detect.toast.predictionFrom")} ${t("detect.toast.source.keras")}`);
        if (confidence < 80) {
          toast.warning(`${t("detect.toast.lowConfidence")} (${confidence.toFixed(1)}%) - ${t("detect.toast.considerRetake")}`);
        }
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      
      // More detailed error messages
      let errorMessage = `${t("detect.toast.failedAnalyze")} `;
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage += t("detect.toast.backendDown");
      } else if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += t("common.tryAgain");
      }
      
      toast.error(errorMessage);
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
              {t("detect.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("detect.subtitle")}
            </p>
          </div>

          {!pestResult ? (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("detect.upload.title")}</CardTitle>
                  <CardDescription>
                    {t("detect.upload.subtitle")}
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
                      {isAnalyzing ? t("detect.button.analyzing") : t("detect.button.analyze")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("detect.tips.clearPhotos.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("detect.tips.clearPhotos.text")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("detect.tips.multipleAngles.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("detect.tips.multipleAngles.text")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("detect.tips.includeContext.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t("detect.tips.includeContext.text")}
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

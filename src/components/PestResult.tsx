
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEffectivenessKey, localizePest } from "@/lib/pestI18n";

interface Remedy {
  name: string;
  description: string;
  effectiveness: string;
  application: string;
}

interface PestInfo {
  id: string;
  name: string;
  scientificName: string;
  confidenceScore: number;
  severity: "low" | "medium" | "high";
  description: string;
  remedies: Remedy[];
  imageUrl: string;
}

interface PestResultProps {
  pestInfo: PestInfo;
  onReset: () => void;
  uploadedImage?: string;
}

const PestResult = ({ pestInfo, onReset, uploadedImage }: PestResultProps) => {
  const { t, language } = useLanguage();
  const localized = localizePest(pestInfo, language);
  const [activeTab, setActiveTab] = useState("overview");
  // Use uploaded image if available, otherwise use pest library image
  const displayImage = uploadedImage || localized.imageUrl;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "low":
        return t("pest.severity.low");
      case "medium":
        return t("pest.severity.medium");
      case "high":
        return t("pest.severity.high");
      default:
        return t("common.unknown");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-cropGreen bg-opacity-10 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-cropGreen-dark">{localized.name}</CardTitle>
            <CardDescription className="italic">{localized.scientificName}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getSeverityColor(localized.severity)}>
              {getSeverityText(localized.severity)}
            </Badge>
            <div className="text-sm">
              <span className="font-semibold">{t("pest.confidence")}:</span> {Math.round(localized.confidenceScore * 100)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">{t("pest.tabs.overview")}</TabsTrigger>
            <TabsTrigger value="remedies">{t("pest.tabs.remedies")}</TabsTrigger>
            <TabsTrigger value="action">{t("pest.tabs.action")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{t("pest.aboutThisPest")}</h3>
                <p className="text-muted-foreground">{localized.description}</p>
              </div>
              <div className="md:w-1/3">
                <img 
                  src={displayImage} 
                  alt={localized.name} 
                  className="w-full h-auto rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="remedies" className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t("pest.recommendedOrganicRemedies")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localized.remedies.map((remedy, index) => {
                const key = getEffectivenessKey(remedy.effectiveness);
                const effectivenessLabel = key ? t(`effectiveness.${key}`) : remedy.effectiveness;
                return (
                <Card key={index} className="border border-soil-light">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{remedy.name}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {t("pest.effectiveness")}: {effectivenessLabel}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{remedy.description}</p>
                    <p className="text-xs border-t pt-2 mt-2">
                      <span className="font-semibold">{t("pest.application")}:</span> {remedy.application}
                    </p>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="action" className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t("pest.recommendedActionPlan")}</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-cropGreen-dark mb-2">{t("pest.action.immediateSteps")}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>{t("pest.action.immediate.1")}</li>
                  <li>{t("pest.action.immediate.2")}</li>
                  <li>{t("pest.action.immediate.3")}</li>
                  <li>{t("pest.action.immediate.4")}</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-cropGreen-dark mb-2">{t("pest.action.preventionStrategy")}</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>{t("pest.action.prevent.1")}</li>
                  <li>{t("pest.action.prevent.2")}</li>
                  <li>{t("pest.action.prevent.3")}</li>
                  <li>{t("pest.action.prevent.4")}</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-cropGreen-dark mb-2">{t("pest.action.expertConsultation")}</h4>
                <p className="text-sm">
                  {t("pest.action.expert.text")}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center p-4 border-t">
          <Button variant="outline" onClick={onReset}>
            {t("pest.button.analyzeAnother")}
          </Button>
          <Button className="bg-cropGreen hover:bg-cropGreen-dark">
            {t("pest.button.saveResults")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PestResult;


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { pestLibrary, PestInfo } from "@/data/pestData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEffectivenessKey, localizePest } from "@/lib/pestI18n";

const PestDetails = () => {
  const { pestId } = useParams<{ pestId: string }>();
  const navigate = useNavigate();
  const [pest, setPest] = useState<PestInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Find the pest in our library
    const foundPest = pestLibrary.find((p) => p.id === pestId);
    
    if (foundPest) {
      setPest(foundPest);
    }
    
    setLoading(false);
  }, [pestId]);

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

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p>{t("pest.loading")}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!pest) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t("pest.notFound.title")}</h1>
            <p className="mb-6">{t("pest.notFound.subtitle")}</p>
            <Button onClick={() => navigate("/pest-library")}>
              {t("pest.notFound.button")}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const p = localizePest(pest, language);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6" 
            onClick={() => navigate("/pest-library")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("pest.backToLibrary")}
          </Button>
          
          <Card>
            <CardHeader className="bg-cropGreen bg-opacity-10 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-3xl text-cropGreen-dark">{p.name}</CardTitle>
                  <CardDescription className="italic text-lg mt-1">{p.scientificName}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getSeverityColor(p.severity)}>
                    {getSeverityText(p.severity)}
                  </Badge>
                  <div className="text-sm">
                    <span className="font-semibold">{t("pest.identificationConfidence")}:</span> {Math.round(p.confidenceScore * 100)}%
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">{t("pest.tabs.overview")}</TabsTrigger>
                  <TabsTrigger value="remedies">{t("pest.tabs.remedies")}</TabsTrigger>
                  <TabsTrigger value="action">{t("pest.tabs.action")}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-4">{t("pest.aboutThisPest")}</h3>
                      <p className="text-muted-foreground mb-4">{p.description}</p>
                      
                      <h4 className="text-lg font-semibold mt-6 mb-2">{t("pest.details.identificationTips.title")}</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>{t("pest.details.identificationTips.1")}</li>
                        <li>{t("pest.details.identificationTips.2")}</li>
                        <li>{t("pest.details.identificationTips.3")}</li>
                        <li>{t("pest.details.identificationTips.4")}</li>
                      </ul>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden border shadow-sm">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={p.imageUrl} 
                            alt={p.name} 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      
                      <div className="mt-6 bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t("pest.details.commonHosts.title")}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t("pest.details.commonHosts.text")}
                        </p>
                      </div>
                      
                      <div className="mt-4 bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t("pest.details.seasonalActivity.title")}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t("pest.details.seasonalActivity.text")}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="remedies" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t("pest.recommendedOrganicRemedies")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {p.remedies.map((remedy, index) => {
                      const key = getEffectivenessKey(remedy.effectiveness);
                      const effectivenessLabel = key ? t(`effectiveness.${key}`) : remedy.effectiveness;
                      return (
                      <Card key={index} className="border border-soil-light">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{remedy.name}</CardTitle>
                          <Badge variant="outline" className="w-fit">
                            {t("pest.effectiveness")}: {effectivenessLabel}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{remedy.description}</p>
                          <div className="bg-muted p-3 rounded-md">
                            <h4 className="font-semibold text-sm mb-1">{t("pest.details.applicationInstructions")}</h4>
                            <p className="text-sm">{remedy.application}</p>
                          </div>
                        </CardContent>
                      </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="action" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t("pest.recommendedActionPlan")}</h3>
                  <div className="space-y-6">
                    <div className="p-5 border rounded-lg bg-opacity-50 bg-green-50">
                      <h4 className="font-semibold text-cropGreen-dark text-lg mb-3">{t("pest.action.immediateSteps")}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>{t("pest.details.action.immediate.1")}</li>
                        <li>{t("pest.details.action.immediate.2")}</li>
                        <li>{t("pest.details.action.immediate.3")}</li>
                        <li>{t("pest.details.action.immediate.4")}</li>
                        <li>{t("pest.details.action.immediate.5")}</li>
                      </ul>
                    </div>
                    
                    <div className="p-5 border rounded-lg bg-opacity-50 bg-blue-50">
                      <h4 className="font-semibold text-blue-800 text-lg mb-3">{t("pest.action.preventionStrategy")}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>{t("pest.details.action.prevent.1")}</li>
                        <li>{t("pest.details.action.prevent.2")}</li>
                        <li>{t("pest.details.action.prevent.3")}</li>
                        <li>{t("pest.details.action.prevent.4")}</li>
                        <li>{t("pest.details.action.prevent.5")}</li>
                        <li>{t("pest.details.action.prevent.6")}</li>
                      </ul>
                    </div>
                    
                    <div className="p-5 border rounded-lg bg-opacity-50 bg-purple-50">
                      <h4 className="font-semibold text-purple-800 text-lg mb-3">{t("pest.details.longTerm.title")}</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>{t("pest.details.longTerm.1")}</li>
                        <li>{t("pest.details.longTerm.2")}</li>
                        <li>{t("pest.details.longTerm.3")}</li>
                        <li>{t("pest.details.longTerm.4")}</li>
                        <li>{t("pest.details.longTerm.5")}</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PestDetails;

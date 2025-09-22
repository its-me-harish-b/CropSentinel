
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

const PestDetails = () => {
  const { pestId } = useParams<{ pestId: string }>();
  const navigate = useNavigate();
  const [pest, setPest] = useState<PestInfo | null>(null);
  const [loading, setLoading] = useState(true);

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
        return "Low Risk - Monitor";
      case "medium":
        return "Medium Risk - Action Needed";
      case "high":
        return "High Risk - Immediate Action";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p>Loading pest information...</p>
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
            <h1 className="text-2xl font-bold mb-4">Pest Not Found</h1>
            <p className="mb-6">The pest you're looking for could not be found in our database.</p>
            <Button onClick={() => navigate("/pest-library")}>
              Return to Pest Library
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

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
            Back to Library
          </Button>
          
          <Card>
            <CardHeader className="bg-cropGreen bg-opacity-10 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-3xl text-cropGreen-dark">{pest.name}</CardTitle>
                  <CardDescription className="italic text-lg mt-1">{pest.scientificName}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getSeverityColor(pest.severity)}>
                    {getSeverityText(pest.severity)}
                  </Badge>
                  <div className="text-sm">
                    <span className="font-semibold">Identification confidence:</span> {Math.round(pest.confidenceScore * 100)}%
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="remedies">Organic Remedies</TabsTrigger>
                  <TabsTrigger value="action">Action Plan</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-4">About this Pest</h3>
                      <p className="text-muted-foreground mb-4">{pest.description}</p>
                      
                      <h4 className="text-lg font-semibold mt-6 mb-2">Identification Tips</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Look for clustering on new growth and leaf undersides</li>
                        <li>Check for signs of feeding damage specific to this pest</li>
                        <li>Monitor plants regularly, especially during peak season</li>
                        <li>Use a magnifying glass for small pests like aphids and mites</li>
                      </ul>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden border shadow-sm">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={pest.imageUrl} 
                            alt={pest.name} 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      
                      <div className="mt-6 bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Common Host Plants</h4>
                        <p className="text-sm text-muted-foreground">
                          This pest commonly affects a variety of crops including tomatoes, 
                          peppers, cucumbers, beans, and many ornamental plants.
                        </p>
                      </div>
                      
                      <div className="mt-4 bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Seasonal Activity</h4>
                        <p className="text-sm text-muted-foreground">
                          Most active during warm weather from late spring through early fall. 
                          Population peaks typically occur during hot, dry periods.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="remedies" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recommended Organic Remedies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pest.remedies.map((remedy, index) => (
                      <Card key={index} className="border border-soil-light">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{remedy.name}</CardTitle>
                          <Badge variant="outline" className="w-fit">
                            Effectiveness: {remedy.effectiveness}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{remedy.description}</p>
                          <div className="bg-muted p-3 rounded-md">
                            <h4 className="font-semibold text-sm mb-1">Application Instructions:</h4>
                            <p className="text-sm">{remedy.application}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="action" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recommended Action Plan</h3>
                  <div className="space-y-6">
                    <div className="p-5 border rounded-lg bg-opacity-50 bg-green-50">
                      <h4 className="font-semibold text-cropGreen-dark text-lg mb-3">Immediate Steps</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Isolate affected plants to prevent spread to healthy plants</li>
                        <li>Apply the recommended organic remedies based on infestation level</li>
                        <li>Remove severely infested plant parts and dispose properly (do not compost)</li>
                        <li>Monitor plants daily for the next week to track effectiveness</li>
                        <li>Maintain plant vigor with proper watering and nutrients</li>
                      </ul>
                    </div>
                    
                    <div className="p-5 border rounded-lg bg-opacity-50 bg-blue-50">
                      <h4 className="font-semibold text-blue-800 text-lg mb-3">Prevention Strategy</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Maintain proper plant spacing for adequate airflow</li>
                        <li>Use companion planting strategies to deter pests naturally</li>
                        <li>Implement crop rotation for annual plants in subsequent seasons</li>
                        <li>Establish regular monitoring practices</li>
                        <li>Support beneficial insect populations in your garden</li>
                        <li>Use row covers during peak pest seasons</li>
                      </ul>
                    </div>
                    
                    <div className="p-5 border rounded-lg bg-opacity-50 bg-purple-50">
                      <h4 className="font-semibold text-purple-800 text-lg mb-3">Long-term Management</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Build soil health to support stronger, more resilient plants</li>
                        <li>Create habitat for natural predators of this pest</li>
                        <li>Consider trap crops that attract pests away from main crops</li>
                        <li>Maintain a journal of pest occurrences to track patterns</li>
                        <li>For severe infestations, consult with a local agricultural extension service</li>
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

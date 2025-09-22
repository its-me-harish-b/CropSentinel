
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

const PestResult = ({ pestInfo, onReset }: PestResultProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
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
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-cropGreen bg-opacity-10 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-cropGreen-dark">{pestInfo.name}</CardTitle>
            <CardDescription className="italic">{pestInfo.scientificName}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getSeverityColor(pestInfo.severity)}>
              {getSeverityText(pestInfo.severity)}
            </Badge>
            <div className="text-sm">
              <span className="font-semibold">Confidence:</span> {Math.round(pestInfo.confidenceScore * 100)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="remedies">Organic Remedies</TabsTrigger>
            <TabsTrigger value="action">Action Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">About this Pest</h3>
                <p className="text-muted-foreground">{pestInfo.description}</p>
              </div>
              <div className="md:w-1/3">
                <img 
                  src={pestInfo.imageUrl} 
                  alt={pestInfo.name} 
                  className="w-full h-auto rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="remedies" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Organic Remedies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pestInfo.remedies.map((remedy, index) => (
                <Card key={index} className="border border-soil-light">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{remedy.name}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      Effectiveness: {remedy.effectiveness}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{remedy.description}</p>
                    <p className="text-xs border-t pt-2 mt-2">
                      <span className="font-semibold">Application:</span> {remedy.application}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="action" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Action Plan</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-cropGreen-dark mb-2">Immediate Steps</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Isolate affected plants to prevent spread</li>
                  <li>Apply recommended organic remedies</li>
                  <li>Remove severely infested plant parts</li>
                  <li>Monitor daily for the next week</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-cropGreen-dark mb-2">Prevention Strategy</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Maintain proper plant spacing for airflow</li>
                  <li>Use companion planting strategies</li>
                  <li>Rotate crops in subsequent seasons</li>
                  <li>Implement regular monitoring practices</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-cropGreen-dark mb-2">Expert Consultation</h4>
                <p className="text-sm">
                  For severe infestations, consider consulting with a local agricultural extension 
                  service or a certified crop advisor for personalized guidance.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center p-4 border-t">
          <Button variant="outline" onClick={onReset}>
            Analyze Another Image
          </Button>
          <Button className="bg-cropGreen hover:bg-cropGreen-dark">
            Save Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PestResult;

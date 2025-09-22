
import { useState } from "react";
import Layout from "@/components/Layout";
import { pestLibrary, PestInfo } from "@/data/pestData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const PestLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPests = pestLibrary.filter((pest) => 
    pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-cropGreen-dark mb-4">
              Pest Library
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our comprehensive database of common crop pests and learn about organic management strategies.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search pests by name or description..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredPests.length > 0 ? (
              filteredPests.map((pest) => (
                <Card key={pest.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img 
                        src={pest.imageUrl} 
                        alt={pest.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "200px" }}
                      />
                    </div>
                    <div className="md:w-3/4">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-cropGreen-dark">{pest.name}</CardTitle>
                            <CardDescription className="italic">{pest.scientificName}</CardDescription>
                          </div>
                          <Badge className={getSeverityColor(pest.severity)}>
                            {pest.severity.charAt(0).toUpperCase() + pest.severity.slice(1)} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                          {pest.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Top Remedy:</h4>
                          <p className="text-xs text-muted-foreground">
                            {pest.remedies[0].name} - {pest.remedies[0].description}
                          </p>
                          <Link 
                            to={`/pest-details/${pest.id}`} 
                            className="text-cropGreen hover:text-cropGreen-dark text-sm font-medium inline-block mt-2"
                          >
                            View Details
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-10">
                <h3 className="text-lg font-medium mb-2">No pests found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse our complete library.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PestLibrary;

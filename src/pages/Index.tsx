
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-cropGreen-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cropGreen-dark opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Protect Your Crops with AI-Powered Pest Detection
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Crop Sentinel uses advanced deep learning to identify pests and provide organic remedies, helping you safeguard your harvest naturally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-cropGreen-dark hover:bg-soil-light">
                <Link to="/detect">Detect Pests Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-cropGreen-dark">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-soil-light bg-opacity-30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-cropGreen-dark mb-4">How Crop Sentinel Works</h2>
            <p className="text-muted-foreground">
              Our advanced AI technology helps you identify and treat crop pests quickly and effectively, using environmentally friendly solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cropGreen bg-opacity-20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cropGreen-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
                <p className="text-muted-foreground">
                  Take a photo of your affected crop or upload an existing image to get started with the analysis.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cropGreen bg-opacity-20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cropGreen-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our deep learning model identifies the pest and assesses the severity of the infestation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cropGreen bg-opacity-20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cropGreen-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Receive Treatment Plans</h3>
                <p className="text-muted-foreground">
                  Get organic remedy recommendations and detailed action plans to effectively treat the pest problem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-cropGreen text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-soil-light">Detection Accuracy</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">200+</h3>
              <p className="text-soil-light">Pest Species Recognized</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">100%</h3>
              <p className="text-soil-light">Organic Remedies</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-soil-light">Farmers Helped</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-cropGreen-dark mb-4">What Farmers Are Saying</h2>
            <p className="text-muted-foreground">
              Hear from farmers who have used Crop Sentinel to protect their harvests.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Maria Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Organic Tomato Farmer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "Crop Sentinel helped me identify a hornworm infestation early, saving my entire tomato crop. The organic remedies recommended were effective and easy to implement."
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">James Chen</h4>
                    <p className="text-sm text-muted-foreground">Community Garden Coordinator</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "Our community garden uses Crop Sentinel to keep our shared plots healthy. It's like having a plant doctor in your pocket – so easy that even beginners can use it."
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Small-Scale Potato Grower</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I detected Colorado potato beetles before they could spread. The app's severity assessment helped me understand the urgency and take appropriate action right away."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-cropGreen-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Protect Your Crops?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Start using Crop Sentinel today and take the first step toward healthier, more resilient crops.
          </p>
          <Button asChild size="lg" className="bg-white text-cropGreen-dark hover:bg-soil-light">
            <Link to="/detect">Try Pest Detection Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

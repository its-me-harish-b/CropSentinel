
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-cropGreen-dark mb-4">{t('about.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-lg mb-6">
              {t('about.intro')}
            </p>
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">{t('about.technology.title')}</h2>
            <p>
              {t('about.technology.description')}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Identify over 200 common crop pests and diseases</li>
              <li>Assess infestation severity with high accuracy</li>
              <li>Provide customized treatment recommendations focused on organic and integrated pest management approaches</li>
              <li>Work efficiently on multiple devices and platforms</li>
            </ul>
            
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-cropGreen-dark">{t('about.model.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.model.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-cropGreen-dark">{t('about.data.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.data.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">Our Commitment to Sustainable Agriculture</h2>
            <p>
              We believe in farming practices that protect both crops and the environment. That's why Crop Sentinel 
              prioritizes organic and low-impact solutions:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>All recommended treatments focus on organic options first</li>
              <li>We promote integrated pest management (IPM) approaches</li>
              <li>Our remedy database highlights solutions that preserve beneficial insects and soil health</li>
              <li>We continuously update our recommendations based on the latest research in sustainable agriculture</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">The Team Behind Crop Sentinel</h2>
            <p>
              Our interdisciplinary team brings together expertise in agricultural science, artificial intelligence, 
              and sustainable farming practices. Founded by researchers from leading agricultural universities and 
              technology institutes, Crop Sentinel represents the intersection of cutting-edge technology and 
              practical farming knowledge.
            </p>
            
            <div className="my-8 bg-soil-light bg-opacity-30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-cropGreen-dark">Our Vision</h3>
              <p className="italic">
                "We envision a future where every farmer has access to advanced tools for pest management, 
                leading to increased food security, reduced chemical use, and more resilient agricultural systems."
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">Get Involved</h2>
            <p>
              Crop Sentinel is continuously improving, and we welcome contributions from the agricultural community:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Share your pest images to help improve our detection model</li>
              <li>Submit effective organic remedies you've discovered</li>
              <li>Provide feedback on our recommendations</li>
              <li>Spread the word to fellow farmers and gardeners</li>
            </ul>
            
            <p className="mt-8">
              Together, we can build a more sustainable approach to pest management that benefits both farmers and the environment.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

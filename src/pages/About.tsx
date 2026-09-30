
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
              <li>{t('about.technology.bullets.identify')}</li>
              <li>{t('about.technology.bullets.assess')}</li>
              <li>{t('about.technology.bullets.recommend')}</li>
              <li>{t('about.technology.bullets.efficient')}</li>
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
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">{t('about.commitment.title')}</h2>
            <p>
              {t('about.commitment.description')}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>{t('about.commitment.bullets.organicFirst')}</li>
              <li>{t('about.commitment.bullets.ipm')}</li>
              <li>{t('about.commitment.bullets.preserveBeneficials')}</li>
              <li>{t('about.commitment.bullets.updateResearch')}</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">{t('about.team.title')}</h2>
            <p>
              {t('about.team.description')}
            </p>
            
            <div className="my-8 bg-soil-light bg-opacity-30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-cropGreen-dark">{t('about.vision.title')}</h3>
              <p className="italic">
                {`"${t('about.vision.quote')}"`}
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold text-cropGreen-dark mt-10 mb-4">{t('about.getInvolved.title')}</h2>
            <p>
              {t('about.getInvolved.description')}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>{t('about.getInvolved.bullets.shareImages')}</li>
              <li>{t('about.getInvolved.bullets.submitRemedies')}</li>
              <li>{t('about.getInvolved.bullets.provideFeedback')}</li>
              <li>{t('about.getInvolved.bullets.spreadWord')}</li>
            </ul>
            
            <p className="mt-8">
              {t('about.conclusion')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

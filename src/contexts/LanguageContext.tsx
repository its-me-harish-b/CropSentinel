import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'te' | 'hi' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.pestLibrary': 'Pest Library',
    'nav.contact': 'Contact',
    'nav.detectNow': 'Detect Now',
    
    // Hero Section
    'hero.title': 'Protect Your Crops with AI-Powered Pest Detection',
    'hero.subtitle': 'Crop Sentinel uses advanced deep learning to identify pests and provide organic remedies, helping you safeguard your harvest naturally.',
    'hero.detectButton': 'Detect Pests Now',
    'hero.learnMore': 'Learn More',
    
    // Features Section
    'features.title': 'How Crop Sentinel Works',
    'features.subtitle': 'Our advanced AI technology helps you identify and treat crop pests quickly and effectively, using environmentally friendly solutions.',
    'features.upload.title': 'Upload Your Image',
    'features.upload.description': 'Take a photo of your affected crop or upload an existing image to get started with the analysis.',
    'features.analysis.title': 'Get AI Analysis',
    'features.analysis.description': 'Our deep learning model identifies the pest and assesses the severity of the infestation.',
    'features.treatment.title': 'Receive Treatment Plans',
    'features.treatment.description': 'Get organic remedy recommendations and detailed action plans to effectively treat the pest problem.',
    
    // Statistics
    'stats.accuracy': 'Detection Accuracy',
    'stats.species': 'Pest Species Recognized',
    'stats.organic': 'Organic Remedies',
    'stats.farmers': 'Farmers Helped',
    
    // Testimonials
    'testimonials.title': 'What Farmers Are Saying',
    'testimonials.subtitle': 'Hear from farmers who have used Crop Sentinel to protect their harvests.',
    
    // CTA
    'cta.title': 'Ready to Protect Your Crops?',
    'cta.subtitle': 'Start using Crop Sentinel today and take the first step toward healthier, more resilient crops.',
    'cta.button': 'Try Pest Detection Now',
    
    // About Page
    'about.title': 'About Crop Sentinel',
    'about.subtitle': 'Advanced AI for sustainable pest management in agriculture',
    'about.intro': 'Crop Sentinel was developed with a mission to help farmers identify and manage crop pests using environmentally friendly approaches. By leveraging the power of artificial intelligence and deep learning, we are making advanced pest detection accessible to everyone from small garden owners to large-scale farmers.',
    'about.technology.title': 'Our Technology',
    'about.technology.description': 'At the heart of Crop Sentinel is a sophisticated deep learning model trained on thousands of images of agricultural pests and plant diseases. Using convolutional neural networks (CNN) optimized for mobile and web applications, our system can:',
    'about.model.title': 'Our Model',
    'about.model.description': 'Crop Sentinel uses EfficientNet, a state-of-the-art convolutional neural network architecture that balances high accuracy with computational efficiency, making it perfect for real-time pest detection.',
    'about.data.title': 'Data Sources',
    'about.data.description': 'Our model is trained on a diverse dataset of over 50,000 high-quality images, collected from agricultural research institutions, extension services, and farming communities worldwide.',
    'about.commitment.title': 'Our Commitment to Sustainable Agriculture',
    'about.commitment.description': 'We believe in farming practices that protect both crops and the environment. That is why Crop Sentinel prioritizes organic and low-impact solutions:',
    'about.team.title': 'The Team Behind Crop Sentinel',
    'about.team.description': 'Our interdisciplinary team brings together expertise in agricultural science, artificial intelligence, and sustainable farming practices. Founded by researchers from leading agricultural universities and technology institutes, Crop Sentinel represents the intersection of cutting-edge technology and practical farming knowledge.',
    'about.vision.title': 'Our Vision',
    'about.vision.quote': 'We envision a future where every farmer has access to advanced tools for pest management, leading to increased food security, reduced chemical use, and more resilient agricultural systems.',
    'about.getInvolved.title': 'Get Involved',
    'about.getInvolved.description': 'Crop Sentinel is continuously improving, and we welcome contributions from the agricultural community:',
    
    // Pest Library Page
    'pestLibrary.title': 'Pest Library',
    'pestLibrary.subtitle': 'Browse our comprehensive database of common crop pests and learn about organic management strategies.',
    'pestLibrary.search.placeholder': 'Search pests by name or description...',
    'pestLibrary.risk': 'Risk',
    'pestLibrary.topRemedy': 'Top Remedy:',
    'pestLibrary.viewDetails': 'View Details',
    'pestLibrary.noResults.title': 'No pests found',
    'pestLibrary.noResults.subtitle': 'Try adjusting your search or browse our complete library.',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions about Crop Sentinel? Want to share feedback or discuss partnership opportunities? We would love to hear from you.',
    'contact.getInTouch.title': 'Get In Touch',
    'contact.getInTouch.subtitle': 'Our team is here to help with any questions or feedback.',
    'contact.email': 'Email Us',
    'contact.call': 'Call Us',
    'contact.visit': 'Visit Us',
    'contact.follow': 'Follow Us',
    'contact.sendMessage.title': 'Send Us a Message',
    'contact.sendMessage.subtitle': 'Fill out the form below and we will get back to you as soon as possible.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Your message has been sent! We will get back to you soon.',
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.accuracy.question': 'How accurate is the pest detection?',
    'contact.faq.accuracy.answer': 'Our pest detection model has an average accuracy of 95% for the most common crop pests. The accuracy may vary depending on image quality and whether the pest is in our database.',
    'contact.faq.security.question': 'Is my data secure when I upload images?',
    'contact.faq.security.answer': 'Yes, we take data privacy seriously. Your uploaded images are used only for pest detection and are processed securely. We do not share your data with third parties without your consent.',
    'contact.faq.enterprise.question': 'Do you offer custom solutions for large farms?',
    'contact.faq.enterprise.answer': 'Yes, we offer enterprise solutions for large-scale agricultural operations. These include API access, custom model training, and integration with farm management systems. Contact us for details.',
    'contact.faq.contribute.question': 'How can I contribute to improving the app?',
    'contact.faq.contribute.answer': 'We welcome contributions! You can help by sharing correctly labeled pest images, providing feedback on detection accuracy, and suggesting effective organic remedies from your experience.',
    
    // Footer
    'footer.description': 'Protecting your crops with advanced AI pest detection technology.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.farmingTips': 'Farming Tips',
    'footer.organicRemedies': 'Organic Remedies',
    'footer.researchPapers': 'Research Papers',
    'footer.apiDocs': 'API Documentation',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    // Language selector
    'language.select': 'Select Language'
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.about': 'பற்றி',
    'nav.pestLibrary': 'பூச்சி நூலகம்',
    'nav.contact': 'தொடர்பு',
    'nav.detectNow': 'இப்போது கண்டறியுங்கள்',
    
    // Hero Section
    'hero.title': 'AI-சக்தியுடைய பூச்சி கண்டறிதலுடன் உங்கள் பயிர்களைப் பாதுகாக்கவும்',
    'hero.subtitle': 'க்ராப் சென்டினல் மேம்பட்ட ஆழ்ந்த கற்றலைப் பயன்படுத்தி பூச்சிகளை அடையாளம் காணவும், இயற்கை தீர்வுகளை வழங்கவும், உங்கள் அறுவடையை இயற்கையாகப் பாதுகாக்க உதவுகிறது.',
    'hero.detectButton': 'இப்போது பூச்சிகளைக் கண்டறியுங்கள்',
    'hero.learnMore': 'மேலும் அறிக',
    
    // Add all other translations abbreviated for space...
    'language.select': 'மொழியைத் தேர்ந்தெடுக்கவும்'
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.about': 'గురించి',
    'nav.pestLibrary': 'పురుగుల లైబ్రరీ',
    'nav.contact': 'సంప్రదించండి',
    'nav.detectNow': 'ఇప్పుడు గుర్తించండి',
    
    // Add all other translations abbreviated for space...
    'language.select': 'భాషను ఎంచుకోండి'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'के बारे में',
    'nav.pestLibrary': 'कीट लाइब्रेरी',
    'nav.contact': 'संपर्क',
    'nav.detectNow': 'अभी पहचानें',
    
    // Add all other translations abbreviated for space...
    'language.select': 'भाषा चुनें'
  },
  ml: {
    // Navigation
    'nav.home': 'ഹോം',
    'nav.about': 'കുറിച്ച്',
    'nav.pestLibrary': 'കീട ലൈബ്രറി',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.detectNow': 'ഇപ്പോൾ കണ്ടെത്തുക',
    
    // Add all other translations abbreviated for space...
    'language.select': 'ഭാഷ തിരഞ്ഞെടുക്കുക'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
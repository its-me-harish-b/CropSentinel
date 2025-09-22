import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'te' | 'hi' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
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
    
    // Language selector
    'language.select': 'Select Language'
  },
  ta: {
    // Hero Section
    'hero.title': 'AI-சக்தியுடைய பூச்சி கண்டறிதலுடன் உங்கள் பயிர்களைப் பாதுகாக்கவும்',
    'hero.subtitle': 'க்ராப் சென்டினல் மேம்பட்ட ஆழ்ந்த கற்றலைப் பயன்படுத்தி பூச்சிகளை அடையாளம் காணவும், இயற்கை தீர்வுகளை வழங்கவும், உங்கள் அறுவடையை இயற்கையாகப் பாதுகாக்க உதவுகிறது.',
    'hero.detectButton': 'இப்போது பூச்சிகளைக் கண்டறியுங்கள்',
    'hero.learnMore': 'மேலும் அறிக',
    
    // Features Section
    'features.title': 'க்ராப் சென்டினல் எவ்வாறு செயல்படுகிறது',
    'features.subtitle': 'எங்கள் மேம்பட்ட AI தொழில்நுட்பம் சுற்றுச்சூழல் நட்பு தீர்வுகளைப் பயன்படுத்தி பயிர் பூச்சிகளை விரைவாகவும் திறம்படவும் அடையாளம் காணவும் சிகிச்சையளிக்கவும் உதவுகிறது.',
    'features.upload.title': 'உங்கள் படத்தைப் பதிவேற்றுங்கள்',
    'features.upload.description': 'பாதிக்கப்பட்ட உங்கள் பயிரின் புகைப்படம் எடுக்கவும் அல்லது பகுப்பாய்வைத் தொடங்க ஏற்கனவே உள்ள படத்தைப் பதிவேற்றவும்.',
    'features.analysis.title': 'AI பகுப்பாய்வைப் பெறுங்கள்',
    'features.analysis.description': 'எங்கள் ஆழ்ந்த கற்றல் மாதிரி பூச்சியை அடையாளம் கண்டு தொற்றின் தீவிரத்தை மதிப்பிடுகிறது.',
    'features.treatment.title': 'சிகிச்சை திட்டங்களைப் பெறுங்கள்',
    'features.treatment.description': 'பூச்சி பிரச்சினையை திறம்பட சிகிச்சையளிக்க இயற்கை தீர்வு பரிந்துரைகள் மற்றும் விரிவான செயல் திட்டங்களைப் பெறுங்கள்.',
    
    // Statistics
    'stats.accuracy': 'கண்டறிதல் துல்லியம்',
    'stats.species': 'பூச்சி இனங்கள் அங்கீகரிக்கப்பட்டன',
    'stats.organic': 'இயற்கை தீர்வுகள்',
    'stats.farmers': 'விவசாயிகளுக்கு உதவியது',
    
    // Testimonials
    'testimonials.title': 'விவசாயிகள் என்ன சொல்கிறார்கள்',
    'testimonials.subtitle': 'தங்கள் அறுவடையைப் பாதுகாக்க க்ராப் சென்டினலைப் பயன்படுத்திய விவசாயிகளிடமிருந்து கேளுங்கள்.',
    
    // CTA
    'cta.title': 'உங்கள் பயிர்களைப் பாதுகாக்க தயாரா?',
    'cta.subtitle': 'இன்றே க்ராப் சென்டினலைப் பயன்படுத்தத் தொடங்குங்கள் மற்றும் ஆரோக்கியமான, மீள்தன்மையுள்ள பயிர்களை நோக்கி முதல் படியை எடுக்கவும்.',
    'cta.button': 'இப்போது பூச்சி கண்டறிதலை முயற்சிக்கவும்',
    
    // Language selector
    'language.select': 'மொழியைத் தேர்ந்தெடுக்கவும்'
  },
  te: {
    // Hero Section
    'hero.title': 'AI-శక్తితో కూడిన పురుగుల గుర్తింపుతో మీ పంటలను రక్షించండి',
    'hero.subtitle': 'క్రాప్ సెంటినెల్ అధునాతన డీప్ లెర్నింగ్‌ను ఉపయోగించి పురుగులను గుర్తించడానికి మరియు సేంద్రీయ పరిష్కారాలను అందించడానికి, మీ పంటను సహజంగా రక్షించడంలో సహాయపడుతుంది.',
    'hero.detectButton': 'ఇప్పుడు పురుగులను గుర్తించండి',
    'hero.learnMore': 'మరింత తెలుసుకోండి',
    
    // Features Section
    'features.title': 'క్రాప్ సెంటినెల్ ఎలా పనిచేస్తుంది',
    'features.subtitle': 'మా అధునాతన AI సాంకేతికత పర్యావరణ అనుకూల పరిష్కారాలను ఉపయోగించి పంట పురుగులను త్వరగా మరియు సమర్థవంతంగా గుర్తించడంలో మరియు చికిత్స చేయడంలో సహాయపడుతుంది.',
    'features.upload.title': 'మీ చిత్రాన్ని అప్‌లోడ్ చేయండి',
    'features.upload.description': 'మీ ప్రభావిత పంట యొక్క ఫోటో తీయండి లేదా విశ్లేషణను ప్రారంభించడానికి ఇప్పటికే ఉన్న చిత్రాన్ని అప్‌లోడ్ చేయండి.',
    'features.analysis.title': 'AI విశ్లేషణ పొందండి',
    'features.analysis.description': 'మా డీప్ లెర్నింగ్ మోడల్ పురుగును గుర్తిస్తుంది మరియు సంక్రమణ తీవ్రతను అంచనా వేస్తుంది.',
    'features.treatment.title': 'చికిత్సా ప్రణాళికలను పొందండి',
    'features.treatment.description': 'పురుగుల సమస్యను సమర్థవంతంగా చికిత్స చేయడానికి సేంద్రీయ పరిష్కార సిఫారసులు మరియు వివరణాత్మక కార్యాచరణ ప్రణాళికలను పొందండి.',
    
    // Statistics
    'stats.accuracy': 'గుర్తింపు ఖచ్చితత్వం',
    'stats.species': 'పురుగుల జాతులు గుర్తించబడ్డాయి',
    'stats.organic': 'సేంద్రీయ పరిష్కారాలు',
    'stats.farmers': 'రైతులకు సహాయం చేయబడింది',
    
    // Testimonials
    'testimonials.title': 'రైతులు ఏమి చెబుతున్నారు',
    'testimonials.subtitle': 'వారి పంటలను రక్షించడానికి క్రాప్ సెంటినెల్‌ను ఉపయోగించిన రైతుల నుండి వినండి.',
    
    // CTA
    'cta.title': 'మీ పంటలను రక్షించడానికి సిద్ధంగా ఉన్నారా?',
    'cta.subtitle': 'ఈరోజే క్రాప్ సెంటినెల్‌ను ఉపయోగించడం ప్రారంభించండి మరియు ఆరోగ్యకరమైన, మరింత స్థితిస్థాపకమైన పంటల వైపు మొదటి అడుగు వేయండి.',
    'cta.button': 'ఇప్పుడు పురుగుల గుర్తింపును ప్రయత్నించండి',
    
    // Language selector
    'language.select': 'భాషను ఎంచుకోండి'
  },
  hi: {
    // Hero Section
    'hero.title': 'AI-संचालित कीट पहचान के साथ अपनी फसलों की सुरक्षा करें',
    'hero.subtitle': 'क्रॉप सेंटिनेल उन्नत डीप लर्निंग का उपयोग करके कीटों की पहचान करने और जैविक उपचार प्रदान करने के लिए उपयोग करता है, जो आपकी फसल को प्राकृतिक रूप से सुरक्षित रखने में मदद करता है।',
    'hero.detectButton': 'अभी कीट पहचानें',
    'hero.learnMore': 'और जानें',
    
    // Features Section
    'features.title': 'क्रॉप सेंटिनेल कैसे काम करता है',
    'features.subtitle': 'हमारी उन्नत AI तकनीक पर्यावरण-अनुकूल समाधानों का उपयोग करके फसल कीटों की पहचान और उपचार में तेजी से और प्रभावी रूप से मदद करती है।',
    'features.upload.title': 'अपनी छवि अपलोड करें',
    'features.upload.description': 'अपनी प्रभावित फसल की तस्वीर लें या विश्लेषण शुरू करने के लिए मौजूदा छवि अपलोड करें।',
    'features.analysis.title': 'AI विश्लेषण प्राप्त करें',
    'features.analysis.description': 'हमारा डीप लर्निंग मॉडल कीट की पहचान करता है और संक्रमण की गंभीरता का आकलन करता है।',
    'features.treatment.title': 'उपचार योजनाएं प्राप्त करें',
    'features.treatment.description': 'कीट समस्या का प्रभावी रूप से इलाज करने के लिए जैविक उपाय की सिफारिशें और विस्तृत कार्य योजनाएं प्राप्त करें।',
    
    // Statistics
    'stats.accuracy': 'पहचान सटीकता',
    'stats.species': 'कीट प्रजातियां पहचानी गईं',
    'stats.organic': 'जैविक उपचार',
    'stats.farmers': 'किसानों की सहायता की गई',
    
    // Testimonials
    'testimonials.title': 'किसान क्या कह रहे हैं',
    'testimonials.subtitle': 'उन किसानों से सुनें जिन्होंने अपनी फसल की सुरक्षा के लिए क्रॉप सेंटिनेल का उपयोग किया है।',
    
    // CTA
    'cta.title': 'अपनी फसलों की सुरक्षा के लिए तैयार हैं?',
    'cta.subtitle': 'आज ही क्रॉप सेंटिनेल का उपयोग शुरू करें और स्वस्थ, अधिक लचीली फसलों की दिशा में पहला कदम उठाएं।',
    'cta.button': 'अभी कीट पहचान आज़माएं',
    
    // Language selector
    'language.select': 'भाषा चुनें'
  },
  ml: {
    // Hero Section
    'hero.title': 'AI-ശക്തിയുള്ള കീടനാശിനി കണ്ടെത്തലിലൂടെ നിങ്ങളുടെ വിളകളെ സംരക്ഷിക്കുക',
    'hero.subtitle': 'ക്രോപ്പ് സെന്റിനൽ വിപുലമായ ആഴത്തിലുള്ള പഠനം ഉപയോഗിച്ച് കീടങ്ങളെ തിരിച്ചറിയാനും ജൈവ പരിഹാരങ്ങൾ നൽകാനും ഉപയോഗിക്കുന്നു, നിങ്ങളുടെ വിളവെടുപ്പ് സ്വാഭാവികമായി സംരക്ഷിക്കാൻ സഹായിക്കുന്നു.',
    'hero.detectButton': 'ഇപ്പോൾ കീടങ്ങളെ കണ്ടെത്തുക',
    'hero.learnMore': 'കൂടുതലറിയുക',
    
    // Features Section
    'features.title': 'ക്രോപ്പ് സെന്റിനൽ എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    'features.subtitle': 'ഞങ്ങളുടെ വിപുലമായ AI സാങ്കേതികവിദ്യ പരിസ്ഥിതി സൗഹൃദ പരിഹാരങ്ങൾ ഉപയോഗിച്ച് വിള കീടങ്ങളെ വേഗത്തിലും ഫലപ്രദമായും തിരിച്ചറിയാനും ചികിത്സിക്കാനും സഹായിക്കുന്നു.',
    'features.upload.title': 'നിങ്ങളുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',
    'features.upload.description': 'ബാധിച്ച നിങ്ങളുടെ വിളയുടെ ഫോട്ടോ എടുക്കുക അല്ലെങ്കിൽ വിശകലനം ആരംഭിക്കുന്നതിന് നിലവിലുള്ള ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.',
    'features.analysis.title': 'AI വിശകലനം നേടുക',
    'features.analysis.description': 'ഞങ്ങളുടെ ആഴത്തിലുള്ള പഠന മാതൃക കീടത്തെ തിരിച്ചറിയുകയും അണുബാധയുടെ തീവ്രത വിലയിരുത്തുകയും ചെയ്യുന്നു.',
    'features.treatment.title': 'ചികിത്സാ പദ്ധതികൾ നേടുക',
    'features.treatment.description': 'കീട പ്രശ്നത്തെ ഫലപ്രദമായി ചികിത്സിക്കുന്നതിന് ജൈവ പരിഹാര ശുപാർശകളും വിശദമായ പ്രവർത്തന പദ്ധതികളും നേടുക.',
    
    // Statistics
    'stats.accuracy': 'കണ്ടെത്തൽ കൃത്യത',
    'stats.species': 'കീട ഇനങ്ങൾ തിരിച്ചറിഞ്ഞു',
    'stats.organic': 'ജൈവ പരിഹാരങ്ങൾ',
    'stats.farmers': 'കർഷകരെ സഹായിച്ചു',
    
    // Testimonials
    'testimonials.title': 'കർഷകർ എന്താണ് പറയുന്നത്',
    'testimonials.subtitle': 'അവരുടെ വിളവെടുപ്പ് സംരക്ഷിക്കാൻ ക്രോപ്പ് സെന്റിനൽ ഉപയോഗിച്ച കർഷകരിൽ നിന്ന് കേൾക്കുക.',
    
    // CTA
    'cta.title': 'നിങ്ങളുടെ വിളകളെ സംരക്ഷിക്കാൻ തയ്യാറാണോ?',
    'cta.subtitle': 'ഇന്ന് തന്നെ ക്രോപ്പ് സെന്റിനൽ ഉപയോഗിക്കാൻ തുടങ്ങുകയും ആരോഗ്യകരവും കൂടുതൽ പ്രതിരോധശേഷിയുള്ളതുമായ വിളകളിലേക്കുള്ള ആദ്യപടി എടുക്കുകയും ചെയ്യുക.',
    'cta.button': 'ഇപ്പോൾ കീട കണ്ടെത്തൽ പരീക്ഷിക്കുക',
    
    // Language selector
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
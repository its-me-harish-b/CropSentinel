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
    'about.intro': 'Crop Sentinel was developed with a mission to help farmers identify and manage crop pests using environmentally friendly approaches. By leveraging the power of artificial intelligence and deep learning, we\'re making advanced pest detection accessible to everyone from small garden owners to large-scale farmers.',
    'about.technology.title': 'Our Technology',
    'about.model.title': 'Our Model',
    'about.model.description': 'Crop Sentinel uses EfficientNet, a state-of-the-art convolutional neural network architecture that balances high accuracy with computational efficiency, making it perfect for real-time pest detection.',
    'about.data.title': 'Data Sources',
    'about.data.description': 'Our model is trained on a diverse dataset of over 50,000 high-quality images, collected from agricultural research institutions, extension services, and farming communities worldwide.',
    'about.commitment.title': 'Our Commitment to Sustainable Agriculture',
    'about.team.title': 'The Team Behind Crop Sentinel',
    'about.vision.title': 'Our Vision',
    'about.vision.quote': 'We envision a future where every farmer has access to advanced tools for pest management, leading to increased food security, reduced chemical use, and more resilient agricultural systems.',
    'about.getInvolved.title': 'Get Involved',
    
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
    'contact.subtitle': 'Have questions about Crop Sentinel? Want to share feedback or discuss partnership opportunities? We\'d love to hear from you.',
    'contact.getInTouch.title': 'Get In Touch',
    'contact.getInTouch.subtitle': 'Our team is here to help with any questions or feedback.',
    'contact.email': 'Email Us',
    'contact.call': 'Call Us',
    'contact.visit': 'Visit Us',
    'contact.follow': 'Follow Us',
    'contact.sendMessage.title': 'Send Us a Message',
    'contact.sendMessage.subtitle': 'Fill out the form below and we\'ll get back to you as soon as possible.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.faq.title': 'Frequently Asked Questions',
    
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
    
    // About Page
    'about.title': 'க்ராப் சென்டினல் பற்றி',
    'about.subtitle': 'விவசாயத்தில் நிலையான பூச்சி மேலாண்மைக்கான மேம்பட்ட AI',
    'about.intro': 'க்ராப் சென்டினல் சுற்றுச்சூழல் நட்பு அணுகுமுறைகளைப் பயன்படுத்தி விவசாயிகளுக்கு பயிர் பூச்சிகளை அடையாளம் காணவும் நிர்வகிக்கவும் உதவும் நோக்கத்துடன் உருவாக்கப்பட்டது.',
    'about.technology.title': 'எங்கள் தொழில்நுட்பம்',
    'about.model.title': 'எங்கள் மாதிரி',
    'about.model.description': 'க்ராப் சென்டினல் EfficientNet ஐப் பயன்படுத்துகிறது, இது அதிக துல்லியத்துடன் கணக்கீட்டு செயல்திறனை சமநிலைப்படுத்தும் அதிநவீன கன்வல்யூஷனல் நியூரல் நெட்வொர்க் கட்டமைப்பாகும்.',
    'about.data.title': 'தரவு ஆதாரங்கள்',
    'about.data.description': 'எங்கள் மாதிரி உலகளாவிய விவசாய ஆராய்ச்சி நிறுவனங்கள், விரிவாக்க சேவைகள் மற்றும் விவசாய சமூகங்களில் இருந்து சேகரிக்கப்பட்ட 50,000 க்கும் மேற்பட்ட உயர்தர படங்களின் மாறுபட்ட தரவுத்தொகுப்பில் பயிற்சி பெற்றுள்ளது.',
    'about.commitment.title': 'நிலையான விவசாயத்திற்கான எங்கள் உறுதிப்பாடு',
    'about.team.title': 'க்ராப் சென்டினலுக்குப் பின்னால் உள்ள குழு',
    'about.vision.title': 'எங்கள் பார்வை',
    'about.vision.quote': 'பூச்சி மேலாண்மைக்கான மேம்பட்ட கருவிகளுக்கு ஒவ்வொரு விவசாயியும் அணுகல் பெறும் எதிர்காலத்தை நாங்கள் கனவு காண்கிறோம், இது அதிகரித்த உணவு பாதுகாப்பு, குறைக்கப்பட்ட இரசாயன பயன்பாடு மற்றும் மேலும் மீள்தன்மையுள்ள விவசாய அமைப்புகளுக்கு வழிவகுக்கிறது.',
    'about.getInvolved.title': 'பங்கேற்க',
    
    // Pest Library Page
    'pestLibrary.title': 'பூச்சி நூலகம்',
    'pestLibrary.subtitle': 'பொதுவான பயிர் பூச்சிகளின் எங்கள் விரிவான தரவுத்தளத்தை உலாவி இயற்கை மேலாண்மை உத்திகளைப் பற்றி அறிந்து கொள்ளுங்கள்.',
    'pestLibrary.search.placeholder': 'பெயர் அல்லது விவரணையின் மூலம் பூச்சிகளைத் தேடுங்கள்...',
    'pestLibrary.risk': 'ஆபத்து',
    'pestLibrary.topRemedy': 'சிறந்த தீர்வு:',
    'pestLibrary.viewDetails': 'விவரங்களைப் பார்க்கவும்',
    'pestLibrary.noResults.title': 'பூச்சிகள் எதுவும் கிடைக்கவில்லை',
    'pestLibrary.noResults.subtitle': 'உங்கள் தேடலை சரிசெய்ய முயற்சிக்கவும் அல்லது எங்கள் முழுமையான நூலகத்தை உலாவவும்.',
    
    // Contact Page
    'contact.title': 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    'contact.subtitle': 'க்ராப் சென்டினல் பற்றி கேள்விகள் உள்ளதா? கருத்து பகிர விரும்புகிறீர்களா அல்லது கூட்டாண்மை வாய்ப்புகளைப் பற்றி விவாதிக்க விரும்புகிறீர்களா? நாங்கள் உங்களிடமிருந்து கேட்க விரும்புகிறோம்.',
    'contact.getInTouch.title': 'தொடர்பில் இருங்கள்',
    'contact.getInTouch.subtitle': 'எந்த கேள்விகள் அல்லது கருத்துகளுக்கும் எங்கள் குழு உதவ இங்கே உள்ளது.',
    'contact.email': 'எங்களுக்கு மின்னஞ்சல் அனுப்புங்கள்',
    'contact.call': 'எங்களை அழைக்கவும்',
    'contact.visit': 'எங்களைப் பார்வையிடுங்கள்',
    'contact.follow': 'எங்களைப் பின்தொடருங்கள்',
    'contact.sendMessage.title': 'எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்',
    'contact.sendMessage.subtitle': 'கீழே உள்ள படிவத்தை நிரப்புங்கள், நாங்கள் விரைவில் உங்களுக்கு பதிலளிப்போம்.',
    'contact.form.name': 'உங்கள் பெயர்',
    'contact.form.email': 'மின்னஞ்சல் முகவரி',
    'contact.form.subject': 'பொருள்',
    'contact.form.message': 'உங்கள் செய்தி',
    'contact.form.send': 'செய்தி அனுப்பு',
    'contact.form.sending': 'அனுப்புகிறது...',
    'contact.faq.title': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    
    // Footer
    'footer.description': 'மேம்பட்ட AI பூச்சி கண்டறிதல் தொழில்நுட்பத்துடன் உங்கள் பயிர்களைப் பாதுகாக்கிறது.',
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.resources': 'வளங்கள்',
    'footer.farmingTips': 'விவசாய குறிப்புகள்',
    'footer.organicRemedies': 'இயற்கை தீர்வுகள்',
    'footer.researchPapers': 'ஆராய்ச்சி கட்டுரைகள்',
    'footer.apiDocs': 'API ஆவணங்கள்',
    'footer.contact': 'தொடர்பு',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    
    // Language selector
    'language.select': 'மொழியைத் தேர்ந்தெடுக்கவும்'
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.about': 'గురించి',
    'nav.pestLibrary': 'పురుగుల లైబ్రరీ',
    'nav.contact': 'సంప్రదించండి',
    'nav.detectNow': 'ఇప్పుడు గుర్తించండి',
    
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
    
    // About Page
    'about.title': 'క్రాప్ సెంటినెల్ గురించి',
    'about.subtitle': 'వ్యవసాయంలో సుస్థిర పురుగుల నిర్వహణ కోసం అధునాతన AI',
    'about.intro': 'క్రాప్ సెంటినెల్ పర్యావరణ అనుకూల విధానాలను ఉపయోగించి రైతులకు పంట పురుగులను గుర్తించడానికి మరియు నిర్వహించడానికి సహాయం చేయాలని లక్ష్యంగా అభివృద్ధి చేయబడింది.',
    'about.technology.title': 'మా సాంకేతికత',
    'about.model.title': 'మా మోడల్',
    'about.model.description': 'క్రాప్ సెంటినెల్ EfficientNet ను ఉపయోగిస్తుంది, ఇది అధిక ఖచ్చితత్వంతో గణన సామర్థ్యాన్ని సమతుల్యం చేసే అత్యాధునిక కన్వల్యూషనల్ న్యూరల్ నెట్‌వర్క్ ఆర్కిటెక్చర్.',
    'about.data.title': 'డేటా మూలాలు',
    'about.data.description': 'మా మోడల్ ప్రపంచవ్యాప్తంగా వ్యవసాయ పరిశోధన సంస్థలు, విస్తరణ సేవలు మరియు వ్యవసాయ సంఘాల నుండి సేకరించిన 50,000 కంటే ఎక్కువ అధిక-నాణ్యత చిత్రాల వైవిధ్యమైన డేటాసెట్‌పై శిక్షణ పొందింది.',
    'about.commitment.title': 'సుస్థిర వ్యవసాయానికి మా నిబద్ధత',
    'about.team.title': 'క్రాప్ సెంటినెల్ వెనుక ఉన్న బృందం',
    'about.vision.title': 'మా దృష్టి',
    'about.vision.quote': 'ప్రతి రైతు పురుగుల నిర్వహణ కోసం అధునాతన సాధనాలకు ప్రాప్యత పొందే భవిష్యత్తును మేము ఊహిస్తున్నాము, ఇది పెరిగిన ఆహార భద్రత, తగ్గిన రసాయన వినియోగం మరియు మరింత స్థితిస్థాపకమైన వ్యవసాయ వ్యవస్థలకు దారితీస్తుంది.',
    'about.getInvolved.title': 'పాలుపంచుకోండి',
    
    // Pest Library Page
    'pestLibrary.title': 'పురుగుల లైబ్రరీ',
    'pestLibrary.subtitle': 'సాధారణ పంట పురుగుల యొక్క మా సమగ్ర డేటాబేస్‌ను బ్రౌజ్ చేయండి మరియు సేంద్రీయ నిర్వహణ వ్యూహాల గురించి తెలుసుకోండి.',
    'pestLibrary.search.placeholder': 'పేరు లేదా వివరణ ద్వారా పురుగులను వెతకండి...',
    'pestLibrary.risk': 'ప్రమాదం',
    'pestLibrary.topRemedy': 'టాప్ రెమెడీ:',
    'pestLibrary.viewDetails': 'వివరాలను చూడండి',
    'pestLibrary.noResults.title': 'పురుగులు కనుగొనబడలేదు',
    'pestLibrary.noResults.subtitle': 'మీ శోధనను సర్దుబాటు చేయడానికి ప్రయత్నించండి లేదా మా పూర్తి లైబ్రరీని బ్రౌజ్ చేయండి.',
    
    // Contact Page
    'contact.title': 'మాతో సంప్రదించండి',
    'contact.subtitle': 'క్రాప్ సెంటినెల్ గురించి ప్రశ్నలు ఉన్నాయా? అభిప్రాయాన్ని పంచుకోవాలనుకుంటున్నారా లేదా భాగస్వామ్య అవకాశాల గురించి చర్చించాలనుకుంటున్నారా? మేము మీ నుండి వినాలని అనుకుంటున్నాము.',
    'contact.getInTouch.title': 'టచ్‌లో ఉండండి',
    'contact.getInTouch.subtitle': 'ఏదైనా ప్రశ్నలు లేదా అభిప్రాయాలతో సహాయం చేయడానికి మా బృందం ఇక్కడ ఉంది.',
    'contact.email': 'మాకు ఇమెయిల్ చేయండి',
    'contact.call': 'మాకు కాల్ చేయండి',
    'contact.visit': 'మమ్మల్ని సందర్శించండి',
    'contact.follow': 'మమ్మల్ని అనుసరించండి',
    'contact.sendMessage.title': 'మాకు సందేశం పంపండి',
    'contact.sendMessage.subtitle': 'దిగువ ఫారమ్‌ను పూరించండి మరియు మేము వీలైనంత త్వరగా మీకు తిరిగి వస్తాము.',
    'contact.form.name': 'మీ పేరు',
    'contact.form.email': 'ఇమెయిల్ చిరునామా',
    'contact.form.subject': 'విషయం',
    'contact.form.message': 'మీ సందేశం',
    'contact.form.send': 'సందేశం పంపండి',
    'contact.form.sending': 'పంపుతోంది...',
    'contact.faq.title': 'తరచుగా అడిగే ప్రశ్నలు',
    
    // Footer
    'footer.description': 'అధునాతన AI పురుగుల గుర్తింపు సాంకేతికతతో మీ పంటలను రక్షిస్తుంది.',
    'footer.quickLinks': 'త్వరిత లింకులు',
    'footer.resources': 'వనరులు',
    'footer.farmingTips': 'వ్యవసాయ చిట్కాలు',
    'footer.organicRemedies': 'సేంద్రీయ పరిష్కారాలు',
    'footer.researchPapers': 'పరిశోధన పత్రాలు',
    'footer.apiDocs': 'API డాక్యుమెంటేషన్',
    'footer.contact': 'సంప్రదించండి',
    'footer.rights': 'అన్ని హక్కులు రక్షించబడ్డాయి.',
    
    // Language selector
    'language.select': 'భాషను ఎంచుకోండి'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'के बारे में',
    'nav.pestLibrary': 'कीट लाइब्रेरी',
    'nav.contact': 'संपर्क',
    'nav.detectNow': 'अभी पहचानें',
    
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
    
    // About Page
    'about.title': 'क्रॉप सेंटिनेल के बारे में',
    'about.subtitle': 'कृषि में टिकाऊ कीट प्रबंधन के लिए उन्नत AI',
    'about.intro': 'क्रॉप सेंटिनेल को पर्यावरण-अनुकूल दृष्टिकोणों का उपयोग करके किसानों को फसल कीटों की पहचान और प्रबंधन में मदद करने के मिशन के साथ विकसित किया गया था।',
    'about.technology.title': 'हमारी प्रौद्योगिकी',
    'about.model.title': 'हमारा मॉडल',
    'about.model.description': 'क्रॉप सेंटिनेल EfficientNet का उपयोग करता है, जो एक अत्याधुनिक कनवोल्यूशनल न्यूरल नेटवर्क आर्किटेक्चर है जो उच्च सटीकता के साथ कम्प्यूटेशनल दक्षता को संतुलित करता है।',
    'about.data.title': 'डेटा स्रोत',
    'about.data.description': 'हमारा मॉडल दुनिया भर के कृषि अनुसंधान संस्थानों, विस्तार सेवाओं और कृषि समुदायों से एकत्रित 50,000 से अधिक उच्च-गुणवत्ता छवियों के विविध डेटासेट पर प्रशिक्षित है।',
    'about.commitment.title': 'टिकाऊ कृषि के लिए हमारी प्रतिबद्धता',
    'about.team.title': 'क्रॉप सेंटिनेल के पीछे की टीम',
    'about.vision.title': 'हमारी दृष्टि',
    'about.vision.quote': 'हम एक ऐसे भविष्य की कल्पना करते हैं जहां हर किसान के पास कीट प्रबंधन के लिए उन्नत उपकरणों तक पहुंच है, जिससे बढ़ी हुई खाद्य सुरक्षा, कम रासायनिक उपयोग और अधिक लचीली कृषि प्रणालियां होती हैं।',
    'about.getInvolved.title': 'शामिल हों',
    
    // Pest Library Page
    'pestLibrary.title': 'कीट लाइब्रेरी',
    'pestLibrary.subtitle': 'सामान्य फसल कीटों के हमारे व्यापक डेटाबेस को ब्राउज़ करें और जैविक प्रबंधन रणनीतियों के बारे में जानें।',
    'pestLibrary.search.placeholder': 'नाम या विवरण द्वारा कीटों को खोजें...',
    'pestLibrary.risk': 'जोखिम',
    'pestLibrary.topRemedy': 'शीर्ष उपाय:',
    'pestLibrary.viewDetails': 'विवरण देखें',
    'pestLibrary.noResults.title': 'कोई कीट नहीं मिला',
    'pestLibrary.noResults.subtitle': 'अपनी खोज को समायोजित करने का प्रयास करें या हमारी पूरी लाइब्रेरी ब्राउज़ करें।',
    
    // Contact Page
    'contact.title': 'हमसे संपर्क करें',
    'contact.subtitle': 'क्रॉप सेंटिनेल के बारे में प्रश्न हैं? फीडबैक साझा करना चाहते हैं या साझेदारी के अवसरों पर चर्चा करना चाहते हैं? हम आपसे सुनना पसंद करेंगे।',
    'contact.getInTouch.title': 'संपर्क में रहें',
    'contact.getInTouch.subtitle': 'हमारी टीम किसी भी प्रश्न या फीडबैक के साथ मदद करने के लिए यहां है।',
    'contact.email': 'हमें ईमेल करें',
    'contact.call': 'हमें कॉल करें',
    'contact.visit': 'हमसे मिलने आएं',
    'contact.follow': 'हमें फॉलो करें',
    'contact.sendMessage.title': 'हमें संदेश भेजें',
    'contact.sendMessage.subtitle': 'नीचे दिया गया फॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।',
    'contact.form.name': 'आपका नाम',
    'contact.form.email': 'ईमेल पता',
    'contact.form.subject': 'विषय',
    'contact.form.message': 'आपका संदेश',
    'contact.form.send': 'संदेश भेजें',
    'contact.form.sending': 'भेजा जा रहा है...',
    'contact.faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    
    // Footer
    'footer.description': 'उन्नत AI कीट पहचान तकनीक के साथ आपकी फसलों की रक्षा करना।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.resources': 'संसाधन',
    'footer.farmingTips': 'कृषि सुझाव',
    'footer.organicRemedies': 'जैविक उपचार',
    'footer.researchPapers': 'अनुसंधान पत्र',
    'footer.apiDocs': 'API डॉक्यूमेंटेशन',
    'footer.contact': 'संपर्क',
    'footer.rights': 'सभी अधिकार सुरक्षित।',
    
    // Language selector
    'language.select': 'भाषा चुनें'
  },
  ml: {
    // Navigation
    'nav.home': 'ഹോം',
    'nav.about': 'കുറിച്ച്',
    'nav.pestLibrary': 'കീട ലൈബ്രറി',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.detectNow': 'ഇപ്പോൾ കണ്ടെത്തുക',
    
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
    
    // About Page
    'about.title': 'ക്രോപ്പ് സെന്റിനൽ കുറിച്ച്',
    'about.subtitle': 'കൃഷിയിൽ സുസ്ഥിര കീട മാനേജ്മെന്റിനായുള്ള വിപുലമായ AI',
    'about.intro': 'ക്രോപ്പ് സെന്റിനൽ പരിസ്ഥിതി സൗഹൃദ സമീപനങ്ങൾ ഉപയോഗിച്ച് കർഷകരെ വിള കീടങ്ങളെ തിരിച്ചറിയാനും നിയന്ത്രിക്കാനും സഹായിക്കുക എന്ന ലക്ഷ്യത്തോടെ വികസിപ്പിച്ചു.',
    'about.technology.title': 'ഞങ്ങളുടെ സാങ്കേതികവിദ്യ',
    'about.model.title': 'ഞങ്ങളുടെ മാതൃക',
    'about.model.description': 'ക്രോപ്പ് സെന്റിനൽ EfficientNet ഉപയോഗിക്കുന്നു, ഇത് ഉയർന്ന കൃത്യതയോടെ കമ്പ്യൂട്ടേഷണൽ കാര്യക്ഷമതയെ സന്തുലിതമാക്കുന്ന അത്യാധുനിക കന്വല്യൂഷണൽ ന്യൂറൽ നെറ്റ്‌വർക്ക് ആർക്കിടെക്ചറാണ്.',
    'about.data.title': 'ഡാറ്റ ഉറവിടങ്ങൾ',
    'about.data.description': 'ഞങ്ങളുടെ മോഡൽ ലോകമെമ്പാടുമുള്ള കൃഷി ഗവേഷണ സ്ഥാപനങ്ങൾ, വിപുലീകരണ സേവനങ്ങൾ, കൃഷി കമ്മ്യൂണിറ്റികൾ എന്നിവയിൽ നിന്ന് ശേഖരിച്ച 50,000-ലധികം ഉയർന്ന നിലവാരമുള്ള ചിത്രങ്ങളുടെ വൈവിധ്യമാർന്ന ഡാറ്റാസെറ്റിൽ പരിശീലനം നേടിയിട്ടുണ്ട്.',
    'about.commitment.title': 'സുസ്ഥിര കൃഷിയോടുള്ള ഞങ്ങളുടെ പ്രതിബദ്ധത',
    'about.team.title': 'ക്രോപ്പ് സെന്റിനലിന്റെ പിന്നിലുള്ള ടീം',
    'about.vision.title': 'ഞങ്ങളുടെ കാഴ്ചപ്പാട്',
    'about.vision.quote': 'ഓരോ കർഷകനും കീട മാനേജ്മെന്റിനായുള്ള വിപുലമായ ഉപകരണങ്ങളിലേക്ക് പ്രവേശനമുള്ള ഒരു ഭാവി ഞങ്ങൾ വിഭാവനം ചെയ്യുന്നു, ഇത് വർദ്ധിച്ച ഭക്ഷ്യ സുരക്ഷ, കുറഞ്ഞ രാസവസ്തു ഉപയോഗം, കൂടുതൽ പ്രതിരോധശേഷിയുള്ള കാർഷിക സംവിധാനങ്ങൾ എന്നിവയിലേക്ക് നയിക്കുന്നു.',
    'about.getInvolved.title': 'ഉൾപ്പെടുക',
    
    // Pest Library Page
    'pestLibrary.title': 'കീട ലൈബ്രറി',
    'pestLibrary.subtitle': 'സാധാരണ വിള കീടങ്ങളുടെ ഞങ്ങളുടെ സമഗ്ര ഡാറ്റാബേസ് ബ്രൗസ് ചെയ്യുകയും ജൈവ പരിപാലന തന്ത്രങ്ങളെക്കുറിച്ച് പഠിക്കുകയും ചെയ്യുക.',
    'pestLibrary.search.placeholder': 'പേര് അല്ലെങ്കിൽ വിവരണം ഉപയോഗിച്ച് കീടങ്ങളെ തിരയുക...',
    'pestLibrary.risk': 'അപകടസാധ്യത',
    'pestLibrary.topRemedy': 'മുൻനിര പ്രതിവിധി:',
    'pestLibrary.viewDetails': 'വിശദാംശങ്ങൾ കാണുക',
    'pestLibrary.noResults.title': 'കീടങ്ങളൊന്നും കണ്ടെത്തിയില്ല',
    'pestLibrary.noResults.subtitle': 'നിങ്ങളുടെ തിരയൽ ക്രമീകരിക്കാൻ ശ്രമിക്കുക അല്ലെങ്കിൽ ഞങ്ങളുടെ സമ്പൂർണ്ണ ലൈബ്രറി ബ്രൗസ് ചെയ്യുക.',
    
    // Contact Page
    'contact.title': 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    'contact.subtitle': 'ക്രോപ്പ് സെന്റിനലിനെക്കുറിച്ച് ചോദ്യങ്ങളുണ്ടോ? ഫീഡ്ബാക്ക് പങ്കിടാൻ ആഗ്രഹിക്കുന്നുണ്ടോ അതോ പങ്കാളിത്ത അവസരങ്ങളെക്കുറിച്ച് ചർച്ച ചെയ്യാൻ ആഗ്രഹിക്കുന്നുണ്ടോ? നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു.',
    'contact.getInTouch.title': 'ബന്ധപ്പെടുക',
    'contact.getInTouch.subtitle': 'ഏതെങ്കിലും ചോദ്യങ്ങളോ ഫീഡ്ബാക്കോ ഉള്ളതിൽ സഹായിക്കാൻ ഞങ്ങളുടെ ടീം ഇവിടെയുണ്ട്.',
    'contact.email': 'ഞങ്ങൾക്ക് ഇമെയിൽ അയയ്ക്കുക',
    'contact.call': 'ഞങ്ങളെ വിളിക്കുക',
    'contact.visit': 'ഞങ്ങളെ സന്ദർശിക്കുക',
    'contact.follow': 'ഞങ്ങളെ പിന്തുടരുക',
    'contact.sendMessage.title': 'ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക',
    'contact.sendMessage.subtitle': 'ചുവടെയുള്ള ഫോം പൂരിപ്പിക്കുക, ഞങ്ങൾ എത്രയും വേഗം നിങ്ങളെ തിരികെ ബന്ധപ്പെടും.',
    'contact.form.name': 'നിങ്ങളുടെ പേര്',
    'contact.form.email': 'ഇമെയിൽ വിലാസം',
    'contact.form.subject': 'വിഷയം',
    'contact.form.message': 'നിങ്ങളുടെ സന്ദേശം',
    'contact.form.send': 'സന്ദേശം അയയ്ക്കുക',
    'contact.form.sending': 'അയയ്ക്കുന്നു...',
    'contact.faq.title': 'പതിവുചോദ്യങ്ങൾ',
    
    // Footer
    'footer.description': 'വിപുലമായ AI കീട കണ്ടെത്തൽ സാങ്കേതികവിദ്യയുമായി നിങ്ങളുടെ വിളകളെ സംരക്ഷിക്കുന്നു.',
    'footer.quickLinks': 'പെട്ടെന്നുള്ള ലിങ്കുകൾ',
    'footer.resources': 'വിഭവങ്ങൾ',
    'footer.farmingTips': 'കൃഷി ടിപ്പുകൾ',
    'footer.organicRemedies': 'ജൈവ പ്രതിവിധികൾ',
    'footer.researchPapers': 'ഗവേഷണ പ്രബന്ധങ്ങൾ',
    'footer.apiDocs': 'API ഡോക്യുമെന്റേഷൻ',
    'footer.contact': 'ബന്ധപ്പെടുക',
    'footer.rights': 'എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.',
    
    // Language selector
    'language.select': 'ഭാഷ തിരഞ്ഞെടുക്കുക'
  }
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
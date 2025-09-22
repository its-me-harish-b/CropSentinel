
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-cropGreen-dark text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <svg 
            className="w-8 h-8" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 2V4" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 20V22" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M4.93018 4.93018L6.34018 6.34018" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M17.6602 17.6602L19.0702 19.0702" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M2 12H4" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M20 12H22" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M6.34018 17.6602L4.93018 19.0702" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M19.0702 4.93018L17.6602 6.34018" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span>Crop Sentinel</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-soil-light transition-colors">{t('nav.home')}</Link>
          <Link to="/about" className="hover:text-soil-light transition-colors">{t('nav.about')}</Link>
          <Link to="/pest-library" className="hover:text-soil-light transition-colors">{t('nav.pestLibrary')}</Link>
          <Link to="/contact" className="hover:text-soil-light transition-colors">{t('nav.contact')}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-cropGreen-dark">
            <Link to="/detect">{t('nav.detectNow')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

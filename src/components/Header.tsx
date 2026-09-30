import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
// 1. Import the plant icon (Sprout is perfect for crops)
import { Sprout } from "lucide-react"; 

const Header = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-cropGreen-dark text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* FIX 1: Point Logo to /home */}
        <Link to="/home" className="text-2xl font-bold flex items-center gap-2">
          
          {/* 2. REPLACED SUN SVG WITH PLANT ICON */}
          {/* You can also use <Wheat /> or <Leaf /> if you prefer */}
          <Sprout className="w-8 h-8" strokeWidth={2} />
          
          <span>Crop Sentinel</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-soil-light transition-colors">{t('nav.home')}</Link>
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
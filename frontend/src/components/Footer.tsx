import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Op Way</h2>
            <p className="mb-4 text-gray-300">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Services Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/booking/cars" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('categories.cars')}
                </a>
              </li>
              <li>
                <a 
                  href="/booking/hotels" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('categories.hotels')}
                </a>
              </li>
              <li>
                <a 
                  href="/booking/restaurants" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('categories.restaurants')}
                </a>
              </li>
              <li>
                <a 
                  href="/booking/activities" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('categories.activities')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Links Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/about" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>contact@opway.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Op Way. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
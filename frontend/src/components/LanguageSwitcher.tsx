import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  onClose: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onClose();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={ref}
      className="absolute right-0 rtl:left-0 rtl:right-auto z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div className="py-1" role="none">
        <button
          onClick={() => changeLanguage('en')}
          className={`flex w-full items-center px-4 py-2 text-sm ${
            i18n.language === 'en'
              ? 'bg-green-100 dark:bg[#144122] text[#144122] dark:text-green-100'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="mr-2">🇺🇸</span> English
        </button>
        <button
          onClick={() => changeLanguage('fr')}
          className={`flex w-full items-center px-4 py-2 text-sm ${
            i18n.language === 'fr'
              ? 'bg-green-100 dark:bg[#144122] text[#144122] dark:text-green-100'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="mr-2">🇫🇷</span> Français
        </button>
        <button
          onClick={() => changeLanguage('ar')}
          className={`flex w-full items-center px-4 py-2 text-sm ${
            i18n.language === 'ar'
              ? 'bg-green-100 dark:bg[#144122] text[#144122] dark:text-green-100'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="mr-2">🇸🇦</span> العربية
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

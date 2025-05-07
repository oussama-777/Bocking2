import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, User, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLanguageMouseEnter = () => {
    if (languageMenuTimeoutRef.current) {
      clearTimeout(languageMenuTimeoutRef.current);
      languageMenuTimeoutRef.current = null;
    }
    setIsLanguageMenuOpen(true);
  };

  const handleLanguageMouseLeave = () => {
    languageMenuTimeoutRef.current = setTimeout(() => {
      setIsLanguageMenuOpen(false);
    }, 3000); // Delay 3 seconds
  };

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (languageMenuTimeoutRef.current) {
        clearTimeout(languageMenuTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold">
                Op Way
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 rtl:space-x-reverse">
            <Link
              to="/"
              className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
            >
              {t('navbar.home')}
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={handleLanguageMouseEnter}
              onMouseLeave={handleLanguageMouseLeave}
            >
              <button
                className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                aria-expanded={isLanguageMenuOpen}
              >
                <Globe className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0" />
                {t('navbar.language')}
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg">
                  <LanguageSwitcher onClose={() => setIsLanguageMenuOpen(false)} />
                </div>
              )}
            </div>
            
            <button
              onClick={toggleTheme}
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('navbar.lightMode')}
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('navbar.darkMode')}
                </>
              )}
            </button>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  <User className="w-5 h-5 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('navbar.dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  <LogOut className="w-5 h-5 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  {t('navbar.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  {t('navbar.signup')}
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.home')}
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="w-full text-left rtl:text-right flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  <Globe className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('navbar.language')}
                </button>
                
                {isLanguageMenuOpen && (
                  <div className="mt-1 ml-4">
                    <LanguageSwitcher onClose={() => {
                      setIsLanguageMenuOpen(false);
                      setIsMenuOpen(false);
                    }} />
                  </div>
                )}
              </div>
              
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left rtl:text-right flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('navbar.lightMode')}
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('navbar.darkMode')}
                  </>
                )}
              </button>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('navbar.dashboard')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left rtl:text-right flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                  >
                    <LogOut className="w-5 h-5 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('navbar.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navbar.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navbar.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LearnMore: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Force language reload on component mount
  useEffect(() => {
    const currentLang = i18n.language;
    i18n.changeLanguage(currentLang).then(() => {
      console.log('Language reloaded:', currentLang);
      console.log('Translation for title:', t('learnMore.title'));
    });
  }, [i18n, t]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative text-white py-20 h-[250px] overflow-hidden">
        <img 
          src="/src/images/Morocco-Culture.jpg" 
          alt="Morocco Way Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          style={{
            width: '100vw',
            height: '100%',
            objectPosition: 'center'
          }}
        />
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-600/30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('learnMore.title', 'How to Use Morocco Way')}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {t('learnMore.gettingStarted', 'Getting Started')}
          </h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 h-20 w-20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.step1.title', 'Create an Account')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.step1.description', 'Sign up for a free account to access all features.')}
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 h-20 w-20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">2</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.step2.title', 'Browse Categories')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.step2.description', 'Explore our four main categories: Cars, Hotels, Restaurants, and Activities.')}
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 h-20 w-20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">3</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.step3.title', 'Make a Booking')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.step3.description', 'Select your desired option and click "Book Now".')}
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 h-20 w-20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">4</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.step4.title', 'Manage Your Bookings')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.step4.description', 'Access your bookings anytime from your account dashboard.')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t('learnMore.faq.title', 'Frequently Asked Questions')}
            </h2>
            
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.faq.q1', 'How do I change or cancel my booking?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.faq.a1', 'You can change or cancel your booking by logging into your account.')}
                </p>
              </div>
              
              {/* FAQ 2 */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.faq.q2', 'Is my payment information secure?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.faq.a2', 'Yes, we use industry-standard encryption and security protocols.')}
                </p>
              </div>
              
              {/* FAQ 3 */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {t('learnMore.faq.q3', 'Can I book multiple services together?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('learnMore.faq.a3', 'Yes, you can book multiple services for your trip.')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t('learnMore.readyToStart', 'Ready to Start Your Journey?')}
            </h2>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
            >
              {t('learnMore.exploreNow', 'Explore Now')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
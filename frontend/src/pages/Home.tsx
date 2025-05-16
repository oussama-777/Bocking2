import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import CategoryCard from '../components/CategoryCard';
import AiAssistant from '../components/AiAssistant';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// Données de démonstration (normalement importées de BookingPage.tsx)
const demoData = {
  cars: [
    { id: 1, name: 'Economy Sedan', price: 40, image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', location: 'Downtown', rating: 4.7, reviews: 124, type: 'cars' },
    { id: 2, name: 'SUV Premium', price: 75, image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', location: 'Airport', rating: 4.9, reviews: 86, type: 'cars' },
  ],
  stays: [
    { id: 1, name: 'Grand Hotel', price: 120, image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', location: 'Downtown', rating: 4.8, reviews: 345, type: 'hotels' },
    { id: 2, name: 'Seaside Resort', price: 210, image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg', location: 'Beachfront', rating: 4.9, reviews: 267, type: 'hotels' },
  ],
  restaurants: [
    { id: 1, name: 'Italian Bistro', price: 2, image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg', location: 'Downtown', rating: 4.6, reviews: 287, type: 'restaurants' },
    { id: 2, name: 'Sushi Place', price: 3, image: 'https://images.pexels.com/photos/5908255/pexels-photo-5908255.jpeg', location: 'Marina District', rating: 4.8, reviews: 156, type: 'restaurants' },
  ],
  activities: [
    { id: 1, name: 'City Tour', price: 45, image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png', location: 'City Center', rating: 4.7, reviews: 189, type: 'activities' },
    { id: 2, name: 'Hiking Adventure', price: 60, image: 'https://images.pexels.com/photos/2041759/pexels-photo-2041759.jpeg', location: 'Mountain Trail', rating: 4.9, reviews: 127, type: 'activities' },
  ],
};

// Fonction pour obtenir des éléments aléatoires
const getRandomItems = (data: Item[], count: number) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Define a type for the items
interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Obtenir 1 élément aléatoire de chaque catégorie
  const randomItems = [
    ...getRandomItems(demoData.cars, 1),
    ...getRandomItems(demoData.stays, 1),
    ...getRandomItems(demoData.restaurants, 1),
    ...getRandomItems(demoData.activities, 1)
  ];

  // Helper function to determine item type - now using the type property
  const getItemType = (item: Item) => {
    return item.type;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 h-[350px] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#144122]/60 to-[#267c41]/30"></div>
        
        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('home.hero.title', 'Book Your Next Adventure')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('home.hero.subtitle', 'Find the perfect car, hotel, restaurant, or activity for your journey')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/booking/hotels')}
              className="bg-[#267c41] hover:bg-[#206836] text-white px-6 py-3 rounded-md font-medium transition duration-300"
            >
              {t('home.hero.bookNow', 'Book Now')}
            </button>
            <button 
              onClick={() => navigate('/learn-more')}
              className="bg-white hover:bg-gray-100 text-[#267c41] px-6 py-3 rounded-md font-medium transition duration-300"
            >
              {t('home.hero.learnMore', 'Learn More')}
            </button>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t('home.categories.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CategoryCard 
            type="cars"
            title={t('categories.cars')}
          />
          <CategoryCard 
            type="hotels"
            title={t('categories.hotels')}
          />
          <CategoryCard 
            type="restaurants"
            title={t('categories.restaurants')}
          />
          <CategoryCard 
            type="activities"
            title={t('categories.activities')}
          />
        </div>
      </section>
      
      {/* Section Sélections Aléatoires */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t('home.randomSelections', 'Nos meilleures sélections')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  <span className="text-sm">{item.location}</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-[#267c41] dark:text-green-400 font-medium">${item.price}</span>
                  <button 
                    onClick={() => navigate(`/booking/${getItemType(item)}`)}
                    className="text-sm text-white bg-[#267c41] hover:bg-green-700 px-3 py-1 rounded transition"
                  >
                    {t('home.viewMore', 'Voir plus')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Séparateur visuel (optionnel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 dark:border-gray-700"></div>
      </div>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 dark:bg-[#144122] rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#267c41] dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {t('home.features.feature1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.features.feature1.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 dark:bg-[#144122] rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#267c41] dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {t('home.features.feature2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.features.feature2.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 dark:bg-[#144122] rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#267c41] dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {t('home.features.feature3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.features.feature3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {t('home.testimonials.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t(`home.testimonials.testimonial${index}.initials`)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {t(`home.testimonials.testimonial${index}.name`)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(`home.testimonials.testimonial${index}.location`)}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{t(`home.testimonials.testimonial${index}.content`)}"
              </p>
              <div className="flex mt-4 text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#267c41] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.newsletter.title')}</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">{t('home.newsletter.subtitle')}</p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t('home.newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="bg-white text-[#267c41] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300">
                {t('home.newsletter.button')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Component */}
      <AiAssistant />
    </div>
  );
};

export default Home;
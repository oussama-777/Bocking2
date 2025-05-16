import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Users, MapPin, DollarSign, Search } from 'lucide-react';
import { Car, Hotel, Utensils, Sailboat } from 'lucide-react';
import AiAssistant from '../components/AiAssistant';
import { useAuth } from '../context/AuthContext';

// Demo data (would come from API in a real app)
const demoData = {
  cars: [
    { id: 1, name: 'Economy Sedan', price: 40, image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', location: 'Downtown', rating: 4.7, reviews: 124 },
    { id: 2, name: 'SUV Premium', price: 75, image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', location: 'Airport', rating: 4.9, reviews: 86 },
    { id: 3, name: 'Compact Car', price: 35, image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg', location: 'City Center', rating: 4.5, reviews: 93 },
    { id: 4, name: 'Luxury Sedan', price: 120, image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', location: 'Business District', rating: 4.8, reviews: 152 },
  ],
  hotels: [
    { id: 1, name: 'Grand Hotel', price: 120, image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', location: 'Downtown', rating: 4.8, reviews: 345 },
    { id: 2, name: 'Seaside Resort', price: 210, image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg', location: 'Beachfront', rating: 4.9, reviews: 267 },
    { id: 3, name: 'City Boutique Hotel', price: 95, image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg', location: 'City Center', rating: 4.6, reviews: 178 },
    { id: 4, name: 'Mountain Lodge', price: 150, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', location: 'Mountain View', rating: 4.7, reviews: 204 },
  ],
  restaurants: [
    { id: 1, name: 'Italian Bistro', price: 2, image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg', location: 'Downtown', rating: 4.6, reviews: 287 },
    { id: 2, name: 'Sushi Place', price: 3, image: 'https://images.pexels.com/photos/5908255/pexels-photo-5908255.jpeg', location: 'Marina District', rating: 4.8, reviews: 156 },
    { id: 3, name: 'Steakhouse', price: 4, image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', location: 'Financial District', rating: 4.7, reviews: 203 },
    { id: 4, name: 'Vegetarian Cafe', price: 2, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', location: 'Uptown', rating: 4.5, reviews: 134 },
  ],
  activities: [
    { id: 1, name: 'City Tour', price: 45, image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png', location: 'City Center', rating: 4.7, reviews: 189 },
    { id: 2, name: 'Hiking Adventure', price: 60, image: 'https://images.pexels.com/photos/2041759/pexels-photo-2041759.jpeg', location: 'Mountain Trail', rating: 4.9, reviews: 127 },
    { id: 3, name: 'Cooking Class', price: 80, image: 'https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg', location: 'Culinary School', rating: 4.8, reviews: 98 },
    { id: 4, name: 'Museum Pass', price: 25, image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg', location: 'Cultural District', rating: 4.5, reviews: 145 },
  ],
};

interface BookingItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    location: string;
    rating: number;
    reviews: number;
  };
  type: string;
  onBook: (item: any) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ item, type, onBook }) => {
  const { t } = useTranslation();
  
  const getPriceText = () => {
    switch (type) {
      case 'cars':
        return `$${item.price}/day`;
      case 'hotels':
        return `$${item.price}/night`;
      case 'restaurants':
        return `${'$'.repeat(item.price)} · ${t('booking.priceLevel')}`;
      case 'activities':
        return `$${item.price}/${t('booking.person')}`;
      default:
        return `$${item.price}`;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
          <div className="bg-green-100 dark:bg-[#144122] text-[#1a552c] dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
            {getPriceText()}
          </div>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
          <span className="text-sm">{item.location}</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              {item.rating} ({item.reviews})
            </span>
          </div>
        </div>
        <button
          onClick={() => onBook(item)}
          className="w-full py-2 px-4 bg-green-600 hover:bg-[#267c41] text-white font-medium rounded-md transition duration-300"
        >
          {t('booking.book')}
        </button>
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const validTypes = ['cars', 'hotels', 'restaurants', 'activities'];
  const currentType = validTypes.includes(type || '') ? type : 'hotels';
  
  const [items, setItems] = useState(demoData[currentType as keyof typeof demoData] || []);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    date: '',
    time: '',
    people: 2,
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  useEffect(() => {
    if (currentType) {
      setItems(demoData[currentType as keyof typeof demoData] || []);
    }
  }, [currentType]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  
  const handleBook = (item: any) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setSelectedItem(item);
    setShowBookingModal(true);
  };
  
  const confirmBooking = () => {
    // In a real app, this would make an API call to create the booking
    alert(t('booking.success'));
    setShowBookingModal(false);
  };
  
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-[#144122] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex gap-6 justify-center">
              <a 
                href="/booking/hotels" 
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300 ${
                  currentType === 'hotels' 
                    ? 'bg-white text-[#1a552c] font-medium shadow-md' 
                    : 'bg-[#1a552c] bg-opacity-30 hover:bg-opacity-40 text-white'
                }`}
              >
                <Hotel className="h-7 w-9 mr-4"/>
                {t('categories.hotels')}
              </a>
              <a 
                href="/booking/restaurants" 
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300 ${
                  currentType === 'restaurants' 
                    ? 'bg-white text-[#1a552c] font-medium shadow-md' 
                    : 'bg-[#1a552c] bg-opacity-30 hover:bg-opacity-40 text-white'
                }`}
              >
                <Utensils className="h-7 w-9 mr-4"/>
                {t('categories.restaurants')}
              </a>
              <a 
                href="/booking/activities" 
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300 ${
                  currentType === 'activities' 
                    ? 'bg-white text-[#1a552c] font-medium shadow-md' 
                    : 'bg-[#1a552c] bg-opacity-30 hover:bg-opacity-40 text-white'
                }`}
              >
                <Sailboat className="h-7 w-9 mr-4"/>
                {t('categories.activities')}
              </a>
              <a 
                href="/booking/cars" 
                className={`flex items-center px-6 py-3 rounded-lg transition duration-300 ${
                  currentType === 'cars' 
                    ? 'bg-white text-[#1a552c] font-medium shadow-md' 
                    : 'bg-[#1a552c] bg-opacity-30 hover:bg-opacity-40 text-white'
                }`}
              >
                <Car className="h-12 w-9 mr-4"/>
                {t('categories.cars')}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {t('booking.filters')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('booking.location')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="pl-10 rtl:pr-10 rtl:pl-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('booking.enterLocation')}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('booking.minPrice')}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="pl-10 rtl:pr-10 rtl:pl-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('booking.maxPrice')}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="pl-10 rtl:pr-10 rtl:pl-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="1000"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('booking.date')}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="pl-10 rtl:pr-10 rtl:pl-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('booking.time')}
              </label>
              <div className="relative">
                <Clock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="time"
                  name="time"
                  value={filters.time}
                  onChange={handleFilterChange}
                  className="pl-10 rtl:pr-10 rtl:pl-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('booking.people')}
              </label>
              <div className="relative">
                <Users className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="people"
                  value={filters.people}
                  onChange={handleFilterChange}
                  className="pl-10 rtl:pr-10 rtl:pl-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="md:col-span-2 lg:col-span-1 flex items-end">
              <button className="w-full flex items-center justify-center bg-green-600 hover:bg-[#267c41] text-white py-2 px-4 rounded-md transition duration-300">
                <Search className="mr-2 rtl:ml-2 rtl:mr-0" size={18} />
                {t('booking.search')}
              </button>
            </div>
          </div>
        </div>
        
        
        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <BookingItem
              key={item.id}
              item={item}
              type={currentType || 'hotels'}
              onBook={handleBook}
            />
          ))}
        </div>
      </div>
      
          {/* Affichage conditionnel de la liste marocaine pour les hôtels */}
        {currentType === 'hotels' && (
          <div className="mb-8 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t('booking.moroccanHotels', 'Moroccan Hotels')}
              </h2>
            </div>
            {/* Add Moroccan hotels content here */}
          </div>
        )}
      
      {/* Booking Modal */}
      {showBookingModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t('booking.confirmBooking')}
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {t('booking.bookingDetails')}:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <p className="font-medium text-gray-800 dark:text-white">{selectedItem.name}</p>
                <p className="text-gray-600 dark:text-gray-300">{selectedItem.location}</p>
                <p className="text-green-600 dark:text-green-400 font-medium mt-2">
                  {(() => {
                    switch (currentType) {
                      case 'cars':
                        return `$${selectedItem.price}/day`;
                      case 'hotels':
                        return `$${selectedItem.price}/night`;
                      case 'restaurants':
                        return `${'$'.repeat(selectedItem.price)} · ${t('booking.priceLevel')}`;
                      case 'activities':
                        return `$${selectedItem.price}/${t('booking.person')}`;
                      default:
                        return `$${selectedItem.price}`;
                    }
                  })()}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t('booking.cancel')}
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-[#267c41]"
              >
                {t('booking.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Assistant */}
      <AiAssistant categoryType={currentType} />
    </div>
  );
};

export default BookingPage;
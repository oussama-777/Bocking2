import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Users, MapPin, Check, X } from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    type: 'hotel',
    name: 'Grand Hotel',
    date: '2025-06-15',
    time: '14:00',
    people: 2,
    location: 'Downtown',
    price: 240,
    status: 'confirmed',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
  },
  {
    id: 2,
    type: 'restaurant',
    name: 'Italian Bistro',
    date: '2025-06-20',
    time: '19:30',
    people: 4,
    location: 'Marina District',
    price: 180,
    status: 'confirmed',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
  },
  {
    id: 3,
    type: 'car',
    name: 'Economy Sedan',
    date: '2025-07-01',
    time: '10:00',
    people: 1,
    location: 'Airport',
    price: 120,
    status: 'pending',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
  },
];

const BookingsTab: React.FC = () => {
  const { t } = useTranslation();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('dashboard.bookings.confirmed')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('dashboard.bookings.pending')}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('dashboard.bookings.cancelled')}
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('dashboard.bookings.title')}
      </h2>
      
      {mockBookings.length > 0 ? (
        <div className="space-y-6">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4 mb-4 sm:mb-0">
                  <div className="h-24 sm:h-full rounded-md overflow-hidden">
                    <img 
                      src={booking.image} 
                      alt={booking.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="sm:w-3/4 sm:pl-6 rtl:sm:pr-6 rtl:sm:pl-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {booking.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t(`categories.${booking.type}`)}
                      </p>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span>
                        {new Date(booking.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span>{booking.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span>
                        {booking.people} {t('dashboard.bookings.people')}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {t('dashboard.bookings.total')}: ${booking.price}
                    </div>
                    
                    <div className="mt-4 sm:mt-0 space-x-2 rtl:space-x-reverse">
                      {booking.status !== 'cancelled' && (
                        <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300">
                          {t('dashboard.bookings.modify')}
                        </button>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <button className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition duration-300">
                          {t('dashboard.bookings.cancel')}
                        </button>
                      )}
                      
                      {booking.status === 'pending' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                          {t('dashboard.bookings.confirm')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <Calendar className="h-full w-full" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            {t('dashboard.bookings.noBookings')}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('dashboard.bookings.startBooking')}
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              {t('dashboard.bookings.exploreOptions')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
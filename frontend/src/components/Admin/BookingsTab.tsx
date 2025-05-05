import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Calendar, Check, X } from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    customerName: 'John Doe',
    productName: 'Premium Hotel Room',
    category: 'Hotels',
    date: '2023-08-15T14:00:00Z',
    status: 'Confirmed',
    amount: 199.99,
    createdAt: '2023-07-10T09:30:00Z',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    productName: 'Economy Car Rental',
    category: 'Cars',
    date: '2023-08-20T10:00:00Z',
    status: 'Pending',
    amount: 149.97,
    createdAt: '2023-07-12T11:45:00Z',
  },
  {
    id: 3,
    customerName: 'Robert Johnson',
    productName: 'Luxury Dining Experience',
    category: 'Restaurants',
    date: '2023-08-18T19:30:00Z',
    status: 'Confirmed',
    amount: 299.99,
    createdAt: '2023-07-05T16:20:00Z',
  },
  {
    id: 4,
    customerName: 'Emily Davis',
    productName: 'City Tour Package',
    category: 'Activities',
    date: '2023-08-25T09:00:00Z',
    status: 'Cancelled',
    amount: 159.98,
    createdAt: '2023-07-15T14:10:00Z',
  },
];

const BookingsTab: React.FC = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState(mockBookings);
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Get unique statuses for filter
  const statuses = ['All', ...new Set(bookings.map(booking => booking.status))];
  
  // Filter bookings based on selected status
  const filteredBookings = statusFilter === 'All' 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);
  
  const handleEditBooking = (booking: any) => {
    // In a real app, this would open an edit form
    console.log('Edit booking:', booking);
  };
  
  const handleDeleteBooking = (bookingId: number) => {
    // In a real app, this would call an API to delete the booking
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };
  
  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    // In a real app, this would call an API to update the booking
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus } 
        : booking
    ));
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.bookings.title', 'Bookings Management')}
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
              statusFilter === 'All'
                ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            All
          </button>
          {statuses
            .filter((status) => status !== 'All')
            .map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  statusFilter === status
                    ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-left text-sm font-semibold">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">{t('admin.bookings.customer', 'Customer')}</th>
              <th className="px-6 py-3">{t('admin.bookings.product', 'Product')}</th>
              <th className="px-6 py-3">{t('admin.bookings.category', 'Category')}</th>
              <th className="px-6 py-3">{t('admin.bookings.date', 'Date')}</th>
              <th className="px-6 py-3">{t('admin.bookings.status', 'Status')}</th>
              <th className="px-6 py-3">{t('admin.bookings.amount', 'Amount')}</th>
              <th className="px-6 py-3">{t('admin.bookings.createdAt', 'Created At')}</th>
              <th className="px-6 py-3">{t('admin.bookings.actions', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {booking.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.productName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {new Date(booking.date).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : booking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ${booking.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      {booking.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                            className="text-green-600 hover:text-green-800 dark:text-green-400"
                            title={t('admin.bookings.confirm', 'Confirm')}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                            className="text-red-600 hover:text-red-800 dark:text-red-400"
                            title={t('admin.bookings.cancel', 'Cancel')}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t('admin.bookings.noResults', 'No bookings found.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTab;
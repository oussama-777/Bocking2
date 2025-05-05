import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Move mock data to a separate file in the future
// for better organization and potential API integration
export const salesData = [
  { month: 'Jan', hotels: 4000, cars: 2400, restaurants: 2400, activities: 1200 },
  { month: 'Feb', hotels: 3000, cars: 1398, restaurants: 2210, activities: 980 },
  { month: 'Mar', hotels: 2000, cars: 9800, restaurants: 2290, activities: 1300 },
  { month: 'Apr', hotels: 2780, cars: 3908, restaurants: 2000, activities: 1500 },
  { month: 'May', hotels: 1890, cars: 4800, restaurants: 2181, activities: 1200 },
  { month: 'Jun', hotels: 2390, cars: 3800, restaurants: 2500, activities: 1700 },
  { month: 'Jul', hotels: 3490, cars: 4300, restaurants: 2100, activities: 2100 },
];

export const categoryData = [
  { name: 'Hotels', value: 40 },
  { name: 'Cars', value: 30 },
  { name: 'Restaurants', value: 20 },
  { name: 'Activities', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsTab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.analytics.title', 'Analytics Dashboard')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t('admin.analytics.salesOverview', 'Sales Overview')}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hotels" name={t('admin.analytics.hotels', 'Hotels')} fill="#0088FE" />
                <Bar dataKey="cars" name={t('admin.analytics.cars', 'Cars')} fill="#00C49F" />
                <Bar dataKey="restaurants" name={t('admin.analytics.restaurants', 'Restaurants')} fill="#FFBB28" />
                <Bar dataKey="activities" name={t('admin.analytics.activities', 'Activities')} fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t('admin.analytics.bookingsByCategory', 'Bookings by Category')}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div key="total-bookings" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('admin.analytics.totalBookings', 'Total Bookings')}
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">1,248</p>
          <p className="text-sm text-green-500">
            <span>↑ 12%</span> {t('admin.analytics.fromLastMonth', 'from last month')}
          </p>
        </div>
        
        <div key="total-revenue" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('admin.analytics.totalRevenue', 'Total Revenue')}
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">$24,780</p>
          <p className="text-sm text-green-500">
            <span>↑ 8%</span> {t('admin.analytics.fromLastMonth', 'from last month')}
          </p>
        </div>
        
        <div key="active-users" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('admin.analytics.activeUsers', 'Active Users')}
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">573</p>
          <p className="text-sm text-green-500">
            <span>↑ 5%</span> {t('admin.analytics.fromLastMonth', 'from last month')}
          </p>
        </div>
        
        <div key="conversion-rate" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('admin.analytics.conversionRate', 'Conversion Rate')}
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">3.2%</p>
          <p className="text-sm text-red-500">
            <span>↓ 1%</span> {t('admin.analytics.fromLastMonth', 'from last month')}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('admin.analytics.recentActivity', 'Recent Activity')}
        </h3>
        <div className="space-y-4">
          <div key="activity-1" className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-medium">JD</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe booked a Premium Hotel Room</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          
          <div key="activity-2" className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">JS</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Jane Smith rented an Economy Car</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
            </div>
          </div>
          
          <div key="activity-3" className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-medium">RJ</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Robert Johnson made a restaurant reservation</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnalyticsTab);
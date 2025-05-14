import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Calendar, 
  BarChart, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import Admin Dashboard Tabs
import ProductsTab from '../components/Admin/ProductsTab';
import BookingsTab from '../components/Admin/BookingsTab';
import AnalyticsTab from '../components/Admin/AnalyticsTab';
import ReportsTab from '../components/Admin/ReportsTab';
import SettingsTab from '../components/Admin/SettingsTab';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('admin.dashboard.title', 'Admin Dashboard')}
            </h1>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Sidebar */}
          <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-white dark:bg-gray-900 rounded-lg shadow-md`}>
            <div className="p-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/images/admin-profile.png" 
                    alt={user?.name || 'Admin'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user?.name || 'Admin'}
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Admin
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'admin@example.com'}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                
                
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('admin.nav.products', 'Products')}
                </NavLink>
                
                <NavLink
                  to="/admin/bookings"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-70l0 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('admin.nav.bookings', 'Bookings')}
                </NavLink>
                
                <NavLink
                  to="/admin/analytics"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('admin.nav.analytics', 'Analytics')}
                </NavLink>
                
                <NavLink
                  to="/admin/reports"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('admin.nav.reports', 'Reports')}
                </NavLink>
                
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('admin.nav.settings', 'Settings')}
                </NavLink>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('admin.nav.logout', 'Logout')}
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <Routes>
              <Route path="/products" element={<ProductsTab />} />
              <Route path="/bookings" element={<BookingsTab />} />
              <Route path="/analytics" element={<AnalyticsTab />} />
              <Route path="/reports" element={<ReportsTab />} />
              <Route path="/settings" element={<SettingsTab />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
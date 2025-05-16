import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Calendar, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BookingsTab from '../components/Profils/BookingsTab';
import ProfileTab from '../components/Profils/ProfileTab';
import PaymentTab from '../components/Profils/PaymentTab';
import SettingsTab from '../components/Profils/SettingsTab';

const Dashboard: React.FC = () => {
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
              {t('dashboard.title')}
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
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-[#144122] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/images/default-profile.png" 
                    alt={user?.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-green-100 dark:bg-[#144122] text-[#1a552c] dark:text-green-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('dashboard.nav.bookings')}
                </NavLink>
                
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-green-100 dark:bg-[#144122] text-[#1a552c] dark:text-green-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('dashboard.nav.profile')}
                </NavLink>
                
                <NavLink
                  to="/dashboard/payment"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-green-100 dark:bg-[#144122] text-[#1a552c] dark:text-green-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CreditCard className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('dashboard.nav.payment')}
                </NavLink>
                
                <NavLink
                  to="/dashboard/settings"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-green-100 dark:bg-[#144122] text-[#1a552c] dark:text-green-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('dashboard.nav.settings')}
                </NavLink>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
                  {t('dashboard.nav.logout')}
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <Routes>
              <Route path="/" element={<BookingsTab />} />
              <Route path="/profile" element={<ProfileTab />} />
              <Route path="/payment" element={<PaymentTab />} />
              <Route path="/settings" element={<SettingsTab />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
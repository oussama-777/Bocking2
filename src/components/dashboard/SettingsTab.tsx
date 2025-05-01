import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Globe, Moon, Sun, Bell, Shield, LogOut } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    browser: true,
    marketing: false,
  });
  
  const [privacy, setPrivacy] = useState({
    shareData: false,
    saveHistory: true,
    locationTracking: false,
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked,
    });
  };
  
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacy({
      ...privacy,
      [name]: checked,
    });
  };
  
  const confirmDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    alert(t('dashboard.settings.accountDeleted'));
    logout();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('dashboard.settings.title')}
      </h2>
      
      {/* Preferences Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('dashboard.settings.preferences')}
        </h3>
        
        <div className="space-y-4">
          {/* Language */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 rtl:ml-3 rtl:mr-0" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {t('dashboard.settings.language')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('dashboard.settings.languageDesc')}
                  </p>
                </div>
              </div>
              
              <div>
                <select
                  value={i18n.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Theme */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 rtl:ml-3 rtl:mr-0" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 rtl:ml-3 rtl:mr-0" />
                )}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {t('dashboard.settings.theme')}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('dashboard.settings.themeDesc')}
                  </p>
                </div>
              </div>
              
              <div>
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {t('dashboard.settings.lightMode')}
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {t('dashboard.settings.darkMode')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notifications Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('dashboard.settings.notifications')}
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 rtl:ml-3 rtl:mr-0" />
            <h4 className="font-medium text-gray-800 dark:text-white">
              {t('dashboard.settings.notificationPreferences')}
            </h4>
          </div>
          
          <div className="space-y-3 pl-8 rtl:pr-8 rtl:pl-0">
            <div className="flex items-center">
              <input
                id="email-notifications"
                name="email"
                type="checkbox"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="email-notifications" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.emailNotifications')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="sms-notifications"
                name="sms"
                type="checkbox"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="sms-notifications" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.smsNotifications')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="browser-notifications"
                name="browser"
                type="checkbox"
                checked={notifications.browser}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="browser-notifications" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.browserNotifications')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="marketing-notifications"
                name="marketing"
                type="checkbox"
                checked={notifications.marketing}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="marketing-notifications" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.marketingNotifications')}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('dashboard.settings.privacy')}
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 rtl:ml-3 rtl:mr-0" />
            <h4 className="font-medium text-gray-800 dark:text-white">
              {t('dashboard.settings.privacyPreferences')}
            </h4>
          </div>
          
          <div className="space-y-3 pl-8 rtl:pr-8 rtl:pl-0">
            <div className="flex items-center">
              <input
                id="share-data"
                name="shareData"
                type="checkbox"
                checked={privacy.shareData}
                onChange={handlePrivacyChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="share-data" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.shareData')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="save-history"
                name="saveHistory"
                type="checkbox"
                checked={privacy.saveHistory}
                onChange={handlePrivacyChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="save-history" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.saveHistory')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="location-tracking"
                name="locationTracking"
                type="checkbox"
                checked={privacy.locationTracking}
                onChange={handlePrivacyChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="location-tracking" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-700 dark:text-gray-300">
                {t('dashboard.settings.locationTracking')}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div>
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
          {t('dashboard.settings.dangerZone')}
        </h3>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4 rounded-lg">
          <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">
            {t('dashboard.settings.deleteAccount')}
          </h4>
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            {t('dashboard.settings.deleteWarning')}
          </p>
          <button
            onClick={() => setShowConfirmation(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t('dashboard.settings.deleteAccount')}
          </button>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('dashboard.settings.confirmDelete')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('dashboard.settings.confirmDeleteMessage')}
              </p>
              
              <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
                >
                  {t('dashboard.settings.cancel')}
                </button>
                <button
                  onClick={confirmDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300"
                >
                  {t('dashboard.settings.confirmButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
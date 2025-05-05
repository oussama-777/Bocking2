import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Globe, Bell, Shield, Database } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Op Way',
      siteDescription: 'Your ultimate booking platform',
      contactEmail: 'support@opway.com',
      enableMaintenanceMode: false,
    },
    notifications: {
      enableEmailNotifications: true,
      enablePushNotifications: false,
      adminEmailNotifications: true,
      bookingConfirmationEmails: true,
    },
    security: {
      requireEmailVerification: true,
      twoFactorAuthentication: false,
      passwordMinLength: 8,
      sessionTimeout: 60,
    },
    system: {
      enableDebugMode: false,
      logLevel: 'error',
      backupFrequency: 'daily',
      maxUploadSize: 10,
    }
  });
  
  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof typeof settings],
        [field]: value
      }
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    console.log('Save settings:', settings);
    alert(t('admin.settings.saveSuccess', 'Settings saved successfully!'));
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.settings.title', 'System Settings')}
      </h2>
      
      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Globe className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {t('admin.settings.general', 'General Settings')}
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.siteName', 'Site Name')}
                </label>
                <input
                  type="text"
                  name="siteName"
                  id="siteName"
                  value={settings.general.siteName}
                  onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.contactEmail', 'Contact Email')}
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={settings.general.contactEmail}
                  onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.siteDescription', 'Site Description')}
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  rows={3}
                  value={settings.general.siteDescription}
                  onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-center">
                  <input
                    id="enableMaintenanceMode"
                    name="enableMaintenanceMode"
                    type="checkbox"
                    checked={settings.general.enableMaintenanceMode}
                    onChange={(e) => handleInputChange('general', 'enableMaintenanceMode', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="enableMaintenanceMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {t('admin.settings.enableMaintenanceMode', 'Enable Maintenance Mode')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Bell className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {t('admin.settings.notifications', 'Notification Settings')}
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="enableEmailNotifications"
                  name="enableEmailNotifications"
                  type="checkbox"
                  checked={settings.notifications.enableEmailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'enableEmailNotifications', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="enableEmailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.enableEmailNotifications', 'Enable Email Notifications')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="enablePushNotifications"
                  name="enablePushNotifications"
                  type="checkbox"
                  checked={settings.notifications.enablePushNotifications}
                  onChange={(e) => handleInputChange('notifications', 'enablePushNotifications', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="enablePushNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.enablePushNotifications', 'Enable Push Notifications')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="adminEmailNotifications"
                  name="adminEmailNotifications"
                  type="checkbox"
                  checked={settings.notifications.adminEmailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'adminEmailNotifications', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="adminEmailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.adminEmailNotifications', 'Send Notifications to Admin')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="bookingConfirmationEmails"
                  name="bookingConfirmationEmails"
                  type="checkbox"
                  checked={settings.notifications.bookingConfirmationEmails}
                  onChange={(e) => handleInputChange('notifications', 'bookingConfirmationEmails', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="bookingConfirmationEmails" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.bookingConfirmationEmails', 'Send Booking Confirmation Emails')}
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Shield className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {t('admin.settings.security', 'Security Settings')}
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center">
                <input
                  id="requireEmailVerification"
                  name="requireEmailVerification"
                  type="checkbox"
                  checked={settings.security.requireEmailVerification}
                  onChange={(e) => handleInputChange('security', 'requireEmailVerification', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.requireEmailVerification', 'Require Email Verification')}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="twoFactorAuthentication"
                  name="twoFactorAuthentication"
                  type="checkbox"
                  checked={settings.security.twoFactorAuthentication}
                  onChange={(e) => handleInputChange('security', 'twoFactorAuthentication', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="twoFactorAuthentication" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.twoFactorAuthentication', 'Enable Two-Factor Authentication')}
                </label>
              </div>
              <div>
                <label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.passwordMinLength', 'Minimum Password Length')}
                </label>
                <input
                  type="number"
                  name="passwordMinLength"
                  id="passwordMinLength"
                  min="6"
                  max="20"
                  value={settings.security.passwordMinLength}
                  onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.sessionTimeout', 'Session Timeout (minutes)')}
                </label>
                <input
                  type="number"
                  name="sessionTimeout"
                  id="sessionTimeout"
                  min="15"
                  max="1440"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* System Settings */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Database className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {t('admin.settings.system', 'System Settings')}
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center">
                <input
                  id="enableDebugMode"
                  name="enableDebugMode"
                  type="checkbox"
                  checked={settings.system.enableDebugMode}
                  onChange={(e) => handleInputChange('system', 'enableDebugMode', e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="enableDebugMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('admin.settings.enableDebugMode', 'Enable Debug Mode')}
                </label>
              </div>
              <div>
                <label htmlFor="logLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.logLevel', 'Log Level')}
                </label>
                <select
                  id="logLevel"
                  name="logLevel"
                  value={settings.system.logLevel}
                  onChange={(e) => handleInputChange('system', 'logLevel', e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="error">{t('admin.settings.logLevelError', 'Error')}</option>
                  <option value="warn">{t('admin.settings.logLevelWarn', 'Warning')}</option>
                  <option value="info">{t('admin.settings.logLevelInfo', 'Information')}</option>
                  <option value="debug">{t('admin.settings.logLevelDebug', 'Debug')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.backupFrequency', 'Backup Frequency')}
                </label>
                <select
                  id="backupFrequency"
                  name="backupFrequency"
                  value={settings.system.backupFrequency}
                  onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="daily">{t('admin.settings.backupFrequencyDaily', 'Daily')}</option>
                  <option value="weekly">{t('admin.settings.backupFrequencyWeekly', 'Weekly')}</option>
                  <option value="monthly">{t('admin.settings.backupFrequencyMonthly', 'Monthly')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="maxUploadSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('admin.settings.maxUploadSize', 'Maximum Upload Size (MB)')}
                </label>
                <input
                  type="number"
                  name="maxUploadSize"
                  id="maxUploadSize"
                  min="1"
                  max="100"
                  value={settings.system.maxUploadSize}
                  onChange={(e) => handleInputChange('system', 'maxUploadSize', parseInt(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Save className="w-5 h-5 mr-2" />
            {t('admin.settings.saveButton', 'Save Settings')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Flag, FileText, Upload } from 'lucide-react';

const ProfileTab: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    country: user?.country || '',
    bio: user?.bio || '',
    profileImage: user?.profileImage || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.profileImage || null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData({ ...formData, profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('dashboard.profile.title')}
        </h2>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {t('dashboard.profile.edit')}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            {t('dashboard.profile.cancel')}
          </button>
        )}
      </div>
      
      {!isEditing ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center mb-6">
            {previewImage ? (
              <div className="h-24 w-24 rounded-full overflow-hidden">
                <img 
                  src={previewImage} 
                  alt={formData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                  {formData.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('dashboard.profile.name')}
                </span>
              </div>
              <p className="text-gray-800 dark:text-white font-medium">{formData.name || '-'}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('dashboard.profile.email')}
                </span>
              </div>
              <p className="text-gray-800 dark:text-white font-medium">{formData.email || '-'}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('dashboard.profile.phone')}
                </span>
              </div>
              <p className="text-gray-800 dark:text-white font-medium">{formData.phone || '-'}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('dashboard.profile.address')}
                </span>
              </div>
              <p className="text-gray-800 dark:text-white font-medium">{formData.address || '-'}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Flag className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('dashboard.profile.country')}
                </span>
              </div>
              <p className="text-gray-800 dark:text-white font-medium">{formData.country || '-'}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg md:col-span-2">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('dashboard.profile.bio')}
                </span>
              </div>
              <p className="text-gray-800 dark:text-white">{formData.bio || '-'}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <div 
              className={`relative h-24 w-24 rounded-full overflow-hidden ${isEditing ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              {previewImage ? (
                <>
                  <img 
                    src={previewImage} 
                    alt={formData.name} 
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full w-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  {isEditing ? (
                    <Upload className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                  ) : (
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                      {formData.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.profile.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                } text-gray-900 dark:text-white`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.profile.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                } text-gray-900 white:text-dark`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.profile.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                } text-gray-900 white:text-dark`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.profile.address')}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                } text-gray-900 white:text-dark`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.profile.country')}
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                } text-gray-900 white:text-dark`}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.profile.bio')}
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing 
                    ? 'border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                } text-gray-900 dark:text-white`}
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('dashboard.profile.saving')}
                  </>
                ) : (
                  t('dashboard.profile.save')
                )}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ProfileTab;

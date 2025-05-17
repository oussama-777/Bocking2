import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

// Define User interface to match what's returned from AuthContext
interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
}

// Define types for better type safety
interface LocationState {
  registrationSuccess?: boolean;
  email?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Check if user was redirected from signup page
  useEffect(() => {
    const state = location.state as LocationState;
    if (state && state.registrationSuccess) {
      setSuccessMessage(t('login.registrationSuccess') || 'Registration successful! Please log in with your credentials.');
      setFormData(prev => ({ ...prev, email: state.email || '' }));
    }
  }, [location, t]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    try {
      if (formData.email && formData.password) {
        const userData = await login(formData.email, formData.password) as LoginResponse;
        
        // Log the user data to see what's coming back
        console.log('Login response:', userData);
        
        // Check if the user has admin role
        if (userData && userData.user && userData.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error(t('login.error.fieldsRequired'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('login.error.generic'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    // This would be implemented to handle social login
    console.log(`Login with ${provider}`);
    // For now, just show an alert
    alert(`${provider} login is not implemented yet`);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('login.title')}
          </h2>
        </div>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-[#1a552c] px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div className="rounded-md space-y-4">
            <div className="relative w-full group">
              <span 
                className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-green-500 to-emerald-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100" 
              ></span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300 delay-200"
                value={formData.email}
                onChange={handleChange}
              />
              <label 
                htmlFor="email" 
                className="absolute left-6 top-1 text-sm text-green-500 font-semibold"
              > 
                {t('login.email')}
              </label>
            </div>
            
            <div className="relative w-full group">
              <span 
                className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-green-500 to-emerald-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100" 
              ></span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300 delay-200"
                value={formData.password}
                onChange={handleChange}
              />
              <label 
                htmlFor="password" 
                className="absolute left-6 top-1 text-sm text-green-500 font-semibold"
              > 
                {t('login.password')}
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label 
                htmlFor="remember_me" 
                className="relative h-[2.2em] w-[2.2em] rounded-[1em] bg-[#b3ffda] shadow-[inset_-1px_1px_4px_0px_#f0fff5,inset_1px_-1px_4px_0px_#00bd6e,-1px_2px_4px_0px_#00bd6e]" 
              > 
                <input 
                  type="checkbox" 
                  name="remember_me" 
                  id="remember_me" 
                  className="peer appearance-none" 
                /> 
                <span 
                  className="absolute left-1/2 top-1/2 h-[1.5em] w-[1.5em] -translate-x-1/2 -translate-y-1/2 rounded-[0.7em] bg-[#ccffe0] shadow-[inset_-1px_1px_4px_0px_#f0fff5,inset_1px_-1px_4px_0px_#00bd6e,-1px_1px_2px_0px_#00bd6e] duration-[200ms] peer-checked:shadow-[inset_1px_-1px_4px_0px_#f0fff5,inset_-1px_1px_4px_0px_#00bd6e]" 
                > 
                </span> 
                <svg 
                  fill="#00753d" 
                  viewBox="-3.2 -3.2 38.40 38.40" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="absolute left-1/2 top-1/2 h-[1.5em] w-[1.5em] -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-0" 
                > 
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g> 
                  <g 
                    id="SVGRepo_tracerCarrier" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  ></g> 
                  <g id="SVGRepo_iconCarrier"> 
                    <path 
                      d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" 
                    ></path> 
                  </g> 
                </svg> 
                <svg 
                  fill="#00753d" 
                  viewBox="0 0 1024 1024" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="absolute left-1/2 top-1/2 h-[1.5em] w-[1.5em] -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100" 
                > 
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g> 
                  <g 
                    id="SVGRepo_tracerCarrier" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  ></g> 
                  <g id="SVGRepo_iconCarrier"> 
                    <path 
                      d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z" 
                    ></path> 
                  </g> 
                </svg> 
              </label>
              <span className="ml-3 rtl:mr-3 rtl:ml-0 block text-sm text-gray-900 dark:text-gray-300">
                {t('login.rememberMe')}
              </span>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                {t('login.forgotPassword')}
              </a>
            </div>
          </div>
          
          <div>
            <div className="relative group">
              <button
                type="submit"
                disabled={loading}
                className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                <span
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                ></span>

                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-900 w-full">
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('login.loggingIn')}
                      </span>
                    ) : (
                      <>
                        <span className="transition-all duration-500 group-hover:translate-x-1">
                          {t('login.signIn')}
                        </span>
                        <svg
                          className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                          data-slot="icon"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </>
                    )}
                  </div>
                </span>
              </button>
            </div>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              {t('login.signupLink')}
            </Link>
          </p>
        </div>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {t('login.orContinueWith')}
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.244 10.582v3.468h4.727a4.047 4.047 0 0 1-1.744 2.681l2.807 2.175c1.74-1.597 2.741-3.942 2.741-6.736 0-.647-.064-1.266-.175-1.859h-8.356z" fill="#4285F4"/>
                <path d="M5.592 14.358l-2.298 1.781c1.468 2.918 4.493 4.92 8.006 4.92 2.428 0 4.459-.799 5.945-2.172l-2.807-2.175c-.77.518-1.764.826-3.138.826-2.424 0-4.477-1.636-5.209-3.837l-0.499.657z" fill="#34A853"/>
                <path d="M5.591 9.642c-.193-.578-.301-1.199-.301-1.842 0-.643.108-1.264.301-1.842l-2.298-1.781c-.479.937-.75 1.99-.75 3.103s.271 2.166.75 3.103l2.298-1.741z" fill="#FBBC05"/>
                <path d="M12.244 4.89c1.328 0 2.526.458 3.458 1.356l2.462-2.461C16.594 2.339 14.562 1.54 12.244 1.54c-3.518 0-6.543 2.002-8.011 4.919l2.298 1.781c.732-2.2 2.785-3.37 5.209-3.37z" fill="#EA4335"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

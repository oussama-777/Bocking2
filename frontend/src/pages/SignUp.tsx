import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError(t('signup.error.passwordsDoNotMatch'));
      return;
    }
    
    setLoading(true);
    
    try {
      // Connect to the real backend API
      if (formData.name && formData.email && formData.password) {
        await register(formData.name, formData.email, formData.password);
        // Redirect to login page instead of dashboard
        navigate('/login', { state: { registrationSuccess: true, email: formData.email } });
      } else {
        throw new Error(t('signup.error.fieldsRequired'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('signup.error.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('signup.title')}
          </h2>
        </div>
        
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
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                required
                className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300 delay-200"
                value={formData.name}
                onChange={handleChange}
              />
              <label 
                htmlFor="name" 
                className="absolute left-6 top-1 text-sm text-green-500 font-semibold"
              > 
                {t('signup.name')}
              </label>
            </div>
            
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
                {t('signup.email')}
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
                {t('signup.password')}
              </label>
            </div>
            
            <div className="relative w-full group">
              <span 
                className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-green-500 to-emerald-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100" 
              ></span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                required
                className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-green-300 focus:outline-none transition-all duration-300 delay-200"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label 
                htmlFor="confirmPassword" 
                className="absolute left-6 top-1 text-sm text-green-500 font-semibold"
              > 
                {t('signup.confirmPassword')}
              </label>
            </div>
          </div>
          
          <div className="flex items-center">
            <label 
              htmlFor="terms" 
              className="relative h-[2.2em] w-[2.2em] rounded-[1em] bg-[#b3ffda] shadow-[inset_-1px_1px_4px_0px_#f0fff5,inset_1px_-1px_4px_0px_#00bd6e,-1px_2px_4px_0px_#00bd6e]" 
            > 
              <input 
                type="checkbox" 
                name="terms" 
                id="terms" 
                required
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
              {t('signup.termsAgree')}{' '}
              <a href="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                {t('signup.terms')}
              </a>
            </span>
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
                        {t('signup.creating')}
                      </span>
                    ) : (
                      <>
                        <span className="transition-all duration-500 group-hover:translate-x-1">
                          {t('signup.createAccount')}
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
            {t('signup.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              {t('signup.loginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
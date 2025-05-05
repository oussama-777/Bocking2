import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data for demonstration
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  profileImage?: string; // Ajout de la propriété profileImage
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll accept any email/password
    const mockUser: User = {
      id: '123456',
      name: 'John Doe',
      email,
      phone: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'New York',
      country: 'USA',
      bio: 'Travel enthusiast and foodie.',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll accept any registration
    const mockUser: User = {
      id: '123456',
      name,
      email,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  // Assurez-vous que l'interface User inclut profileImage
  interface User {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    country?: string;
    bio?: string;
    profileImage?: string;
  }
  
  // Dans votre fonction updateProfile, assurez-vous de gérer la mise à jour de l'image
  const updateProfile = async (updatedData: Partial<User>) => {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      
      // Si vous utilisez localStorage pour la persistance
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
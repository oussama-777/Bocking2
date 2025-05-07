import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Updated User interface with required role property
interface User {
  id: string;
  name?: string;
  email: string;
  role: string; // Made this required since it's checked in the code
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Changed from potentially undefined to null for clarity
  loading: boolean;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth() as AuthContextType;

  if (loading) {
    // Show a loading spinner
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if route requires admin role and user exists
  if (adminOnly && (!user || user.role !== 'admin')) {
    // Redirect non-admin users to the dashboard
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
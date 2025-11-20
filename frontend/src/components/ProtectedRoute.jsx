import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-[#624d41]">Loading...</div>
    </div>;
  }

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
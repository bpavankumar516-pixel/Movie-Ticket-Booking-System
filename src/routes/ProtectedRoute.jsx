import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-[#FF1A1A] animate-spin" />
        <p className="text-xs text-gray-400 font-medium">Verifying Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 glass-card rounded-3xl max-w-md mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500 mb-4">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h2 className="text-xl font-bold font-montserrat text-white mb-2">Admin Access Required</h2>
        <p className="text-xs text-gray-400 mb-6">You need administrative permissions to view report metrics and management panels.</p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }

  return children;
};

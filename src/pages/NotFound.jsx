import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
    <h1 className="text-7xl font-black font-montserrat text-[#FF1A1A]">404</h1>
    <h2 className="text-xl font-bold text-white">Scene Not Found</h2>
    <p className="text-xs text-gray-400 max-w-sm">The movie page or ticket route you are looking for does not exist or has been moved.</p>
    <Link to="/dashboard">
      <Button variant="primary">Return to Dashboard</Button>
    </Link>
  </div>
);

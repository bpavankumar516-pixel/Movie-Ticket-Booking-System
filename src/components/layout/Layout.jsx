import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';

export const Layout = () => {
  const location = useLocation();

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#060A08] text-white flex flex-col justify-center">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060A08] text-white flex flex-col selection:bg-[#00D690] selection:text-black">
      <div className="flex flex-grow w-full max-w-[1600px] mx-auto">
        {/* Left MOVIEGO Sidebar */}
        <Sidebar />

        {/* Right Main Content */}
        <div className="flex flex-col flex-grow min-w-0">
          <Header />
          <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

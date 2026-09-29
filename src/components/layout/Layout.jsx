import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  const location = useLocation();

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-heading)] transition-colors duration-300 flex flex-col justify-center p-4">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-heading)] transition-colors duration-300 flex font-['Poppins','Inter',sans-serif]">
      <div className="flex w-full max-w-[1700px] mx-auto p-4 sm:p-5 lg:p-6 gap-6 items-start">
        {/* Floating Sticky Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-grow min-w-0">
          <Header />
          <main className="flex-grow w-full pt-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

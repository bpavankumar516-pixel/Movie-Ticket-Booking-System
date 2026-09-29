import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/':
        return 'Dashboard';
      case '/movies':
        return 'Movies';
      case '/theatres':
        return 'Theatres & Screens';
      case '/booking-history':
        return 'Bookings';
      case '/reports':
        return 'Analytics & Revenue';
      case '/profile':
        return 'Account Profile';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Title & Subtitle */}
        <div className="text-left space-y-0.5">
          <h1 className="text-[24px] font-bold text-[var(--text-heading)] tracking-tight">
            {getPageTitle()}
          </h1>
          <p className="text-[12px] text-[var(--text-muted)] font-normal">
            Welcome back! Here's what's happening with your cinema system today.
          </p>
        </div>

        {/* Right Controls: Theme Toggle, Notification Bell, Search Bar & Profile Dropdown */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle (Light / Dark Mode Switcher) */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-[var(--bg-card)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text-heading)] hover:text-[#0FA58A] hover:border-[#0FA58A]/40 transition-all cursor-pointer shrink-0"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#F5B301]" />
            ) : (
              <Moon className="w-4 h-4 text-[#4B5B6B]" />
            )}
          </button>

          {/* Notification Bell Circle Button */}
          <button
            className="relative w-9 h-9 rounded-full bg-[var(--bg-card)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text-heading)] hover:text-[#0FA58A] transition-all cursor-pointer shrink-0"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[var(--text-heading)]" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#D64550] border-2 border-[var(--bg-card)] flex items-center justify-center text-[8px] text-white font-bold">
              1
            </span>
          </button>

          {/* Search Bar */}
          <div className="relative flex items-center w-52 sm:w-64">
            <Search className="absolute left-3.5 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search movies, theatres, ..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[12px] text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#0FA58A] transition-all font-normal"
            />
          </div>

          {/* User Profile Avatar with Down Arrow & Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[var(--primary-light)] transition-all cursor-pointer border border-transparent hover:border-[var(--border)]"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#0FA58A]"
              />
              <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-[#0FA58A]' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 movtego-card p-2 shadow-xl bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-2xl z-50 animate-fade-in text-left">
                {/* User Info Header */}
                <div className="p-2.5 border-b border-[var(--border)] mb-1">
                  <p className="text-[13px] font-semibold text-[var(--text-heading)] truncate">{user?.name || 'Admin User'}</p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">{user?.email || 'admin@movtego.com'}</p>
                </div>

                {/* Account Link */}
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[var(--text-heading)] hover:bg-[var(--primary-light)] hover:text-[#0FA58A] rounded-xl transition-all"
                >
                  <User className="w-4 h-4 text-[var(--text-muted)]" />
                  <span>Account Profile</span>
                </Link>

                {/* Settings Link */}
                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[var(--text-heading)] hover:bg-[var(--primary-light)] hover:text-[#0FA58A] rounded-xl transition-all"
                >
                  <Settings className="w-4 h-4 text-[var(--text-muted)]" />
                  <span>Settings</span>
                </Link>

                <div className="border-t border-[var(--border)] my-1" />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-semibold text-[#D64550] hover:bg-[var(--danger-bg)]/50 rounded-xl transition-all cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 text-[#D64550]" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

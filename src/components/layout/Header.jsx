import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, LogOut, Ticket, Heart, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { setIsSearchOpen, notifications } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="w-full bg-[#060A08]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Title / Location indication */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00D690] flex items-center justify-center text-[#060A08] font-black">
              M
            </div>
            <span className="font-outfit font-black text-xl text-white">MOVIE<span className="text-[#00D690]">GO</span></span>
          </Link>
          <div className="hidden lg:block text-left">
            <h1 className="text-xl font-black font-outfit text-white capitalize">
              {location.pathname === '/dashboard' ? 'Movies Showcase' : location.pathname.replace('/', '')}
            </h1>
          </div>
        </div>

        {/* Right Search & Profile Action Bar */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger Input Box */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-[#0E1411] hover:bg-[#141E1A] border border-white/10 rounded-full px-4 py-2 text-xs text-slate-400 cursor-pointer w-44 sm:w-64 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search movies...</span>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative p-2.5 rounded-full bg-[#0E1411] hover:bg-[#141E1A] text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00D690]" />
            )}
          </button>

          {/* User Profile */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-[#0E1411] hover:bg-[#141E1A] border border-white/10 rounded-full p-1 pr-3 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#00D690]"
                />
                <span className="hidden sm:inline text-xs font-bold text-white max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#0E1411] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-1 text-left">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#00D690]/20 text-[#00D690] border border-[#00D690]/40 text-[10px] font-bold rounded-full uppercase">
                        Admin
                      </span>
                    )}
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </Link>

                  <Link
                    to="/booking-history"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-slate-400" /> My Bookings
                  </Link>

                  <Link
                    to="/favorites"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <Heart className="w-4 h-4 text-slate-400" /> Watchlist
                  </Link>

                  <div className="border-t border-white/10 my-1"></div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/40 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="emerald" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

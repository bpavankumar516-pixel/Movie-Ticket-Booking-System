import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Film, Clock, Ticket, Building2, Monitor, TrendingUp, Settings as SettingsIcon, User 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const mainItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'Movies', icon: Film, path: '/movies' },
    { label: 'Bookings', icon: Ticket, path: '/booking-history' },
    { label: 'Theatres', icon: Building2, path: '/theatres' },
    { label: 'Analytics', icon: TrendingUp, path: '/reports' },
  ];

  const systemItems = [
    { label: 'Settings', icon: SettingsIcon, path: '/settings' },
    { label: 'Account', icon: User, path: '/profile' },
  ];

  const checkIsActive = (item) => {
    if (item.label === 'Dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    if (item.path === '/theatres') {
      return location.pathname === '/theatres' && item.label === 'Theatres';
    }
    return location.pathname === item.path;
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between w-[240px] movtego-sidebar p-4 shrink-0 select-none sticky top-5 self-start h-[calc(100vh-2.5rem)] max-h-[calc(100vh-2.5rem)] z-30 transition-all duration-300">
      
      {/* Brand Header & Navigation List */}
      <div className="space-y-4 overflow-y-auto pr-1 flex-1 custom-scrollbar">
        
        {/* Brand Logo with Primary Gradient Tile */}
        <Link to="/dashboard" className="flex items-center gap-3 px-2 py-1 group">
          <div className="w-10 h-10 rounded-2xl bg-primary-gradient flex items-center justify-center text-white shadow-md shrink-0">
            <div className="flex gap-1 items-center">
              <div className="w-1.5 h-4 bg-white rounded-full transform -rotate-12" />
              <div className="w-1.5 h-4 bg-white rounded-full transform rotate-12" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-[18px] tracking-tight text-[var(--text-heading)] leading-none">
              MOVTEGO
            </span>
            <span className="text-[12px] text-[var(--text-muted)] font-medium mt-0.5">
              Cinema Manager
            </span>
          </div>
        </Link>

        {/* MAIN Section */}
        <div className="space-y-0.5 pt-1">
          <p className="px-3 text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)] text-left mb-1.5">MAIN</p>
          {mainItems.map((item, idx) => {
            const isActive = checkIsActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150
                  ${isActive 
                    ? 'sidebar-link-active' 
                    : 'sidebar-link-inactive hover:bg-[var(--primary-light)] hover:text-[#0FA58A]'}
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : ''}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* SYSTEM Section */}
        <div className="space-y-0.5 pt-2 border-t border-[var(--border)]">
          <p className="px-3 text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)] text-left mb-1.5">SYSTEM</p>
          {systemItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150
                  ${isActive 
                    ? 'sidebar-link-active' 
                    : 'sidebar-link-inactive hover:bg-[var(--primary-light)] hover:text-[#0FA58A]'}
                `}
              >
                <Icon className="w-4 h-4 shrink-0 text-[var(--text-muted)]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Bottom User Profile Card */}
      <div className="pt-2 border-t border-[var(--border)] shrink-0 mt-2">
        <Link
          to="/profile"
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-[var(--primary-light)] border border-[var(--border)] transition-all group"
        >
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#0FA58A] shrink-0"
          />
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-[13px] font-semibold truncate text-[var(--text-heading)]">{user?.name || 'Admin'}</span>
            <span className="text-[11px] text-[var(--text-muted)] truncate">System Administrator</span>
          </div>
        </Link>
      </div>

    </aside>
  );
};

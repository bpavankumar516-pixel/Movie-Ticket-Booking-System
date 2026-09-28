import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Film, Clock, Ticket, Popcorn, Crown, Settings as SettingsIcon, User, MapPin, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Films', icon: Film, path: '/movies' },
    { label: 'Showtime', icon: Clock, path: '/theatres' },
    { label: 'Ticketings', icon: Ticket, path: '/booking-history', authRequired: true },
    { label: 'Reports', icon: TrendingUp, path: '/reports' },
    { label: 'Concessions', icon: Popcorn, path: '/dashboard' },
    { label: 'Memberships', icon: Crown, path: '/profile', authRequired: true },
  ];

  const systemItems = [
    { label: 'Settings', icon: SettingsIcon, path: '/settings', authRequired: true },
    { label: 'Account', icon: User, path: '/profile', authRequired: true },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 bg-[#0E1411] border border-white/5 rounded-[2rem] p-5 shrink-0 my-4 ml-4 select-none shadow-2xl">
      {/* Brand Logo */}
      <div className="space-y-6">
        <Link to="/dashboard" className="flex items-center gap-2.5 px-2 group">
          <div className="w-9 h-9 rounded-xl bg-[#00D690] flex items-center justify-center text-[#060A08] font-black shadow-lg shadow-emerald-500/40 group-hover:scale-105 transition-transform">
            <div className="flex gap-1 items-center">
              <div className="w-1.5 h-4 bg-[#060A08] rounded-full transform -rotate-12" />
              <div className="w-1.5 h-4 bg-[#060A08] rounded-full transform rotate-12" />
            </div>
          </div>
          <span className="font-outfit font-black text-2xl tracking-wider text-white">
            MOVIE<span className="text-[#00D690]">GO</span>
          </span>
        </Link>

        {/* MENU Section */}
        <div className="space-y-1.5">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">MENU</p>
          {menuItems.map((item, idx) => {
            if (item.authRequired && !isAuthenticated) return null;
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300
                  ${isActive 
                    ? 'bg-[#00D690] text-[#060A08] shadow-lg shadow-emerald-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#060A08]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* SYSTEM Section */}
        <div className="space-y-1.5 pt-4 border-t border-white/5">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">SYSTEM</p>
          {systemItems.map((item, idx) => {
            if (item.authRequired && !isAuthenticated) return null;
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300
                  ${isActive 
                    ? 'bg-[#00D690] text-[#060A08] shadow-lg shadow-emerald-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#060A08]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sidebar Promo Card & User Badge */}
      <div className="space-y-3 pt-4 border-t border-white/5">
        {/* Small Promo Card */}
        <div className="relative rounded-2xl overflow-hidden h-28 border border-white/10 group">
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&auto=format&fit=crop&q=80"
            alt="Ready Player One promo"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
              ad ⊗
            </span>
          </div>
        </div>

        {/* User Card */}
        {isAuthenticated && user && (
          <Link
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00D690]/40 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-[#00D690]"
            />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-bold text-white truncate">{user.name}</span>
              <span className="text-[10px] text-slate-400 truncate flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#00D690]" /> {user.location || 'ChengDu, Wuhou'}
              </span>
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
};

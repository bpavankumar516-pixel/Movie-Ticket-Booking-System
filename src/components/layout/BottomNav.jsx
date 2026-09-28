import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Grid, Ticket, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Theatres', icon: MapPin, path: '/theatres' },
    { label: 'Movies', icon: Grid, path: '/movies', isCenter: true },
    { label: 'Tickets', icon: Ticket, path: isAuthenticated ? '/booking-history' : '/login' },
    { label: 'Profile', icon: User, path: isAuthenticated ? '/profile' : '/login' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0A0E0C]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2">
      <div className="flex items-center justify-around relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={index}
                to={item.path}
                className="relative -top-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00D690] to-[#00A36C] text-[#060A08] font-bold shadow-xl shadow-emerald-500/50 border-4 border-[#060A08] transition-transform active:scale-95"
              >
                <Grid className="w-6 h-6 text-[#060A08]" />
              </Link>
            );
          }

          return (
            <Link
              key={index}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 text-[10px] font-bold transition-colors py-1 px-3 rounded-xl
                ${isActive ? 'text-[#00D690]' : 'text-slate-400 hover:text-white'}
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

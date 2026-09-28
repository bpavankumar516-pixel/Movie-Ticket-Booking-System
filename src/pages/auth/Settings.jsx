import React from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Sun, Bell, Shield, Smartphone } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Settings = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-fade-in text-left">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black font-montserrat text-white">
          Application Settings
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Customize your cinema viewing preferences, theme, and account notifications.
        </p>
      </div>

      {/* Theme Section */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-[#FF1A1A]" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
            <div>
              <h3 className="text-sm font-bold text-white">Appearance Theme</h3>
              <p className="text-xs text-gray-400">Current mode: <span className="text-white capitalize">{theme}</span></p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Bell className="w-4 h-4 text-[#FF1A1A]" /> Notification Alerts
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-white">Booking Confirmations</p>
              <p className="text-[11px] text-gray-400">Receive instant E-Ticket SMS & Email notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-700 bg-gray-900 text-[#FF1A1A]" />
          </label>

          <label className="flex items-center justify-between cursor-pointer border-t border-white/5 pt-3">
            <div>
              <p className="text-xs font-semibold text-white">Movie Release Reminders</p>
              <p className="text-[11px] text-gray-400">Alert me when pre-booking opens for my watchlist</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-gray-700 bg-gray-900 text-[#FF1A1A]" />
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Shield className="w-4 h-4 text-[#FF1A1A]" /> Account Security
        </h3>
        <p className="text-xs text-gray-400">
          Your account is secured with 256-bit encryption. Multi-factor authentication is active.
        </p>
      </div>
    </div>
  );
};

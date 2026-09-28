import React from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Sun, Bell, Shield } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Settings = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2 animate-fade-in text-left">
      <div>
        <h1 className="text-2xl font-bold text-[#0F1F2E]">
          Application Settings
        </h1>
        <p className="text-xs text-[#8A97A6] mt-1">
          Customize your cinema viewing preferences, theme, and account notifications.
        </p>
      </div>

      {/* Theme Section */}
      <div className="movtego-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-[#0FA58A]" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
            <div>
              <h3 className="text-sm font-bold text-[#0F1F2E]">Appearance Theme</h3>
              <p className="text-xs text-[#8A97A6]">Current mode: <span className="text-[#0F1F2E] font-semibold capitalize">{theme}</span></p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="movtego-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#0F1F2E] flex items-center gap-2 border-b border-[#E8F0F0] pb-3">
          <Bell className="w-4 h-4 text-[#0FA58A]" /> Notification Alerts
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-[#0F1F2E]">Booking Confirmations</p>
              <p className="text-[11px] text-[#8A97A6]">Receive instant E-Ticket SMS & Email notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0FA58A]" />
          </label>

          <label className="flex items-center justify-between cursor-pointer border-t border-[#E8F0F0] pt-3">
            <div>
              <p className="text-xs font-semibold text-[#0F1F2E]">Movie Release Reminders</p>
              <p className="text-[11px] text-[#8A97A6]">Alert me when pre-booking opens for my watchlist</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0FA58A]" />
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="movtego-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#0F1F2E] flex items-center gap-2 border-b border-[#E8F0F0] pb-3">
          <Shield className="w-4 h-4 text-[#0FA58A]" /> Account Security
        </h3>
        <p className="text-xs text-[#8A97A6]">
          Your account is secured with 256-bit encryption. Multi-factor authentication is active.
        </p>
      </div>
    </div>
  );
};

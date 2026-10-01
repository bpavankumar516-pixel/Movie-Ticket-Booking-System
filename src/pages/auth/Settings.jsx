import React from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Sun, Bell, Shield } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Settings = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2 animate-fade-in text-left">
      <div>
        <h1 className="text-2xl font-black text-[var(--text-heading)]">
          Application Settings
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
          Customize your cinema viewing preferences, theme, and account notifications.
        </p>
      </div>

      {/* Theme Section */}
      <div className="movtego-card p-6 space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-[var(--primary)]" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
            <div>
              <h3 className="text-sm font-black text-[var(--text-heading)]">Appearance Theme</h3>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                Current mode: <span className="text-[var(--primary)] font-bold capitalize">{theme}</span>
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="movtego-card p-6 space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
        <h3 className="text-sm font-black text-[var(--text-heading)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Bell className="w-4 h-4 text-[var(--primary)]" /> Notification Alerts
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-black text-[var(--text-heading)]">Booking Confirmations</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">Receive instant E-Ticket SMS & Email notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--primary)]" />
          </label>

          <label className="flex items-center justify-between cursor-pointer border-t border-[var(--border)] pt-3">
            <div>
              <p className="text-xs font-black text-[var(--text-heading)]">Movie Release Reminders</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">Alert me when pre-booking opens for my watchlist</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--primary)]" />
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="movtego-card p-6 space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
        <h3 className="text-sm font-black text-[var(--text-heading)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Shield className="w-4 h-4 text-[var(--primary)]" /> Account Security
        </h3>
        <p className="text-xs text-[var(--text-muted)] font-medium">
          Your account is secured with 256-bit encryption. Multi-factor authentication is active.
        </p>
      </div>
    </div>
  );
};

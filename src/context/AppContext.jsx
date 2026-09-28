import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setThemeState] = useState(storage.getTheme());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to CineBoxx!', message: 'Explore latest blockbusters with 4K Dolby Atmos experience.', time: '10m ago', unread: true },
    { id: 2, title: 'Upcoming Release: Dune 3', message: 'Pre-bookings open this Friday.', time: '2h ago', unread: true }
  ]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    storage.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

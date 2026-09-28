// LocalStorage Keys
const KEYS = {
  USER: 'cineboxx_user',
  TOKEN: 'cineboxx_token',
  THEME: 'cineboxx_theme',
  FAVORITES: 'cineboxx_favorites',
  BOOKINGS: 'cineboxx_bookings',
  TEMP_BOOKING: 'cineboxx_temp_booking',
  NOTIFICATIONS: 'cineboxx_notifications',
};

export const storage = {
  // User Storage
  getUser: () => {
    try {
      const data = localStorage.getItem(KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading user from storage', e);
      return null;
    }
  },

  setUser: (user) => {
    try {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user to storage', e);
    }
  },

  removeUser: () => {
    localStorage.removeItem(KEYS.USER);
    localStorage.removeItem(KEYS.TOKEN);
  },

  getToken: () => localStorage.getItem(KEYS.TOKEN) || null,

  setToken: (token) => localStorage.setItem(KEYS.TOKEN, token),

  // Theme
  getTheme: () => localStorage.getItem(KEYS.THEME) || 'dark',

  setTheme: (theme) => localStorage.setItem(KEYS.THEME, theme),

  // Favorites
  getFavorites: () => {
    try {
      const data = localStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setFavorites: (favorites) => {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  },

  // Bookings
  getBookings: () => {
    try {
      const data = localStorage.getItem(KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setBookings: (bookings) => {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  // Temporary Booking state
  getTempBooking: () => {
    try {
      const data = localStorage.getItem(KEYS.TEMP_BOOKING);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setTempBooking: (tempBooking) => {
    if (!tempBooking) {
      localStorage.removeItem(KEYS.TEMP_BOOKING);
    } else {
      localStorage.setItem(KEYS.TEMP_BOOKING, JSON.stringify(tempBooking));
    }
  },

  // Notifications
  getNotifications: () => {
    try {
      const data = localStorage.getItem(KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setNotifications: (notifications) => {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const MOCK_DEMO_USER = {
  id: 'usr_moviego123',
  name: 'Martin Gu',
  email: 'martin@moviego.com',
  phone: '+1 (555) 345-6789',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  location: 'ChengDu, Wuhou',
  role: 'user', // 'user' or 'admin'
  joinedDate: '2025-01-15',
  stats: {
    totalBookings: 18,
    completedBookings: 16,
    cancelledBookings: 2,
    favoriteGenre: 'Sci-Fi'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = storage.getUser();
    const storedToken = storage.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe = true) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (email === 'admin@moviego.com' && password === 'admin123') {
        const adminUser = {
          ...MOCK_DEMO_USER,
          name: 'Admin Cinema',
          email: 'admin@moviego.com',
          role: 'admin'
        };
        setUser(adminUser);
        setIsAuthenticated(true);
        if (rememberMe) {
          storage.setUser(adminUser);
          storage.setToken('fake-jwt-token-admin');
        }
        toast.success('Welcome Back, Admin!', { position: 'top-right' });
        return { success: true, user: adminUser };
      }

      if (email && password.length >= 6) {
        const loggedInUser = {
          ...MOCK_DEMO_USER,
          email: email,
          name: email.includes('@') ? email.split('@')[0].replace('.', ' ').toUpperCase() : email,
        };
        setUser(loggedInUser);
        setIsAuthenticated(true);
        if (rememberMe) {
          storage.setUser(loggedInUser);
          storage.setToken('fake-jwt-token-user');
        }
        toast.success(`Welcome back to MOVIEGO, ${loggedInUser.name}!`, { position: 'top-right' });
        return { success: true, user: loggedInUser };
      } else {
        toast.error('Invalid email or password (min 6 chars)', { position: 'top-right' });
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.', { position: 'top-right' });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async (role = 'user') => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const demoUser = role === 'admin' 
      ? { ...MOCK_DEMO_USER, name: 'Admin Manager', role: 'admin', email: 'admin@moviego.com' } 
      : MOCK_DEMO_USER;

    setUser(demoUser);
    setIsAuthenticated(true);
    storage.setUser(demoUser);
    storage.setToken(`fake-jwt-${role}`);
    toast.success(`Logged in as Demo ${role.toUpperCase()}`, { position: 'top-right' });
    setLoading(false);
    return { success: true, user: demoUser };
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const newUser = {
        id: `usr_${Date.now()}`,
        name: name,
        email: email,
        phone: phone || '+1 (555) 000-0000',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        role: 'user',
        location: 'ChengDu',
        joinedDate: new Date().toISOString().split('T')[0],
        stats: {
          totalBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          favoriteGenre: 'Sci-Fi'
        }
      };

      setUser(newUser);
      setIsAuthenticated(true);
      storage.setUser(newUser);
      storage.setToken('fake-jwt-token-new');
      toast.success('MOVIEGO Account created successfully!', { position: 'top-right' });
      return { success: true, user: newUser };
    } catch (error) {
      toast.error('Registration failed. Please try again.', { position: 'top-right' });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storage.removeUser();
    toast.info('Logged out safely', { position: 'top-right' });
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    storage.setUser(updatedUser);
    toast.success('Profile updated successfully!', { position: 'top-right' });
  };

  const forgotPassword = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success(`Password reset code sent to ${email}`, { position: 'top-right' });
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

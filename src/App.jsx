import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { MovieProvider } from './context/MovieContext';
import { TheatreProvider } from './context/TheatreContext';
import { BookingProvider } from './context/BookingContext';
import { AppRoutes } from './routes/AppRoutes';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <MovieProvider>
            <TheatreProvider>
              <BookingProvider>
                <AppRoutes />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                  toastStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                  }}
                />
              </BookingProvider>
            </TheatreProvider>
          </MovieProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

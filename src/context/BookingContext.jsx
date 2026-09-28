import React, { createContext, useContext, useState } from 'react';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const BookingContext = createContext();

// Default initial mock bookings so user has instant booking history to explore!
const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'BK-98421-01',
    bookingId: 'BK-98421-01',
    movieId: 101,
    movieTitle: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
    theatreId: 'th-101',
    theatreName: 'MOVIEGO IMAX Grand Cinema',
    city: 'New York',
    screen: 'Screen 1 - IMAX 3D',
    format: 'IMAX 3D',
    date: '2025-02-15',
    time: '05:30 PM',
    seats: ['F5', 'F6'],
    seatsCount: 2,
    totalPrice: 49.50,
    paymentMethod: 'Credit Card (**** 4242)',
    paymentId: 'PAY-89210-TX',
    status: 'Confirmed',
    bookingDate: '2025-02-14T18:30:00.000Z',
    qrCodeData: 'MOVIEGO-BK-98421-01-DUNE2'
  },
  {
    id: 'BK-64219-02',
    bookingId: 'BK-64219-02',
    movieId: 103,
    movieTitle: 'Oppenheimer',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=95',
    theatreId: 'th-101',
    theatreName: 'MOVIEGO IMAX Grand Cinema',
    city: 'New York',
    screen: 'Screen 4 - 70MM IMAX',
    format: '70MM IMAX',
    date: '2025-01-20',
    time: '07:00 PM',
    seats: ['G10'],
    seatsCount: 1,
    totalPrice: 28.42,
    paymentMethod: 'UPI (martin@upi)',
    paymentId: 'UPI-77129-OK',
    status: 'Completed',
    bookingDate: '2025-01-19T14:20:00.000Z',
    qrCodeData: 'MOVIEGO-BK-64219-02-OPPENHEIMER'
  }
];

export const BookingProvider = ({ children }) => {
  const [tempBooking, setTempBookingState] = useState(storage.getTempBooking());
  
  // Get initial bookings from Local Storage or default mock list
  const storedBookings = storage.getBookings();
  const initialList = storedBookings && storedBookings.length > 0 ? storedBookings : INITIAL_MOCK_BOOKINGS;
  
  const [bookingHistory, setBookingHistoryState] = useState(initialList);

  const saveTempBooking = (data) => {
    setTempBookingState(data);
    storage.setTempBooking(data);
  };

  const clearTempBooking = () => {
    setTempBookingState(null);
    storage.setTempBooking(null);
  };

  const addBooking = (newBookingData) => {
    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(10 + Math.random() * 89)}`;
    const fullBooking = {
      id: bookingId,
      bookingId: bookingId,
      ...newBookingData,
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
      qrCodeData: `MOVIEGO-${bookingId}-${newBookingData.movieTitle.replace(/[^a-zA-Z0-9]/gi, '')}`
    };

    const updatedHistory = [fullBooking, ...bookingHistory];
    setBookingHistoryState(updatedHistory);
    storage.setBookings(updatedHistory);
    clearTempBooking();
    toast.success(`Booking ${bookingId} Confirmed! E-Ticket generated.`, { position: 'top-right' });
    return fullBooking;
  };

  const cancelBooking = (bookingId) => {
    const updated = bookingHistory.map((b) =>
      b.id === bookingId || b.bookingId === bookingId
        ? { ...b, status: 'Cancelled' }
        : b
    );
    setBookingHistoryState(updated);
    storage.setBookings(updated);
    toast.info(`Booking ${bookingId} has been cancelled.`, { position: 'top-right' });
  };

  // Get booked seats for a particular showtime ID
  const getBookedSeatsForShow = (showId) => {
    // Base pre-booked seats for visual realism
    const defaultBookedMap = {
      'sh-101': ['C3', 'C4', 'D5', 'D6', 'E7', 'E8', 'G1', 'G2'],
      'sh-102': ['A1', 'A2', 'C4', 'C5', 'F6', 'F7', 'H8'],
      'sh-103': ['B3', 'B4', 'C5', 'D4', 'D5', 'F1', 'F2', 'F3'],
      'sh-104': ['A3', 'A4', 'B1', 'B2', 'C6'],
    };

    let bookedSeats = defaultBookedMap[showId] || ['C4', 'C5', 'D6', 'F2'];

    // Add seats from user confirmed bookings for this showId
    bookingHistory.forEach((b) => {
      if (b.status === 'Confirmed' && b.showId === showId && b.seats) {
        bookedSeats = [...bookedSeats, ...b.seats];
      }
    });

    return Array.from(new Set(bookedSeats));
  };

  return (
    <BookingContext.Provider
      value={{
        tempBooking,
        saveTempBooking,
        clearTempBooking,
        bookingHistory,
        addBooking,
        cancelBooking,
        getBookedSeatsForShow,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

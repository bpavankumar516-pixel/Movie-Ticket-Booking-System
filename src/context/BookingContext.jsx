import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const BookingContext = createContext();

// Initial realistic default mock bookings
const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'BK-98421-01',
    bookingId: 'BK-98421-01',
    movieId: 101,
    movieTitle: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
    theatreId: 'th-101',
    theatreName: 'INOX Mantri Square',
    city: 'Bengaluru',
    screen: 'Screen 1 - IMAX 3D',
    format: 'IMAX 3D',
    date: 'Today, 30 Sep',
    time: '06:30 PM',
    seats: ['F5', 'F6'],
    seatsCount: 2,
    totalPrice: 590,
    paymentMethod: 'UPI (GPay / PayTM)',
    paymentId: 'PAY-89210-TX',
    status: 'Confirmed',
    bookingDate: '2026-09-30T14:00:00.000Z',
    qrCodeData: 'MOVIEGO-BK-98421-01-DUNE2'
  },
  {
    id: 'BK-64219-02',
    bookingId: 'BK-64219-02',
    movieId: 103,
    movieTitle: 'Kalki 2898 AD',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=95',
    theatreId: 'th-102',
    theatreName: 'PVR Vega City Gold Class',
    city: 'Bengaluru',
    screen: 'Screen 4 - 4DX',
    format: '4DX 3D',
    date: 'Tomorrow, 01 Oct',
    time: '07:00 PM',
    seats: ['C10', 'C11'],
    seatsCount: 2,
    totalPrice: 590,
    paymentMethod: 'Credit Card (**** 4242)',
    paymentId: 'UPI-77129-OK',
    status: 'Confirmed',
    bookingDate: '2026-09-29T10:20:00.000Z',
    qrCodeData: 'MOVIEGO-BK-64219-02-KALKI'
  }
];

// Helper to normalize show key for seat occupancy tracking
export const getShowKey = (theatreName, movieTitle, dateStr, showtime) => {
  const norm = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${norm(theatreName)}_${norm(movieTitle)}_${norm(dateStr)}_${norm(showtime)}`;
};

// Base pre-booked seats for visual realism per show key prefix
const DEFAULT_PREBOOKED_MAP = {
  default: ['A3', 'A4', 'B7', 'B8', 'C5', 'C6', 'D1', 'D2', 'D11', 'E8', 'F4', 'F5', 'G14', 'H2', 'J8', 'K5', 'M7']
};

export const BookingProvider = ({ children }) => {
  const [tempBooking, setTempBookingState] = useState(storage.getTempBooking());
  
  // Get initial bookings from Local Storage or default mock list
  const storedBookings = storage.getBookings();
  const initialList = storedBookings && storedBookings.length > 0 ? storedBookings : INITIAL_MOCK_BOOKINGS;
  
  const [bookingHistory, setBookingHistoryState] = useState(initialList);

  useEffect(() => {
    storage.setBookings(bookingHistory);
  }, [bookingHistory]);

  const saveTempBooking = (data) => {
    setTempBookingState(data);
    storage.setTempBooking(data);
  };

  const clearTempBooking = () => {
    setTempBookingState(null);
    storage.setTempBooking(null);
  };

  // Get all currently booked seats for a specific showtime instance
  const getBookedSeatsForShow = (theatreName, movieTitle, dateStr, showtime) => {
    const showKey = getShowKey(theatreName, movieTitle, dateStr, showtime);
    let booked = [...(DEFAULT_PREBOOKED_MAP[showKey] || DEFAULT_PREBOOKED_MAP.default)];

    bookingHistory.forEach((b) => {
      if (b.status === 'Confirmed') {
        const bKey = getShowKey(b.theatreName, b.movieTitle, b.date, b.time);
        if (bKey === showKey && Array.isArray(b.seats)) {
          booked = [...booked, ...b.seats];
        }
      }
    });

    return Array.from(new Set(booked));
  };

  // Check if requested seats are available (Prevent Duplicate Booking)
  const validateSeatAvailability = (theatreName, movieTitle, dateStr, showtime, requestedSeats = []) => {
    const currentBooked = getBookedSeatsForShow(theatreName, movieTitle, dateStr, showtime);
    const conflicts = requestedSeats.filter(seat => currentBooked.includes(seat));
    return {
      isAvailable: conflicts.length === 0,
      conflicts
    };
  };

  // Add confirmed booking and return full generated object with Booking ID
  const addBooking = (newBookingData) => {
    const { theatreName, movieTitle, date, time, seats } = newBookingData;

    // Strict duplicate check before processing booking
    const availability = validateSeatAvailability(theatreName, movieTitle, date, time, seats);
    if (!availability.isAvailable) {
      const msg = `Duplicate Booking Error: Seat(s) ${availability.conflicts.join(', ')} already booked!`;
      toast.error(msg, { position: 'top-right' });
      throw new Error(msg);
    }

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const randomSuffix = Math.floor(10 + Math.random() * 89);
    const bookingId = `BK-${randomId}-${randomSuffix}`;
    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}-OK`;

    const fullBooking = {
      id: bookingId,
      bookingId: bookingId,
      paymentId: txnId,
      ...newBookingData,
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
      qrCodeData: `MOVIEGO-${bookingId}-${(movieTitle || 'MOVIE').replace(/[^a-zA-Z0-9]/gi, '').toUpperCase()}`
    };

    const updatedHistory = [fullBooking, ...bookingHistory];
    setBookingHistoryState(updatedHistory);
    storage.setBookings(updatedHistory);
    clearTempBooking();
    toast.success(`🎉 Booking ${bookingId} Confirmed! E-Ticket generated.`, { position: 'top-right' });
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
        validateSeatAvailability,
        getShowKey
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


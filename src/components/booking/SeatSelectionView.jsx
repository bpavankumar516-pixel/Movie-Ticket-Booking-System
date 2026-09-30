import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Ticket, CheckCircle2, ShieldCheck, Tag, X, RefreshCw, Building2, QrCode, Monitor
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useNavigate } from 'react-router-dom';

export const SeatSelectionView = ({
  movieTitle = 'Resident Evil',
  theatreName = 'PVR IMAX, Forum Mall, Hyderabad',
  showtime = '07:30 PM',
  dateStr = 'Today, 30 Sep',
  format = 'Screen 1 (IMAX 4K)',
  genre = 'Horror',
  moviePoster = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
  pricePerSeat = 250,
  onBack,
  onBookingComplete
}) => {
  const navigate = useNavigate();
  const { getBookedSeatsForShow, addBooking, validateSeatAvailability } = useBooking();

  const [selectedShowtime, setSelectedShowtime] = useState(showtime);
  const MAX_SEAT_LIMIT = 8;

  // Auditorium Rows: A to F (12 seats per row: 6 Left, AISLE, 6 Right)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const leftSeats = [1, 2, 3, 4, 5, 6];
  const rightSeats = [7, 8, 9, 10, 11, 12];

  // Dynamic Real-Time Booked seats
  const liveBookedSeatsList = useMemo(() => {
    return getBookedSeatsForShow(theatreName, movieTitle, dateStr, selectedShowtime);
  }, [getBookedSeatsForShow, theatreName, movieTitle, dateStr, selectedShowtime]);

  const bookedSeatIds = useMemo(() => {
    return new Set(['C8', 'C9', 'D1', 'D2', 'A5', 'E1', ...liveBookedSeatsList]);
  }, [liveBookedSeatsList]);

  // Pre-selected seats C5 & C6
  const [selectedSeats, setSelectedSeats] = useState([
    { id: 'C5', price: pricePerSeat || 250 },
    { id: 'C6', price: pricePerSeat || 250 }
  ]);

  const [warningMsg, setWarningMsg] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showWarning = (msg) => {
    setWarningMsg(msg);
    setTimeout(() => setWarningMsg(null), 3500);
  };

  const handleSeatClick = (seatId) => {
    if (bookedSeatIds.has(seatId)) return;

    const isAlreadySelected = selectedSeats.some(s => s.id === seatId);

    if (isAlreadySelected) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= MAX_SEAT_LIMIT) {
        showWarning(`Maximum selection limit of ${MAX_SEAT_LIMIT} seats reached!`);
        return;
      }
      setSelectedSeats(prev => [...prev, { id: seatId, price: pricePerSeat || 250 }]);
    }
  };

  // Price Calculation Breakdown (MOVTEGO standard currency formatting)
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const fee = selectedSeats.length > 0 ? 35 : 0;
  const totalPrice = subtotal + fee;

  const handleConfirmAndPay = () => {
    if (selectedSeats.length === 0) return;
    const seatIdArray = selectedSeats.map(s => s.id);

    const check = validateSeatAvailability(theatreName, movieTitle, dateStr, selectedShowtime, seatIdArray);
    if (!check.isAvailable) {
      showWarning(`❌ Seat(s) ${check.conflicts.join(', ')} were already booked.`);
      setIsCheckoutModalOpen(false);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      try {
        const newBooking = addBooking({
          movieId: 101,
          movieTitle,
          theatreName,
          city: 'Hyderabad',
          screen: format,
          format: 'IMAX 4K',
          date: dateStr,
          time: selectedShowtime,
          seats: seatIdArray,
          seatsCount: selectedSeats.length,
          totalPrice,
          subtotalPrice: subtotal,
          convenienceFee: fee,
          customerEmail: 'user@example.com',
          customerPhone: '9876543210'
        });

        setIsProcessing(false);
        setIsCheckoutModalOpen(false);
        setConfirmedTicket(newBooking);

        if (onBookingComplete) {
          onBookingComplete(newBooking);
        }
      } catch (err) {
        setIsProcessing(false);
        showWarning(err.message || 'Booking Failed.');
      }
    }, 1000);
  };

  const timeSlots = ['10:30 AM', '02:15 PM', '06:00 PM', '07:30 PM', '09:45 PM'];

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col space-y-6 font-sans select-none pb-10">
      
      {/* 1. TOP HEADER CONTAINER CARD (MOVTEGO THEME) */}
      <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
        
        {/* Left Section: Back Button + Poster Thumbnail + Movie Meta */}
        <div className="flex items-center gap-4">
          
          {/* Circular Back Button */}
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-heading)] flex items-center justify-center transition-all cursor-pointer group shrink-0 shadow-sm"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--primary)] group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Movie Poster Thumbnail */}
          <div className="w-13 h-17 rounded-2xl overflow-hidden border border-[var(--border)] shadow-md bg-slate-900 shrink-0">
            <img
              src={moviePoster}
              alt={movieTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30 uppercase tracking-wider">
                {genre}
              </span>
              <span className="text-xs font-bold text-[var(--text-muted)]">
                {format}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-heading)] tracking-tight leading-none">
              {movieTitle}
            </h1>

            <p className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1.5 pt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
              {theatreName}
            </p>
          </div>

        </div>

        {/* Right Section: Show Timing Pills */}
        <div className="w-full lg:w-auto flex flex-col items-start lg:items-end space-y-2 border-t lg:border-t-0 border-[var(--border)] pt-4 lg:pt-0">
          <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-widest block">
            SELECT SHOW TIMING
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            {timeSlots.map((time) => {
              const isSelected = selectedShowtime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedShowtime(time)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-gradient text-white font-black shadow-lg shadow-[#14B8A0]/30 scale-105 border border-teal-300'
                      : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Warning Alert Banner */}
      {warningMsg && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 font-black text-xs animate-bounce border border-amber-300">
          <span>{warningMsg}</span>
        </div>
      )}

      {/* 2. MAIN SPLIT LAYOUT (SEAT MAP CARD + SUMMARY CARD) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: AUDITORIUM SEAT MAP (8 COLS - MOVTEGO THEME) */}
        <div className="lg:col-span-8 movtego-card p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-8 min-h-[440px]">
          
          {/* Top Curved Laser Screen Line */}
          <div className="space-y-3 pt-2 text-center">
            <div className="w-3/4 mx-auto h-2.5 border-t-4 border-[var(--primary)] rounded-t-[100%] shadow-[0_-12px_30px_rgba(20,184,160,0.5)] bg-gradient-to-b from-[var(--primary)]/30 to-transparent" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[var(--primary)] block text-center flex items-center justify-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" /> CURVED 4K LASER SCREEN • ALL EYES THIS WAY
            </span>
          </div>

          {/* Seat Grid Layout: A to F */}
          <div className="space-y-3.5 py-2 max-w-2xl mx-auto w-full overflow-x-auto">
            {rows.map((rowLabel) => (
              <div key={rowLabel} className="flex items-center justify-between gap-3 text-xs">
                
                {/* Left Row Label */}
                <span className="w-6 text-center font-black text-[var(--text-muted)] text-xs shrink-0">
                  {rowLabel}
                </span>

                {/* Seat Row Grid (Left 6 Seats - AISLE - Right 6 Seats) */}
                <div className="flex items-center gap-2 sm:gap-2.5 mx-auto">
                  
                  {/* Left Block (Seats 1 to 6) */}
                  {leftSeats.map((num) => {
                    const seatId = `${rowLabel}${num}`;
                    const isBooked = bookedSeatIds.has(seatId);
                    const isSelected = selectedSeats.some(s => s.id === seatId);

                    return (
                      <button
                        key={seatId}
                        type="button"
                        disabled={isBooked}
                        onClick={() => handleSeatClick(seatId)}
                        className={`
                          w-8 h-8 sm:w-9 sm:h-9 rounded-2xl text-xs font-black transition-all duration-150 flex items-center justify-center cursor-pointer select-none shrink-0
                          ${isBooked
                            ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 opacity-40 cursor-not-allowed border border-transparent'
                            : isSelected
                              ? 'bg-primary-gradient text-white border-2 border-teal-300 shadow-lg shadow-[#14B8A0]/40 scale-105 font-black'
                              : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
                          }
                        `}
                      >
                        {num}
                      </button>
                    );
                  })}

                  {/* Middle AISLE Label */}
                  <span className="text-[9px] font-extrabold text-[var(--text-muted)] tracking-widest uppercase px-3 sm:px-4 select-none shrink-0">
                    AISLE
                  </span>

                  {/* Right Block (Seats 7 to 12) */}
                  {rightSeats.map((num) => {
                    const seatId = `${rowLabel}${num}`;
                    const isBooked = bookedSeatIds.has(seatId);
                    const isSelected = selectedSeats.some(s => s.id === seatId);

                    return (
                      <button
                        key={seatId}
                        type="button"
                        disabled={isBooked}
                        onClick={() => handleSeatClick(seatId)}
                        className={`
                          w-8 h-8 sm:w-9 sm:h-9 rounded-2xl text-xs font-black transition-all duration-150 flex items-center justify-center cursor-pointer select-none shrink-0
                          ${isBooked
                            ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 opacity-40 cursor-not-allowed border border-transparent'
                            : isSelected
                              ? 'bg-primary-gradient text-white border-2 border-teal-300 shadow-lg shadow-[#14B8A0]/40 scale-105 font-black'
                              : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
                          }
                        `}
                      >
                        {num}
                      </button>
                    );
                  })}

                </div>

                {/* Right Row Label */}
                <span className="w-6 text-center font-black text-[var(--text-muted)] text-xs shrink-0">
                  {rowLabel}
                </span>

              </div>
            ))}
          </div>

          {/* Seat Capacity & Legend Footer */}
          <div className="border-t border-[var(--border)] pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[var(--text-muted)] px-2">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-lg bg-slate-300 dark:bg-slate-800 opacity-40" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-lg bg-primary-gradient" />
                <span className="text-[var(--primary)] font-black">Selected</span>
              </div>
            </div>

            <span className="text-[11px] font-bold">
              Multiplex Capacity: 72 Seats
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: SELECTION SUMMARY CARD (4 COLS - MOVTEGO THEME) */}
        <div className="lg:col-span-4 movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h2 className="text-lg font-black text-[var(--text-heading)] flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[var(--primary)]" /> Selection Summary
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-bold">
                Max {MAX_SEAT_LIMIT} seats
              </span>
            </div>

            {/* Selected Seats */}
            <div className="space-y-3 text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] block">
                SELECTED SEATS ({selectedSeats.length})
              </span>

              {selectedSeats.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)] italic py-1">
                  Click on seats from the interactive map to select.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(s => (
                    <span
                      key={s.id}
                      className="bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30 text-xs font-black px-3.5 py-1 rounded-full flex items-center gap-1 shadow-sm"
                    >
                      {s.id} <span className="text-[10px] opacity-80">(₹{s.price})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price Table Breakdown */}
            <div className="space-y-3 pt-3 text-xs border-t border-[var(--border)]">
              <div className="flex items-center justify-between text-[var(--text-muted)] font-medium">
                <span>Tickets Subtotal</span>
                <span className="font-extrabold text-[var(--text-heading)]">₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-[var(--text-muted)] font-medium">
                <span>Convenience & Booking Fee</span>
                <span className="font-extrabold text-[var(--text-heading)]">₹{fee.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-[var(--text-muted)] font-medium">
                <span>Digital QR Boarding Pass</span>
                <span className="font-black text-emerald-500">FREE</span>
              </div>
            </div>

          </div>

          {/* Bottom Total Price & Action Row */}
          <div className="space-y-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--text-heading)]">
                Total Ticket Price
              </span>
              <span className="text-3xl font-black text-[var(--primary)] tracking-tight">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full btn-teal py-3.5 px-6 rounded-2xl shadow-xl shadow-[#14B8A0]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Book Tickets</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. PAYMENT & BOOKING MODAL */}
      {isCheckoutModalOpen && (
        <div 
          className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-left"
          onClick={() => setIsCheckoutModalOpen(false)}
        >
          <div 
            className="movtego-card relative max-w-md w-full p-6 rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--border)] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="text-base font-black text-[var(--text-heading)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)]" /> Confirm Booking
              </h3>
              <button onClick={() => setIsCheckoutModalOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-heading)] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)] font-bold">Movie:</span>
                <span className="font-extrabold text-[var(--text-heading)]">{movieTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)] font-bold">Seats ({selectedSeats.length}):</span>
                <span className="font-black text-[var(--primary)]">{selectedSeats.map(s => s.id).join(', ')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border)] text-sm font-black">
                <span>Total Amount:</span>
                <span className="text-[var(--primary)]">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              disabled={isProcessing}
              onClick={handleConfirmAndPay}
              className="w-full btn-teal py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm & Pay Now'}
            </button>
          </div>
        </div>
      )}

      {/* 4. E-TICKET SUCCESS MODAL */}
      {confirmedTicket && (
        <div className="fixed inset-0 z-[75] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in text-left">
          <div className="movtego-card relative max-w-sm w-full p-6 rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--primary)]/40 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mx-auto border border-[var(--primary)]/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black text-[var(--text-heading)]">Booking Confirmed!</h2>
            <p className="text-xs text-[var(--text-muted)]">ID: <span className="font-mono text-[var(--primary)] font-bold">{confirmedTicket.bookingId}</span></p>

            <div className="bg-white p-3 rounded-2xl space-y-1 border border-slate-200">
              <QrCode className="w-24 h-24 text-slate-950 mx-auto" />
              <p className="text-[10px] font-bold text-slate-800">Scan at Auditorium Gate</p>
            </div>

            <button
              onClick={() => {
                setConfirmedTicket(null);
                navigate('/booking-history');
              }}
              className="w-full btn-teal font-black py-3 rounded-2xl text-xs cursor-pointer"
            >
              View Booking History
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

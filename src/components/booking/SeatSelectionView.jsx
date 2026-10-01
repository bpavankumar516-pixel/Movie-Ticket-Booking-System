import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Ticket, CheckCircle2, ShieldCheck, X, RefreshCw, Building2, QrCode, Monitor,
  CreditCard, Smartphone, Wallet, AlertTriangle, Download, Printer, Lock, Check
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
  
  // Payment Flow Modal States
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'wallet'
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'failed'
  const [failureError, setFailureError] = useState(null);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  // Form States
  const [cardForm, setCardForm] = useState({
    number: '4532 8901 2234 8892',
    name: 'Pavan Kumar',
    expiry: '12/28',
    cvv: '889'
  });
  const [upiVpa, setUpiVpa] = useState('pavan@okicici');
  const [selectedWallet, setSelectedWallet] = useState('paytm');

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

  // Price Calculation Breakdown
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const fee = selectedSeats.length > 0 ? 35 : 0;
  const totalPrice = subtotal + fee;

  // Process Payment Execution
  const handleExecutePayment = (shouldFail = false) => {
    if (selectedSeats.length === 0) return;
    const seatIdArray = selectedSeats.map(s => s.id);

    // Validate Seat Availability
    const check = validateSeatAvailability(theatreName, movieTitle, dateStr, selectedShowtime, seatIdArray);
    if (!check.isAvailable) {
      showWarning(`❌ Seat(s) ${check.conflicts.join(', ')} were already booked.`);
      setIsCheckoutModalOpen(false);
      return;
    }

    setPaymentStatus('processing');

    setTimeout(() => {
      if (shouldFail) {
        setPaymentStatus('failed');
        setFailureError('Bank transaction timed out. Transaction could not be authorized.');
        return;
      }

      try {
        const txnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
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
          paymentMethod: paymentMethod.toUpperCase(),
          transactionId: txnId,
          customerEmail: 'pavan@example.com',
          customerPhone: '+91 98765 43210'
        });

        setPaymentStatus('success');
        setIsCheckoutModalOpen(false);
        setConfirmedTicket(newBooking);

        if (onBookingComplete) {
          onBookingComplete(newBooking);
        }
      } catch (err) {
        setPaymentStatus('failed');
        setFailureError(err.message || 'Payment execution failed.');
      }
    }, 1500);
  };

  const handleDownloadTicket = () => {
    window.print();
  };

  const timeSlots = ['10:30 AM', '02:15 PM', '06:00 PM', '07:30 PM', '09:45 PM'];

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col space-y-6 font-sans select-none pb-10">
      
      {/* 1. TOP HEADER CONTAINER CARD */}
      <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
        
        {/* Left Section: Back Button + Poster + Meta */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-heading)] flex items-center justify-center transition-all cursor-pointer group shrink-0 shadow-sm"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--primary)] group-hover:-translate-x-0.5 transition-transform" />
          </button>

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
        
        {/* LEFT COLUMN: AUDITORIUM SEAT MAP (8 COLS) */}
        <div className="lg:col-span-8 movtego-card p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-8 min-h-[440px]">
          
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
                
                <span className="w-6 text-center font-black text-[var(--text-muted)] text-xs shrink-0">
                  {rowLabel}
                </span>

                <div className="flex items-center gap-2 sm:gap-2.5 mx-auto">
                  {/* Left Block (1-6) */}
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

                  <span className="text-[9px] font-extrabold text-[var(--text-muted)] tracking-widest uppercase px-3 sm:px-4 select-none shrink-0">
                    AISLE
                  </span>

                  {/* Right Block (7-12) */}
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

                <span className="w-6 text-center font-black text-[var(--text-muted)] text-xs shrink-0">
                  {rowLabel}
                </span>
              </div>
            ))}
          </div>

          {/* Seat Capacity & Legend */}
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

        {/* RIGHT COLUMN: SELECTION SUMMARY CARD (4 COLS) */}
        <div className="lg:col-span-4 movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
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

          {/* Bottom Action */}
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
              onClick={() => {
                setPaymentStatus('idle');
                setIsCheckoutModalOpen(true);
              }}
              className="w-full btn-teal py-3.5 px-6 rounded-2xl shadow-xl shadow-[#14B8A0]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. COMPLETE PAYMENT & CHECKOUT MODAL */}
      {isCheckoutModalOpen && (
        <div 
          className="fixed inset-0 z-[65] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-left overflow-y-auto"
          onClick={() => {
            if (paymentStatus !== 'processing') setIsCheckoutModalOpen(false);
          }}
        >
          <div 
            className="movtego-card relative max-w-lg w-full p-6 sm:p-7 rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--border)] shadow-2xl space-y-5 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-base sm:text-lg font-black text-[var(--text-heading)]">
                  Payment Checkout & Booking
                </h3>
              </div>
              {paymentStatus !== 'processing' && (
                <button 
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-heading)] p-1 rounded-xl hover:bg-[var(--input-bg)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* PROCESSING STATE */}
            {paymentStatus === 'processing' && (
              <div className="py-12 text-center space-y-4">
                <RefreshCw className="w-10 h-10 text-[var(--primary)] animate-spin mx-auto" />
                <div>
                  <h4 className="text-base font-black text-[var(--text-heading)]">Processing Secure Payment...</h4>
                  <p className="text-xs text-[var(--text-muted)] pt-1">Communicating with bank payment gateway. Please do not close.</p>
                </div>
              </div>
            )}

            {/* FAILURE STATE */}
            {paymentStatus === 'failed' && (
              <div className="py-6 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/30">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-red-500">Payment Failed</h4>
                  <p className="text-xs text-[var(--text-muted)] font-medium max-w-xs mx-auto">
                    {failureError || 'Your transaction could not be processed.'}
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setPaymentStatus('idle')}
                    className="flex-1 btn-teal py-3 rounded-2xl text-xs font-black uppercase cursor-pointer"
                  >
                    Retry Payment
                  </button>
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-xs font-bold text-[var(--text-heading)] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* IDLE / FORM STATE */}
            {paymentStatus === 'idle' && (
              <>
                {/* Booking Summary Box */}
                <div className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                    <span className="font-extrabold text-[var(--text-heading)]">{movieTitle}</span>
                    <span className="px-2 py-0.5 rounded bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-black">{format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)] font-medium">Theatre:</span>
                    <span className="font-bold text-[var(--text-heading)] text-right">{theatreName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)] font-medium">Showtime & Date:</span>
                    <span className="font-bold text-[var(--text-heading)]">{dateStr} • {selectedShowtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)] font-medium">Seats ({selectedSeats.length}):</span>
                    <span className="font-black text-[var(--primary)]">{selectedSeats.map(s => s.id).join(', ')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--border)] text-sm font-black">
                    <span>Total Payable Amount:</span>
                    <span className="text-[var(--primary)]">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="space-y-3">
                  <span className="text-[11px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
                    Select Payment Method
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] shadow-sm'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card Payment</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] shadow-sm'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>UPI Instant</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'wallet'
                          ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] shadow-sm'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Wallets</span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: CARD PAYMENT FORM */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5 pt-1 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardForm.number}
                          onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                          placeholder="4532 •••• •••• 8892"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-mono font-bold focus:outline-none focus:border-[var(--primary)]"
                        />
                        <CreditCard className="w-4 h-4 absolute right-3 top-3 text-[var(--text-muted)]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                        placeholder="Name on card"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1">CVV</label>
                        <div className="relative">
                          <input
                            type="password"
                            maxLength={4}
                            value={cardForm.cvv}
                            onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                            placeholder="•••"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                          />
                          <Lock className="w-3.5 h-3.5 absolute right-3 top-3 text-[var(--text-muted)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: UPI PAYMENT UI */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 pt-1 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1">Enter Virtual Payment Address (VPA)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiVpa}
                          onChange={(e) => setUpiVpa(e.target.value)}
                          placeholder="username@upi / mobile@okicici"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                        />
                        <button className="px-3 py-2.5 bg-[var(--primary-light)] text-[var(--primary)] font-extrabold rounded-xl border border-[var(--primary)]/30">
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* QR Code Scanner Box */}
                    <div className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-extrabold text-[var(--text-heading)] block">Scan QR Code</span>
                        <p className="text-[10px] text-[var(--text-muted)]">Open GPay, PhonePe, or Paytm to scan</p>
                      </div>
                      <div className="p-2 bg-white rounded-xl shadow-inner border border-slate-200">
                        <QrCode className="w-12 h-12 text-slate-950" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: WALLET PAYMENT UI */}
                {paymentMethod === 'wallet' && (
                  <div className="space-y-3 pt-1 text-xs">
                    <span className="block text-[11px] font-bold text-[var(--text-muted)]">Select Linked Wallet</span>
                    <div className="space-y-2">
                      {[
                        { id: 'paytm', name: 'Paytm Wallet', desc: 'Balance: ₹ 1,450' },
                        { id: 'phonepe', name: 'PhonePe Wallet', desc: 'Linked +91 98765 43210' },
                        { id: 'amazonpay', name: 'Amazon Pay Balance', desc: 'Balance: ₹ 890' },
                      ].map((w) => (
                        <label
                          key={w.id}
                          onClick={() => setSelectedWallet(w.id)}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            selectedWallet === w.id
                              ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--text-heading)]'
                              : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Wallet className="w-4 h-4 text-[var(--primary)]" />
                            <div>
                              <span className="font-black text-[var(--text-heading)] block">{w.name}</span>
                              <span className="text-[10px] opacity-80">{w.desc}</span>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedWallet === w.id ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--border)]'}`}>
                            {selectedWallet === w.id && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pay Action & Failure Simulation toggle */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleExecutePayment(false)}
                    className="w-full btn-teal py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg shadow-[#14B8A0]/30 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{totalPrice.toLocaleString()} Now</span>
                  </button>

                  <button
                    onClick={() => handleExecutePayment(true)}
                    className="w-full text-[10px] text-red-500 font-bold hover:underline py-1 text-center block cursor-pointer opacity-70 hover:opacity-100"
                  >
                    [Test Simulation] Trigger Payment Failure Screen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 4. E-TICKET SUCCESS MODAL */}
      {confirmedTicket && (
        <div className="fixed inset-0 z-[75] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in text-left">
          <div className="movtego-card relative max-w-sm w-full p-6 rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--primary)]/40 shadow-2xl space-y-5 text-center">
            
            {/* Success Check Badge */}
            <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mx-auto border border-[var(--primary)]/40 shadow-lg shadow-[#14B8A0]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-[var(--text-heading)]">Payment Successful!</h2>
              <p className="text-xs text-[var(--text-muted)] font-bold">
                Booking ID: <span className="font-mono text-[var(--primary)]">{confirmedTicket.bookingId}</span>
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">
                Txn ID: <span className="font-mono">{confirmedTicket.transactionId || 'TXN-89410293'}</span>
              </p>
            </div>

            {/* Ticket Summary Box */}
            <div className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-xs space-y-2 text-left">
              <div className="flex justify-between font-extrabold text-[var(--text-heading)] border-b border-[var(--border)] pb-1.5">
                <span>{confirmedTicket.movieTitle}</span>
                <span className="text-[var(--primary)]">{confirmedTicket.format}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>Theatre:</span>
                <span className="font-bold text-[var(--text-heading)] truncate max-w-[170px]">{confirmedTicket.theatreName}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>Showtime:</span>
                <span className="font-bold text-[var(--text-heading)]">{confirmedTicket.date} • {confirmedTicket.time}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>Seats:</span>
                <span className="font-black text-[var(--primary)]">{Array.isArray(confirmedTicket.seats) ? confirmedTicket.seats.join(', ') : confirmedTicket.seats}</span>
              </div>
            </div>

            {/* QR Boarding Pass */}
            <div className="bg-white p-3 rounded-2xl space-y-1 border border-slate-200 shadow-inner">
              <QrCode className="w-24 h-24 text-slate-950 mx-auto" />
              <p className="text-[10px] font-bold text-slate-800">Scan QR Code at Gate</p>
            </div>

            {/* Actions: Download Ticket & View History */}
            <div className="space-y-2">
              <button
                onClick={handleDownloadTicket}
                className="w-full btn-teal font-black py-3 rounded-2xl text-xs cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#14B8A0]/30"
              >
                <Download className="w-4 h-4" /> Download E-Ticket / Print
              </button>

              <button
                onClick={() => {
                  setConfirmedTicket(null);
                  navigate('/booking-history');
                }}
                className="w-full py-2.5 rounded-2xl text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-heading)] cursor-pointer"
              >
                View Booking History
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

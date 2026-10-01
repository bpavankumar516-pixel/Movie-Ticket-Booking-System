import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Ticket, CheckCircle2, ShieldCheck, X, RefreshCw, Building2, QrCode, Monitor,
  CreditCard, Smartphone, Wallet, AlertTriangle, Download, Printer, Lock, Check, Sparkles, ChevronRight
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useNavigate } from 'react-router-dom';

export const SeatSelectionView = ({
  movieTitle = 'Resident Evil',
  theatreName = 'PVR IMAX, Forum Mall, Hyderabad',
  city = 'Hyderabad',
  showtime = '07:30 PM',
  dateStr = 'Today, 01 Oct',
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

  // Navigation Steps: 'seat_map' | 'checkout_payment' | 'ticket_success'
  const [currentStep, setCurrentStep] = useState('seat_map');

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

  // Seat Tier Price Calculator
  const getSeatPrice = (seatId) => {
    const rowLabel = seatId.charAt(0);
    const base = pricePerSeat || 250;
    if (rowLabel === 'A' || rowLabel === 'B') return base + 50; // VIP Recliner Tier
    if (rowLabel === 'C' || rowLabel === 'D') return base;      // Executive Classic Tier
    return Math.max(120, base - 30);                           // Standard Club Tier
  };

  // Selected Seats State (starts fresh)
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [warningMsg, setWarningMsg] = useState(null);
  
  // Payment Flow States
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'wallet'
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'failed'
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
      setSelectedSeats(prev => [...prev, { id: seatId, price: getSeatPrice(seatId) }]);
    }
  };

  // Real-Time Dynamic Price Calculation Breakdown
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const convenienceFee = selectedSeats.length > 0 ? 30 * selectedSeats.length : 0;
  const gst = Math.round(convenienceFee * 0.18);
  const totalPrice = subtotal + convenienceFee + gst;

  // Proceed to Full-Page Payment View
  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      showWarning('Please select at least 1 seat from the map to proceed.');
      return;
    }
    const seatIdArray = selectedSeats.map(s => s.id);
    const check = validateSeatAvailability(theatreName, movieTitle, dateStr, selectedShowtime, seatIdArray);
    if (!check.isAvailable) {
      showWarning(`❌ Seat(s) ${check.conflicts.join(', ')} were already booked.`);
      return;
    }
    setPaymentStatus('idle');
    setCurrentStep('checkout_payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Process Payment Execution
  const handleExecutePayment = () => {
    if (selectedSeats.length === 0) return;
    const seatIdArray = selectedSeats.map(s => s.id);

    // Validate Seat Availability
    const check = validateSeatAvailability(theatreName, movieTitle, dateStr, selectedShowtime, seatIdArray);
    if (!check.isAvailable) {
      showWarning(`❌ Seat(s) ${check.conflicts.join(', ')} were already booked.`);
      setCurrentStep('seat_map');
      return;
    }

    setPaymentStatus('processing');

    setTimeout(() => {
      try {
        const txnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const newBooking = addBooking({
          movieId: 101,
          movieTitle,
          moviePoster,
          theatreName,
          city: city || 'Hyderabad',
          screen: format,
          format: format || 'IMAX 4K',
          date: dateStr,
          time: selectedShowtime,
          seats: seatIdArray,
          seatsCount: selectedSeats.length,
          totalPrice,
          subtotalPrice: subtotal,
          convenienceFee: convenienceFee + gst,
          paymentMethod: paymentMethod.toUpperCase(),
          transactionId: txnId,
          customerEmail: 'pavan@example.com',
          customerPhone: '+91 98765 43210'
        });

        setPaymentStatus('idle');
        setConfirmedTicket(newBooking);
        setCurrentStep('ticket_success');

        if (onBookingComplete) {
          onBookingComplete(newBooking);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setPaymentStatus('failed');
        setFailureError(err.message || 'Payment execution failed.');
      }
    }, 1400);
  };

  const handleDownloadTicket = () => {
    window.print();
  };

  const timeSlots = ['10:30 AM', '02:15 PM', '06:00 PM', '07:30 PM', '09:45 PM'];

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col space-y-6 font-sans select-none pb-16 text-left">
      
      {/* TOP PROGRESS STEP BAR (BOOKMYSHOW STYLE USER-FRIENDLY STEPS) */}
      <div className="movtego-card p-3 sm:p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full justify-between sm:justify-start">
          
          {/* Step 1 */}
          <button
            onClick={() => {
              if (currentStep !== 'ticket_success') setCurrentStep('seat_map');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer ${
              currentStep === 'seat_map'
                ? 'bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30'
                : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[10px] font-black flex items-center justify-center">1</span>
            <span>Select Seats</span>
          </button>

          <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 hidden sm:block" />

          {/* Step 2 */}
          <button
            disabled={selectedSeats.length === 0 || currentStep === 'ticket_success'}
            onClick={() => {
              if (selectedSeats.length > 0 && currentStep !== 'ticket_success') setCurrentStep('checkout_payment');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-extrabold transition-all ${
              currentStep === 'checkout_payment'
                ? 'bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30'
                : 'text-[var(--text-muted)] opacity-70'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-black flex items-center justify-center">2</span>
            <span>Payment & Checkout</span>
          </button>

          <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 hidden sm:block" />

          {/* Step 3 */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-extrabold ${
            currentStep === 'ticket_success'
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
              : 'text-[var(--text-muted)] opacity-50'
          }`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">3</span>
            <span>E-Ticket Pass</span>
          </div>

        </div>
      </div>

      {/* Warning Alert Banner */}
      {warningMsg && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 font-black text-xs animate-bounce border border-amber-300">
          <span>{warningMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: AUDITORIUM SEAT SELECTION & SUMMARY PAGE (FULL SCREEN VIEW) */}
      {/* ========================================================================= */}
      {currentStep === 'seat_map' && (
        <>
          {/* Movie Header Card */}
          <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-11 h-11 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-heading)] flex items-center justify-center transition-all cursor-pointer group shrink-0 shadow-sm"
                title="Back to Theatre"
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

            {/* Show Timing Pills */}
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

          {/* Split Layout: Auditorium Map + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* AUDITORIUM SEAT MAP (8 COLS) */}
            <div className="lg:col-span-8 movtego-card p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-8 min-h-[440px]">
              
              <div className="space-y-3 pt-2 text-center">
                <div className="w-3/4 mx-auto h-2.5 border-t-4 border-[var(--primary)] rounded-t-[100%] shadow-[0_-12px_30px_rgba(20,184,160,0.5)] bg-gradient-to-b from-[var(--primary)]/30 to-transparent" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[var(--primary)] block text-center flex items-center justify-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" /> CURVED 4K LASER SCREEN • ALL EYES THIS WAY
                </span>
              </div>

              {/* Seat Grid Layout: A to F with Tier Banners */}
              <div className="space-y-4 py-2 max-w-2xl mx-auto w-full overflow-x-auto">
                {rows.map((rowLabel) => {
                  const tierPrice = getSeatPrice(`${rowLabel}1`);

                  return (
                    <React.Fragment key={rowLabel}>
                      {rowLabel === 'A' && (
                        <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest text-center py-1 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          ⭐ VIP RECLINER TIER — ₹{tierPrice}
                        </div>
                      )}
                      {rowLabel === 'C' && (
                        <div className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest text-center py-1 bg-[var(--primary-light)]/40 rounded-xl border border-[var(--primary)]/20 mt-2">
                          👑 EXECUTIVE CLASSIC TIER — ₹{tierPrice}
                        </div>
                      )}
                      {rowLabel === 'E' && (
                        <div className="text-[10px] font-black text-teal-400 uppercase tracking-widest text-center py-1 bg-teal-500/10 rounded-xl border border-teal-500/20 mt-2">
                          🎬 STANDARD CLUB TIER — ₹{tierPrice}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="w-6 text-center font-black text-[var(--text-muted)] text-xs shrink-0">
                          {rowLabel}
                        </span>

                        <div className="flex items-center gap-2 sm:gap-2.5 mx-auto">
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
                                title={`${seatId} - ₹${tierPrice}`}
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
                                title={`${seatId} - ₹${tierPrice}`}
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
                    </React.Fragment>
                  );
                })}
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

            {/* SELECTION SUMMARY CARD (4 COLS) */}
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
                    <span>Tickets Subtotal ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})</span>
                    <span className="font-extrabold text-[var(--text-heading)]">₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-[var(--text-muted)] font-medium">
                    <span>Convenience & Booking Fee</span>
                    <span className="font-extrabold text-[var(--text-heading)]">₹{convenienceFee.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-[var(--text-muted)] font-medium">
                    <span>Integrated GST (18%)</span>
                    <span className="font-extrabold text-[var(--text-heading)]">₹{gst.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-[var(--text-muted)] font-medium">
                    <span>Digital Boarding Pass</span>
                    <span className="font-black text-emerald-500">FREE</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
                      Grand Total Amount
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">Includes all taxes & fees</span>
                  </div>
                  <span className="text-3xl font-black text-[var(--primary)] tracking-tight">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  disabled={selectedSeats.length === 0}
                  onClick={handleProceedToCheckout}
                  className="w-full btn-teal py-3.5 px-6 rounded-2xl shadow-xl shadow-[#14B8A0]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            </div>

          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: FULL-PAGE PAYMENT CHECKOUT VIEW (NO POPUPS / FULL SCREEN PAGE) */}
      {/* ========================================================================= */}
      {currentStep === 'checkout_payment' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Bar with Back to Map button */}
          <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentStep('seat_map')}
                className="w-10 h-10 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-heading)] flex items-center justify-center transition-all cursor-pointer group shrink-0 shadow-sm"
                title="Back to Seat Map"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--primary)] group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-heading)] flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[var(--primary)]" /> Payment Checkout
                </h2>
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Review your ticket order and choose your preferred payment option below.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('seat_map')}
              className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer flex items-center gap-1"
            >
              ← Modify Seat Selection ({selectedSeats.length} seats)
            </button>
          </div>

          {/* PROCESSING OVERLAY INLINE */}
          {paymentStatus === 'processing' ? (
            <div className="movtego-card p-16 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] text-center space-y-4 shadow-xl">
              <RefreshCw className="w-12 h-12 text-[var(--primary)] animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[var(--text-heading)]">Processing Bank Authorization...</h3>
                <p className="text-xs text-[var(--text-muted)] font-medium max-w-sm mx-auto">
                  Connecting to bank payment gateway. Please do not refresh or close this window.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: ORDER SUMMARY CARD (5 COLS) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-5 shadow-xl">
                  
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                    <h3 className="text-base font-black text-[var(--text-heading)] flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-[var(--primary)]" /> Order Summary
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-black uppercase">
                      {format}
                    </span>
                  </div>

                  {/* Movie Poster & Meta */}
                  <div className="flex items-center gap-3.5 bg-[var(--input-bg)] p-3.5 rounded-2xl border border-[var(--border)]">
                    <div className="w-14 h-18 rounded-xl overflow-hidden border border-[var(--border)] bg-slate-900 shrink-0">
                      <img src={moviePoster} alt={movieTitle} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <h4 className="font-black text-sm text-[var(--text-heading)] truncate">{movieTitle}</h4>
                      <p className="text-xs text-[var(--text-muted)] font-medium truncate">{theatreName}</p>
                      <p className="text-xs font-bold text-[var(--primary)]">{dateStr} • {selectedShowtime}</p>
                    </div>
                  </div>

                  {/* Seats & Price Breakdown */}
                  <div className="space-y-2.5 text-xs pt-1">
                    <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]/60">
                      <span className="text-[var(--text-muted)] font-bold">Selected Seats ({selectedSeats.length}):</span>
                      <span className="font-black text-[var(--primary)] text-sm">{selectedSeats.map(s => s.id).join(', ')}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)] font-medium">Tickets Subtotal:</span>
                      <span className="font-bold text-[var(--text-heading)]">₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)] font-medium">Convenience Booking Fee:</span>
                      <span className="font-bold text-[var(--text-heading)]">₹{convenienceFee.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)] font-medium">Integrated GST (18%):</span>
                      <span className="font-bold text-[var(--text-heading)]">₹{gst.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-[var(--border)] text-base font-black">
                      <span>Total Amount Payable:</span>
                      <span className="text-[var(--primary)]">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security Guarantee Box */}
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-3 text-xs">
                    <ShieldCheck className="w-6 h-6 shrink-0" />
                    <div>
                      <span className="font-black block">100% Instant Booking Guarantee</span>
                      <span className="text-[10px] opacity-90 font-medium">Secured with 256-bit bank level SSL encryption</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN: FULL PAYMENT FORM OPTIONS (7 COLS) */}
              <div className="lg:col-span-7 movtego-card p-6 sm:p-7 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-6 shadow-xl">
                
                {/* FAILURE ALERT INLINE */}
                {paymentStatus === 'failed' && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 space-y-2">
                    <div className="flex items-center gap-2 font-black text-sm">
                      <AlertTriangle className="w-5 h-5" /> Payment Failed
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-medium">{failureError || 'Bank authorization failed.'}</p>
                  </div>
                )}

                {/* Payment Method Selector Tabs */}
                <div className="space-y-3">
                  <span className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
                    CHOOSE PAYMENT METHOD
                  </span>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] shadow-md font-black ring-2 ring-[var(--primary)]/20'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] shadow-md font-black ring-2 ring-[var(--primary)]/20'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                      <span>UPI Instant</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'wallet'
                          ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)] shadow-md font-black ring-2 ring-[var(--primary)]/20'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      <Wallet className="w-5 h-5" />
                      <span>Wallets</span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: CARD FORM */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 text-xs pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardForm.number}
                          onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                          placeholder="4532 •••• •••• 8892"
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-mono font-bold focus:outline-none focus:border-[var(--primary)]"
                        />
                        <CreditCard className="w-4 h-4 absolute right-4 top-3.5 text-[var(--text-muted)]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                        placeholder="Name on card"
                        className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">CVV Security Code</label>
                        <div className="relative">
                          <input
                            type="password"
                            maxLength={4}
                            value={cardForm.cvv}
                            onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                            placeholder="•••"
                            className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                          />
                          <Lock className="w-4 h-4 absolute right-4 top-3.5 text-[var(--text-muted)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: UPI FORM */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-5 text-xs pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">Enter Virtual Payment Address (VPA)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiVpa}
                          onChange={(e) => setUpiVpa(e.target.value)}
                          placeholder="username@upi / mobile@okicici"
                          className="flex-1 px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-bold focus:outline-none focus:border-[var(--primary)]"
                        />
                        <button type="button" className="px-5 py-3 bg-[var(--primary-light)] text-[var(--primary)] font-black rounded-2xl border border-[var(--primary)]/30">
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* QR Code Scanner Box */}
                    <div className="p-5 rounded-3xl bg-[var(--input-bg)] border border-[var(--border)] flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-black text-sm text-[var(--text-heading)] block">Scan QR Code with any UPI App</span>
                        <p className="text-xs text-[var(--text-muted)]">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                      <div className="p-2.5 bg-white rounded-2xl shadow-md border border-slate-200 shrink-0">
                        <QrCode className="w-14 h-14 text-slate-950" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: WALLETS */}
                {paymentMethod === 'wallet' && (
                  <div className="space-y-3 text-xs pt-1">
                    <span className="block text-xs font-bold text-[var(--text-heading)]">Select Linked Wallet</span>
                    <div className="space-y-3">
                      {[
                        { id: 'paytm', name: 'Paytm Wallet', desc: 'Balance: ₹ 1,450' },
                        { id: 'phonepe', name: 'PhonePe Wallet', desc: 'Linked +91 98765 43210' },
                        { id: 'amazonpay', name: 'Amazon Pay Balance', desc: 'Balance: ₹ 890' },
                      ].map((w) => (
                        <label
                          key={w.id}
                          onClick={() => setSelectedWallet(w.id)}
                          className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            selectedWallet === w.id
                              ? 'bg-[var(--primary-light)] border-[var(--primary)] text-[var(--text-heading)] ring-2 ring-[var(--primary)]/20 font-black'
                              : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Wallet className="w-5 h-5 text-[var(--primary)]" />
                            <div>
                              <span className="font-black text-sm text-[var(--text-heading)] block">{w.name}</span>
                              <span className="text-xs opacity-80 font-medium">{w.desc}</span>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedWallet === w.id ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--border)]'}`}>
                            {selectedWallet === w.id && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* PAY NOW ACTION BUTTON */}
                <div className="pt-3">
                  <button
                    onClick={handleExecutePayment}
                    className="w-full btn-teal py-4 rounded-2xl text-sm font-black uppercase tracking-wider cursor-pointer shadow-xl shadow-[#14B8A0]/30 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay ₹{totalPrice.toLocaleString()} Now</span>
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: FULL-PAGE E-TICKET CONFIRMATION VIEW */}
      {/* ========================================================================= */}
      {currentStep === 'ticket_success' && confirmedTicket && (
        <div className="max-w-md mx-auto w-full space-y-6 animate-fade-in text-center py-4">
          
          {/* Top Success Animated Banner */}
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-black text-[var(--text-heading)]">Booking & Payment Confirmed!</h2>
            <p className="text-xs text-[var(--text-muted)] font-medium">Your digital entry ticket is ready for entrance verification.</p>
          </div>

          {/* Authentic M-Ticket Boarding Pass Card */}
          <div className="relative text-left rounded-3xl bg-slate-900 text-white border border-teal-500/40 shadow-2xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500 w-full" />

            {/* Header Bar */}
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <Ticket className="w-4.5 h-4.5 text-teal-400" />
                <span className="font-black text-xs uppercase tracking-wider text-teal-300">
                  Official Entry M-Ticket
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono font-bold">
                ID: {confirmedTicket.bookingId}
              </span>
            </div>

            {/* Main Ticket Stub Body */}
            <div id="printable-ticket" className="p-5 space-y-4 bg-slate-900">
              
              {/* Movie Header Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 p-4 border border-slate-700/60 space-y-3">
                <div className="flex items-start gap-3.5">
                  {confirmedTicket.moviePoster ? (
                    <img 
                      src={confirmedTicket.moviePoster} 
                      alt={confirmedTicket.movieTitle} 
                      className="w-14 h-20 rounded-xl object-cover border border-slate-700 shadow-md shrink-0" 
                    />
                  ) : (
                    <div className="w-14 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 shrink-0">
                      <Ticket className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" /> CONFIRMED ✓
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-700 text-[10px] font-bold text-slate-300">
                        {confirmedTicket.format}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white tracking-tight leading-snug truncate pt-0.5" title={confirmedTicket.movieTitle}>
                      {confirmedTicket.movieTitle}
                    </h3>

                    <p className="flex items-center gap-1 text-xs font-bold text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{confirmedTicket.theatreName}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Show Timing & Reserved Seats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Show Date & Time
                  </span>
                  <p className="text-xs font-black text-white pt-0.5">{confirmedTicket.date}</p>
                  <p className="text-[11px] font-bold text-teal-300">{confirmedTicket.time}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Reserved Seats
                  </span>
                  <p className="text-xs font-black text-emerald-300 pt-0.5 break-words">
                    {Array.isArray(confirmedTicket.seats) ? confirmedTicket.seats.join(', ') : confirmedTicket.seats}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400">Total: <span className="text-white font-black">₹{confirmedTicket.totalPrice?.toLocaleString()}</span></p>
                </div>
              </div>

              {/* Ticket Perforation Divider */}
              <div className="relative my-3">
                <div className="absolute -left-8 -top-3.5 w-6 h-7 rounded-r-full bg-slate-950 border-r border-slate-800" />
                <div className="absolute -right-8 -top-3.5 w-6 h-7 rounded-l-full bg-slate-950 border-l border-slate-800" />
                <div className="border-t-2 border-dashed border-slate-700/70 w-full" />
              </div>

              {/* Boarding Pass Scannable QR Code */}
              <div className="p-4 rounded-2xl bg-white text-slate-900 border-2 border-teal-400/40 space-y-3 text-center shadow-lg">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Entrance Gate Boarding Pass
                </div>

                <div className="relative w-40 h-40 mx-auto bg-slate-950 rounded-2xl p-2.5 flex flex-col items-center justify-center border-4 border-slate-900 shadow-inner">
                  <QrCode className="w-28 h-28 text-teal-400" />
                  <div className="mt-1 px-2 py-0.5 bg-teal-500/20 rounded border border-teal-400/30">
                    <span className="font-mono text-[9px] font-black text-teal-300 tracking-widest">{confirmedTicket.bookingId}</span>
                  </div>
                </div>

                <p className="text-[10px] font-bold text-slate-600 max-w-xs mx-auto leading-tight">
                  Scan this M-Ticket QR Code at the multiplex usher entrance. Digital entry verified!
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-slate-900/95 border-t border-slate-800 space-y-2.5">
              <button
                onClick={handleDownloadTicket}
                className="w-full btn-teal font-black py-3 rounded-2xl text-xs cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-[#14B8A0]/30"
              >
                <Printer className="w-4 h-4" /> Download / Print E-Ticket Pass
              </button>

              <button
                onClick={() => {
                  setConfirmedTicket(null);
                  navigate('/booking-history');
                }}
                className="w-full py-2.5 rounded-2xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800 hover:border-slate-700"
              >
                View My Booking History →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

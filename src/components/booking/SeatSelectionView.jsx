import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Ticket, Check, AlertCircle, Info, Sparkles, Monitor, 
  Calendar, Clock, MapPin, Armchair, ChevronRight, CheckCircle2 
} from 'lucide-react';

export const SeatSelectionView = ({
  movieTitle = 'Blockbuster Movie',
  theatreName = 'PVR Cinemas',
  showtime = '06:30 PM',
  dateStr = 'Today, 30 Sep',
  format = 'IMAX 3D',
  pricePerSeat = 250,
  onBack,
  onBookingComplete
}) => {
  const MAX_SEAT_LIMIT = 8;

  // Row Config
  const rowsConfig = [
    { row: 'A', category: 'Recliner VIP', price: 350 },
    { row: 'B', category: 'Recliner VIP', price: 350 },
    { row: 'C', category: 'Prime Seats', price: 250 },
    { row: 'D', category: 'Prime Seats', price: 250 },
    { row: 'E', category: 'Prime Seats', price: 250 },
    { row: 'F', category: 'Classic Seats', price: 180 },
    { row: 'G', category: 'Classic Seats', price: 180 },
    { row: 'H', category: 'Classic Seats', price: 180 }
  ];

  const seatsPerRow = 12;

  // Booked Seats
  const bookedSeatIds = useMemo(() => new Set([
    'A3', 'A4', 'B6', 'B7', 'C1', 'C2', 'D5', 'D6', 'D7', 'E8', 'E9', 'F3', 'F4', 'G10', 'H11', 'H12'
  ]), []);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [warningMsg, setWarningMsg] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const showWarning = (msg) => {
    setWarningMsg(msg);
    setTimeout(() => setWarningMsg(null), 3000);
  };

  const handleSeatClick = (seatId, seatPrice) => {
    if (bookedSeatIds.has(seatId)) return;

    const isAlreadySelected = selectedSeats.some(s => s.id === seatId);

    if (isAlreadySelected) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= MAX_SEAT_LIMIT) {
        showWarning(`Maximum selection limit of ${MAX_SEAT_LIMIT} seats per booking reached!`);
        return;
      }
      setSelectedSeats(prev => [...prev, { id: seatId, price: seatPrice }]);
    }
  };

  const subtotalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const convenienceFee = selectedSeats.length > 0 ? 30 : 0;
  const totalPrice = subtotalPrice + convenienceFee;

  const handleProceedToPay = () => {
    if (selectedSeats.length === 0) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const bookedSeatNames = selectedSeats.map(s => s.id).join(', ');
      if (onBookingComplete) {
        onBookingComplete({
          movieTitle,
          theatreName,
          showtime,
          seats: bookedSeatNames,
          seatCount: selectedSeats.length,
          totalPrice
        });
      }
    }, 1200);
  };

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col space-y-6 text-left pb-12">
      
      {/* 1. Header Banner & Floating Back Button */}
      <div className="movtego-card p-6 md:p-8 rounded-3xl relative overflow-hidden bg-slate-950 text-white border border-white/10 shadow-2xl">
        
        {/* Subtle Ambient Backdrop Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14B8A0]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-teal-300 font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 text-teal-300 group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-tight">← Back to Showtimes</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 text-xs font-black rounded-lg bg-[var(--primary)] text-white uppercase tracking-wider shadow-md">
                  {format}
                </span>
                <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {showtime} Show
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  • {dateStr}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {movieTitle}
              </h1>

              <p className="text-xs md:text-sm text-slate-300 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
                {theatreName}
              </p>
            </div>

            {/* Warning Banner */}
            {warningMsg && (
              <div className="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 font-black text-xs animate-bounce border border-amber-300 shrink-0">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{warningMsg}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Seat Legend Bar */}
      <div className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-wrap items-center justify-center gap-6 text-xs font-bold shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg border-2 border-slate-400 bg-[var(--bg-card)] shadow-sm" />
          <span className="text-[var(--text-body)]">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-slate-300 dark:bg-slate-700 opacity-60 flex items-center justify-center text-[10px] font-bold text-slate-400 cursor-not-allowed">
            ✕
          </div>
          <span className="text-[var(--text-muted)]">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-primary-gradient text-white flex items-center justify-center shadow-md shadow-[#14B8A0]/30 font-bold">
            ✓
          </div>
          <span className="text-[var(--primary)] font-black">Selected</span>
        </div>
      </div>

      {/* 3. Interactive Cinema Screen & Seat Layout Grid */}
      <div className="movtego-card p-6 md:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-md space-y-8 text-center">
        
        {/* Cinema Screen Graphic */}
        <div className="space-y-2 max-w-xl mx-auto pb-4">
          <div className="h-4 w-full border-t-4 border-[var(--primary)] rounded-t-[100%] shadow-[0_-12px_30px_rgba(20,184,160,0.5)] bg-gradient-to-b from-[var(--primary)]/25 to-transparent" />
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[var(--text-muted)] block">
            CINEMA AUDITORIUM SCREEN 🎬
          </span>
        </div>

        {/* Seat Layout Grid by Pricing Categories */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {['Recliner VIP', 'Prime Seats', 'Classic Seats'].map((catName) => {
            const categoryRows = rowsConfig.filter(r => r.category === catName);
            const price = categoryRows[0]?.price || 250;

            return (
              <div key={catName} className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 px-2 text-xs md:text-sm">
                  <span className="font-black text-[var(--text-heading)] uppercase tracking-wider flex items-center gap-1.5">
                    <Armchair className="w-4 h-4 text-[var(--primary)]" /> {catName}
                  </span>
                  <span className="font-extrabold text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1 rounded-full border border-[var(--primary)]/20">
                    ₹{price} / seat
                  </span>
                </div>

                {categoryRows.map(({ row, price: seatPrice }) => (
                  <div key={row} className="flex items-center justify-center gap-2 sm:gap-3.5">
                    <span className="w-6 text-xs sm:text-sm font-black text-[var(--text-muted)] text-right">
                      {row}
                    </span>

                    <div className="flex items-center gap-1.5 sm:gap-2.5">
                      {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((seatNum) => {
                        const seatId = `${row}${seatNum}`;
                        const isBooked = bookedSeatIds.has(seatId);
                        const isSelected = selectedSeats.some(s => s.id === seatId);
                        const isAisleGap = seatNum === 4 || seatNum === 8;

                        return (
                          <React.Fragment key={seatId}>
                            <button
                              type="button"
                              disabled={isBooked}
                              onClick={() => handleSeatClick(seatId, seatPrice)}
                              className={`
                                w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-black transition-all duration-150 flex items-center justify-center cursor-pointer select-none
                                ${isBooked
                                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed border border-transparent'
                                  : isSelected
                                    ? 'bg-primary-gradient text-white border-2 border-teal-300 shadow-lg shadow-[#14B8A0]/40 scale-110'
                                    : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
                                }
                              `}
                              title={isBooked ? `Seat ${seatId} (Booked)` : `Seat ${seatId} (₹${seatPrice})`}
                            >
                              {isBooked ? '✕' : isSelected ? '✓' : seatNum}
                            </button>

                            {isAisleGap && <div className="w-3 sm:w-6" />}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <span className="w-6 text-xs sm:text-sm font-black text-[var(--text-muted)] text-left">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Bottom Booking Summary Bar */}
      <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg text-[var(--text-heading)]">
                {selectedSeats.length > 0 ? `${selectedSeats.length} Seats Selected` : 'No Seats Selected'}
              </span>
              {selectedSeats.length > 0 && (
                <span className="text-xs font-black text-[var(--primary)] bg-[var(--primary-light)] px-3 py-0.5 rounded-full border border-[var(--primary)]/30">
                  Max Limit: {MAX_SEAT_LIMIT}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-semibold">
              {selectedSeats.length > 0 ? (
                <span>Reserved Seats: <strong className="text-[var(--primary)] font-black text-sm">{selectedSeats.map(s => s.id).join(', ')}</strong></span>
              ) : (
                'Select your preferred seats on the interactive map above.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-6 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[var(--border)]">
            <div className="text-right">
              <span className="text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Total Payable</span>
              <span className="text-xl sm:text-2xl font-black text-[var(--text-heading)]">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0 || isProcessingPayment}
              onClick={handleProceedToPay}
              className="btn-teal px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-[#14B8A0]/40 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
            >
              {isProcessingPayment ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <Ticket className="w-4.5 h-4.5" />
                  <span>Proceed to Pay ₹{totalPrice}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

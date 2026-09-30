import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Ticket, Check, AlertCircle, Info, Sparkles, Monitor, Calendar, Clock, MapPin, Armchair, ChevronRight } from 'lucide-react';

export const SeatSelectionModal = ({
  isOpen,
  onClose,
  movieTitle = 'Blockbuster Movie',
  theatreName = 'PVR Cinemas',
  showtime = '06:30 PM',
  dateStr = 'Today, 30 Sep',
  format = 'IMAX 3D',
  pricePerSeat = 250,
  onBookingComplete
}) => {
  const MAX_SEAT_LIMIT = 8;

  // Generate mock seat layout configuration
  // Rows A-B: Recliner (VIP) - ₹350
  // Rows C-E: Prime - ₹250
  // Rows F-H: Classic - ₹180
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

  // Pre-determined booked seats for realistic simulation
  const bookedSeatIds = useMemo(() => new Set([
    'A3', 'A4', 'B6', 'B7', 'C1', 'C2', 'D5', 'D6', 'D7', 'E8', 'E9', 'F3', 'F4', 'G10', 'H11', 'H12'
  ]), []);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [warningMsg, setWarningMsg] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

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

  // Price calculations
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
      onClose();
    }, 1200);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-fade-in">
      {/* Semi-transparent Overlay */}
      <div className="fixed inset-0 bg-black/60 cursor-pointer" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-5 sm:p-7 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] z-10 overflow-hidden text-[var(--text-heading)] max-h-[92vh] flex flex-col my-auto">
        
        {/* Top Decorative Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-gradient z-20 rounded-t-3xl" />

        {/* Top Warning Alert Banner */}
        {warningMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 font-black text-xs animate-bounce border border-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{warningMsg}</span>
          </div>
        )}

        {/* 1. Modal Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[var(--border)] shrink-0">
          <div className="space-y-0.5 text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-xl font-black text-[var(--text-heading)] tracking-tight">
                {movieTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-black border border-[var(--primary)]/30">
                {format}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] font-medium flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[var(--primary)]" /> {theatreName}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[var(--primary)]" /> {dateStr}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-[var(--primary)]"><Clock className="w-3.5 h-3.5" /> {showtime}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-heading)] bg-[var(--input-bg)] rounded-full transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
            title="Close (Esc)"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* 2. Seat Status Legend Strip */}
        <div className="flex items-center justify-center gap-6 py-2 px-4 bg-[var(--input-bg)]/60 rounded-2xl border border-[var(--border)] shrink-0 text-xs font-bold">
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

        {/* 3. Interactive Cinema Screen & Seat Grid Container */}
        <div className="overflow-y-auto flex-1 my-3 px-2 py-4 space-y-6 custom-scrollbar text-center">
          
          {/* Curved Cinema Screen Graphic */}
          <div className="space-y-1.5 max-w-lg mx-auto pb-4">
            <div className="h-3 w-full border-t-4 border-[var(--primary)] rounded-t-[100%] shadow-[0_-10px_25px_rgba(20,184,160,0.4)] bg-gradient-to-b from-[var(--primary)]/20 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] block">
              SCREEN THIS WAY 🎬
            </span>
          </div>

          {/* Seat Layout Grid by Categories */}
          <div className="space-y-5 max-w-2xl mx-auto">
            
            {/* Group by category */}
            {['Recliner VIP', 'Prime Seats', 'Classic Seats'].map((catName) => {
              const categoryRows = rowsConfig.filter(r => r.category === catName);
              const price = categoryRows[0]?.price || 250;

              return (
                <div key={catName} className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-1 px-2 text-xs">
                    <span className="font-black text-[var(--text-heading)] uppercase tracking-wider flex items-center gap-1.5">
                      <Armchair className="w-3.5 h-3.5 text-[var(--primary)]" /> {catName}
                    </span>
                    <span className="font-extrabold text-[var(--primary)] bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
                      ₹{price} / seat
                    </span>
                  </div>

                  {categoryRows.map(({ row, price: seatPrice }) => (
                    <div key={row} className="flex items-center justify-center gap-2 sm:gap-3">
                      {/* Row Label */}
                      <span className="w-5 text-xs font-black text-[var(--text-muted)] text-right">
                        {row}
                      </span>

                      {/* Seats Array (1 to 12) with Aisle Spacing after 4 and 8 */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
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
                                  w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-black transition-all duration-150 flex items-center justify-center cursor-pointer select-none
                                  ${isBooked
                                    ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed border border-transparent'
                                    : isSelected
                                      ? 'bg-primary-gradient text-white border-2 border-teal-300 shadow-md shadow-[#14B8A0]/40 scale-105'
                                      : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
                                  }
                                `}
                                title={isBooked ? `Seat ${seatId} (Booked)` : `Seat ${seatId} (₹${seatPrice})`}
                              >
                                {isBooked ? '✕' : isSelected ? '✓' : seatNum}
                              </button>

                              {/* Aisle Space Divider */}
                              {isAisleGap && <div className="w-2 sm:w-4" />}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Row Label Right */}
                      <span className="w-5 text-xs font-black text-[var(--text-muted)] text-left">
                        {row}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}

          </div>

        </div>

        {/* 4. Bottom Sticky Summary Bar & Action CTA */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] shrink-0 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            
            {/* Left Selection Info */}
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-[var(--text-heading)]">
                  {selectedSeats.length > 0 ? `${selectedSeats.length} Seats Selected` : 'No Seats Selected'}
                </span>
                {selectedSeats.length > 0 && (
                  <span className="text-[10px] font-extrabold text-[var(--primary)] bg-[var(--primary-light)] px-2 py-0.5 rounded-full border border-[var(--primary)]/30">
                    Max Limit: {MAX_SEAT_LIMIT}
                  </span>
                )}
              </div>

              <p className="text-xs text-[var(--text-muted)] font-bold">
                {selectedSeats.length > 0 ? (
                  <span>Seats: <strong className="text-[var(--primary)]">{selectedSeats.map(s => s.id).join(', ')}</strong></span>
                ) : (
                  'Click on available seats above to select your preferred spots.'
                )}
              </p>
            </div>

            {/* Right Price Breakdown & Proceed CTA */}
            <div className="flex items-center gap-4 justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">Total Amount</span>
                <span className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                disabled={selectedSeats.length === 0 || isProcessingPayment}
                onClick={handleProceedToPay}
                className="btn-teal px-6 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-[#14B8A0]/30 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                {isProcessingPayment ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    <span>Proceed to Pay ₹{totalPrice}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

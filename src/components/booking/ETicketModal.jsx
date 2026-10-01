import React, { useState } from 'react';
import { 
  Ticket, CheckCircle2, XCircle, QrCode, X, MapPin, Calendar, Clock, 
  Printer, Copy, Check, ShieldCheck, Film, Building2, Sparkles, Share2, 
  Receipt, CreditCard, Sparkle 
} from 'lucide-react';
import { toast } from 'react-toastify';

export const ETicketModal = ({ ticket, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!ticket) return null;

  const bookingId = ticket.bookingId || ticket.id || 'BK-89341-01';
  const txnId = ticket.transactionId || ticket.txnId || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const movieTitle = ticket.movieTitle || ticket.movie || 'Selected Movie';
  const posterUrl = ticket.moviePoster || ticket.poster || ticket.posterUrl || null;
  const theatreName = ticket.theatreName || ticket.theatre || 'Multiplex Cinema';
  const city = ticket.city || 'Hyderabad';
  const showDate = ticket.date || 'Today';
  const showTime = ticket.time || '06:30 PM';
  const seatsStr = Array.isArray(ticket.seats) ? ticket.seats.join(', ') : ticket.seats || 'N/A';
  const seatCount = Array.isArray(ticket.seats) ? ticket.seats.length : (ticket.seats ? ticket.seats.split(',').length : 1);
  const totalPrice = typeof ticket.totalPrice === 'number' ? `₹${ticket.totalPrice}` : ticket.totalPrice || ticket.amount || '₹250';
  const status = ticket.status || 'Confirmed';
  const screen = ticket.screen || 'Screen 02 (4K Laser)';
  const movieFormat = ticket.format || '2D / Dolby Atmos';

  const subtotal = ticket.subtotal ? `₹${ticket.subtotal}` : null;
  const convenienceFee = ticket.convenienceFee ? `₹${ticket.convenienceFee}` : null;
  const gstAmount = ticket.gstAmount ? `₹${ticket.gstAmount}` : null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    toast.success(`Booking ID ${bookingId} copied to clipboard!`, { position: 'top-right' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-900/60 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in overflow-y-auto transition-colors duration-300"
      onClick={onClose}
    >
      {/* Printable CSS Styles injection */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-ticket, #printable-ticket * {
            visibility: visible;
          }
          #printable-ticket {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Dynamic Theme-Adaptive & Wide Modal Container (max-w-2xl) */}
      <div 
        className="relative max-w-2xl w-full my-auto text-left rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--border)] shadow-2xl overflow-hidden transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Teal Gradient Accent Bar */}
        <div className="h-2 bg-primary-gradient w-full" />

        {/* 1. Modal Header Bar */}
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30 flex items-center justify-center shadow-sm">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
                Official Entry M-Ticket Pass
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-mono font-bold">
                Booking Reference ID: <span className="text-[var(--text-heading)] font-black">{bookingId}</span>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--input-bg)] text-[var(--text-muted)] hover:text-[var(--text-heading)] flex items-center justify-center border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            title="Close Ticket Modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* 2. Main Ticket Stub Container (Wide Printable Area) */}
        <div id="printable-ticket" className="p-6 sm:p-7 space-y-6 bg-[var(--bg-card)]">
          
          {/* Main 2-Column Split Layout for Wide Desktop & Tablet */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT SIDE: Movie & Venue Details (7 COLS) */}
            <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
              
              {/* Movie Header Card */}
              <div className="rounded-2xl bg-[var(--input-bg)] p-4 border border-[var(--border)] space-y-3">
                <div className="flex items-start gap-4">
                  {posterUrl ? (
                    <img 
                      src={posterUrl} 
                      alt={movieTitle} 
                      className="w-16 h-24 rounded-xl object-cover border border-[var(--border)] shadow-md shrink-0" 
                    />
                  ) : (
                    <div className="w-16 h-24 rounded-xl bg-[var(--primary-light)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] shrink-0">
                      <Film className="w-7 h-7" />
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${
                        status === 'Confirmed' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                      }`}>
                        {status === 'Confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-extrabold border border-[var(--primary)]/20">
                        {movieFormat}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-[var(--text-heading)] tracking-tight leading-tight truncate pt-0.5" title={movieTitle}>
                      {movieTitle}
                    </h2>

                    <div className="text-xs space-y-1 pt-1">
                      <p className="flex items-center gap-1.5 font-bold text-[var(--text-heading)] truncate">
                        <Building2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                        {theatreName}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                        {city} • <span className="text-[var(--text-heading)] font-semibold">{screen}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show Timing & Reserved Seats Info Box */}
              <div className="grid grid-cols-2 gap-3">
                {/* Show Date & Time */}
                <div className="p-3.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" /> Date & Showtime
                  </span>
                  <p className="text-xs sm:text-sm font-black text-[var(--text-heading)] pt-0.5">{showDate}</p>
                  <p className="text-xs font-bold text-[var(--primary)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {showTime}
                  </p>
                </div>

                {/* Seats & Ticket Count */}
                <div className="p-3.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-emerald-500" /> Reserved Seats ({seatCount})
                  </span>
                  <p className="text-xs sm:text-sm font-black text-[var(--primary)] pt-0.5 break-words">{seatsStr}</p>
                  <p className="text-[11px] font-bold text-[var(--text-muted)]">Amount Paid: <span className="text-[var(--text-heading)] font-black">{totalPrice}</span></p>
                </div>
              </div>

              {/* Transaction Metadata & Payment Breakdown */}
              <div className="p-3.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="font-mono">TXN: <strong className="text-[var(--text-heading)]">{txnId}</strong></span>
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-[var(--primary)] hover:underline cursor-pointer flex items-center gap-1 font-bold"
                  >
                    <Receipt className="w-3.5 h-3.5" /> {showDetails ? 'Hide Payment Details' : 'View Payment Breakdown'}
                  </button>
                </div>

                {showDetails && subtotal && (
                  <div className="pt-2 border-t border-[var(--border)] text-xs space-y-1.5 animate-fade-in">
                    <div className="flex justify-between text-[var(--text-muted)] text-[11px]">
                      <span>Tickets Subtotal:</span>
                      <span className="font-bold text-[var(--text-heading)]">{subtotal}</span>
                    </div>
                    {convenienceFee && (
                      <div className="flex justify-between text-[var(--text-muted)] text-[11px]">
                        <span>Convenience Fee:</span>
                        <span className="font-bold text-[var(--text-heading)]">{convenienceFee}</span>
                      </div>
                    )}
                    {gstAmount && (
                      <div className="flex justify-between text-[var(--text-muted)] text-[11px]">
                        <span>GST Tax (18%):</span>
                        <span className="font-bold text-[var(--text-heading)]">{gstAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[var(--text-heading)] font-black pt-1 border-t border-[var(--border)] text-xs">
                      <span>Grand Total:</span>
                      <span className="text-[var(--primary)]">{totalPrice}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT SIDE: Scannable Entrance Gate Boarding Pass (5 COLS) */}
            <div className="md:col-span-5 movtego-card p-5 rounded-2xl bg-[var(--input-bg)] text-[var(--text-heading)] border-2 border-[var(--primary)]/30 shadow-md flex flex-col justify-between items-center text-center space-y-4">
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[var(--text-heading)] uppercase tracking-wider">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Gate Boarding Pass
                </div>
                <p className="text-[11px] text-[var(--text-muted)] font-medium">Present at cinema entrance usher</p>
              </div>

              {/* Scannable QR Boarding Visual Card */}
              <div className="relative w-48 h-48 mx-auto bg-slate-950 dark:bg-black rounded-2xl p-3 flex flex-col items-center justify-center border-4 border-slate-800 dark:border-[var(--border)] shadow-xl group">
                <QrCode className="w-36 h-36 text-[var(--primary)] group-hover:scale-105 transition-transform" />
                <div className="mt-1 px-3 py-0.5 bg-[var(--primary-light)] rounded-lg border border-[var(--primary)]/30">
                  <span className="font-mono text-[10px] font-black text-[var(--primary)] tracking-widest">{bookingId}</span>
                </div>
              </div>

              <div className="space-y-1 text-center">
                <p className="text-[11px] font-extrabold text-[var(--text-heading)]">Digital Entry Verified ✓</p>
                <p className="text-[10px] text-[var(--text-muted)] leading-tight max-w-[200px] mx-auto">
                  Scan this QR Code directly from your screen. No paper printout needed!
                </p>
              </div>

            </div>

          </div>

          {/* Ticket Perforation Dashed Line with Notches */}
          <div className="relative my-2">
            <div className="absolute -left-9 -top-3.5 w-7 h-7 rounded-r-full bg-[var(--bg-page)] border-r border-[var(--border)]" />
            <div className="absolute -right-9 -top-3.5 w-7 h-7 rounded-l-full bg-[var(--bg-page)] border-l border-[var(--border)]" />
            <div className="border-t-2 border-dashed border-[var(--border)] w-full" />
          </div>

        </div>

        {/* 3. Action Buttons Footer Bar */}
        <div className="px-6 py-4 bg-[var(--bg-card)] border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Copy Booking Code */}
            <button
              onClick={handleCopyCode}
              className="px-4 py-2.5 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] hover:bg-[var(--primary-light)] font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-[var(--border)] hover:border-[var(--primary)] shadow-sm"
              title="Copy Booking Reference Code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[var(--primary)]" />}
              <span>{copied ? 'Code Copied!' : 'Copy Ticket ID'}</span>
            </button>

            {/* Print / Save Ticket */}
            <button
              onClick={handlePrintTicket}
              className="px-4 py-2.5 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] hover:bg-[var(--primary-light)] font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-[var(--border)] hover:border-[var(--primary)] shadow-sm"
              title="Print E-Ticket Pass"
            >
              <Printer className="w-4 h-4 text-[var(--primary)]" />
              <span>Print E-Ticket Pass</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="btn-teal px-6 py-2.5 rounded-xl text-white font-black text-xs cursor-pointer shadow-lg shadow-[#14B8A0]/25 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Done & Close M-Ticket
          </button>
        </div>

      </div>
    </div>
  );
};

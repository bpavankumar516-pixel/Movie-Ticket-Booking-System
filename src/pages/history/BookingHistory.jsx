import React, { useState } from 'react';
import { 
  Ticket, CheckCircle2, Clock, XCircle, Search, QrCode, X, 
  MapPin, Calendar, CreditCard, ShieldCheck, Download, AlertTriangle 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BookingHistory = () => {
  const { bookingHistory, cancelBooking } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicketForModal, setSelectedTicketForModal] = useState(null);
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  const filteredBookings = bookingHistory.filter((b) => {
    const matchesSearch = 
      (b.bookingId || b.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.movieTitle || b.movie || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.theatreName || b.theatre || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmCancel = () => {
    if (cancellingBookingId) {
      cancelBooking(cancellingBookingId);
      setCancellingBookingId(null);
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in pb-12">
      
      {/* 1. Header Stat Summary Bar */}
      <div className="movtego-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-heading)] tracking-tight flex items-center gap-2.5">
            <Ticket className="w-6 h-6 text-[var(--primary)]" /> Bookings & Digital M-Tickets
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-medium mt-1">
            Track customer reservations, generated Booking IDs, seat allocations, and digital entry QR passes.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex items-center gap-3 text-xs font-bold shrink-0">
          <span className="px-3.5 py-1.5 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
            Total: {bookingHistory.length}
          </span>
          <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            Confirmed: {bookingHistory.filter(b => b.status === 'Confirmed').length}
          </span>
          <span className="px-3.5 py-1.5 rounded-2xl bg-rose-500/15 text-rose-500 border border-rose-500/30">
            Cancelled: {bookingHistory.filter(b => b.status === 'Cancelled').length}
          </span>
        </div>
      </div>

      {/* 2. Controls & Search Filter Strip */}
      <div className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Booking ID, Movie, Theatre..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="font-bold text-[var(--text-muted)]">Status:</span>
          {['All', 'Confirmed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-primary-gradient text-white shadow-md'
                  : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-heading)]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Bookings Table */}
      <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] overflow-x-auto shadow-sm">
        {filteredBookings.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-[var(--text-muted)] uppercase border-b border-[var(--border)] pb-3">
                <th className="pb-3.5 font-black">Booking ID</th>
                <th className="pb-3.5 font-black">Movie Title</th>
                <th className="pb-3.5 font-black">Theatre & Location</th>
                <th className="pb-3.5 font-black">Reserved Seats</th>
                <th className="pb-3.5 font-black">Show Date & Time</th>
                <th className="pb-3.5 font-black">Amount</th>
                <th className="pb-3.5 font-black">Status</th>
                <th className="pb-3.5 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/60 text-xs font-medium">
              {filteredBookings.map((b) => {
                const bId = b.bookingId || b.id;
                const seatsStr = Array.isArray(b.seats) ? b.seats.join(', ') : b.seats || 'N/A';
                const formattedPrice = typeof b.totalPrice === 'number' ? `₹${b.totalPrice}` : b.totalPrice || b.amount || '₹250';

                return (
                  <tr key={bId} className="hover:bg-[var(--primary-light)]/30 transition-colors">
                    <td className="py-4 font-mono font-black text-[var(--primary)] text-sm">{bId}</td>
                    <td className="py-4 font-black text-[var(--text-heading)]">{b.movieTitle || b.movie}</td>
                    <td className="py-4 text-[var(--text-muted)]">
                      <div>{b.theatreName || b.theatre}</div>
                      <div className="text-[10px] text-[var(--text-muted)]/70">{b.city || 'Multiplex'}</div>
                    </td>
                    <td className="py-4 font-black text-teal-400">{seatsStr}</td>
                    <td className="py-4 text-[var(--text-muted)]">
                      <div>{b.date || 'Today'}</div>
                      <div className="text-[11px] font-bold text-[var(--primary)]">{b.time || '06:30 PM'}</div>
                    </td>
                    <td className="py-4 font-black text-[var(--text-heading)] text-sm">{formattedPrice}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black inline-flex items-center gap-1 ${
                        b.status === 'Confirmed' ? 'status-confirmed' :
                        b.status === 'Pending' ? 'status-pending' :
                        'status-cancelled'
                      }`}>
                        {b.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                        {b.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {b.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedTicketForModal(b)}
                          className="px-3 py-1.5 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors font-bold text-xs flex items-center gap-1 cursor-pointer border border-[var(--primary)]/30"
                          title="View Digital E-Ticket QR"
                        >
                          <QrCode className="w-3.5 h-3.5" /> M-Ticket
                        </button>
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => setCancellingBookingId(bId)}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors font-bold text-xs cursor-pointer border border-rose-500/20"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center space-y-3">
            <Ticket className="w-12 h-12 text-[var(--text-muted)] mx-auto opacity-50" />
            <h3 className="text-base font-black text-[var(--text-heading)]">No Bookings Found</h3>
            <p className="text-xs text-[var(--text-muted)]">No ticket booking records match your filter criteria.</p>
          </div>
        )}
      </div>

      {/* 4. DIGITAL M-TICKET QR PREVIEW MODAL */}
      {selectedTicketForModal && (
        <div 
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedTicketForModal(null)}
        >
          <div 
            className="movtego-card relative max-w-md w-full p-6 rounded-3xl bg-slate-950 text-white border border-white/20 shadow-2xl space-y-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[var(--primary)]" />
                <span className="font-black text-sm uppercase tracking-wider text-teal-300">Official Entry M-Ticket</span>
              </div>
              <button 
                onClick={() => setSelectedTicketForModal(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Header Card */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-teal-300 tracking-wider bg-teal-500/20 px-2.5 py-0.5 rounded-md border border-teal-400/30">
                  BOOKING CONFIRMED ✓
                </span>
                <span className="font-mono text-xs font-black text-slate-300">ID: {selectedTicketForModal.bookingId || selectedTicketForModal.id}</span>
              </div>

              <h2 className="text-xl font-black text-white">{selectedTicketForModal.movieTitle || selectedTicketForModal.movie}</h2>

              <div className="text-xs text-slate-300 space-y-1">
                <p className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                  {selectedTicketForModal.theatreName || selectedTicketForModal.theatre}
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-300" />
                  {selectedTicketForModal.date || 'Today'} • {selectedTicketForModal.time || '06:30 PM'}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Seats</span>
                  <span className="font-black text-teal-300 text-sm">{Array.isArray(selectedTicketForModal.seats) ? selectedTicketForModal.seats.join(', ') : selectedTicketForModal.seats}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Amount Paid</span>
                  <span className="font-black text-white text-sm">₹{selectedTicketForModal.totalPrice || selectedTicketForModal.amount || 250}</span>
                </div>
              </div>
            </div>

            {/* QR Code Representation */}
            <div className="bg-white p-4 rounded-2xl text-center space-y-2 border-4 border-teal-400/30">
              <div className="w-44 h-44 mx-auto bg-slate-900 rounded-xl p-2 flex flex-col items-center justify-center space-y-2">
                <QrCode className="w-32 h-32 text-teal-400" />
                <span className="font-mono text-[9px] font-black text-slate-300 tracking-widest">{selectedTicketForModal.qrCodeData || selectedTicketForModal.bookingId}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-700">Scan this QR Code at the multiplex usher entrance</p>
            </div>

            <button
              onClick={() => setSelectedTicketForModal(null)}
              className="w-full btn-teal py-3 rounded-xl text-xs font-black cursor-pointer shadow-lg"
            >
              Done & Close M-Ticket
            </button>
          </div>
        </div>
      )}

      {/* 5. CANCEL CONFIRMATION MODAL */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="movtego-card max-w-sm w-full p-6 rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--border)] shadow-2xl space-y-4 text-left">
            <div className="flex items-center gap-2 text-rose-500 font-black text-base">
              <AlertTriangle className="w-5 h-5" /> Cancel Ticket Reservation?
            </div>
            <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
              Are you sure you want to cancel booking <strong>{cancellingBookingId}</strong>? Reserved seats will be released back to public availability.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="px-4 py-2 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] font-bold text-xs cursor-pointer border border-[var(--border)]"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white font-black text-xs cursor-pointer shadow-md hover:bg-rose-600"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


import React, { useState, useMemo } from 'react';
import { 
  Ticket, CheckCircle2, Clock, XCircle, Search, QrCode, X, 
  MapPin, Calendar, AlertTriangle, TrendingUp, Building2, Film 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { ETicketModal } from '../../components/booking/ETicketModal';
import { toast } from 'react-toastify';

export const BookingHistory = () => {
  const { bookingHistory, cancelBooking } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieFilter, setSelectedMovieFilter] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedTicketForModal, setSelectedTicketForModal] = useState(null);
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  // Dynamic Movie Options
  const movieOptions = useMemo(() => {
    const moviesSet = new Set(bookingHistory.map((b) => b.movieTitle || b.movie).filter(Boolean));
    return ['All', ...Array.from(moviesSet)];
  }, [bookingHistory]);

  // Dynamic Date Options
  const dateOptions = useMemo(() => {
    const datesSet = new Set(bookingHistory.map((b) => b.date).filter(Boolean));
    return ['All', ...Array.from(datesSet)];
  }, [bookingHistory]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookingHistory.filter((b) => {
      const bTitle = b.movieTitle || b.movie || '';
      const bId = b.bookingId || b.id || '';
      const bTheatre = b.theatreName || b.theatre || '';

      const matchesSearch = 
        bId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bTheatre.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMovie = selectedMovieFilter === 'All' || bTitle.toLowerCase() === selectedMovieFilter.toLowerCase();
      const matchesDate = selectedDateFilter === 'All' || b.date === selectedDateFilter;
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

      return matchesSearch && matchesMovie && matchesDate && matchesStatus;
    });
  }, [bookingHistory, searchQuery, selectedMovieFilter, selectedDateFilter, statusFilter]);

  // Dynamic Stats
  const totalCount = bookingHistory.length;
  const confirmedCount = bookingHistory.filter((b) => b.status === 'Confirmed').length;
  const cancelledCount = bookingHistory.filter((b) => b.status === 'Cancelled').length;

  const handleConfirmCancel = () => {
    if (cancellingBookingId) {
      cancelBooking(cancellingBookingId);
      toast.warning(`Booking #${cancellingBookingId} cancelled. Reserved seats have been released.`, { position: 'top-right' });
      setCancellingBookingId(null);
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in pb-12">
      
      {/* 1. Header Stat Summary - 3 Static Cards (Total: 2, Confirmed: 2, Cancelled: 0) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total Bookings */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Total Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)]">
            Total: {totalCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
            <TrendingUp className="w-3 h-3" />
            <span>Active Reservations</span>
          </div>
        </div>

        {/* Card 2: Confirmed Bookings */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Confirmed Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-500">
            Confirmed: {confirmedCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
            <span>✓ Verified Entry Tickets</span>
          </div>
        </div>

        {/* Card 3: Cancelled Bookings */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Cancelled Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-500">
            Cancelled: {cancelledCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <span>Released Seats</span>
          </div>
        </div>
      </div>

      {/* 2. Controls & Search Filter Strip */}
      <div className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Booking ID, Movie, Theatre..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
          />
        </div>

        {/* Filter Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Filter by Movie */}
          <select
            value={selectedMovieFilter}
            onChange={(e) => setSelectedMovieFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
          >
            {movieOptions.map((mov) => (
              <option key={mov} value={mov}>
                {mov === 'All' ? 'All Movies' : mov}
              </option>
            ))}
          </select>

          {/* Filter by Booking Date */}
          <select
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
          >
            {dateOptions.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Dates' : d}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* 3. Booking History List Table */}
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
                    <td className="py-4 text-[var(--text-heading)]">
                      <div className="flex items-center gap-2.5">
                        {b.moviePoster || b.poster ? (
                          <img src={b.moviePoster || b.poster} alt="" className="w-9 h-12 rounded-lg object-cover shrink-0 border border-[var(--border)] shadow-sm" />
                        ) : (
                          <div className="w-9 h-12 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shrink-0 border border-[var(--border)]">
                            <Film className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <div className="font-extrabold text-[var(--text-heading)]">{b.movieTitle || b.movie}</div>
                          <div className="text-[10px] text-[var(--primary)] font-bold">{b.format || '2D / Dolby Atmos'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-[var(--text-muted)]">
                      <div className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                        <span>{b.theatreName || b.theatre || 'Multiplex Cinema'}</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] font-semibold flex items-center gap-1 pt-1">
                        <MapPin className="w-3 h-3 text-[var(--primary)] shrink-0" />
                        <span>{b.city || 'Hyderabad'}</span> • <span className="text-[var(--text-heading)] font-bold">{b.screen || 'Audi 1 (IMAX)'}</span>
                      </div>
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
                          className="px-3 py-1.5 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors font-bold text-xs flex items-center gap-1 cursor-pointer border border-[var(--primary)]/30 shadow-sm"
                          title="View Digital E-Ticket QR"
                        >
                          <QrCode className="w-3.5 h-3.5" /> View E-Ticket
                        </button>
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => setCancellingBookingId(bId)}
                            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:text-white transition-all font-extrabold text-xs cursor-pointer border border-rose-500/20 dark:border-rose-500/40 shadow-sm flex items-center gap-1.5"
                            title="Cancel Ticket Booking"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Cancel
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
        <ETicketModal 
          ticket={selectedTicketForModal} 
          onClose={() => setSelectedTicketForModal(null)} 
        />
      )}

      {/* 5. THEME-ADAPTIVE CANCEL CONFIRMATION MODAL */}
      {cancellingBookingId && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-900/50 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in transition-colors duration-300 overflow-y-auto"
          onClick={() => setCancellingBookingId(null)}
        >
          <div 
            className="relative max-w-md w-full my-auto text-left rounded-3xl bg-[var(--bg-card)] text-[var(--text-heading)] border border-[var(--border)] shadow-2xl overflow-hidden transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Red Gradient Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 w-full" />

            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-card)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="font-black text-xs uppercase tracking-wider text-rose-500">
                  Cancel Ticket Reservation
                </span>
              </div>

              <button 
                onClick={() => setCancellingBookingId(null)}
                className="w-8 h-8 rounded-full bg-[var(--input-bg)] text-[var(--text-muted)] hover:text-[var(--text-heading)] flex items-center justify-center border border-[var(--border)] transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 bg-[var(--bg-card)]">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-2">
                <p className="font-bold text-rose-600 dark:text-rose-400">
                  Are you sure you want to cancel booking <span className="font-mono text-xs font-black underline">{cancellingBookingId}</span>?
                </p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Upon cancellation, your reserved seat(s) will be instantly released back to the multiplex system for public availability.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--border)] flex items-center justify-end gap-3">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="px-4 py-2.5 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] hover:bg-[var(--primary-light)] font-bold text-xs cursor-pointer border border-[var(--border)] transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs cursor-pointer shadow-lg shadow-rose-500/30 flex items-center gap-1.5 transition-all"
              >
                <XCircle className="w-4 h-4" /> Yes, Cancel Booking
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

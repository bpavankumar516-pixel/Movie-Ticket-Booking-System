import React from 'react';
import { Ticket, CheckCircle2, Clock, XCircle } from 'lucide-react';

export const BookingHistory = () => {
  const bookings = [
    { id: 'MBT7294', movie: 'Avatar', theatre: 'PVR Cinemas', seats: 'A5, A6', date: '2026-09-28', amount: '₹ 480', status: 'Confirmed' },
    { id: 'MBT7293', movie: 'Dune 2', theatre: 'INOX', seats: 'B10, B11', date: '2026-09-27', amount: '₹ 560', status: 'Confirmed' },
    { id: 'MBT7292', movie: 'Joker: Folie à Deux', theatre: 'PVR Cinemas', seats: 'C7, C8', date: '2026-09-26', amount: '₹ 440', status: 'Pending' },
    { id: 'MBT7291', movie: 'Avengers Endgame', theatre: 'Cinepolis', seats: 'D12, D13', date: '2026-09-25', amount: '₹ 620', status: 'Confirmed' },
    { id: 'MBT7290', movie: 'The Batman', theatre: 'INOX', seats: 'E5, E6', date: '2026-09-24', amount: '₹ 520', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-6 text-left animate-fade-in">
      <div className="movtego-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-heading)]">Bookings & E-Tickets</h1>
          <p className="text-xs text-[var(--text-muted)]">View all recent customer transactions, seat assignments, and reservation statuses.</p>
        </div>
      </div>

      <div className="movtego-card p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-[var(--text-muted)] uppercase border-b border-[var(--border)] pb-3">
              <th className="pb-3 font-semibold">Booking ID</th>
              <th className="pb-3 font-semibold">Movie Title</th>
              <th className="pb-3 font-semibold">Theatre</th>
              <th className="pb-3 font-semibold">Seats</th>
              <th className="pb-3 font-semibold">Show Date</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60 text-xs">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-[var(--primary-light)]/40 transition-colors">
                <td className="py-3.5 font-mono font-bold text-[var(--text-heading)]">{b.id}</td>
                <td className="py-3.5 font-bold text-[var(--text-heading)]">{b.movie}</td>
                <td className="py-3.5 text-[var(--text-muted)]">{b.theatre}</td>
                <td className="py-3.5 text-[var(--text-muted)] font-medium">{b.seats}</td>
                <td className="py-3.5 text-[var(--text-muted)]">{b.date}</td>
                <td className="py-3.5 font-bold text-[var(--text-heading)]">{b.amount}</td>
                <td className="py-3.5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

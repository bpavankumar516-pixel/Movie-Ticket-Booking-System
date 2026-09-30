import React, { useMemo } from 'react';
import { TrendingUp, IndianRupee, Ticket, Users, ArrowUpRight, Film, Building2, ShieldCheck, Clock } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useMovies } from '../../context/MovieContext';
import { useTheatre } from '../../context/TheatreContext';

export const Reports = () => {
  const { bookingHistory } = useBooking();
  const { movies } = useMovies();
  const { theatres } = useTheatre();

  // Dynamic Revenue Calculation
  const totalRevenue = useMemo(() => {
    if (!bookingHistory) return 0;
    return bookingHistory.reduce((acc, b) => {
      if (b.status === 'Confirmed') {
        const val = typeof b.totalPrice === 'number' ? b.totalPrice : parseFloat(String(b.amount || '0').replace(/[^0-9.]/g, '')) || 0;
        return acc + val;
      }
      return acc;
    }, 0);
  }, [bookingHistory]);

  const formattedRevenueStr = useMemo(() => {
    if (totalRevenue >= 100000) {
      return `₹ ${(totalRevenue / 100000).toFixed(2)} L`;
    }
    return `₹ ${totalRevenue.toLocaleString('en-IN')}`;
  }, [totalRevenue]);

  // Total Tickets Sold
  const totalTicketsSold = useMemo(() => {
    if (!bookingHistory) return 0;
    return bookingHistory.reduce((acc, b) => {
      if (b.status === 'Confirmed') {
        const count = Array.isArray(b.seats) ? b.seats.length : (b.seatsCount || 1);
        return acc + count;
      }
      return acc;
    }, 0);
  }, [bookingHistory]);

  // Revenue Breakdown by Theatre Brand
  const theatreRevenueBreakdown = useMemo(() => {
    if (!bookingHistory) return [];
    const map = {};
    bookingHistory.forEach(b => {
      if (b.status === 'Confirmed') {
        const name = b.theatreName || b.theatre || 'Multiplex';
        const val = typeof b.totalPrice === 'number' ? b.totalPrice : parseFloat(String(b.amount || '0').replace(/[^0-9.]/g, '')) || 0;
        map[name] = (map[name] || 0) + val;
      }
    });

    return Object.entries(map).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount);
  }, [bookingHistory]);

  return (
    <div className="space-y-6 text-left animate-fade-in pb-12">
      <div className="movtego-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-heading)] tracking-tight">Analytics & Revenue Reports</h1>
          <p className="text-xs text-[var(--text-muted)] font-medium mt-1">
            Real-time financial insights, ticket transaction logs, seat occupancy stats, and multiplex earnings analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold shrink-0">
          <span className="px-3.5 py-1.5 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
            📊 Live System Sync Active
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="movtego-card p-5 space-y-2 border border-[var(--border)] rounded-2xl bg-[var(--bg-card)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Total Revenue</span>
            <div className="p-2.5 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[var(--text-heading)]">{formattedRevenueStr}</p>
          <span className="text-xs text-[var(--primary)] font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Live Confirmed Earnings
          </span>
        </div>

        <div className="movtego-card p-5 space-y-2 border border-[var(--border)] rounded-2xl bg-[var(--bg-card)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Tickets Sold</span>
            <div className="p-2.5 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[var(--text-heading)]">{totalTicketsSold.toLocaleString('en-IN')}</p>
          <span className="text-xs text-[var(--primary)] font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Total Reserved Seats
          </span>
        </div>

        <div className="movtego-card p-5 space-y-2 border border-[var(--border)] rounded-2xl bg-[var(--bg-card)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Active Movies</span>
            <div className="p-2.5 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[var(--text-heading)]">{movies ? movies.length : 0}</p>
          <span className="text-xs text-[var(--primary)] font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Catalog Titles
          </span>
        </div>

        <div className="movtego-card p-5 space-y-2 border border-[var(--border)] rounded-2xl bg-[var(--bg-card)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Active Multiplexes</span>
            <div className="p-2.5 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[var(--text-heading)]">{theatres ? theatres.length : 0}</p>
          <span className="text-xs text-[var(--primary)] font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Registered Theatres
          </span>
        </div>

      </div>

      {/* Revenue by Theatre Table */}
      <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 shadow-sm">
        <h3 className="text-base font-black text-[var(--text-heading)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[var(--primary)]" /> Multiplex Revenue Performance Breakdown
        </h3>

        {theatreRevenueBreakdown.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-[var(--text-muted)] uppercase border-b border-[var(--border)] pb-2">
                  <th className="pb-3 font-black">Rank</th>
                  <th className="pb-3 font-black">Theatre Name</th>
                  <th className="pb-3 font-black">Total Revenue Earned</th>
                  <th className="pb-3 font-black text-right">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60 font-medium">
                {theatreRevenueBreakdown.map((item, idx) => {
                  const percent = totalRevenue > 0 ? Math.round((item.amount / totalRevenue) * 100) : 100;
                  return (
                    <tr key={idx} className="hover:bg-[var(--primary-light)]/30 transition-colors">
                      <td className="py-3.5 font-bold text-[var(--text-muted)]">#{idx + 1}</td>
                      <td className="py-3.5 font-black text-[var(--text-heading)]">{item.name}</td>
                      <td className="py-3.5 font-black text-emerald-500 text-sm">₹ {item.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-bold text-[var(--primary)]">{percent}%</span>
                          <div className="w-20 bg-[var(--input-bg)] rounded-full h-1.5 overflow-hidden border border-[var(--border)]">
                            <div className="h-full bg-primary-gradient rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[var(--text-muted)]">
            No booking transaction data logged yet.
          </div>
        )}
      </div>

    </div>
  );
};


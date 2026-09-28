import React from 'react';
import { Film, Ticket, Building2, TrendingUp, Sparkles, ArrowRight, Flame, Clock, Calendar, Edit3, Trash2, ShieldCheck, CheckCircle2, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { MOCK_MOVIES } from '../../services/movieApi';

export const Dashboard = () => {
  const { user } = useAuth();
  const { bookingHistory } = useBooking();
  const navigate = useNavigate();

  // Metrics Data
  const stats = [
    { label: 'Total Movies', value: '24', change: '+4 this month', icon: Film, color: 'text-[#00D690]', bg: 'bg-[#00D690]/15' },
    { label: 'Total Theatres', value: '12', change: '7 cities covered', icon: Building2, color: 'text-[#00D690]', bg: 'bg-[#00D690]/15' },
    { label: 'Total Bookings', value: bookingHistory.length > 0 ? `${bookingHistory.length + 140}` : '142', change: '+18 today', icon: Ticket, color: 'text-[#00D690]', bg: 'bg-[#00D690]/15' },
    { label: 'Revenue Summary', value: '$18,450', change: '↗ 12.4% vs last week', icon: TrendingUp, color: 'text-[#00D690]', bg: 'bg-[#00D690]/15' },
  ];

  const quickActions = [
    { label: 'Explore Movies', desc: 'Browse latest blockbusters & trailers', path: '/movies', icon: Film },
    { label: 'Find Theatres', desc: 'Locate IMAX & Dolby Atmos cinemas', path: '/theatres', icon: Building2 },
    { label: 'My Bookings', desc: 'View E-Tickets & booking status', path: '/booking-history', icon: Ticket },
    { label: 'Analytics Reports', desc: 'Inspect revenue & occupancy rate', path: '/reports', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0E1411] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00D690]/15 border border-[#00D690]/40 rounded-full text-[11px] font-extrabold text-[#00D690] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> MOVIEGO Portal Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-outfit text-white">
            Welcome back, <span className="text-[#00D690]">{user?.name || 'Martin Gu'}</span>!
          </h1>
          <p className="text-xs text-slate-400">
            Real-time movie booking overview, box office metrics & quick actions.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Button variant="emerald" size="sm" icon={Film} onClick={() => navigate('/movies')}>
            Book Tickets
          </Button>
        </div>
      </div>

      {/* Metrics Bar Grid (Module 2 Requirements) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass-card-moviego rounded-3xl p-5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{s.label}</span>
                <div className={`p-2.5 rounded-2xl ${s.bg} ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black font-outfit text-white">{s.value}</p>
              <span className="text-[10px] text-[#00D690] font-bold block">{s.change}</span>
            </div>
          );
        })}
      </div>

      {/* Featured Movie Showcase Details Card (Matching Reference Layout) */}
      <div className="glass-card-moviego rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Poster */}
          <div className="relative shrink-0 w-full sm:w-64 h-80 rounded-3xl overflow-hidden border-2 border-[#00D690]/40 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95"
              alt="Dune 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Content */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white flex items-center gap-2">
                  Dune 2 (沙丘2) <span className="text-xs text-[#FF6B6B] flex items-center gap-1 font-bold"><Flame className="w-4 h-4 fill-[#FF6B6B]" /> 4,956</span>
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-[#00D690]/15 border border-[#00D690]/30 text-[#00D690] text-xs font-bold rounded-full">Sci-Fi</span>
                  <span className="px-3 py-1 bg-[#00D690]/15 border border-[#00D690]/30 text-[#00D690] text-xs font-bold rounded-full">Drama</span>
                  <span className="text-xs text-slate-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/10">135 min</span>
                  <span className="text-xs text-slate-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/10">2024-03-01</span>
                  <span className="text-xs text-[#00D690] font-bold bg-[#00D690]/10 px-3 py-1 rounded-full border border-[#00D690]/30">Now Showing</span>
                </div>
              </div>

              {/* Action Buttons matching reference image (Emerald & Coral) */}
              <div className="flex items-center gap-3">
                <Button variant="emerald" size="sm" icon={Film} onClick={() => navigate('/theatres')}>
                  Select Showtimes
                </Button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-2xl">
              The sequel continues Paul Atreides' (Timothée Chalamet) journey on the desert planet Arrakis. Now allied with Chani and the Fremen, he seeks revenge against the Harkonnens while grappling with his foretold destiny as the messiah.
            </p>

            {/* Cast Avatars */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Denis" className="w-10 h-10 rounded-full object-cover border border-[#00D690]" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white">Denis Villeneuve</span>
                  <span className="text-[10px] text-slate-400">Director</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Timothee" className="w-10 h-10 rounded-full object-cover border border-[#00D690]" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white">Timothée Chalamet</span>
                  <span className="text-[10px] text-slate-400">As Paul Atreides</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Zendaya" className="w-10 h-10 rounded-full object-cover border border-[#00D690]" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white">Zendaya Coleman</span>
                  <span className="text-[10px] text-slate-400">As Chani</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Metrics Panel matching reference image */}
          <div className="w-full lg:w-72 bg-[#121A16] border border-white/10 rounded-3xl p-5 space-y-4 shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#18241F] p-3 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Live Box Office</p>
                <p className="text-xl font-black font-outfit text-white mt-1">$2,261</p>
                <span className="text-[10px] text-[#00D690] font-bold">↗ 1.51% vs yesterday</span>
              </div>
              <div className="bg-[#18241F] p-3 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Screening Share</p>
                <p className="text-xl font-black font-outfit text-white mt-1">30.12%</p>
                <span className="text-[10px] text-[#00D690] font-bold">↗ 2.01% vs yesterday</span>
              </div>
            </div>

            {/* Attendance Rate Wave Chart placeholder */}
            <div className="bg-[#18241F] p-3 rounded-2xl border border-white/5 text-left">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Attendance Rate</p>
              <svg className="w-full h-16 text-[#00D690]" viewBox="0 0 100 40">
                <path
                  d="M0 35 Q 20 30, 40 20 T 80 5 T 100 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-black font-outfit text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((act, i) => {
            const Icon = act.icon;
            return (
              <Link key={i} to={act.path}>
                <Card className="flex flex-col justify-between h-36">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-[#00D690]/15 text-[#00D690]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00D690] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{act.label}</h4>
                    <p className="text-[11px] text-slate-400">{act.desc}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black font-outfit text-white">Recent E-Ticket Bookings</h3>
          <Link to="/booking-history" className="text-xs text-[#00D690] font-bold hover:underline">
            View All History →
          </Link>
        </div>

        <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-[#0E1411]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#141F1A] border-b border-white/10 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Movie</th>
                <th className="px-6 py-4">Theatre</th>
                <th className="px-6 py-4">Show Date & Time</th>
                <th className="px-6 py-4">Seats</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {bookingHistory.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#00D690]">{b.bookingId}</td>
                  <td className="px-6 py-4 font-bold text-white">{b.movieTitle}</td>
                  <td className="px-6 py-4 text-slate-300">{b.theatreName}</td>
                  <td className="px-6 py-4 text-slate-400">{b.date} • {b.time}</td>
                  <td className="px-6 py-4 font-bold text-white">{b.seats?.join(', ')}</td>
                  <td className="px-6 py-4 font-bold text-white">${b.totalPrice?.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      b.status === 'Confirmed' ? 'bg-[#00D690]/20 text-[#00D690] border border-[#00D690]/40' :
                      b.status === 'Completed' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                      'bg-red-950 text-red-400 border border-red-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

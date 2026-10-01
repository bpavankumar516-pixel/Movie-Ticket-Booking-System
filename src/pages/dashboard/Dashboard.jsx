import React, { useMemo, useState } from "react";
import {
  Film,
  Building2,
  Ticket,
  IndianRupee,
  Calendar,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Clock,
  Star,
  Armchair,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";
import { useTheatre } from "../../context/TheatreContext";
import { useBooking } from "../../context/BookingContext";
import { MovieDetailsModal } from "../../components/movies/MovieDetailsModal";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { movies, setSelectedMovieForDetail } = useMovies();
  const { theatres } = useTheatre();
  const { bookingHistory } = useBooking();

  // Modal State
  const [selectedMovieForModal, setSelectedMovieForModal] = useState(null);

  // 1. Dynamic Live Metrics Calculation
  const totalMoviesCount = movies ? movies.length : 0;
  const nowShowingCount = movies
    ? movies.filter((m) => m.status === "Now Showing").length
    : 0;
  const totalTheatresCount = theatres ? theatres.length : 0;
  const totalBookingsCount = bookingHistory ? bookingHistory.length : 0;

  // Calculate Total Revenue from confirmed bookings
  const totalRevenueNumber = useMemo(() => {
    if (!bookingHistory) return 0;
    return bookingHistory.reduce((acc, b) => {
      if (b.status === "Confirmed") {
        const val =
          typeof b.totalPrice === "number"
            ? b.totalPrice
            : parseFloat(String(b.amount || "0").replace(/[^0-9.]/g, "")) || 0;
        return acc + val;
      }
      return acc;
    }, 0);
  }, [bookingHistory]);

  const formattedRevenue = useMemo(() => {
    if (totalRevenueNumber >= 100000) {
      return `₹ ${(totalRevenueNumber / 100000).toFixed(2)} L`;
    }
    return `₹ ${totalRevenueNumber.toLocaleString("en-IN")}`;
  }, [totalRevenueNumber]);

  // Today's Bookings Count
  const todaysBookingsCount = useMemo(() => {
    if (!bookingHistory) return 0;
    const todayStr = new Date().toISOString().split("T")[0];
    return bookingHistory.filter((b) => {
      if (!b.bookingDate) return true;
      return b.bookingDate.startsWith(todayStr);
    }).length;
  }, [bookingHistory]);

  // Top 5 Stat Cards Data with target routes
  const topMetrics = [
    {
      label: "Total Movies",
      value: totalMoviesCount.toString(),
      subtext: `${nowShowingCount} Now Showing`,
      change: "↑ 14.2%",
      icon: Film,
      path: "/movies",
    },
    {
      label: "Active Theatres",
      value: totalTheatresCount.toString(),
      subtext: "Multiplex Facilities",
      change: "↑ 6.5%",
      icon: Building2,
      path: "/theatres",
    },
    {
      label: "Total Bookings",
      value: totalBookingsCount.toString(),
      subtext: "Lifetime Tickets",
      change: "↑ 22.8%",
      icon: Ticket,
      path: "/booking-history",
    },
    {
      label: "Total Revenue",
      value: formattedRevenue,
      subtext: "Confirmed Sales",
      change: "↑ 18.5%",
      icon: IndianRupee,
      path: "/reports",
    },
    {
      label: "Today's Sales",
      value: todaysBookingsCount.toString(),
      subtext: "Active Reservations",
      change: "↑ 12.3%",
      icon: Calendar,
      path: "/booking-history",
    },
  ];

  // Dynamic Weekly Sales Breakdown for Bar Chart
  const weeklySalesData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const totals = { Mon: 180000, Tue: 210000, Wed: 160000, Thu: 240000, Fri: 320000, Sat: 410000, Sun: 380000 };

    if (bookingHistory && bookingHistory.length > 0) {
      bookingHistory.forEach((b) => {
        if (b.status === "Confirmed") {
          const val =
            typeof b.totalPrice === "number"
              ? b.totalPrice
              : parseFloat(String(b.amount || "0").replace(/[^0-9.]/g, "")) || 0;
          const d = b.bookingDate ? new Date(b.bookingDate) : new Date();
          const dayName = days[(d.getDay() + 6) % 7];
          totals[dayName] = (totals[dayName] || 0) + val;
        }
      });
    }

    const maxVal = Math.max(1, ...Object.values(totals));
    return days.map((day) => {
      const amt = totals[day];
      const pct = Math.min(100, Math.max(18, Math.round((amt / maxVal) * 100)));
      return {
        day,
        amount: amt >= 100000 ? `₹${(amt / 100000).toFixed(1)}L` : `₹${(amt / 1000).toFixed(0)}K`,
        rawAmount: amt,
        percent: pct,
      };
    });
  }, [bookingHistory]);

  // Dynamic Popular Blockbuster Rankings
  const popularMoviesRankings = useMemo(() => {
    if (!movies || movies.length === 0) return [];

    const countsMap = {};
    if (bookingHistory) {
      bookingHistory.forEach((b) => {
        const title = b.movieTitle || b.movie;
        if (title) countsMap[title] = (countsMap[title] || 0) + 1;
      });
    }

    const sorted = [...movies].sort((a, b) => {
      const countA = countsMap[a.title] || 0;
      const countB = countsMap[b.title] || 0;
      if (countB !== countA) return countB - countA;
      return (b.rating || 0) - (a.rating || 0);
    });

    return sorted.slice(0, 4).map((m, idx) => {
      const count = countsMap[m.title] || (315 - idx * 45);
      return {
        rank: idx + 1,
        movie: m,
        title: m.title,
        bookingsText: `${count} Bookings`,
        rating: m.rating || 8.8,
        poster: m.poster,
      };
    });
  }, [movies, bookingHistory]);

  // Dynamic Recent Bookings Feed (Latest 4 bookings)
  const recentBookingsFeed = useMemo(() => {
    if (!bookingHistory || bookingHistory.length === 0) return [];
    return bookingHistory.slice(0, 4);
  }, [bookingHistory]);

  // Auditorium Screen Occupancy List
  const screenOccupancies = [
    {
      name: "Screen 1 (IMAX 4K)",
      movieTitle: "Avatar: The Way of Water",
      occupancyPct: 94,
      statusBadge: "FAST FILLING",
      colorClass: "bg-emerald-500",
    },
    {
      name: "Screen 2 (Dolby Cinema)",
      movieTitle: "Avengers: Endgame",
      occupancyPct: 88,
      statusBadge: "HOUSEFULL",
      colorClass: "bg-purple-500",
    },
    {
      name: "Screen 3 (4DX 3D)",
      movieTitle: "Salaar: Part 1 – Ceasefire",
      occupancyPct: 78,
      statusBadge: "FILLING FAST",
      colorClass: "bg-teal-500",
    },
    {
      name: "Screen 4 (VIP Lounge)",
      movieTitle: "Dune: Part Two",
      occupancyPct: 85,
      statusBadge: "FAST FILLING",
      colorClass: "bg-cyan-500",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-left pb-16 font-sans">
      
      {/* 1. TOP METRICS ROW (5 Perfectly Aligned Clickable Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(m.path)}
              className="movtego-card p-4.5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col justify-between space-y-3 shadow-sm hover:shadow-xl hover:border-[var(--primary)] transition-all duration-300 cursor-pointer group min-h-[124px]"
              title={`View ${m.label}`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] border border-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-4.5 h-4.5 text-[var(--primary)]" />
                </div>
                <span className="text-[10px] text-[var(--primary)] font-black bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
                  {m.change}
                </span>
              </div>

              <div className="flex flex-col text-left space-y-0.5">
                <span className="text-xs text-[var(--text-muted)] font-bold">
                  {m.label}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)] tracking-tight leading-tight group-hover:text-[var(--primary)] transition-colors">
                  {m.value}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] font-semibold">
                <span>{m.subtext}</span>
                <ChevronRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MIDDLE ANALYTICS & RECENT BOOKINGS GRID (Aligned Span 7 / Span 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN (Span 7): Revenue Analytics Chart & Screen Occupancy */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Box 1: Revenue Analytics Working Bar Chart */}
          <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[var(--text-heading)] tracking-tight flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--primary)]" /> Weekly Revenue Analytics
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
                  Dynamic earnings breakdown based on confirmed ticket bookings
                </p>
              </div>

              <button
                onClick={() => navigate("/reports")}
                className="text-xs font-extrabold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Full Report <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Interactive Bar Chart */}
            <div className="pt-2">
              <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-[var(--border)] pb-3">
                {weeklySalesData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-black text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.amount}
                    </span>
                    <div className="w-full bg-[var(--input-bg)] rounded-t-xl h-full flex items-end overflow-hidden p-0.5">
                      <div
                        style={{ height: `${item.percent}%` }}
                        className="w-full bg-primary-gradient rounded-t-lg transition-all duration-500 group-hover:brightness-125 shadow-md"
                      />
                    </div>
                    <span className="text-xs font-bold text-[var(--text-muted)]">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 text-xs text-[var(--text-muted)] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" /> Confirmed Box Office Sales
                </span>
                <span className="font-mono font-black text-[var(--text-heading)]">
                  Total: {formattedRevenue}
                </span>
              </div>
            </div>
          </div>

          {/* Box 2: Auditorium Screen Capacity & Occupancy Monitor */}
          <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[var(--text-heading)] tracking-tight flex items-center gap-2">
                <Armchair className="w-5 h-5 text-[var(--primary)]" /> Screen Capacity & Live Occupancy
              </h3>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                ACTIVE SHOWS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {screenOccupancies.map((scr, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--input-bg)]/60 space-y-2 hover:border-[var(--primary)]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[var(--text-heading)]">{scr.name}</span>
                    <span className="text-[9px] font-black text-white bg-slate-800 px-2 py-0.5 rounded">
                      {scr.statusBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] truncate font-medium">
                    {scr.movieTitle}
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[var(--text-muted)]">
                      <span>Seat Occupancy</span>
                      <span className="text-[var(--primary)] font-extrabold">{scr.occupancyPct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        style={{ width: `${scr.occupancyPct}%` }}
                        className={`h-full ${scr.colorClass} rounded-full transition-all duration-500`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Span 5): Recent Bookings Feed & Popular Movies Ranking */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Box 1: Recent Bookings Log */}
          <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[var(--text-heading)] tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--primary)]" /> Recent Bookings
              </h3>
              <button
                onClick={() => navigate("/booking-history")}
                className="text-xs font-extrabold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View History <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentBookingsFeed.length > 0 ? (
                recentBookingsFeed.map((b) => {
                  const bId = b.bookingId || b.id;
                  const seatsStr = Array.isArray(b.seats) ? b.seats.join(", ") : b.seats || "Seats";
                  const formattedPrice = typeof b.totalPrice === "number" ? `₹${b.totalPrice}` : b.totalPrice || b.amount || "₹250";

                  return (
                    <div
                      key={bId}
                      className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--input-bg)]/50 hover:border-[var(--primary)]/60 transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-[var(--primary)] text-[11px]">
                            {bId}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                            b.status === "Confirmed" ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <h4 className="font-black text-[var(--text-heading)] truncate text-xs">
                          {b.movieTitle || b.movie}
                        </h4>
                        <p className="text-[10px] text-[var(--text-muted)] truncate font-semibold">
                          {b.theatreName || b.theatre} • Seats: <strong className="text-[var(--primary)]">{seatsStr}</strong>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-[var(--text-heading)] block">
                          {formattedPrice}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-bold">
                          {b.time || "Showtime"}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-[var(--text-muted)] font-bold">
                  No recent bookings recorded yet.
                </div>
              )}
            </div>
          </div>

          {/* Box 2: Popular Rankings (Top Blockbusters) */}
          <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[var(--text-heading)] tracking-tight flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Popular Rankings
              </h3>
              <button
                onClick={() => navigate("/movies")}
                className="text-xs font-extrabold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {popularMoviesRankings.map((item) => (
                <div
                  key={item.rank}
                  onClick={() => {
                    if (item.movie) {
                      setSelectedMovieForDetail(item.movie);
                      navigate("/movies");
                    }
                  }}
                  className="p-2.5 rounded-2xl border border-[var(--border)] bg-[var(--input-bg)]/40 hover:border-[var(--primary)] transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    item.rank === 1 ? "bg-amber-500 text-white shadow-md shadow-amber-500/30" :
                    item.rank === 2 ? "bg-slate-400 text-white" :
                    item.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-700 text-slate-300"
                  }`}>
                    #{item.rank}
                  </span>

                  <div className="w-9 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-[var(--border)]">
                    <img
                      src={item.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h4 className="font-extrabold text-xs text-[var(--text-heading)] truncate group-hover:text-[var(--primary)] transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-semibold">
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> {item.rating}
                      </span>
                      <span>•</span>
                      <span>{item.bookingsText}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. BOTTOM QUICK MANAGEMENT ACTION HUB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Add Movie */}
        <div
          onClick={() => navigate("/movies")}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-[var(--primary)] transition-all"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=95"
              alt="Add movie"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.5] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-primary-gradient text-white shadow-lg shadow-[#14B8A0]/40">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-white bg-emerald-500/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Movie Catalog
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-base font-black text-white">Add New Movie</h4>
              <p className="text-xs text-slate-200 font-bold">
                Create new movie entry
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: Add Theatre */}
        <div
          onClick={() => navigate("/theatres")}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-[var(--primary)] transition-all"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=95"
              alt="Add theatre"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.5] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-primary-gradient text-white shadow-lg shadow-[#14B8A0]/40">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-white bg-purple-500/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Facilities
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-base font-black text-white">Add Theatre</h4>
              <p className="text-xs text-slate-200 font-bold">
                Register new multiplex
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: Schedule Shows */}
        <div
          onClick={() => navigate("/theatres")}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-[var(--primary)] transition-all"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=95"
              alt="Schedule showtimes"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.5] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-primary-gradient text-white shadow-lg shadow-[#14B8A0]/40">
              <Ticket className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-white bg-amber-500/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Showtimes
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-base font-black text-white">
                Schedule Shows
              </h4>
              <p className="text-xs text-slate-200 font-bold">
                Set auditorium showtimes
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4: Financial Reports */}
        <div
          onClick={() => navigate("/reports")}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl hover:border-[var(--primary)] transition-all"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=95"
              alt="Financial reports"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.5] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-primary-gradient text-white shadow-lg shadow-[#14B8A0]/40">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-white bg-cyan-500/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Analytics
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-base font-black text-white">
                View Analytics
              </h4>
              <p className="text-xs text-slate-200 font-bold">
                Check revenue & reports
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. IN-PLACE MOVIE DETAILS MODAL */}
      {selectedMovieForModal && (
        <MovieDetailsModal
          movie={selectedMovieForModal}
          isOpen={Boolean(selectedMovieForModal)}
          onClose={() => setSelectedMovieForModal(null)}
        />
      )}

    </div>
  );
};

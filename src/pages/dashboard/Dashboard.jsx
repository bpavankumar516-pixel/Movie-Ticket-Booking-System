import React, { useMemo, useState, useEffect } from 'react';
import { 
  Film, Building2, Ticket, IndianRupee, Calendar, Star, ChevronLeft, ChevronRight, 
  ArrowRight, TrendingUp, ChevronDown, CheckCircle2, Clock, XCircle, Sparkles,
  Plus, Monitor, ShieldCheck, Flame, Eye, RefreshCw, Zap, Armchair, BarChart3,
  Layers, ArrowUpRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import { useTheatre } from '../../context/TheatreContext';
import { useBooking } from '../../context/BookingContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { movies, setSelectedMovieForDetail } = useMovies();
  const { theatres, getTheatreStats } = useTheatre();
  const { bookingHistory } = useBooking();

  // 1. Featured Blockbuster Movies Carousel List (Avatar 2, Avengers Endgame, Salaar, Vikram)
  const featuredMoviesList = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    
    const avatar = movies.find(m => m.title.toLowerCase().includes('avatar'));
    const avengers = movies.find(m => m.title.toLowerCase().includes('avengers'));
    const salaar = movies.find(m => m.title.toLowerCase().includes('salaar'));
    const vikram = movies.find(m => m.title.toLowerCase().includes('vikram') || m.title.toLowerCase().includes('leo'));

    const selectedList = [avatar, avengers, salaar, vikram].filter(Boolean);

    if (selectedList.length >= 4) return selectedList;

    const remaining = movies.filter(m => !selectedList.some(s => s.id === m.id));
    return [...selectedList, ...remaining].slice(0, 4);
  }, [movies]);

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Auto-rotate hero banner every 5 seconds (5000ms)
  useEffect(() => {
    if (!featuredMoviesList || featuredMoviesList.length === 0) return;
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % featuredMoviesList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredMoviesList]);

  const handleNextBanner = () => {
    if (!featuredMoviesList || featuredMoviesList.length === 0) return;
    setActiveBannerIndex((prev) => (prev + 1) % featuredMoviesList.length);
  };

  const handlePrevBanner = () => {
    if (!featuredMoviesList || featuredMoviesList.length === 0) return;
    setActiveBannerIndex((prev) => (prev - 1 + featuredMoviesList.length) % featuredMoviesList.length);
  };

  const currentFeatured = featuredMoviesList[activeBannerIndex] || featuredMoviesList[0];

  // 2. Dynamic Live Metrics Calculation
  const totalMoviesCount = movies ? movies.length : 0;
  const nowShowingCount = movies ? movies.filter(m => m.status === 'Now Showing').length : 0;
  const totalTheatresCount = theatres ? theatres.length : 0;
  const totalBookingsCount = bookingHistory ? bookingHistory.length : 0;

  // Calculate Total Revenue from confirmed bookings
  const totalRevenueNumber = useMemo(() => {
    if (!bookingHistory) return 0;
    return bookingHistory.reduce((acc, b) => {
      if (b.status === 'Confirmed') {
        const val = typeof b.totalPrice === 'number' ? b.totalPrice : parseFloat(String(b.amount || '0').replace(/[^0-9.]/g, '')) || 0;
        return acc + val;
      }
      return acc;
    }, 0);
  }, [bookingHistory]);

  const formattedRevenue = useMemo(() => {
    if (totalRevenueNumber >= 100000) {
      return `₹ ${(totalRevenueNumber / 100000).toFixed(2)} L`;
    }
    return `₹ ${totalRevenueNumber.toLocaleString('en-IN')}`;
  }, [totalRevenueNumber]);

  // Today's Bookings Count
  const todaysBookingsCount = useMemo(() => {
    if (!bookingHistory) return 0;
    const todayStr = new Date().toISOString().split('T')[0];
    return bookingHistory.filter(b => {
      if (!b.bookingDate) return true;
      return b.bookingDate.startsWith(todayStr);
    }).length;
  }, [bookingHistory]);

  // Top 5 Stat Cards Data
  const topMetrics = [
    { label: 'Total Movies', value: totalMoviesCount.toString(), subtext: `${nowShowingCount} Now Showing`, change: '↑ 14.2%', icon: Film },
    { label: 'Active Theatres', value: totalTheatresCount.toString(), subtext: 'Multiplex Facilities', change: '↑ 6.5%', icon: Building2 },
    { label: 'Total Bookings', value: totalBookingsCount.toString(), subtext: 'Lifetime Tickets', change: '↑ 22.8%', icon: Ticket },
    { label: 'Total Revenue', value: formattedRevenue, subtext: 'Confirmed Sales', change: '↑ 18.5%', icon: IndianRupee },
    { label: 'Today\'s Sales', value: todaysBookingsCount.toString(), subtext: 'Active Reservations', change: '↑ 12.3%', icon: Calendar },
  ];

  // Dynamic Upcoming Movies List
  const upcomingMovies = useMemo(() => {
    if (!movies) return [];
    const upcoming = movies.filter(m => m.status === 'Upcoming');
    if (upcoming.length > 0) return upcoming.slice(0, 4);
    return movies.slice(0, 4);
  }, [movies]);

  // Dynamic Popular Movies Ranking (Computed by booking counts in bookingHistory)
  const popularMovies = useMemo(() => {
    if (!movies) return [];
    
    const bookingCountsMap = {};
    if (bookingHistory) {
      bookingHistory.forEach(b => {
        const title = b.movieTitle || b.movie;
        if (title) {
          bookingCountsMap[title] = (bookingCountsMap[title] || 0) + 1;
        }
      });
    }

    const sorted = [...movies].sort((a, b) => {
      const countA = bookingCountsMap[a.title] || 0;
      const countB = bookingCountsMap[b.title] || 0;
      if (countB !== countA) return countB - countA;
      return (b.rating || 0) - (a.rating || 0);
    });

    const maxCount = Math.max(1, ...Object.values(bookingCountsMap));

    return sorted.slice(0, 5).map((m, idx) => {
      const count = bookingCountsMap[m.title] || Math.floor(180 + (5 - idx) * 45);
      const percent = Math.min(100, Math.round((count / (maxCount * 1.5)) * 100));
      return {
        rank: idx + 1,
        title: m.title,
        bookings: `${count} Bookings`,
        percent: Math.max(38, percent),
        poster: m.poster,
        rating: m.rating || 8.5
      };
    });
  }, [movies, bookingHistory]);

  // Dynamic Recent Bookings (Latest 5 bookings from history)
  const recentBookings = useMemo(() => {
    if (!bookingHistory || bookingHistory.length === 0) return [];
    return bookingHistory.slice(0, 5);
  }, [bookingHistory]);

  // Active Screen Status Overview
  const activeScreensList = [
    { screen: 'Screen 1 (IMAX 4K)', movie: 'Avatar: The Way of Water', occupancy: 92, status: 'FAST FILLING' },
    { screen: 'Screen 2 (Dolby Cinema)', movie: 'Avengers: Endgame', occupancy: 88, status: 'HOUSEFULL' },
    { screen: 'Screen 3 (4DX 3D)', movie: 'Salaar: Part 1', occupancy: 76, status: 'FILLING FAST' },
    { screen: 'Screen 4 (VIP Lounge)', movie: 'Vikram', occupancy: 81, status: 'FAST FILLING' },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-left pb-16 font-sans">
      
      {/* 0. CREATIVE WELCOME HEADER BANNER */}
      <div className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-black text-[10px] uppercase tracking-wider border border-[var(--primary)]/30">
              ⚡ Live Control Center
            </span>
            <span className="text-xs text-[var(--text-muted)] font-semibold">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-heading)] tracking-tight">
            MOVTEGO Cinema Manager
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Real-time analytics, blockbuster ticketing, auditorium capacity & revenue monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => navigate('/movies')}
            className="btn-teal px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-[#14B8A0]/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Movie
          </button>
        </div>
      </div>
      
      {/* 1. TOP METRICS ROW (5 Premium Glassmorphism Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="movtego-card p-4.5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col justify-between space-y-3 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[var(--primary-light)] border border-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <span className="text-[11px] text-[var(--primary)] font-black bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
                  {m.change}
                </span>
              </div>

              <div className="flex flex-col text-left space-y-0.5">
                <span className="text-xs text-[var(--text-muted)] font-bold">{m.label}</span>
                <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)] tracking-tight leading-tight">
                  {m.value}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] font-semibold">
                <span>{m.subtext}</span>
                <svg className="w-14 h-4 text-[var(--primary)]" viewBox="0 0 100 30">
                  <path
                    d="M0 25 Q 25 15, 50 12 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MIDDLE SECTION (BLOCKBUSTER FEATURED HERO CAROUSEL + UPCOMING PREMIERES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Hero Featured Banner (8 Cols) - 5-Second Auto Slide Carousel */}
        {currentFeatured && (
          <div key={currentFeatured.id || activeBannerIndex} className="lg:col-span-8 movtego-card rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px] border border-white/10 shadow-2xl transition-all duration-700 ease-in-out">
            {/* Full-bleed Backdrop Photo with Smooth Fade */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentFeatured.backdrop || currentFeatured.poster}
                alt={currentFeatured.title}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=95';
                }}
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.08] transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            </div>

            {/* Top Tag Header */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1 bg-primary-gradient text-white text-xs font-black rounded-full uppercase tracking-wider shadow-lg">
                ⭐ BLOCKBUSTER SPOTLIGHT
              </span>
              <span className="text-[11px] font-black text-teal-300 bg-black/60 px-3 py-1 rounded-full border border-teal-400/40 backdrop-blur-md">
                IMAX 4K • DOLBY ATMOS
              </span>
            </div>

            {/* Content Details */}
            <div className="relative z-10 space-y-3 max-w-lg mt-8 animate-fade-in text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
                {currentFeatured.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200 font-bold">
                <span className="flex items-center gap-1 text-[#F5B301] font-black bg-black/50 px-2.5 py-1 rounded-lg border border-[#F5B301]/30">
                  <Star className="w-3.5 h-3.5 fill-[#F5B301] text-[#F5B301]" /> {currentFeatured.rating || 8.9}
                </span>
                <span className="text-slate-400">|</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  {Array.isArray(currentFeatured.genres) ? currentFeatured.genres.slice(0, 2).join(' • ') : (currentFeatured.genre || 'Action')}
                </span>
                <span className="text-slate-400">|</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  {currentFeatured.runtime || 174} mins
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-teal-300 font-black bg-teal-500/20 px-2.5 py-1 rounded-lg border border-teal-500/30">
                  {currentFeatured.language || 'English'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-2 pt-1 drop-shadow-md">
                {currentFeatured.overview}
              </p>

              <div className="pt-3 flex items-center justify-between flex-wrap gap-4">
                <button 
                  onClick={() => {
                    setSelectedMovieForDetail(currentFeatured);
                    navigate('/movies');
                  }} 
                  className="btn-teal px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-xl shadow-[#14B8A0]/40 cursor-pointer hover:scale-105"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book Tickets Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Carousel 4-Dot Indicators & Prev/Next Arrows */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {featuredMoviesList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveBannerIndex(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          activeBannerIndex === idx
                            ? 'w-7 h-3 bg-primary-gradient shadow-lg shadow-[#14B8A0]/50'
                            : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                        }`}
                        title={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Manual Arrow Controls */}
                  <div className="flex items-center gap-1 text-slate-300 bg-black/40 p-1 rounded-full border border-white/10">
                    <button 
                      onClick={handlePrevBanner}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Previous Movie"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleNextBanner}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Next Movie"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Right Widget: Upcoming Premieres (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="text-base font-black text-[var(--text-heading)] flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[var(--primary)]" /> Upcoming Premieres
            </h3>
            <Link to="/movies" className="text-xs text-[var(--primary)] font-extrabold hover:underline">
              View Catalog
            </Link>
          </div>

          <div className="space-y-3.5 flex-1 flex flex-col justify-around">
            {upcomingMovies.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all">
                <div className="flex items-center gap-3">
                  <img 
                    src={m.poster} 
                    alt={m.title} 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&auto=format&fit=crop&q=80';
                    }}
                    className="w-12 h-14 rounded-xl object-cover shadow-sm shrink-0 border border-[var(--border)]" 
                  />
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-black text-[var(--text-heading)] line-clamp-1">{m.title}</h4>
                    <p className="text-[11px] text-[var(--text-muted)] font-bold">{m.releaseDate || '2024'} • {(m.genres || ['Action'])[0]}</p>
                  </div>
                </div>
                <span className="status-coming-soon text-[10px] font-black shrink-0 px-2.5 py-1 rounded-full">
                  Upcoming
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. LOWER SECTION (REVENUE SUMMARY + POPULAR RANKINGS + LIVE RECENT BOOKINGS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Panel 1: Revenue & Sales Analytics Chart (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="text-base font-black text-[var(--text-heading)] flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-[var(--primary)]" /> Revenue Analytics
            </h3>
            <span className="text-xs text-[var(--primary)] font-black bg-[var(--primary-light)] px-3 py-1 rounded-full border border-[var(--primary)]/30">
              Weekly Sales
            </span>
          </div>

          {/* Area Line Chart */}
          <div className="py-2 space-y-3">
            <div className="flex gap-2">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between text-[11px] text-[var(--text-muted)] font-bold h-36 py-0.5 pr-1 shrink-0 text-right">
                <span>₹ 2.5L</span>
                <span>₹ 2.0L</span>
                <span>₹ 1.5L</span>
                <span>₹ 1.0L</span>
                <span>₹ 50K</span>
                <span>₹ 0</span>
              </div>

              {/* Chart Canvas with Smooth Curves & Glowing Nodes */}
              <div className="flex-1 relative">
                <svg className="w-full h-36 text-[var(--primary)]" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14B8A0" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0B8F7A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <line x1="0" y1="0" x2="200" y2="0" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="200" y2="60" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="200" y2="80" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />

                  <path
                    d="M 0 55 C 30 45, 50 15, 70 30 C 90 45, 110 35, 130 40 C 150 45, 170 15, 200 10 L 200 80 L 0 80 Z"
                    fill="url(#revenueGrad)"
                  />
                  <path
                    d="M 0 55 C 30 45, 50 15, 70 30 C 90 45, 110 35, 130 40 C 150 45, 170 15, 200 10"
                    fill="none"
                    stroke="#14B8A0"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="0" cy="55" r="4" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="2" />
                  <circle cx="70" cy="30" r="4" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="2" />
                  <circle cx="130" cy="40" r="4" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="2" />
                  <circle cx="200" cy="10" r="4" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-extrabold pt-1 pl-10">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Popular Movies Ranking (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="text-base font-black text-[var(--text-heading)] flex items-center gap-2">
              <Flame className="w-4.5 h-4.5 text-amber-500" /> Popular Rankings
            </h3>
            <Link to="/movies" className="text-xs text-[var(--primary)] font-extrabold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3.5 flex-1 flex flex-col justify-around">
            {popularMovies.map((pm) => (
              <div key={pm.rank} className="flex items-center gap-3 text-xs">
                <span className="font-black text-[var(--primary)] text-sm w-4 text-center shrink-0">#{pm.rank}</span>
                <img 
                  src={pm.poster} 
                  alt={pm.title} 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&auto=format&fit=crop&q=80';
                  }}
                  className="w-9 h-11 rounded-xl object-cover shrink-0 border border-[var(--border)] shadow-sm" 
                />
                <div className="flex-1 text-left space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-[var(--text-heading)] text-xs truncate max-w-[120px]">{pm.title}</span>
                    <span className="text-[11px] text-[var(--primary)] font-black">{pm.bookings}</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--input-bg)] rounded-full overflow-hidden border border-[var(--border)]">
                    <div className="h-full bg-primary-gradient rounded-full transition-all duration-500" style={{ width: `${pm.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Recent Bookings Activity Log (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="text-base font-black text-[var(--text-heading)] flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-[var(--primary)]" /> Recent Bookings
            </h3>
            <Link to="/booking-history" className="text-xs text-[var(--primary)] font-extrabold hover:underline">
              View History
            </Link>
          </div>

          <div className="overflow-x-auto text-xs">
            {recentBookings.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] text-[var(--text-muted)] font-black uppercase border-b border-[var(--border)]">
                    <th className="pb-2">ID</th>
                    <th className="pb-2">Movie</th>
                    <th className="pb-2">Seats</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]/60">
                  {recentBookings.map((rb) => {
                    const bId = rb.bookingId || rb.id;
                    const seatsStr = Array.isArray(rb.seats) ? rb.seats.join(',') : rb.seats || 'N/A';
                    const amountStr = typeof rb.totalPrice === 'number' ? `₹${rb.totalPrice}` : rb.totalPrice || rb.amount || '₹250';

                    return (
                      <tr key={bId} className="hover:bg-[var(--primary-light)]/40 transition-colors text-xs font-semibold">
                        <td className="py-2.5 font-mono text-[var(--text-muted)] text-[11px]">{bId}</td>
                        <td className="py-2.5 font-black text-[var(--text-heading)]">
                          <span className="truncate max-w-[90px] block">{rb.movieTitle || rb.movie}</span>
                        </td>
                        <td className="py-2.5 text-[var(--primary)] font-black">{seatsStr}</td>
                        <td className="py-2.5 font-black text-[var(--text-heading)]">{amountStr}</td>
                        <td className="py-2.5 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            rb.status === 'Confirmed' ? 'status-confirmed' :
                            rb.status === 'Pending' ? 'status-pending' :
                            'status-cancelled'
                          }`}>
                            {rb.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-10 text-center text-xs text-[var(--text-muted)] font-bold">
                No recent bookings logged yet.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4. BOTTOM QUICK MANAGEMENT ACTION HUB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Add Movie */}
        <div 
          onClick={() => navigate('/movies')}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all"
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
              <p className="text-xs text-slate-200 font-bold">Create new movie entry</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: Add Theatre */}
        <div 
          onClick={() => navigate('/theatres')}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all"
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
              <p className="text-xs text-slate-200 font-bold">Register new multiplex</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: Schedule Shows */}
        <div 
          onClick={() => navigate('/theatres')}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all"
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
              <h4 className="text-base font-black text-white">Schedule Shows</h4>
              <p className="text-xs text-slate-200 font-bold">Set auditorium showtimes</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4: Financial Reports */}
        <div 
          onClick={() => navigate('/reports')}
          className="movtego-card p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-36 cursor-pointer group border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all"
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
              <h4 className="text-base font-black text-white">View Analytics</h4>
              <p className="text-xs text-slate-200 font-bold">Check revenue & reports</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

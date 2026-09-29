import React from 'react';
import { 
  Film, Building2, Ticket, IndianRupee, Calendar, Star, ChevronLeft, ChevronRight, 
  ArrowRight, TrendingUp, ChevronDown 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Top 5 Stat Cards Data matching screenshot specifications
  const topMetrics = [
    { label: 'Total Movies', value: '248', change: '↑ 12.4%', icon: Film },
    { label: 'Total Theatres', value: '42', change: '↑ 4.2%', icon: Building2 },
    { label: 'Total Bookings', value: '1,284', change: '↑ 18.2%', icon: Ticket },
    { label: 'Total Revenue', value: '₹ 8.42 L', change: '↑ 15.8%', icon: IndianRupee },
    { label: 'Today\'s Bookings', value: '86', change: '↑ 9.3%', icon: Calendar },
  ];

  // Upcoming Movies List matching screenshot
  const upcomingMovies = [
    { id: 1, title: 'Dune 2', release: '2024-03-01', genre: 'Sci-Fi', poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=200&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Deadpool & Wolverine', release: '2024-07-26', genre: 'Action', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80' },
    { id: 3, title: 'Joker: Folie à Deux', release: '2024-10-04', genre: 'Thriller', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&auto=format&fit=crop&q=80' },
    { id: 4, title: 'Gladiator II', release: '2024-11-22', genre: 'Action', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80' },
  ];

  // Popular Movies Ranking matching screenshot
  const popularMovies = [
    { rank: 1, title: 'Avatar', bookings: '352 Bookings', percent: 92, poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&auto=format&fit=crop&q=80' },
    { rank: 2, title: 'Dune 2', bookings: '298 Bookings', percent: 78, poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=100&auto=format&fit=crop&q=80' },
    { rank: 3, title: 'Avengers Endgame', bookings: '243 Bookings', percent: 64, poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&auto=format&fit=crop&q=80' },
    { rank: 4, title: 'Joker', bookings: '198 Bookings', percent: 52, poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&auto=format&fit=crop&q=80' },
    { rank: 5, title: 'The Batman', bookings: '176 Bookings', percent: 45, poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&auto=format&fit=crop&q=80' },
  ];

  // Recent Bookings Table matching screenshot exactly
  const recentBookings = [
    { id: 'MBT7294', movie: 'Avatar', theatre: 'PVR Cinemas', seats: 'A5,A6', amount: '₹ 480', status: 'Confirmed', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&auto=format&fit=crop&q=80' },
    { id: 'MBT7293', movie: 'Dune 2', theatre: 'INOX', seats: 'B10,B11', amount: '₹ 560', status: 'Confirmed', poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=100&auto=format&fit=crop&q=80' },
    { id: 'MBT7292', movie: 'Joker', theatre: 'PVR Cinemas', seats: 'C7,C8', amount: '₹ 440', status: 'Pending', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&auto=format&fit=crop&q=80' },
    { id: 'MBT7291', movie: 'Avengers', theatre: 'Cinepolis', seats: 'D12,D13', amount: '₹ 620', status: 'Confirmed', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&auto=format&fit=crop&q=80' },
    { id: 'MBT7290', movie: 'The Batman', theatre: 'INOX', seats: 'E5,E6', amount: '₹ 520', status: 'Cancelled', poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-5 animate-fade-in text-left">
      
      {/* 1. TOP METRICS ROW (5 Stat Cards matching specifications) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="movtego-card p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] border border-[var(--border)] text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] text-[var(--text-muted)] font-medium leading-none">{m.label}</span>
                  <span className="text-[26px] font-semibold text-[var(--text-heading)] tracking-tight leading-tight mt-0.5">
                    {m.value}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                <span className="text-[12px] text-[var(--primary)] font-medium flex items-center gap-0.5">
                  {m.change}
                </span>
                <svg className="w-16 h-5 text-[var(--primary)]" viewBox="0 0 100 30">
                  <path
                    d="M0 25 Q 25 18, 50 15 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MIDDLE SECTION (FEATURED HERO BANNER + UPCOMING MOVIES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Hero Featured Banner (8 Cols) */}
        <div className="lg:col-span-8 movtego-card rounded-[18px] p-6 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
          {/* Full-bleed Backdrop Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2400&auto=format&fit=crop&q=95"
              alt="Avatar Feature"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          </div>

          {/* Top Tag Badge with Primary Gradient */}
          <div className="relative z-10">
            <span className="px-3 py-1 bg-primary-gradient text-white text-[11px] font-semibold rounded-full uppercase tracking-wider shadow-sm">
              FEATURED
            </span>
          </div>

          {/* Content Details */}
          <div className="relative z-10 space-y-2.5 max-w-md mt-6">
            <h2 className="text-[32px] font-semibold tracking-[1px] text-white leading-tight">
              AVATAR
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-200 font-medium">
              <span className="flex items-center gap-1 text-[#F5B301] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#F5B301] text-[#F5B301]" /> 8.7
              </span>
              <span className="text-slate-400">|</span>
              <span>Sci-Fi</span>
              <span className="text-slate-400">|</span>
              <span>3h 12m</span>
              <span className="text-slate-400">|</span>
              <span>English</span>
            </div>

            <p className="text-[12px] text-slate-300 leading-relaxed font-normal">
              A paraplegic Marine is sent to the moon Pandora on a mission, where he becomes torn between following orders and protecting the world he feels is a part of.
            </p>

            <div className="pt-2 flex items-center justify-between">
              <button 
                onClick={() => navigate('/movies')} 
                className="bg-primary-gradient hover:opacity-95 text-white px-5 py-2.5 rounded-full text-[12px] font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#14B8A0]/30 cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Pagination Dots & Arrow Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-gradient" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <button className="p-1 rounded-full hover:text-white cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 rounded-full hover:text-white cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Widget: Upcoming Movies (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="text-[16px] font-semibold text-[var(--text-heading)]">Upcoming Movies</h3>
            <Link to="/movies" className="text-[12px] text-[var(--primary)] font-medium hover:underline">View All</Link>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-around">
            {upcomingMovies.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={m.poster} alt={m.title} className="w-11 h-13 rounded-xl object-cover shadow-sm shrink-0" />
                  <div className="text-left space-y-0.5">
                    <h4 className="text-[12px] font-semibold text-[var(--text-heading)] line-clamp-1">{m.title}</h4>
                    <p className="text-[11px] text-[var(--text-muted)] font-normal">{m.release} | {m.genre}</p>
                  </div>
                </div>
                <span className="status-coming-soon shrink-0">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. LOWER SECTION (REVENUE SUMMARY + POPULAR MOVIES + RECENT BOOKINGS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Panel 1: Revenue Summary Chart (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="text-[16px] font-semibold text-[var(--text-heading)]">Revenue Summary</h3>
            <span className="text-[11px] text-[var(--text-muted)] bg-[var(--input-bg)] border border-[var(--border)] px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1 font-medium">
              Last 7 Days <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
            </span>
          </div>

          {/* Area Line Chart */}
          <div className="py-1">
            <div className="flex gap-2">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between text-[11px] text-[var(--text-muted)] font-normal h-32 py-0.5 pr-1 shrink-0 text-right">
                <span>₹ 2.0L</span>
                <span>₹ 1.5L</span>
                <span>₹ 1.0L</span>
                <span>₹ 50K</span>
                <span>₹ 0</span>
              </div>

              {/* Chart Canvas with Smooth Curve & Nodes */}
              <div className="flex-1 relative">
                <svg className="w-full h-32 text-[var(--primary)]" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14B8A0" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0B8F7A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dashed Gridlines */}
                  <line x1="0" y1="0" x2="200" y2="0" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="200" y2="60" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="200" y2="80" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />

                  {/* Gradient Area Fill */}
                  <path
                    d="M 0 55 C 30 45, 50 15, 70 30 C 90 45, 110 35, 130 40 C 150 45, 170 15, 200 10 L 200 80 L 0 80 Z"
                    fill="url(#revenueGrad)"
                  />
                  {/* Smooth Line Stroke */}
                  <path
                    d="M 0 55 C 30 45, 50 15, 70 30 C 90 45, 110 35, 130 40 C 150 45, 170 15, 200 10"
                    fill="none"
                    stroke="#14B8A0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Data Point Circles */}
                  <circle cx="0" cy="55" r="3.5" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="1.5" />
                  <circle cx="70" cy="30" r="3.5" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="1.5" />
                  <circle cx="130" cy="40" r="3.5" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="1.5" />
                  <circle cx="200" cy="10" r="3.5" fill="#14B8A0" stroke="var(--bg-card)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-medium pt-2 pl-9">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Popular Movies Ranking (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="text-[16px] font-semibold text-[var(--text-heading)]">Popular Movies</h3>
            <Link to="/movies" className="text-[12px] text-[var(--primary)] font-medium hover:underline">View All</Link>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-around">
            {popularMovies.map((pm) => (
              <div key={pm.rank} className="flex items-center gap-3 text-xs">
                <span className="font-medium text-[var(--text-muted)] text-[12px] w-3 text-center">{pm.rank}.</span>
                <img src={pm.poster} alt={pm.title} className="w-8 h-9 rounded-lg object-cover shrink-0" />
                <div className="flex-1 text-left space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[var(--text-heading)] text-[12px] truncate max-w-[110px]">{pm.title}</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium">{pm.bookings}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div className="h-full bg-primary-gradient rounded-full transition-all duration-500" style={{ width: `${pm.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Recent Bookings Table (4 Cols) */}
        <div className="lg:col-span-4 movtego-card p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="text-[16px] font-semibold text-[var(--text-heading)]">Recent Bookings</h3>
            <Link to="/booking-history" className="text-[12px] text-[var(--primary)] font-medium hover:underline">View All</Link>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] text-[var(--text-muted)] font-semibold uppercase border-b border-[var(--border)]">
                  <th className="pb-1.5 font-semibold">#</th>
                  <th className="pb-1.5 font-semibold">Movie</th>
                  <th className="pb-1.5 font-semibold">Theatre</th>
                  <th className="pb-1.5 font-semibold">Seats</th>
                  <th className="pb-1.5 font-semibold">Amount</th>
                  <th className="pb-1.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60">
                {recentBookings.map((rb) => (
                  <tr key={rb.id} className="hover:bg-[var(--primary-light)]/40 transition-colors text-[11px]">
                    <td className="py-2 font-mono text-[var(--text-muted)]">{rb.id}</td>
                    <td className="py-2 font-semibold text-[var(--text-heading)]">
                      <div className="flex items-center gap-2">
                        <img src={rb.poster} alt={rb.movie} className="w-5 h-7 rounded object-cover shrink-0" />
                        <span className="truncate max-w-[70px]">{rb.movie}</span>
                      </div>
                    </td>
                    <td className="py-2 text-[var(--text-muted)]">{rb.theatre}</td>
                    <td className="py-2 text-[var(--text-muted)]">{rb.seats}</td>
                    <td className="py-2 font-semibold text-[var(--text-heading)]">{rb.amount}</td>
                    <td className="py-2 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        rb.status === 'Confirmed' ? 'status-confirmed' :
                        rb.status === 'Pending' ? 'status-pending' :
                        'status-cancelled'
                      }`}>
                        {rb.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM QUICK ACTION CARDS (WITH PRIMARY GRADIENT BUTTONS & TILES) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Add Movie */}
        <div 
          onClick={() => navigate('/movies')}
          className="movtego-card p-4 relative overflow-hidden flex flex-col justify-between h-34 cursor-pointer group border border-[var(--border)]"
        >
          {/* 100% Full Bleed Image Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=95" 
              alt="Film Reel" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.55] contrast-[1.1]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30">
              <Film className="w-5 h-5" />
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-[15px] font-bold text-white">Add Movie</h4>
              <p className="text-[11px] text-slate-200 font-medium">Create new movie entry</p>
            </div>
            <div className="w-7.5 h-7.5 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: Add Theatre */}
        <div 
          onClick={() => navigate('/theatres')}
          className="movtego-card p-4 relative overflow-hidden flex flex-col justify-between h-34 cursor-pointer group border border-[var(--border)]"
        >
          {/* 100% Full Bleed Image Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=95" 
              alt="Theatre Hall" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.55] contrast-[1.1]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-[15px] font-bold text-white">Add Theatre</h4>
              <p className="text-[11px] text-slate-200 font-medium">Register new theatre</p>
            </div>
            <div className="w-7.5 h-7.5 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: Add Show */}
        <div 
          onClick={() => navigate('/theatres')}
          className="movtego-card p-4 relative overflow-hidden flex flex-col justify-between h-34 cursor-pointer group border border-[var(--border)]"
        >
          {/* 100% Full Bleed Image Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=95" 
              alt="Cinema Seats" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.55] contrast-[1.1]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30">
              <Ticket className="w-5 h-5" />
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-[15px] font-bold text-white">Add Show</h4>
              <p className="text-[11px] text-slate-200 font-medium">Schedule show timings</p>
            </div>
            <div className="w-7.5 h-7.5 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4: View Reports */}
        <div 
          onClick={() => navigate('/reports')}
          className="movtego-card p-4 relative overflow-hidden flex flex-col justify-between h-34 cursor-pointer group border border-[var(--border)]"
        >
          {/* 100% Full Bleed Image Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=95" 
              alt="Analytics Graph" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.55] contrast-[1.15]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between pt-2">
            <div className="space-y-0.5 text-left">
              <h4 className="text-[15px] font-bold text-white">View Reports</h4>
              <p className="text-[11px] text-slate-200 font-medium">Check analytics & revenue</p>
            </div>
            <div className="w-7.5 h-7.5 rounded-full bg-primary-gradient text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

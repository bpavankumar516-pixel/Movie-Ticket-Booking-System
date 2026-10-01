import React, { useState, useMemo } from 'react';
import { 
  MapPin, Phone, Monitor, Star, Clock, Ticket, ShieldCheck, Film, 
  Navigation, ArrowLeft, Calendar, ExternalLink, Mail, CheckCircle2, Sparkles, AlertCircle,
  Plus, Trash2, PlusCircle, Search, X, Check
} from 'lucide-react';
import { SeatSelectionView } from '../booking/SeatSelectionView';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useMovies } from '../../context/MovieContext';
import { useTheatre } from '../../context/TheatreContext';

export const TheatreDetailsModal = ({ theatre, onClose, onBookShow, initialOpenAddMovie = false }) => {
  // 1. ALL HOOKS DECLARED UNCONDITIONALLY AT THE VERY TOP
  const { movies } = useMovies();
  const { updateTheatre } = useTheatre();

  const [activeTab, setActiveTab] = useState('shows'); // 'shows' | 'screens' | 'amenities' | 'contact'
  const [selectedShowForBooking, setSelectedShowForBooking] = useState(() => {
    if (theatre && (theatre.initialShowtime || theatre.initialSelectedShow)) {
      return {
        id: `sh-${Date.now()}`,
        movieId: 101,
        movieTitle: 'Dune: Part Two',
        format: 'IMAX 4K',
        genre: 'Sci-Fi / Action',
        poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
        price: 280,
        time: theatre.initialShowtime || theatre.initialSelectedShow,
        screen: 'Audi 1 (IMAX 4K)'
      };
    }
    return null;
  });
  const [selectedDate, setSelectedDate] = useState('Today, 01 Oct');

  // Add Movie to Theatre Modal State
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(initialOpenAddMovie || theatre?.initialOpenAddMovie || false);
  const [selectedMovieId, setSelectedMovieId] = useState(movies && movies.length > 0 ? movies[0].id : '');
  const [selectedScreen, setSelectedScreen] = useState('Audi 1 (IMAX 4K)');
  const [selectedFormat, setSelectedFormat] = useState('IMAX 4K');
  const [ticketPrice, setTicketPrice] = useState(280);
  const [selectedTimings, setSelectedTimings] = useState(['10:30 AM', '02:15 PM', '06:00 PM', '09:45 PM']);
  const [customTimeInput, setCustomTimeInput] = useState('');
  const [movieSearchQuery, setMovieSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  // Single showtime addition modal/inline state
  const [addShowtimeForMovie, setAddShowtimeForMovie] = useState(null);
  const [singleShowtimeInput, setSingleShowtimeInput] = useState('03:30 PM');
  const [removingMovieGroup, setRemovingMovieGroup] = useState(null);

  const shows = theatre?.shows;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter Catalog Movies for the Add Movie Modal
  const catalogMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    if (!movieSearchQuery.trim()) return movies;
    const q = movieSearchQuery.toLowerCase();
    return movies.filter(m => 
      m.title.toLowerCase().includes(q) || 
      (m.language && m.language.toLowerCase().includes(q)) ||
      (Array.isArray(m.genres) ? m.genres.some(g => g.toLowerCase().includes(q)) : false)
    );
  }, [movies, movieSearchQuery]);

  // Lookup map to sync official posters & details directly from Movies catalog (MovieContext)
  const movieCatalogMap = useMemo(() => {
    const mapById = new Map();
    const mapByTitle = new Map();
    if (movies && Array.isArray(movies)) {
      movies.forEach(m => {
        if (m.id !== undefined && m.id !== null) mapById.set(String(m.id), m);
        if (m.title) {
          const key = m.title.toLowerCase().trim();
          mapByTitle.set(key, m);
          // Handle title variations
          const cleanKey = key.split(':')[0].split('–')[0].split('-')[0].trim();
          if (!mapByTitle.has(cleanKey)) {
            mapByTitle.set(cleanKey, m);
          }
        }
      });
    }
    return { mapById, mapByTitle };
  }, [movies]);

  // Real-time Fallback Shows Generator if theatre shows list is empty
  const defaultShowsList = useMemo(() => [
    {
      id: `sh-default-1`,
      movieId: 2,
      movieTitle: 'Dune: Part Two',
      format: 'IMAX 3D',
      genre: 'Sci-Fi / Adventure',
      poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
      screen: 'Audi 1 (Laser 4K)',
      price: 320,
      totalSeats: 180,
      bookedCount: 42,
      timings: ['10:30 AM', '02:15 PM', '06:00 PM', '09:45 PM']
    },
    {
      id: `sh-default-2`,
      movieId: 3,
      movieTitle: 'Interstellar',
      format: 'Dolby Atmos 7.1',
      genre: 'Sci-Fi / Drama',
      poster: 'https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
      screen: 'Audi 2 (VIP Recliner)',
      price: 380,
      totalSeats: 160,
      bookedCount: 28,
      timings: ['11:15 AM', '03:30 PM', '07:15 PM', '10:30 PM']
    },
    {
      id: `sh-default-3`,
      movieId: 601,
      movieTitle: 'Avengers: Endgame',
      format: '4DX 3D',
      genre: 'Action / Sci-Fi',
      poster: 'https://image.tmdb.org/t/p/original/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
      screen: 'Audi 3 (4DX)',
      price: 290,
      totalSeats: 150,
      bookedCount: 35,
      timings: ['01:00 PM', '05:00 PM', '08:45 PM']
    }
  ], []);

  // Group shows by movie Title, prioritizing authentic posters from Movies Page catalog
  const movieShowGroups = useMemo(() => {
    const activeShows = (shows && shows.length > 0) ? shows : defaultShowsList;
    const map = {};

    activeShows.forEach((show) => {
      const title = show.movieTitle || 'Movie Show';
      const cleanTitle = title.toLowerCase().trim();

      // Look up matching catalog movie from Movies Page context
      const catalogMovie = 
        (show.movieId && movieCatalogMap.mapById.get(String(show.movieId))) ||
        movieCatalogMap.mapByTitle.get(cleanTitle);

      // Extract official poster from Movies Page catalog if available
      const officialPoster = catalogMovie?.poster || show.poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80';
      const officialGenre = (catalogMovie?.genres && Array.isArray(catalogMovie.genres))
        ? catalogMovie.genres.join(' / ')
        : (catalogMovie?.genre || show.genre || 'Action / Sci-Fi');

      if (!map[title]) {
        map[title] = {
          movieTitle: title,
          movieId: catalogMovie?.id || show.movieId,
          format: show.format || (catalogMovie?.formats ? catalogMovie.formats[0] : 'IMAX 4K'),
          screen: show.screen || 'Audi 1',
          price: show.price || 280,
          poster: officialPoster,
          genre: officialGenre,
          shows: []
        };
      }
      map[title].shows.push({
        ...show,
        poster: officialPoster,
        genre: officialGenre
      });
    });

    return Object.values(map);
  }, [shows, defaultShowsList, movieCatalogMap]);

  // Handler to add selected Movie from Catalog to Theatre Showtimes
  const handleAddMovieToTheatre = (e) => {
    e.preventDefault();
    const effectiveMovieId = selectedMovieId || (catalogMovies[0] ? catalogMovies[0].id : null);
    if (!effectiveMovieId) {
      alert('Please select a movie to add.');
      return;
    }

    const targetMovie = movies.find(m => String(m.id) === String(effectiveMovieId));
    if (!targetMovie) return;

    if (selectedTimings.length === 0) {
      alert('Please select at least one showtime!');
      return;
    }

    const currentShows = (theatre.shows && theatre.shows.length > 0) ? theatre.shows : defaultShowsList;

    const newShowObjects = selectedTimings.map((timing, idx) => ({
      id: `sh-${theatre.id}-${targetMovie.id}-${Date.now()}-${idx}`,
      movieId: targetMovie.id,
      movieTitle: targetMovie.title,
      time: timing,
      screen: selectedScreen || 'Audi 1',
      format: selectedFormat || (targetMovie.formats ? targetMovie.formats[0] : '2D'),
      poster: targetMovie.poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
      genre: Array.isArray(targetMovie.genres) ? targetMovie.genres.join(' / ') : (targetMovie.genre || 'Action / Sci-Fi'),
      price: Number(ticketPrice) || 280,
      totalSeats: 180,
      bookedCount: 0
    }));

    const updatedShows = [...currentShows, ...newShowObjects];
    updateTheatre(theatre.id, { shows: updatedShows });
    theatre.shows = updatedShows;

    showToast(`🎉 Added "${targetMovie.title}" to ${theatre.name} with ${selectedTimings.length} showtimes!`);
    setIsAddMovieModalOpen(false);
  };

  // Handler to remove an entire movie group from theatre
  const handleRemoveMovieGroup = (movieTitle) => {
    const currentShows = (theatre.shows && theatre.shows.length > 0) ? theatre.shows : defaultShowsList;
    const updatedShows = currentShows.filter(s => s.movieTitle !== movieTitle);
    updateTheatre(theatre.id, { shows: updatedShows });
    theatre.shows = updatedShows;
    showToast(`Removed "${movieTitle}" from ${theatre.name} show schedule.`);
  };

  // Handler to add a single showtime to an existing movie group
  const handleAddSingleShowtime = (group) => {
    if (!singleShowtimeInput.trim()) return;
    const currentShows = (theatre.shows && theatre.shows.length > 0) ? theatre.shows : defaultShowsList;
    const newShow = {
      id: `sh-${theatre.id}-${Date.now()}`,
      movieId: group.movieId || 101,
      movieTitle: group.movieTitle,
      time: singleShowtimeInput.trim(),
      screen: group.screen || 'Audi 1',
      format: group.format || 'IMAX 4K',
      poster: group.poster,
      genre: group.genre,
      price: group.price || 280,
      totalSeats: 180,
      bookedCount: 0
    };
    const updatedShows = [...currentShows, newShow];
    updateTheatre(theatre.id, { shows: updatedShows });
    theatre.shows = updatedShows;
    showToast(`Added showtime ${singleShowtimeInput} to "${group.movieTitle}"!`);
    setAddShowtimeForMovie(null);
  };

  const toggleTiming = (time) => {
    if (selectedTimings.includes(time)) {
      setSelectedTimings(selectedTimings.filter(t => t !== time));
    } else {
      setSelectedTimings([...selectedTimings, time]);
    }
  };

  const handleAddCustomTime = () => {
    if (customTimeInput.trim() && !selectedTimings.includes(customTimeInput.trim())) {
      setSelectedTimings([...selectedTimings, customTimeInput.trim()]);
      setCustomTimeInput('');
    }
  };

  // 2. CONDITIONAL EARLY RETURNS ONLY AFTER ALL HOOKS HAVE BEEN EXECUTED UNCONDITIONALLY
  if (!theatre) return null;

  if (selectedShowForBooking) {
    return (
      <SeatSelectionView
        movieTitle={selectedShowForBooking.movieTitle || 'Dune: Part Two'}
        theatreName={theatre.name}
        city={theatre.city || 'Hyderabad'}
        showtime={selectedShowForBooking.time || '07:30 PM'}
        dateStr={selectedDate}
        format={selectedShowForBooking.format || 'IMAX 4K'}
        genre={selectedShowForBooking.genre || 'Sci-Fi / Action'}
        moviePoster={selectedShowForBooking.poster || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80'}
        pricePerSeat={selectedShowForBooking.price || 250}
        onBack={() => setSelectedShowForBooking(null)}
        onBookingComplete={(bookingData) => {
          if (onBookShow) {
            onBookShow({
              ...selectedShowForBooking,
              seats: bookingData.seats,
              tickets: bookingData.seatsCount || (Array.isArray(bookingData.seats) ? bookingData.seats.length : 1),
              totalPrice: bookingData.totalPrice
            });
          }
          setSelectedShowForBooking(null);
        }}
      />
    );
  }

  const { name, city, address, rating, reviewsCount, screensCount, amenities, image, brandLogo, contact, screens } = theatre;

  const datesList = [
    { label: 'Today, 01 Oct', isToday: true },
    { label: 'Tomorrow, 02 Oct', isToday: false },
    { label: 'Fri, 03 Oct', isToday: false },
    { label: 'Sat, 04 Oct', isToday: false },
    { label: 'Sun, 05 Oct', isToday: false }
  ];

  const handleOpenBooking = (movieData, timeSlot) => {
    setSelectedShowForBooking({
      id: `sh-${Date.now()}`,
      movieId: movieData.movieId || 101,
      movieTitle: movieData.movieTitle,
      format: movieData.format || 'IMAX 4K',
      genre: movieData.genre || 'Action / Drama',
      poster: movieData.poster,
      price: movieData.price || 280,
      time: timeSlot,
      screen: movieData.screen || 'Audi 1'
    });
  };

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col space-y-6 select-none pb-12">
      
      {/* 1. HERO BANNER WITH OVERLAY BACK BUTTON & BRAND LOGO */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl min-h-[320px] sm:min-h-[360px] flex items-end border border-white/15 shadow-2xl">
        
        {/* Background Backdrop Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={image || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.1] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
        </div>

        {/* Top Header Controls: Floating Back Button & Share/Directions */}
        <div className="absolute top-5 left-6 right-6 z-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md text-white hover:text-teal-300 font-extrabold text-xs transition-all duration-200 cursor-pointer border border-white/20 shadow-lg hover:border-teal-400 group"
          >
            <ArrowLeft className="w-4 h-4 text-white group-hover:text-teal-300 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Theatres</span>
          </button>

          <a
            href={contact?.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(name + ' ' + address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[var(--primary)] text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer border border-teal-300"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Hero Bottom Info Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-left">
          
          <div className="space-y-3 flex-1">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-black rounded-xl bg-primary-gradient text-white uppercase tracking-wider shadow-md">
                {city}
              </span>
              <span className="flex items-center gap-1 text-xs font-black text-amber-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {rating || 4.9} ({reviewsCount || 2890} reviews)
              </span>
              <span className="px-3 py-1 text-xs font-extrabold rounded-xl bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-[var(--primary)]" />
                {screensCount || (screens ? screens.length : 4)} Active Auditoriums
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-md tracking-tight leading-none">
              {name}
            </h1>

            {/* Address */}
            <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
              {address}
            </p>
          </div>

          {/* Quick Amenity Pills */}
          <div className="flex flex-wrap gap-1.5 max-w-xs justify-start sm:justify-end">
            {(amenities || ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Gourmet Food']).map((am, i) => (
              <span key={i} className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/15">
                {am}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* 2. TAB NAVIGATION STRIP */}
      <div className="movtego-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-sm">
        <div className="flex border-b border-[var(--border)]/60 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('shows')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'shows'
                ? 'border-[var(--primary)] text-[var(--primary)] font-black'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Clock className="w-4 h-4" /> Available Shows & Timings
          </button>
          <button
            onClick={() => setActiveTab('screens')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'screens'
                ? 'border-[var(--primary)] text-[var(--primary)] font-black'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Monitor className="w-4 h-4" /> Screens & Specs ({screens ? screens.length : screensCount || 4})
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'amenities'
                ? 'border-[var(--primary)] text-[var(--primary)] font-black'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Amenities & Facilities
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-[var(--primary)] text-[var(--primary)] font-black'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Phone className="w-4 h-4" /> Contact & Location
          </button>
        </div>
      </div>

      {/* 3. TAB CONTENT AREA */}
      <div className="space-y-6">
        
        {/* Toast Notification Banner inside Modal */}
        {toastMsg && (
          <div className="bg-[#0B8F7A] text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between font-bold text-xs border border-emerald-400 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-white hover:opacity-80">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* SHOWS TAB (BOOKMYSHOW REAL-TIME LAYOUT) */}
        {activeTab === 'shows' && (
          <div className="space-y-6">
            
            {/* BOOKMYSHOW DATE SELECTOR & ADD MOVIE TOOLBAR STRIP */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="movtego-card p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-2.5 overflow-x-auto shadow-sm flex-1">
                <span className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider px-2 shrink-0 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" /> Date:
                </span>
                {datesList.map((d) => {
                  const isSel = selectedDate === d.label;
                  return (
                    <button
                      key={d.label}
                      onClick={() => setSelectedDate(d.label)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                        isSel
                          ? 'bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30 font-black border border-teal-300'
                          : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)]'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>

              {/* Action: Add Movie to Theatre Button */}
              <button
                onClick={() => setIsAddMovieModalOpen(true)}
                className="btn-teal py-3 px-5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-[#14B8A0]/20 hover:scale-105 transition-transform cursor-pointer shrink-0 border border-teal-300"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Movie to Theatre</span>
              </button>
            </div>

            {/* MOVIE & SHOWTIMES LIST GROUP */}
            <div className="space-y-4">
              {movieShowGroups.map((group, idx) => (
                <div 
                  key={idx} 
                  className="movtego-card p-5 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 shadow-sm text-left hover:border-[var(--primary)]/40 transition-colors"
                >
                  
                  {/* Movie Banner Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                    <div className="flex items-center gap-4">
                      {/* Movie Poster Thumbnail */}
                      <div className="w-14 h-18 rounded-2xl overflow-hidden border border-[var(--border)] shadow-md bg-slate-900 shrink-0">
                        <img
                          src={group.poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80'}
                          alt={group.movieTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 text-[10px] font-black rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 uppercase">
                            UA 16+
                          </span>
                          <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30">
                            {group.format || 'IMAX 4K'}
                          </span>
                          <span className="text-xs font-bold text-[var(--text-muted)]">
                            {group.genre || 'Sci-Fi / Action'}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-[var(--text-heading)] tracking-tight">
                          {group.movieTitle}
                        </h3>

                        <p className="text-xs text-[var(--text-muted)] font-medium">
                          Auditorium: <strong className="text-[var(--text-heading)]">{group.screen || 'Audi 1'}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-black uppercase text-[var(--primary)] tracking-wider block">
                          TICKET PRICE RANGE
                        </span>
                        <span className="text-lg font-black text-[var(--text-heading)]">
                          ₹{group.price || 280} <span className="text-xs font-medium text-[var(--text-muted)]">onwards</span>
                        </span>
                      </div>

                      {/* Controls: Add Showtime & Remove Movie */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setAddShowtimeForMovie(group.movieTitle === addShowtimeForMovie ? null : group.movieTitle)}
                          className="px-3 py-1.5 rounded-xl bg-[var(--input-bg)] hover:bg-[var(--primary-light)] text-[var(--text-heading)] hover:text-[var(--primary)] border border-[var(--border)] text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          title="Add showtime to this movie"
                        >
                          <Plus className="w-3 h-3 text-[var(--primary)]" />
                          <span>+ Showtime</span>
                        </button>

                        <button
                          onClick={() => setRemovingMovieGroup(group.movieTitle)}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-xs font-bold transition-all cursor-pointer"
                          title="Remove this movie from theatre"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inline Single Showtime Add Input */}
                  {addShowtimeForMovie === group.movieTitle && (
                    <div className="p-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--primary)]/40 flex items-center gap-3 animate-fade-in">
                      <span className="text-xs font-bold text-[var(--text-heading)]">Add Showtime:</span>
                      <input
                        type="text"
                        value={singleShowtimeInput}
                        onChange={(e) => setSingleShowtimeInput(e.target.value)}
                        placeholder="e.g. 04:30 PM"
                        className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)]"
                      />
                      <button
                        onClick={() => handleAddSingleShowtime(group)}
                        className="btn-teal px-4 py-1.5 rounded-xl text-xs font-black"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddShowtimeForMovie(null)}
                        className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-heading)]"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* Showtimes Pills Row (BookMyShow Layout) */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
                      CLICK SHOWTIME TO SELECT SEATS & BOOK
                    </span>

                    <div className="flex flex-wrap gap-3">
                      {(group.shows && group.shows.length > 0
                        ? group.shows.map(s => ({ time: s.time, price: s.price || 280 }))
                        : (group.timings || ['10:30 AM', '02:15 PM', '06:00 PM', '09:45 PM']).map(t => ({ time: t, price: group.price || 280 }))
                      ).map((item, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBooking(group, item.time);
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-all cursor-pointer flex flex-col items-center group/pill shadow-sm hover:scale-105 active:scale-95"
                          title="Click to select seats"
                        >
                          <span className="text-xs font-black text-[var(--text-heading)] group-hover/pill:text-[var(--primary)] transition-colors">
                            {item.time}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-500">
                            ₹{item.price} • Available
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* SCREENS TAB */}
        {activeTab === 'screens' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(screens || [
              { id: 'sc-1', name: 'Audi 1 - IMAX 4K Laser', type: 'IMAX 4K', totalSeats: 180, sound: 'Dolby Atmos 7.1' },
              { id: 'sc-2', name: 'Audi 2 - VIP Recliners', type: 'VIP Recliner', totalSeats: 160, sound: 'Dolby Digital' },
              { id: 'sc-3', name: 'Audi 3 - 4DX 3D', type: '4DX 3D', totalSeats: 150, sound: 'Spatial Audio' },
              { id: 'sc-4', name: 'Audi 4 - MacroXE Screen', type: 'MacroXE', totalSeats: 175, sound: 'Dolby Atmos' }
            ]).map((screen) => (
              <div key={screen.id} className="movtego-card p-5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3 text-left shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-black text-xs border border-[var(--primary)]/30">
                    {screen.type}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-muted)]">{screen.totalSeats} Capacity</span>
                </div>
                <h4 className="text-base font-black text-[var(--text-heading)]">{screen.name}</h4>
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Laser 4K digital projection, {screen.sound || 'Dolby Atmos Surround Sound'}, plush seating.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* AMENITIES TAB */}
        {activeTab === 'amenities' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(amenities || ['IMAX 3D', 'Dolby Atmos', '4DX 3D', 'VIP Recliners', 'Laser 4K', 'Gourmet Food', 'Valet Parking', 'Wheelchair Access']).map((amenity, idx) => (
              <div key={idx} className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-3 text-left shadow-sm">
                <div className="p-2 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-[var(--text-heading)]">{amenity}</span>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT & LOCATION TAB */}
        {activeTab === 'contact' && (
          <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-5 text-left shadow-sm">
            <h4 className="text-base font-black text-[var(--text-heading)] border-b border-[var(--border)] pb-3">
              Theatre Address & Support Contacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-[var(--text-muted)] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" /> Multiplex Address
                </span>
                <span className="font-extrabold text-[var(--text-heading)] text-sm block">{address}</span>
                <span className="text-[11px] text-[var(--text-muted)] font-medium block">City: {city}, Telangana</span>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-[var(--text-muted)] flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[var(--primary)]" /> Phone Helpline
                </span>
                <span className="font-extrabold text-[var(--text-heading)] text-sm block">{contact?.phone || '+91 40 2345 6789'}</span>
                <span className="text-[11px] text-[var(--text-muted)] font-medium block">Email: {contact?.email || 'support@pvrcinemas.com'}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={contact?.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(name + ' ' + address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-teal py-3 px-5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 max-w-xs shadow-md"
              >
                <ExternalLink className="w-4 h-4" /> Open Location in Google Maps
              </a>
            </div>
          </div>
        )}

      </div>

      {/* ADD MOVIE FROM CATALOG MODAL */}
      {isAddMovieModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in transition-colors duration-300">
          <div className="movtego-card rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-heading)] p-6 sm:p-7 max-w-2xl w-full space-y-6 shadow-2xl relative text-left my-8 transition-colors duration-300 overflow-hidden">
            
            {/* Top Teal Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-gradient z-20 rounded-t-3xl" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-gradient text-white flex items-center justify-center shadow-md shadow-[#14B8A0]/30 font-black shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[var(--text-heading)] tracking-tight">
                    Add Movie to {name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-medium">
                    Select from existing movies catalog & schedule custom showtimes
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddMovieModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[var(--input-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-heading)] cursor-pointer hover:border-[var(--primary)] transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMovieToTheatre} className="space-y-5">
              
              {/* Step 1: Select Movie from Catalog with Search */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[var(--text-heading)] uppercase tracking-wider flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-[var(--primary)]" /> Select Movie from Catalog
                  </label>
                  <span className="text-[11px] font-bold text-[var(--primary)]">
                    {catalogMovies.length} Movies Available
                  </span>
                </div>

                {/* Search input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search movie title, genre, language..."
                    value={movieSearchQuery}
                    onChange={(e) => setMovieSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] font-medium transition-colors"
                  />
                </div>

                {/* Catalog Movie Grid list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto p-2 border border-[var(--border)] rounded-2xl bg-[var(--input-bg)]">
                  {catalogMovies.map((m) => {
                    const isSel = String(m.id) === String(selectedMovieId);
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMovieId(m.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 relative ${
                          isSel
                            ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] shadow-sm font-black'
                            : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--primary)]/50 text-[var(--text-heading)] font-medium'
                        }`}
                      >
                        <img
                          src={m.poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80'}
                          alt={m.title}
                          className="w-9 h-12 rounded-lg object-cover shrink-0 shadow-sm"
                        />
                        <div className="min-w-0 flex-1 space-y-0.5 text-left">
                          <span className="text-xs font-black block truncate">{m.title}</span>
                          <span className="text-[10px] text-[var(--text-muted)] font-medium block truncate">
                            {m.language || 'English'} • ⭐ {m.rating || 8.0}
                          </span>
                        </div>
                        {isSel && (
                          <div className="w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center absolute top-1.5 right-1.5 shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Screen Name, Format & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-[var(--text-heading)]">
                    Auditorium / Screen Name
                  </label>
                  <input
                    type="text"
                    value={selectedScreen}
                    onChange={(e) => setSelectedScreen(e.target.value)}
                    placeholder="e.g. Audi 1 (IMAX 4K)"
                    className="w-full rounded-xl text-xs py-2.5 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] font-bold transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-[var(--text-heading)]">
                    Screen Format
                  </label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full rounded-xl text-xs py-2.5 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] font-bold cursor-pointer transition-colors"
                  >
                    <option value="IMAX 4K" className="bg-[var(--bg-card)] text-[var(--text-heading)]">IMAX 4K</option>
                    <option value="IMAX 3D" className="bg-[var(--bg-card)] text-[var(--text-heading)]">IMAX 3D</option>
                    <option value="Dolby Atmos" className="bg-[var(--bg-card)] text-[var(--text-heading)]">Dolby Atmos</option>
                    <option value="4DX 3D" className="bg-[var(--bg-card)] text-[var(--text-heading)]">4DX 3D</option>
                    <option value="VIP Recliner" className="bg-[var(--bg-card)] text-[var(--text-heading)]">VIP Recliner</option>
                    <option value="MacroXE" className="bg-[var(--bg-card)] text-[var(--text-heading)]">MacroXE</option>
                    <option value="2D" className="bg-[var(--bg-card)] text-[var(--text-heading)]">2D</option>
                    <option value="3D" className="bg-[var(--bg-card)] text-[var(--text-heading)]">3D</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-[var(--text-heading)]">
                    Ticket Price (₹)
                  </label>
                  <input
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    placeholder="280"
                    className="w-full rounded-xl text-xs py-2.5 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] font-bold transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Step 3: Select & Custom Showtimes */}
              <div className="space-y-2.5 pt-1 text-left">
                <label className="block text-xs font-black text-[var(--text-heading)] uppercase tracking-wider">
                  Select Showtimes for Today
                </label>

                <div className="flex flex-wrap gap-2">
                  {['10:30 AM', '11:15 AM', '01:30 PM', '02:15 PM', '04:45 PM', '06:00 PM', '07:15 PM', '08:45 PM', '09:45 PM', '10:30 PM'].map((t) => {
                    const isChosen = selectedTimings.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTiming(t)}
                        className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          isChosen
                            ? 'bg-[var(--primary)] text-white shadow-sm font-black border border-teal-300'
                            : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]'
                        }`}
                      >
                        {t} {isChosen && '✓'}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Time Add Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add custom time (e.g. 05:30 PM)"
                    value={customTimeInput}
                    onChange={(e) => setCustomTimeInput(e.target.value)}
                    className="flex-1 rounded-xl text-xs py-2 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] font-medium transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTime}
                    className="px-3 py-2 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] hover:text-[var(--primary)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)] text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    + Add Time
                  </button>
                </div>
              </div>

              {/* Submit & Cancel Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsAddMovieModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold text-[var(--text-heading)] bg-[var(--input-bg)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-teal py-2.5 px-6 rounded-xl text-xs font-black shadow-md shadow-[#14B8A0]/30 hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Add Movie & Showtimes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL FOR REMOVING MOVIE FROM THEATRE */}
      <ConfirmationModal
        isOpen={Boolean(removingMovieGroup)}
        onClose={() => setRemovingMovieGroup(null)}
        onConfirm={() => {
          if (removingMovieGroup) {
            handleRemoveMovieGroup(removingMovieGroup);
            setRemovingMovieGroup(null);
          }
        }}
        title="Remove Movie from Theatre"
        message={`Are you sure you want to remove "${removingMovieGroup}" from ${name} showtimes?`}
        confirmText="Remove Movie"
        cancelText="Cancel"
        variant="danger"
      />

    </div>
  );
};

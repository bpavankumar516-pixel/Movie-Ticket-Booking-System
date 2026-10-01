import React, { useState, useEffect } from 'react';
import { 
  Star, Clock, Calendar, Play, Ticket, X, 
  ArrowLeft, Film, Users, Sparkles, Building2, 
  MessageSquare, CheckCircle2, Video, Percent, Check
} from 'lucide-react';
import { useMovies } from '../../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import { movieApi, MOCK_MOVIES } from '../../services/movieApi';
import { SeatSelectionView } from '../booking/SeatSelectionView';

export const MovieDetailsModal = ({ movie, isOpen, onClose }) => {
  const { isFavorite, toggleFavorite, movies } = useMovies();
  const navigate = useNavigate();
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [enrichedData, setEnrichedData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today, 30 Sep');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('06:30 PM');
  const [selectedTheatre, setSelectedTheatre] = useState('INOX Mantri Square, Bengaluru');
  const [toastMessage, setToastMessage] = useState(null);
  const [isPosterLightboxOpen, setIsPosterLightboxOpen] = useState(false);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

  // Fetch enriched API details when modal opens
  useEffect(() => {
    if (isOpen && movie) {
      setIsPlayingTrailer(false);
      setLoadingDetails(true);
      movieApi.getMovieById(movie.tmdbId || movie.id)
        .then((data) => {
          setEnrichedData(data);
        })
        .catch(() => {
          setEnrichedData(movie);
        })
        .finally(() => {
          setLoadingDetails(false);
        });
    }
  }, [isOpen, movie]);

  if (!isOpen || !movie) return null;

  const activeMovie = enrichedData || movie;

  if (isSeatModalOpen) {
    return (
      <SeatSelectionView
        movieTitle={activeMovie.title}
        theatreName={selectedTheatre}
        city={selectedTheatre.includes('Bengaluru') ? 'Bengaluru' : selectedTheatre.includes('Delhi') ? 'Delhi' : selectedTheatre.includes('Kochi') ? 'Kochi' : 'Hyderabad'}
        showtime={selectedTimeSlot}
        dateStr={selectedDate}
        format="Screen 1 (IMAX 4K)"
        genre={activeMovie.genre || 'Horror'}
        moviePoster={activeMovie.poster}
        pricePerSeat={16}
        onBack={() => setIsSeatModalOpen(false)}
        onBookingComplete={(bookingData) => {
          showToast(`🎉 Booking Confirmed! Reserved Seats: ${Array.isArray(bookingData.seats) ? bookingData.seats.join(', ') : bookingData.seats} for "${bookingData.movieTitle}"!`);
          setIsSeatModalOpen(false);
        }}
      />
    );
  }
  const favorite = isFavorite(movie.id);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBookClick = (slot = selectedTimeSlot, date = selectedDate) => {
    setIsSeatModalOpen(true);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80';
  };

  const getHighResPoster = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80';
    if (url.includes('image.tmdb.org/t/p/')) {
      return url.replace(/\/t\/p\/w\d+/, '/t/p/w780');
    }
    return url;
  };

  const getOriginalBackdrop = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80';
    if (url.includes('image.tmdb.org/t/p/')) {
      return url.replace(/\/t\/p\/w\d+/, '/t/p/original');
    }
    return url;
  };

  // Helper to extract exact director for the active movie
  const getDirectorName = (movieItem) => {
    if (!movieItem) return 'N/A';
    if (movieItem.director) return movieItem.director;
    if (movieItem.cast && movieItem.cast.length > 0) {
      const d = movieItem.cast.find(c => c.role?.toLowerCase().includes('director'));
      if (d) return d.name;
    }
    if (movieItem.crew && movieItem.crew.length > 0) {
      const d = movieItem.crew.find(c => c.job === 'Director');
      if (d) return d.name;
    }
    return 'Not Specified';
  };

  // Helper to get lead actors excluding director role for clean presentation
  const getLeadActors = (movieItem) => {
    if (!movieItem || !movieItem.cast) return [];
    const actors = movieItem.cast.filter(c => c.role?.toLowerCase() !== 'director');
    return actors.length > 0 ? actors : movieItem.cast;
  };

  // Helper to handle recommended movie selection & load its specific API details
  const handleSelectRecommendedMovie = (targetMovie) => {
    setIsPlayingTrailer(false);
    setLoadingDetails(true);
    setEnrichedData(targetMovie);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    movieApi.getMovieById(targetMovie.tmdbId || targetMovie.id)
      .then((data) => {
        setEnrichedData(data);
      })
      .catch(() => {
        setEnrichedData(targetMovie);
      })
      .finally(() => {
        setLoadingDetails(false);
      });
  };

  const datesList = [
    { label: 'TODAY', date: '30 SEP' },
    { label: 'TOMORROW', date: '01 OCT' },
    { label: 'FRI', date: '02 OCT' },
    { label: 'SAT', date: '03 OCT' }
  ];

  const timeSlots = [
    { time: '11:30 AM', label: 'Morning' },
    { time: '02:45 PM', label: 'Matinee' },
    { time: '06:30 PM', label: 'First Show' },
    { time: '09:45 PM', label: 'Second Show' }
  ];

  // Authentic BookMyShow Verified User Reviews
  const defaultReviews = [
    {
      author: 'tricksy',
      rating: 9,
      content: 'Excellent movie. Best of the trilogy. Lovely music. Nolan is a genius. So is Heath Ledger....'
    },
    {
      author: 'talisencrw',
      rating: 10,
      content: 'This has no competition. It is the very finest comic-book character movie ever made. Knowing the Burton, Donner and Nolan filmic adaptations of Batman and Superman exist helps me to sleep at night. They are Exhibit A of ...'
    }
  ];

  // Recommended movies for BookMyShow "You Might Also Like" section
  const recommendedMovies = (movies || MOCK_MOVIES)
    .filter(m => m.id !== activeMovie.id)
    .slice(0, 4);

  const leadActors = getLeadActors(activeMovie);
  const directorName = getDirectorName(activeMovie);

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col transition-colors duration-200 space-y-6">
      
      {/* 2. AUTHENTIC BOOKMYSHOW HERO BANNER WITH OVERLAY NAVIGATION */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl min-h-[560px] sm:min-h-[620px] md:min-h-[660px] flex items-end border border-white/10 shadow-2xl">
        
        {/* Background Backdrop Image with 100% Full Clarity Visibility */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={getOriginalBackdrop(activeMovie.backdrop || activeMovie.poster)}
            alt={activeMovie.title}
            onError={handleImageError}
            className="w-full h-full object-cover filter brightness-95 contrast-105 saturate-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />
        </div>

        {/* Floating Overlay User-Friendly Back Button */}
        <div className="absolute top-5 left-6 z-20">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-teal-300 font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer group drop-shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:text-teal-300 group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-tight">Back to Movies</span>
          </button>
        </div>

        {/* Hero Content Container (Bottom-0 Aligned) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-10 sm:pt-14 pb-5 sm:pb-7 flex items-end">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-end text-left w-full">
            
            {/* BookMyShow Vertical Poster Card Column */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <div 
                onClick={() => setIsPosterLightboxOpen(true)}
                className="w-44 sm:w-52 md:w-56 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/25 shadow-2xl shrink-0 bg-slate-900 relative group cursor-pointer hover:border-[var(--primary)] transition-all duration-300 hover:scale-[1.02]"
                title="Click to view poster in high clarity"
              >
                <img
                  src={getHighResPoster(activeMovie.poster)}
                  alt={activeMovie.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* In Cinemas Badge Overlay */}
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg border border-emerald-400/40">
                  In Cinemas
                </div>

                {/* Play Trailer Hover Center */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlayingTrailer(true);
                    }}
                    className="w-13 h-13 rounded-full bg-primary-gradient text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform border border-white/40"
                    title="Play Video Trailer"
                  >
                    <Play className="w-5.5 h-5.5 fill-white ml-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Title & Metadata Column (Bottom-Left Aligned) */}
            <div className="md:col-span-8 lg:col-span-9 space-y-3.5 text-left flex flex-col justify-end items-start">
              
              {/* Title & Tagline */}
              <div className="space-y-1 text-left w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight text-left">
                  {activeMovie.title}
                </h1>

                {activeMovie.tagline && (
                  <p className="text-xs sm:text-sm italic text-teal-300 font-medium text-left">
                    "{activeMovie.tagline}"
                  </p>
                )}
              </div>

              {/* Available Formats & Languages */}
              <div className="space-y-2 pt-0.5 text-left w-full">
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <span className="text-xs text-slate-300 font-bold">Formats:</span>
                  {(activeMovie.formats || ['2D', '3D', 'IMAX 3D', 'Dolby Atmos', '4DX']).map((fmt, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/15 text-slate-100 text-xs font-bold border border-white/20">
                      {fmt}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-start gap-2">
                  <span className="text-xs text-slate-300 font-bold">Languages:</span>
                  {(Array.isArray(activeMovie.languages)
                    ? activeMovie.languages
                    : (activeMovie.language ? [activeMovie.language] : ['English'])
                  ).map((lang, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-[var(--primary)]/20 text-teal-300 text-xs font-bold border border-teal-400/30">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs & Rating Badge Line */}
              <div className="flex flex-wrap items-center justify-start gap-3.5 text-xs font-semibold text-slate-200 pt-2.5 border-t border-white/15 w-full">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 font-extrabold text-xs sm:text-sm shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>⭐ {activeMovie.rating}</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[var(--primary)]" />{activeMovie.runtime || 152} mins</span>
                <span className="text-slate-500">•</span>
                <span>{(activeMovie.genres || ['Action', 'Sci-Fi']).join(', ')}</span>
                <span className="text-slate-500">•</span>
                <span className="px-1.5 py-0.5 rounded bg-white/15 text-white font-bold text-[10px]">UA 13+</span>
                <span className="text-slate-500">•</span>
                <span>{activeMovie.releaseDate || '2024'}</span>
              </div>

              {/* Main Action CTAs */}
              <div className="flex items-center justify-start gap-3 pt-2.5 flex-wrap w-full">
                <button
                  onClick={() => setIsPlayingTrailer(true)}
                  className="px-5.5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Official Trailer
                </button>

                <button
                  onClick={() => handleBookClick()}
                  className="px-7 py-3.5 rounded-2xl bg-primary-gradient text-white font-black text-xs sm:text-sm shadow-xl shadow-[#14B8A0]/40 hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" /> Book Tickets Now
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 3. TRAILER VIDEO PLAYER EMBEDDED INLINE */}
      {isPlayingTrailer && (
        <div className="bg-slate-900 border-b border-[var(--border)] py-6 px-4 sm:px-8 animate-fade-in text-white rounded-3xl">
          <div className="max-w-5xl mx-auto space-y-3 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-[var(--primary)]" /> {activeMovie.title} - Official Video Trailer
              </h3>
              <button
                onClick={() => setIsPlayingTrailer(false)}
                className="px-3.5 py-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-xl text-xs font-bold border border-rose-500/30 transition-colors cursor-pointer"
              >
                Close Video Player ✕
              </button>
            </div>
            
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
              <iframe
                src={`${activeMovie.trailerUrl || 'https://www.youtube.com/embed/Way9Dexny3w'}?autoplay=1`}
                title={`${activeMovie.title} Official Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. BOOKMYSHOW MAIN DETAILS GRID (2 COLUMNS) */}
      <div className="max-w-7xl mx-auto w-full py-2 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left items-start">
          
          {/* LEFT 2 COLUMNS: ABOUT MOVIE, CAST, CREW & RECOMMENDATIONS */}
          <div className="lg:col-span-2 space-y-6.5">
            
            {/* 1. About the Movie */}
            <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3 shadow-sm">
              <h3 className="text-sm sm:text-base font-black text-[var(--text-heading)] flex items-center gap-2 border-b border-[var(--border)] pb-2.5">
                <Film className="w-4 h-4 text-[var(--primary)]" /> About the Movie
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
                {activeMovie.overview}
              </p>
            </div>

            {/* 2. Cast Members (Lead Performers) */}
            <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                <h3 className="text-sm sm:text-base font-black text-[var(--text-heading)] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--primary)]" /> Cast Members
                </h3>
                <span className="text-xs text-[var(--text-muted)] font-semibold">Lead Performers</span>
              </div>

              {leadActors && leadActors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {leadActors.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                        }}
                        className="w-11 h-11 rounded-2xl object-cover border-2 border-[var(--primary)]/40 shrink-0 shadow-sm bg-[var(--bg-card)]"
                      />
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] truncate">{c.name}</span>
                        <span className="text-[11px] text-[var(--primary)] font-medium truncate">{c.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--text-muted)] font-medium">Starring acclaimed international cast.</p>
              )}
            </div>

            {/* 3. Key Crew (Director & Producers) */}
            <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3 shadow-sm">
              <h3 className="text-sm sm:text-base font-black text-[var(--text-heading)] flex items-center gap-2 border-b border-[var(--border)] pb-2.5">
                <Building2 className="w-4 h-4 text-[var(--primary)]" /> Director & Crew
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1">
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold block">Director</span>
                  <span className="font-bold text-[var(--text-heading)] block truncate">{directorName}</span>
                </div>
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1">
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold block">Production Studio</span>
                  <span className="font-bold text-[var(--text-heading)] block truncate">
                    {activeMovie.productionCompanies ? activeMovie.productionCompanies[0] : 'Warner Bros. Pictures'}
                  </span>
                </div>
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold block">Music & Sound</span>
                  <span className="font-bold text-[var(--text-heading)] block truncate">Dolby Atmos / Hans Zimmer</span>
                </div>
              </div>
            </div>

            {/* 4. BookMyShow "You Might Also Like" Recommended Movies */}
            {recommendedMovies.length > 0 && (
              <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 shadow-sm">
                <h3 className="text-sm sm:text-base font-black text-[var(--text-heading)] flex items-center gap-2 border-b border-[var(--border)] pb-2.5">
                  <Sparkles className="w-4 h-4 text-[var(--primary)]" /> You Might Also Like
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {recommendedMovies.map((rec) => (
                    <div 
                      key={rec.id}
                      onClick={() => handleSelectRecommendedMovie(rec)}
                      className="group cursor-pointer space-y-2 text-left"
                    >
                      <div className="aspect-[2/3] rounded-xl overflow-hidden border border-[var(--border)] shadow-md bg-slate-900 relative">
                        <img 
                          src={getHighResPoster(rec.poster)} 
                          alt={rec.title}
                          onError={handleImageError} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-amber-400 font-extrabold text-[10px] flex items-center gap-1 border border-amber-400/30">
                          <Star className="w-3 h-3 fill-amber-400" /> {rec.rating}
                        </div>
                      </div>
                      <h4 className="font-extrabold text-xs text-[var(--text-heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                        {rec.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: BOOKMYSHOW STICKY SIDEBAR CARDS */}
          <div className="space-y-6 lg:sticky lg:top-20">
            
            {/* CARD 1: Main Pre-Booking Box */}
            <div className="movtego-card p-5.5 rounded-3xl border border-[var(--primary)]/40 bg-[var(--bg-card)] space-y-4.5 shadow-xl">
              
              <div className="space-y-1.5 border-b border-[var(--border)] pb-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                    Pre-Bookings Open
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--text-heading)] pt-0.5">Select Theatre & Date</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Choose multiplex theatre & date to book tickets for <strong>{activeMovie.title}</strong>.
                </p>
              </div>

              {/* Theatre Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[var(--primary)]" /> Select Multiplex Theatre:
                </label>
                <select
                  value={selectedTheatre}
                  onChange={(e) => setSelectedTheatre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-xs font-bold cursor-pointer"
                >
                  <option value="INOX Mantri Square, Bengaluru">INOX Mantri Square (Bengaluru)</option>
                  <option value="PVR Vega City Gold Class, Bengaluru">PVR Vega City Gold Class (Bengaluru)</option>
                  <option value="Cinepolis Forum Shantiniketan, Bengaluru">Cinepolis Forum Shantiniketan (Bengaluru)</option>
                  <option value="AMB Cinemas Gachibowli, Hyderabad">AMB Cinemas Gachibowli (Hyderabad)</option>
                  <option value="Prasads Multiplex, Hyderabad">Prasads Multiplex (Hyderabad)</option>
                  <option value="PVR Director's Cut, Delhi">PVR Director's Cut (Delhi)</option>
                  <option value="Cinepolis Centre Square, Kochi">Cinepolis Centre Square (Kochi)</option>
                </select>
              </div>

              {/* Date Selector Row */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" /> Select Booking Date:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {datesList.map((d, idx) => {
                    const fullDateStr = `${d.label}, ${d.date}`;
                    const isSelected = selectedDate === fullDateStr;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(fullDateStr)}
                        className={`py-2.5 px-1.5 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30 border border-[#14B8A0]'
                            : 'bg-[var(--input-bg)] text-[var(--text-body)] border border-[var(--border)] hover:border-[var(--primary)]/50'
                        }`}
                      >
                        <span className="text-[9px] font-black tracking-wider uppercase opacity-85">{d.label}</span>
                        <span className="text-xs font-black">{d.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BookMyShow Special Offers Pill */}
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-500 text-xs flex items-center gap-2 font-bold">
                <Percent className="w-4 h-4 shrink-0 text-amber-500" />
                <span>Up to ₹150 Instant Cashback with Bank Cards</span>
              </div>

              {/* Primary Booking CTA */}
              <button
                onClick={() => handleBookClick()}
                className="w-full btn-teal py-3.5 rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-[#14B8A0]/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Ticket className="w-4 h-4" /> Book Tickets Now
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)] font-semibold pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Instant Ticket Confirmation & M-Ticket
              </div>

            </div>

            {/* CARD 2: Verified Audience Reviews */}
            <div className="movtego-card p-5.5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3.5 shadow-md">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                <h3 className="text-sm font-black text-[var(--text-heading)] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[var(--primary)]" /> Verified Audience Reviews
                </h3>
                <span className="text-[10px] font-bold text-[var(--primary)] flex items-center gap-0.5 bg-[var(--primary-light)] px-2 py-0.5 rounded-full border border-[var(--primary)]/30">
                  <Check className="w-2.5 h-2.5 text-[var(--primary)]" /> BMS Verified ✓
                </span>
              </div>
              
              <div className="space-y-3">
                {defaultReviews.map((rev, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs text-[var(--text-heading)]">{rev.author}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[9px] font-black border border-emerald-500/30 flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> Verified
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rev.rating}
                      </span>
                    </div>
                    <p className="text-[var(--text-body)] font-normal leading-relaxed italic text-[11px]">
                      "{rev.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: Production & Box Office Stats */}
            <div className="movtego-card p-5.5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3.5 shadow-md">
              <h3 className="text-sm font-black text-[var(--text-heading)] flex items-center gap-2 border-b border-[var(--border)] pb-2.5">
                <Building2 className="w-4 h-4 text-[var(--primary)]" /> Production & Box Office Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Studios</span>
                  <span className="font-bold text-[var(--text-heading)] block truncate text-[11px]">
                    {activeMovie.productionCompanies ? activeMovie.productionCompanies[0] : 'Warner Bros.'}
                  </span>
                </div>
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Budget</span>
                  <span className="font-extrabold text-emerald-500 block text-[11px]">{activeMovie.budget || '$150M'}</span>
                </div>
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Worldwide Box Office</span>
                  <span className="font-extrabold text-emerald-500 block text-[11px]">{activeMovie.revenue || '$450M'}</span>
                </div>
                <div className="p-3 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] font-semibold block">Release Status</span>
                  <span className="font-bold text-[var(--primary)] block text-[11px]">{activeMovie.status || 'Now Showing'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. HIGH-RES POSTER LIGHTBOX POPUP */}
      {isPosterLightboxOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setIsPosterLightboxOpen(false)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPosterLightboxOpen(false)}
              className="absolute -top-12 right-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors border border-white/30 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" /> Close High-Res View
            </button>

            <img
              src={getHighResPoster(activeMovie.poster)}
              alt={activeMovie.title}
              onError={handleImageError}
              className="max-h-[82vh] w-auto rounded-3xl object-contain shadow-2xl border-2 border-white/20"
            />
            <span className="text-white text-xs font-extrabold pt-3">{activeMovie.title} - Official Poster Artwork</span>
          </div>
        </div>
      )}

      {/* 6. TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B8F7A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs animate-bounce border border-emerald-400">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useMovies } from '../../context/MovieContext';
import { MovieCard } from '../../components/movies/MovieCard';
import { MovieDetailsModal } from '../../components/movies/MovieDetailsModal';
import { MovieFormModal } from '../../components/movies/MovieFormModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  Film, Plus, Search, Eye, TrendingUp, Calendar, Clock, Star, 
  Grid, List, CheckCircle2, Ticket, Sparkles, Filter, ChevronLeft, ChevronRight,
  Play, RefreshCw, X, Award, ShieldAlert, SlidersHorizontal, Check, Flame, Layers
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/common/Loading';
import { EmptyState } from '../../components/common/EmptyState';

export const Movies = () => {
  const {
    movies,
    loading,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedLanguage,
    setSelectedLanguage,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    getFilteredMovies,
    getMovieStats,
    deleteMovie,
    selectedMovieForDetail,
    setSelectedMovieForDetail,
    editingMovie,
    setEditingMovie,
    isAddModalOpen,
    setIsAddModalOpen
  } = useMovies();

  const [currentPage, setCurrentPage] = useState(1);
  const [minRating, setMinRating] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [deletingMovie, setDeletingMovie] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleConfirmDelete = () => {
    if (deletingMovie) {
      deleteMovie(deletingMovie.id);
      showToast(`Successfully deleted "${deletingMovie.title}"`);
      setDeletingMovie(null);
    }
  };

  // Filter Logic with Rating & Tab Category
  const filteredMovies = useMemo(() => {
    let result = getFilteredMovies();

    // Tab Category Filtering
    if (activeCategoryTab === 'now_showing') {
      result = result.filter(m => m.status === 'Now Showing');
    } else if (activeCategoryTab === 'top_rated') {
      result = result.filter(m => (m.rating || 0) >= 8.0);
    } else if (activeCategoryTab === 'upcoming') {
      result = result.filter(m => m.status === 'Upcoming');
    } else if (activeCategoryTab === 'draft') {
      result = result.filter(m => m.status === 'Draft');
    } else if (activeCategoryTab === 'archived') {
      result = result.filter(m => m.status === 'Archived');
    }

    // Min Rating Filter
    if (minRating !== 'All') {
      const threshold = parseFloat(minRating);
      result = result.filter(m => (m.rating || 0) >= threshold);
    }

    return result;
  }, [getFilteredMovies, activeCategoryTab, minRating]);

  const stats = getMovieStats();

  // Spotlight featured movie (highest rated)
  const featuredMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    return [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  }, [movies]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage) || 1;
  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Thriller', 'Biography', 'Animation', 'Adventure', 'Crime'];
  const languages = ['All', 'English', 'Telugu', 'Hindi', 'Tamil', 'French'];
  const statuses = ['All', 'Now Showing', 'Published', 'Upcoming', 'Draft', 'Unpublished', 'Archived'];

  const hasActiveFilters = searchQuery !== '' || selectedGenre !== 'All' || selectedLanguage !== 'All' || selectedStatus !== 'All' || minRating !== 'All' || activeCategoryTab !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSelectedStatus('All');
    setMinRating('All');
    setActiveCategoryTab('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left pb-16">
      
      {/* 1. TOP CONTROL & SEARCH HEADER */}
      <div className="movtego-card p-4 rounded-3xl border border-[var(--border)] shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-11 h-11 rounded-2xl bg-primary-gradient text-white flex items-center justify-center shadow-lg shadow-[#14B8A0]/30 shrink-0">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-black text-xl sm:text-2xl text-[var(--text-heading)] tracking-tight">
                Movies Catalog
              </h1>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                Explore movies, formats, showtimes and catalog entries.
              </p>
            </div>
          </div>

          {/* Centered Search Input Bar */}
          <div className="relative flex-1 max-w-xl w-full">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, genre, keyword..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-[var(--text-muted)] hover:text-[var(--text-heading)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Add New Movie Primary Action */}
          <div className="shrink-0 w-full md:w-auto">
            <Button
              variant="teal"
              size="md"
              icon={Plus}
              onClick={() => {
                setEditingMovie(null);
                setIsAddModalOpen(true);
              }}
              className="w-full md:w-auto rounded-2xl shadow-xl shadow-[#14B8A0]/30 px-5 py-3 font-black text-xs sm:text-sm hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Add New Movie
            </Button>
          </div>

        </div>
      </div>

      {/* 2. EXECUTIVE METRICS STATS (5 CARDS GRID) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Total Catalog */}
        <div 
          onClick={() => setActiveCategoryTab('all')}
          className={`movtego-card p-4 rounded-3xl border transition-all cursor-pointer hover:shadow-md ${
            activeCategoryTab === 'all' ? 'border-[#14B8A0] ring-2 ring-[#14B8A0]/30 shadow-md' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Total Catalog</span>
            <div className="w-9 h-9 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shadow-xs">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)]">{stats.total}</span>
            <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
        </div>

        {/* Card 2: Now Showing */}
        <div 
          onClick={() => setActiveCategoryTab('now_showing')}
          className={`movtego-card p-4 rounded-3xl border transition-all cursor-pointer hover:shadow-md ${
            activeCategoryTab === 'now_showing' ? 'border-[#14B8A0] ring-2 ring-[#14B8A0]/30 shadow-md' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Now Showing</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shadow-xs">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)]">{stats.nowShowing}</span>
            <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
        </div>

        {/* Card 3: Upcoming */}
        <div 
          onClick={() => setActiveCategoryTab('upcoming')}
          className={`movtego-card p-4 rounded-3xl border transition-all cursor-pointer hover:shadow-md ${
            activeCategoryTab === 'upcoming' ? 'border-[#14B8A0] ring-2 ring-[#14B8A0]/30 shadow-md' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Upcoming</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)]">{stats.upcoming}</span>
            <span className="text-[11px] font-bold text-purple-500 flex items-center gap-0.5 bg-purple-500/10 px-2 py-0.5 rounded-full">
              Soon
            </span>
          </div>
        </div>

        {/* Card 4: Draft */}
        <div 
          onClick={() => setActiveCategoryTab('draft')}
          className={`movtego-card p-4 rounded-3xl border transition-all cursor-pointer hover:shadow-md ${
            activeCategoryTab === 'draft' ? 'border-[#14B8A0] ring-2 ring-[#14B8A0]/30 shadow-md' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Draft Movies</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)]">{stats.draft}</span>
            <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded-full">
              Drafts
            </span>
          </div>
        </div>

        {/* Card 5: Archived */}
        <div 
          onClick={() => setActiveCategoryTab('archived')}
          className={`movtego-card p-4 rounded-3xl border transition-all cursor-pointer hover:shadow-md ${
            activeCategoryTab === 'archived' ? 'border-[#14B8A0] ring-2 ring-[#14B8A0]/30 shadow-md' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Archived</span>
            <div className="w-9 h-9 rounded-2xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-heading)]">{stats.archived}</span>
            <span className="text-[11px] font-bold text-cyan-500 flex items-center gap-0.5 bg-cyan-500/10 px-2 py-0.5 rounded-full">
              Stored
            </span>
          </div>
        </div>

      </div>

      {/* 3. FEATURED SPOTLIGHT BANNER */}
      {featuredMovie && !searchQuery && selectedGenre === 'All' && activeCategoryTab === 'all' && (
        <div className="relative rounded-3xl overflow-hidden border border-[#14B8A0]/40 shadow-2xl bg-slate-950 text-white min-h-[280px] sm:min-h-[320px] flex items-end">
          {/* Backdrop Image with vignette overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={featuredMovie.backdrop || featuredMovie.poster} 
              alt={featuredMovie.title} 
              className="w-full h-full object-cover opacity-50 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            
            <div className="flex gap-5 items-end max-w-3xl">
              {/* Poster Thumbnail */}
              <div className="w-28 sm:w-36 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 hidden sm:block bg-slate-900">
                <img src={featuredMovie.poster} alt={featuredMovie.title} className="w-full h-full object-cover" />
              </div>

              {/* Movie Details */}
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary-gradient text-white text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1">
                    <Award className="w-3 h-3" /> Featured Spotlight
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-amber-400 font-extrabold text-xs flex items-center gap-1 border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {featuredMovie.rating} / 10 IMDb
                  </span>
                  <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" /> {featuredMovie.runtime || 166} mins
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {featuredMovie.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl font-normal">
                  {featuredMovie.overview}
                </p>

                {/* Genre & Formats Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(featuredMovie.genres || ['Sci-Fi', 'Action']).map((g, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-md text-slate-200 text-xs font-semibold border border-white/10">
                      {g}
                    </span>
                  ))}
                  {(featuredMovie.formats || ['IMAX 3D', 'Dolby Atmos']).map((f, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/40">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSelectedMovieForDetail(featuredMovie)}
                className="px-5 py-3 rounded-2xl bg-primary-gradient text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#14B8A0]/40 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                <Ticket className="w-4 h-4" /> Book Tickets
              </button>
              <button
                onClick={() => setSelectedMovieForDetail(featuredMovie)}
                className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" /> Watch Trailer
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. MAIN LAYOUT: SIDEBAR FILTERS (LEFT) + MOVIES GRID (RIGHT) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN: SIDEBAR FILTERS */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="movtego-card p-4 rounded-3xl border border-[var(--border)] space-y-5 text-xs shadow-sm">
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-extrabold text-sm text-[var(--text-heading)] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--primary)]" /> Filters
              </h3>
              {hasActiveFilters && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Language Filter */}
            <div className="space-y-2">
              <label className="font-bold text-[var(--text-heading)] block">Languages</label>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang, i) => {
                  const isSel = selectedLanguage === lang;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSel
                          ? 'bg-primary-gradient text-white shadow-md'
                          : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Genre Filter */}
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <label className="font-bold text-[var(--text-heading)] block">Genres</label>
              <div className="flex flex-wrap gap-1.5">
                {genres.map((g, i) => {
                  const isSel = selectedGenre === g;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedGenre(g);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        isSel
                          ? 'bg-primary-gradient text-white font-bold'
                          : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <label className="font-bold text-[var(--text-heading)] block">Release Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl px-3 py-2 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none text-xs font-semibold"
              >
                {statuses.map((s, i) => (
                  <option key={i} value={s}>{s === 'All' ? 'All Status' : s}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <label className="font-bold text-[var(--text-heading)] block">Rating</label>
              <select
                value={minRating}
                onChange={(e) => {
                  setMinRating(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl px-3 py-2 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none text-xs font-semibold"
              >
                <option value="All">All Ratings</option>
                <option value="8.5">⭐ 8.5+ Top Rated</option>
                <option value="7.5">⭐ 7.5+ High Rated</option>
                <option value="6.0">⭐ 6.0+ Good Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: MOVIES CATALOG GRID */}
        <div className="flex-1 w-full space-y-4">
          
          {/* Top Bar: Quick Language Pills + Sort & View Mode */}
          <div className="movtego-card p-3.5 rounded-3xl border border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {['All', 'Telugu', 'English', 'Hindi', 'Tamil', 'French'].map((lang, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'bg-[var(--input-bg)] text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[var(--text-muted)] font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl px-3 py-1.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none text-xs font-semibold cursor-pointer"
                >
                  <option value="release_date">Release Date</option>
                  <option value="rating">Highest Rating</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="duration">Runtime Duration</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-[var(--input-bg)] p-1 rounded-xl border border-[var(--border)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'bg-primary-gradient text-white shadow-sm' 
                      : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'list' 
                      ? 'bg-primary-gradient text-white shadow-sm' 
                      : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* MOVIES CATALOG DISPLAY */}
          {loading ? (
            <Loading text="Fetching cinema catalog from TMDB API..." />
          ) : displayedMovies.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
            }>
              {displayedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  viewMode={viewMode}
                  onViewDetails={(m) => setSelectedMovieForDetail(m)}
                  onEdit={(m) => {
                    setEditingMovie(m);
                    setIsAddModalOpen(true);
                  }}
                  onDelete={(m) => setDeletingMovie(m)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Film}
              title="No Movies Found"
              description="No movies match your current search query or filter selection."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}

          {/* PAGINATION FOOTER */}
          <div className="movtego-card p-4 rounded-3xl border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-sm">
            <div className="flex items-center gap-4 text-[var(--text-muted)] font-medium">
              <span>
                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> - <strong>{Math.min(currentPage * itemsPerPage, filteredMovies.length)}</strong> of <strong>{filteredMovies.length}</strong> movies
              </span>

              <div className="flex items-center gap-1.5 hidden md:flex">
                <span>Per Page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-semibold text-xs focus:outline-none"
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={16}>16</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="p-2 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--primary-light)] transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-primary-gradient text-white shadow-md shadow-[#14B8A0]/30'
                        : 'bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--border)] hover:bg-[var(--primary-light)]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="p-2 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--primary-light)] transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 5. TOAST NOTIFICATION POPUP */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B8F7A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 6. MODALS INTEGRATION */}
      <MovieDetailsModal
        movie={selectedMovieForDetail}
        isOpen={Boolean(selectedMovieForDetail)}
        onClose={() => setSelectedMovieForDetail(null)}
      />

      <MovieFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMovie(null);
        }}
        initialData={editingMovie}
      />

      <ConfirmationModal
        isOpen={Boolean(deletingMovie)}
        onClose={() => setDeletingMovie(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Movie"
        message={`Are you sure you want to delete "${deletingMovie?.title}"? This action will remove the movie from your active catalog.`}
        confirmText="Delete Movie"
        cancelText="Cancel"
        variant="danger"
      />

    </div>
  );
};

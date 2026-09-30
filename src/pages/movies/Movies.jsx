import React, { useState, useMemo } from 'react';
import { useMovies } from '../../context/MovieContext';
import { MovieCard } from '../../components/movies/MovieCard';
import { MovieDetailsModal } from '../../components/movies/MovieDetailsModal';
import { MovieFormModal } from '../../components/movies/MovieFormModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  Film, Plus, Search, Eye, Calendar, Star, 
  Grid, List, CheckCircle2, Ticket, Sparkles, ChevronLeft, ChevronRight,
  Play, RefreshCw, X, Award, SlidersHorizontal, Check, Flame, Globe, ArrowUpDown, LayoutGrid
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
  const [itemsPerPage, setItemsPerPage] = useState(8);
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

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80';
  };

  // Filter Logic
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

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / itemsPerPage));
  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Thriller', 'Biography', 'Animation', 'Adventure', 'Crime'];
  const languages = ['All', 'English', 'Telugu', 'Hindi', 'Tamil', 'French'];

  const hasActiveFilters = searchQuery !== '' || selectedGenre !== 'All' || selectedLanguage !== 'All' || minRating !== 'All' || activeCategoryTab !== 'all';

  // Render View Details Page in-place with single window scrollbar
  if (selectedMovieForDetail) {
    return (
      <div className="w-full animate-fade-in space-y-6">
        <MovieDetailsModal
          movie={selectedMovieForDetail}
          isOpen={true}
          onClose={() => setSelectedMovieForDetail(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-left pb-16">
      
      {/* 1. STATS CATEGORY TABS & ADD NEW MOVIE BUTTON (6-CARD ROW) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 items-stretch">
        
        {/* Card 1: All Movies */}
        <div 
          onClick={() => {
            setActiveCategoryTab('all');
            setCurrentPage(1);
          }}
          className={`movtego-card p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
            activeCategoryTab === 'all' ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 bg-[var(--primary-light)]/40 shadow-sm' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">All Catalog</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)] mt-2">{stats.total}</div>
        </div>

        {/* Card 2: Now Showing */}
        <div 
          onClick={() => {
            setActiveCategoryTab('now_showing');
            setCurrentPage(1);
          }}
          className={`movtego-card p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
            activeCategoryTab === 'now_showing' ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/10 shadow-sm' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Now Showing</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)] mt-2">{stats.nowShowing}</div>
        </div>

        {/* Card 3: Upcoming */}
        <div 
          onClick={() => {
            setActiveCategoryTab('upcoming');
            setCurrentPage(1);
          }}
          className={`movtego-card p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
            activeCategoryTab === 'upcoming' ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-500/10 shadow-sm' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Upcoming</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)] mt-2">{stats.upcoming}</div>
        </div>

        {/* Card 4: Draft Movies */}
        <div 
          onClick={() => {
            setActiveCategoryTab('draft');
            setCurrentPage(1);
          }}
          className={`movtego-card p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
            activeCategoryTab === 'draft' ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/10 shadow-sm' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Drafts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)] mt-2">{stats.draft}</div>
        </div>

        {/* Card 5: Archived */}
        <div 
          onClick={() => {
            setActiveCategoryTab('archived');
            setCurrentPage(1);
          }}
          className={`movtego-card p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${
            activeCategoryTab === 'archived' ? 'border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-500/10 shadow-sm' : 'border-[var(--border)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Archived</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)] mt-2">{stats.archived}</div>
        </div>

        {/* Card 6: Action - Add New Movie Button */}
        <div 
          onClick={() => {
            setEditingMovie(null);
            setIsAddModalOpen(true);
          }}
          className="movtego-card relative overflow-hidden rounded-2xl border border-[var(--primary)]/60 p-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:border-[var(--primary)] group col-span-2 sm:col-span-1 flex flex-col justify-between min-h-[96px]"
        >
          {/* High Clarity Cinema Background Image covering 100% of the complete card */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80" 
              alt="Add movie artwork" 
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.15] saturate-[1.1] group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
            <div className="absolute inset-0 bg-[var(--primary)]/15 group-hover:bg-[var(--primary)]/25 transition-colors duration-300" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-black text-white bg-emerald-500/90 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-emerald-400/40">
              Action
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary-gradient text-white flex items-center justify-center font-bold shadow-lg shadow-[#14B8A0]/40 group-hover:scale-110 transition-transform border border-white/30">
              <Plus className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="relative z-10 text-xs sm:text-sm font-black text-white mt-3 group-hover:text-teal-300 transition-colors flex items-center gap-1.5 drop-shadow-md">
            <Sparkles className="w-4 h-4 text-teal-300 shrink-0" />
            <span>+ Add New Movie</span>
          </div>
        </div>

      </div>

      {/* 2. FEATURED SPOTLIGHT HERO BANNER (Only when no search/filters active) */}
      {featuredMovie && !searchQuery && selectedGenre === 'All' && selectedLanguage === 'All' && activeCategoryTab === 'all' && (
        <div className="relative rounded-3xl overflow-hidden border border-[#14B8A0]/40 shadow-xl bg-slate-950 text-white min-h-[260px] sm:min-h-[290px] flex items-end">
          <div className="absolute inset-0 z-0">
            <img 
              src={featuredMovie.backdrop || featuredMovie.poster} 
              alt={featuredMovie.title} 
              onError={handleImageError}
              className="w-full h-full object-cover opacity-40 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div className="flex gap-5 items-end max-w-3xl">
              <div className="w-28 sm:w-32 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 hidden sm:block bg-slate-900">
                <img src={featuredMovie.poster} alt={featuredMovie.title} onError={handleImageError} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary-gradient text-white text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Award className="w-3 h-3" /> Blockbuster Spotlight
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-amber-400 font-extrabold text-xs flex items-center gap-1 border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {featuredMovie.rating}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {featuredMovie.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl font-normal">
                  {featuredMovie.overview}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {(featuredMovie.genres || ['Sci-Fi', 'Action']).map((g, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200 text-xs font-semibold border border-white/10">
                      {g}
                    </span>
                  ))}
                  {(featuredMovie.formats || ['IMAX 3D', 'Dolby Atmos']).map((f, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/40">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSelectedMovieForDetail(featuredMovie)}
                className="px-5 py-2.5 rounded-xl bg-primary-gradient text-white font-extrabold text-xs sm:text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                <Ticket className="w-4 h-4" /> Book Showtimes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT AREA: ICON-ALIGNED SIDEBAR FILTERS (LEFT) + CATALOG GRID/LIST (RIGHT) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* UNIFIED LEFT SIDEBAR FILTERS PANEL WITH ICON ALIGNMENT */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="movtego-card p-4.5 rounded-3xl border border-[var(--border)] space-y-4 text-xs shadow-sm bg-[var(--bg-card)]">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-extrabold text-sm text-[var(--text-heading)] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--primary)]" /> Controls & Filters
              </h3>
              {hasActiveFilters && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 1. View Mode Toggle Switcher Inside Left Sidebar */}
            <div className="space-y-1.5">
              <label className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 text-[var(--primary)]" /> Display Layout
              </label>
              <div className="grid grid-cols-2 gap-1.5 bg-[var(--input-bg)] p-1 rounded-xl border border-[var(--border)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`py-1.5 rounded-lg font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-primary-gradient text-white shadow-md'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" /> Grid Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`py-1.5 rounded-lg font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-primary-gradient text-white shadow-md'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> List Rows
                </button>
              </div>
            </div>

            {/* 2. Search Input Bar */}
            <div className="space-y-1.5">
              <label className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[var(--primary)]" /> Search Movies
              </label>
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search title, genre, actor..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-heading)] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Sort Dropdown */}
            <div className="space-y-1.5 pt-3 border-t border-[var(--border)]">
              <label className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[var(--primary)]" /> Sort Movies By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl px-3 py-2 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none text-xs font-bold cursor-pointer"
              >
                <option value="famous">🔥 Blockbusters & Popular</option>
                <option value="release_date">Release Date</option>
                <option value="rating">Highest Rating ⭐</option>
                <option value="title">Title (A-Z)</option>
                <option value="duration">Runtime Duration</option>
              </select>
            </div>

            {/* 3. Language Filter */}
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <label className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[var(--primary)]" /> Languages
              </label>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang, idx) => {
                  const isSel = selectedLanguage === lang;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[var(--primary)] text-white shadow-sm'
                          : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Genre Filter */}
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <label className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[var(--primary)]" /> Genres
              </label>
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
                          ? 'bg-primary-gradient text-white font-bold shadow-sm'
                          : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-heading)]'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Minimum Rating Filter */}
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <label className="font-extrabold text-[var(--text-heading)] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" /> Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => {
                  setMinRating(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl px-3 py-2 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none text-xs font-semibold cursor-pointer"
              >
                <option value="All">All Ratings</option>
                <option value="8.5">⭐ 8.5+ Blockbusters</option>
                <option value="7.5">⭐ 7.5+ Highly Rated</option>
                <option value="6.0">⭐ 6.0+ Average Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: MOVIES CATALOG (GRID / LIST VIEWS) */}
        <div className="flex-1 w-full space-y-4">
          


          {/* MOVIES CATALOG DISPLAY: GRID / LIST VIEWS */}
          {loading ? (
            <Loading text="Fetching cinema catalog..." />
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
          {totalPages > 1 && (
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
                    className="px-2 py-1 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] font-semibold text-xs focus:outline-none cursor-pointer"
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
          )}

        </div>

      </div>

      {/* 4. TOAST NOTIFICATION POPUP */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B8F7A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs animate-bounce border border-emerald-400">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 5. MODALS INTEGRATION */}
      <MovieDetailsModal
        movie={selectedMovieForDetail}
        isOpen={Boolean(selectedMovieForDetail)}
        onClose={() => setSelectedMovieForDetail(null)}
      />

      <MovieFormModal
        isOpen={isAddModalOpen || Boolean(editingMovie)}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMovie(null);
        }}
        initialData={editingMovie}
        onSuccess={showToast}
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

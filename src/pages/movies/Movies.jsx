import React, { useState } from 'react';
import { useMovies } from '../../context/MovieContext';
import { MovieCard } from '../../components/movies/MovieCard';
import { MovieDetailsModal } from '../../components/movies/MovieDetailsModal';
import { MovieFormModal } from '../../components/movies/MovieFormModal';
import { 
  Film, Plus, Search, Eye, TrendingUp, Calendar, Clock, Star, 
  Grid, List, CheckCircle2, Ticket, Sparkles, Filter, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/common/Loading';
import { EmptyState } from '../../components/common/EmptyState';

export const Movies = () => {
  const {
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
    selectedMovieForDetail,
    setSelectedMovieForDetail,
    editingMovie,
    setEditingMovie,
    isAddModalOpen,
    setIsAddModalOpen
  } = useMovies();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredMovies = getFilteredMovies();
  const stats = getMovieStats();
  
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage) || 1;
  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Thriller', 'Biography', 'Animation', 'Adventure', 'Crime'];
  const languages = ['All', 'English', 'Telugu', 'Hindi', 'French'];
  const statuses = ['All', 'Now Showing', 'Published', 'Upcoming', 'Draft', 'Unpublished', 'Archived'];

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* 1. BRAND HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center text-white shadow-lg shadow-[#14B8A0]/30 shrink-0">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">
              Movies
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-normal">
              Manage your movie catalog, releases and show schedules.
            </p>
          </div>
        </div>

        {/* Add New Movie Button */}
        <Button
          variant="teal"
          size="md"
          icon={Plus}
          onClick={() => {
            setEditingMovie(null);
            setIsAddModalOpen(true);
          }}
          className="rounded-2xl shadow-lg shadow-[#14B8A0]/25 px-5 py-2.5 font-bold"
        >
          Add New Movie
        </Button>
      </div>

      {/* 2. TOP SUMMARY STAT TILES (Matching Reference Screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Tile 1: Total Movies */}
        <div className="movtego-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Total Movies</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[var(--text-heading)]">{stats.total}</span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
          </div>
        </div>

        {/* Tile 2: Now Showing */}
        <div className="movtego-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Now Showing</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[var(--text-heading)]">{stats.nowShowing}</span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8.2%
            </span>
          </div>
        </div>

        {/* Tile 3: Upcoming */}
        <div className="movtego-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Upcoming</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[var(--text-heading)]">{stats.upcoming}</span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +5.6%
            </span>
          </div>
        </div>

        {/* Tile 4: Draft */}
        <div className="movtego-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Draft</span>
            <div className="w-8 h-8 rounded-xl bg-slate-500/15 text-slate-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[var(--text-heading)]">{stats.draft}</span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +3.1%
            </span>
          </div>
        </div>

        {/* Tile 5: Archived */}
        <div className="movtego-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Archived</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[var(--text-heading)]">{stats.archived}</span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +1.9%
            </span>
          </div>
        </div>

      </div>

      {/* 3. FILTER CONTROLS BAR (Matching Reference Screenshot) */}
      <div className="movtego-card p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] sm:min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] text-xs"
          />
        </div>

        {/* Genre Dropdown */}
        <div className="shrink-0">
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-2xl px-3.5 py-2.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
          >
            {genres.map((g, i) => (
              <option key={i} value={g}>{g === 'All' ? 'All Genres' : g}</option>
            ))}
          </select>
        </div>

        {/* Language Dropdown */}
        <div className="shrink-0">
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-2xl px-3.5 py-2.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
          >
            {languages.map((l, i) => (
              <option key={i} value={l}>{l === 'All' ? 'All Languages' : l}</option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="shrink-0">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-2xl px-3.5 py-2.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
          >
            {statuses.map((s, i) => (
              <option key={i} value={s}>{s === 'All' ? 'All Status' : s}</option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="shrink-0 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl px-3.5 py-2.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] text-xs font-semibold"
          >
            <option value="release_date">Release Date</option>
            <option value="rating">Highest Rating</option>
            <option value="title">Movie Title (A-Z)</option>
            <option value="duration">Runtime Duration</option>
          </select>
        </div>

        {/* Layout View Toggle (Grid vs List) */}
        <div className="flex items-center gap-1 bg-[var(--input-bg)] p-1 rounded-2xl border border-[var(--border)] shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
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
            className={`p-2 rounded-xl transition-all cursor-pointer ${
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

      {/* 4. MOVIES CATALOG GRID / LIST */}
      {loading ? (
        <Loading text="Fetching movies catalog..." />
      ) : displayedMovies.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex flex-col gap-3"
        }>
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onViewDetails={(m) => setSelectedMovieForDetail(m)}
              onEdit={(m) => {
                setEditingMovie(m);
                setIsAddModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Film}
          title="No Movies Found"
          description="No movies match your filter criteria or search query."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedGenre('All');
            setSelectedLanguage('All');
            setSelectedStatus('All');
          }}
        />
      )}

      {/* 5. PAGINATION FOOTER (Matching Reference Screenshot) */}
      <div className="movtego-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-[var(--text-muted)] font-medium">
          Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> - <strong>{Math.min(currentPage * itemsPerPage, filteredMovies.length)}</strong> of <strong>{filteredMovies.length}</strong> movies
        </span>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--primary-light)] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-primary-gradient text-white shadow-md'
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
            className="p-2 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--primary-light)] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6. MOVIE DETAILS MODAL (WITH WATCH TRAILER BUTTON) */}
      <MovieDetailsModal
        movie={selectedMovieForDetail}
        isOpen={Boolean(selectedMovieForDetail)}
        onClose={() => setSelectedMovieForDetail(null)}
      />

      {/* 7. MOVIE FORM MODAL (ADD & EDIT) */}
      <MovieFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMovie(null);
        }}
        initialData={editingMovie}
      />

    </div>
  );
};

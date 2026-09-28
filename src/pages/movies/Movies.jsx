import React, { useState } from 'react';
import { useMovies } from '../../context/MovieContext';
import { MovieCard } from '../../components/movies/MovieCard';
import { MovieDetailsModal } from '../../components/movies/MovieDetailsModal';
import { SearchBar } from '../../components/common/SearchBar';
import { Filter } from '../../components/common/Filter';
import { Pagination } from '../../components/common/Pagination';
import { Loading } from '../../components/common/Loading';
import { EmptyState } from '../../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Grid, Film } from 'lucide-react';

export const Movies = () => {
  const {
    movies,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy,
    getFilteredMovies
  } = useMovies();

  const navigate = useNavigate();
  const [selectedMovieForDetail, setSelectedMovieForDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredMovies = getFilteredMovies();
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [
    { value: 'all', label: 'All Movies' },
    { value: 'now_showing', label: 'Now Showing' },
    { value: 'popular', label: 'Popular' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Adventure', 'Animation', 'Biography'];
  const languages = ['All', 'English', 'Hindi', 'Spanish'];

  const handleBookMovie = (movie) => {
    navigate('/theatres', { state: { movieId: movie.id, movieTitle: movie.title } });
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0E1411] border border-white/10 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00D690]/15 border border-[#00D690]/40 rounded-full text-[11px] font-extrabold text-[#00D690] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> TMDB Cinema Discovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-outfit text-white">
            Discover Blockbuster Movies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore now showing releases, top rated classics, and upcoming cinema blockbusters.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by movie title..."
        />
      </div>

      {/* Category Tabs & Filter Controls */}
      <div className="space-y-4 bg-[#0E1411] border border-white/10 rounded-3xl p-6">
        
        {/* Category Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <Filter
            label="Category"
            options={categories}
            selected={selectedCategory}
            onChange={(val) => {
              setSelectedCategory(val);
              setCurrentPage(1);
            }}
          />

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141F1A] text-white border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#00D690]"
            >
              <option value="rating_desc">Highest Rating</option>
              <option value="release_desc">Release Date (Newest)</option>
              <option value="title_asc">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Genre & Language Filters */}
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <Filter
            label="Genre"
            options={genres}
            selected={selectedGenre}
            onChange={(val) => {
              setSelectedGenre(val);
              setCurrentPage(1);
            }}
          />

          <Filter
            label="Language"
            options={languages}
            selected={selectedLanguage}
            onChange={(val) => {
              setSelectedLanguage(val);
              setCurrentPage(1);
            }}
          />
        </div>

      </div>

      {/* Movies Grid */}
      {loading ? (
        <Loading text="Fetching TMDB movies list..." />
      ) : displayedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onBook={handleBookMovie}
              onViewDetails={(m) => setSelectedMovieForDetail(m)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Film}
          title="No Movies Found"
          description="No movies match your selected search query and filter criteria."
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setSelectedGenre('All');
            setSelectedLanguage('All');
          }}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovieForDetail}
        isOpen={Boolean(selectedMovieForDetail)}
        onClose={() => setSelectedMovieForDetail(null)}
      />

    </div>
  );
};

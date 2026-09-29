import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { movieApi, MOCK_MOVIES } from '../services/movieApi';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('movtego_movies_catalog');
    return saved ? JSON.parse(saved) : MOCK_MOVIES;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('release_date');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [favorites, setFavoritesState] = useState(storage.getFavorites());
  const [selectedMovieForDetail, setSelectedMovieForDetail] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Persist local custom movies list to localStorage
  useEffect(() => {
    localStorage.setItem('movtego_movies_catalog', JSON.stringify(movies));
  }, [movies]);

  // Fetch movies from API or service on mount and whenever language changes
  useEffect(() => {
    refreshMoviesFromAPI(selectedCategory, searchQuery, selectedLanguage);
  }, [selectedLanguage]);

  // Fetch movies from API or service
  const refreshMoviesFromAPI = async (cat = selectedCategory, search = searchQuery, lang = selectedLanguage) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieApi.getMovies(cat, search, lang);
      if (data && data.length > 0) {
        // Merge API movies with any locally added/edited movies
        const savedLocal = localStorage.getItem('movtego_movies_catalog');
        if (savedLocal) {
          const parsed = JSON.parse(savedLocal);
          // If user added custom movies locally, retain them at top
          const customAdded = parsed.filter(m => typeof m.id === 'number' && m.id > 10000000);
          setMovies([...customAdded, ...data]);
        } else {
          setMovies(data);
        }
      }
    } catch (e) {
      console.error('Failed to fetch movies from API', e);
      setError('Unable to fetch live TMDB movies. Loaded local database.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movieId) => {
    let updated;
    const numId = Number(movieId);
    if (favorites.includes(numId)) {
      updated = favorites.filter((id) => id !== numId);
    } else {
      updated = [...favorites, numId];
    }
    setFavoritesState(updated);
    storage.setFavorites(updated);
  };

  const isFavorite = (movieId) => favorites.includes(Number(movieId));

  // Add a new movie
  const addMovie = (newMovie) => {
    const created = {
      ...newMovie,
      id: Date.now(),
      rating: Number(newMovie.rating) || 8.0,
      runtime: Number(newMovie.runtime) || 120,
      activeShows: Number(newMovie.activeShows) || 10,
      status: newMovie.status || 'Now Showing',
      language: newMovie.language || 'English',
      genres: Array.isArray(newMovie.genres) ? newMovie.genres : [newMovie.genres || 'Sci-Fi'],
      poster: newMovie.poster || 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&auto=format&fit=crop&q=95',
      backdrop: newMovie.backdrop || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=95'
    };
    setMovies((prev) => [created, ...prev]);
  };

  // Update existing movie
  const updateMovie = (id, updatedData) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedData } : m))
    );
  };

  // Delete movie
  const deleteMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  // Compute Filtered Movies
  const getFilteredMovies = () => {
    let filtered = [...movies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.genres && m.genres.some((g) => g.toLowerCase().includes(q))) ||
          (m.language && m.language.toLowerCase().includes(q))
      );
    }

    if (selectedGenre !== 'All') {
      filtered = filtered.filter((m) => m.genres && m.genres.includes(selectedGenre));
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(
        (m) => m.language && m.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(
        (m) => m.status && m.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter((m) => m.rating >= minRating);
    }

    // Sort Handler
    if (sortBy === 'release_date') {
      filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => b.runtime - a.runtime);
    }

    return filtered;
  };

  // Compute Movie Catalog Statistics for Reference Screenshot Header Cards
  const getMovieStats = () => {
    const total = movies.length || 248;
    const nowShowing = movies.filter((m) => m.status === 'Now Showing').length || 28;
    const upcoming = movies.filter((m) => m.status === 'Upcoming').length || 14;
    const draft = movies.filter((m) => m.status === 'Draft').length || 32;
    const archived = movies.filter((m) => m.status === 'Archived').length || 12;

    return { total, nowShowing, upcoming, draft, archived };
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        selectedLanguage,
        setSelectedLanguage,
        selectedStatus,
        setSelectedStatus,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        favorites,
        toggleFavorite,
        isFavorite,
        getFilteredMovies,
        getMovieStats,
        addMovie,
        updateMovie,
        deleteMovie,
        selectedMovieForDetail,
        setSelectedMovieForDetail,
        editingMovie,
        setEditingMovie,
        isAddModalOpen,
        setIsAddModalOpen,
        refreshMoviesFromAPI,
        getMovieById: movieApi.getMovieById
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

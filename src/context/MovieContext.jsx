import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { movieApi, MOCK_MOVIES } from '../services/movieApi';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating_desc');
  const [favorites, setFavoritesState] = useState(storage.getFavorites());
  const [selectedMovieForDetail, setSelectedMovieForDetail] = useState(null);

  // Fetch movies based on category and search
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await movieApi.getMovies(selectedCategory, searchQuery);
        setMovies(data);
      } catch (e) {
        console.error('Failed to fetch movies', e);
        setMovies(MOCK_MOVIES);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedCategory, searchQuery]);

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

  // Advanced movie filtering & sorting
  const getFilteredMovies = () => {
    let filtered = [...movies];

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(m => m.genres && m.genres.includes(selectedGenre));
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(m => m.language.toLowerCase() === selectedLanguage.toLowerCase());
    }

    if (minRating > 0) {
      filtered = filtered.filter(m => m.rating >= minRating);
    }

    // Sort
    if (sortBy === 'rating_desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'release_desc') {
      filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortBy === 'title_asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  const getFavoriteMovies = () => {
    return MOCK_MOVIES.filter(m => favorites.includes(m.id));
  };

  return (
    <MovieContext.Provider
      value={{
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
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        isFavorite,
        getFilteredMovies,
        getFavoriteMovies,
        selectedMovieForDetail,
        setSelectedMovieForDetail,
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

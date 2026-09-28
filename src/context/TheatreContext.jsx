import React, { createContext, useContext, useState } from 'react';
import { CITIES, MOCK_THEATRES, theatreApi } from '../services/theatreApi';

const TheatreContext = createContext();

export const TheatreProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  
  // Date selection (default today)
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const cities = CITIES;

  const getFilteredTheatres = (movieIdFilter = null) => {
    let filtered = theatreApi.getTheatres(selectedCity, searchQuery);

    if (selectedAmenity && selectedAmenity !== 'All') {
      filtered = filtered.filter(t => t.amenities.includes(selectedAmenity));
    }

    if (movieIdFilter) {
      filtered = filtered.filter(t => t.shows.some(s => s.movieId === Number(movieIdFilter)));
    }

    return filtered;
  };

  return (
    <TheatreContext.Provider
      value={{
        cities,
        selectedCity,
        setSelectedCity,
        searchQuery,
        setSearchQuery,
        selectedAmenity,
        setSelectedAmenity,
        selectedDate,
        setSelectedDate,
        getFilteredTheatres,
        getTheatreById: theatreApi.getTheatreById,
        getShowById: theatreApi.getShowById,
      }}
    >
      {children}
    </TheatreContext.Provider>
  );
};

export const useTheatre = () => {
  const context = useContext(TheatreContext);
  if (!context) {
    throw new Error('useTheatre must be used within a TheatreProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CITIES, AMENITIES_LIST, theatreApi } from '../services/theatreApi';

const TheatreContext = createContext();

export const TheatreProvider = ({ children }) => {
  const [theatres, setTheatres] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [selectedScreenFilter, setSelectedScreenFilter] = useState('All');
  
  // Date selection (default today)
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const cities = CITIES;
  const amenities = AMENITIES_LIST;

  const refreshTheatres = useCallback(() => {
    const list = theatreApi.getTheatres('All', '');
    setTheatres(list);
  }, []);

  useEffect(() => {
    refreshTheatres();
  }, [refreshTheatres]);

  const addTheatre = (newTheatreData) => {
    const created = theatreApi.addTheatre(newTheatreData);
    refreshTheatres();
    return created;
  };

  const updateTheatre = (id, updatedFields) => {
    const updated = theatreApi.updateTheatre(id, updatedFields);
    refreshTheatres();
    return updated;
  };

  const deleteTheatre = (id) => {
    const success = theatreApi.deleteTheatre(id);
    refreshTheatres();
    return success;
  };

  const resetTheatres = () => {
    theatreApi.resetToDefaults();
    refreshTheatres();
  };

  const getFilteredTheatres = useCallback((movieIdFilter = null) => {
    let filtered = theatres;

    if (selectedCity && selectedCity !== 'All') {
      filtered = filtered.filter(t => t.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q) ||
        (t.amenities && t.amenities.some(a => a.toLowerCase().includes(q)))
      );
    }

    if (selectedAmenity && selectedAmenity !== 'All') {
      filtered = filtered.filter(t => t.amenities && t.amenities.includes(selectedAmenity));
    }

    if (selectedScreenFilter && selectedScreenFilter !== 'All') {
      if (selectedScreenFilter === '5+') {
        filtered = filtered.filter(t => (t.screensCount || 0) >= 5);
      } else if (selectedScreenFilter === '8+') {
        filtered = filtered.filter(t => (t.screensCount || 0) >= 8);
      } else if (selectedScreenFilter === '1-4') {
        filtered = filtered.filter(t => (t.screensCount || 0) <= 4);
      }
    }

    if (movieIdFilter) {
      filtered = filtered.filter(t => t.shows && t.shows.some(s => s.movieId === Number(movieIdFilter)));
    }

    return filtered;
  }, [theatres, selectedCity, searchQuery, selectedAmenity, selectedScreenFilter]);

  const getTheatreStats = useCallback(() => {
    const totalTheatres = theatres.length;
    const uniqueCities = new Set(theatres.map(t => t.city)).size;
    const totalScreens = theatres.reduce((acc, t) => acc + (t.screensCount || (t.screens ? t.screens.length : 0)), 0);
    const totalShows = theatres.reduce((acc, t) => acc + (t.shows ? t.shows.length : 0), 0);
    
    // Extract brand names (e.g. PVR, INOX, AMB, Cinepolis, Prasads, Sathyam)
    const brandSet = new Set();
    theatres.forEach(t => {
      const brand = t.name.split(' ')[0];
      if (brand) brandSet.add(brand);
    });

    return {
      totalTheatres,
      totalCities: uniqueCities,
      totalScreens,
      totalShows,
      totalBrands: brandSet.size
    };
  }, [theatres]);

  return (
    <TheatreContext.Provider
      value={{
        theatres,
        cities,
        amenities,
        selectedCity,
        setSelectedCity,
        searchQuery,
        setSearchQuery,
        selectedAmenity,
        setSelectedAmenity,
        selectedScreenFilter,
        setSelectedScreenFilter,
        selectedDate,
        setSelectedDate,
        addTheatre,
        updateTheatre,
        deleteTheatre,
        resetTheatres,
        getFilteredTheatres,
        getTheatreStats,
        getTheatreById: theatreApi.getTheatreById,
        getShowById: theatreApi.getShowById,
        refreshTheatres
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

import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useMovies } from '../../context/MovieContext';
import { Film, Calendar, Clock, Star, Globe, Tag, Ticket, Image, Video, CheckCircle2, Edit3, PlusCircle } from 'lucide-react';

export const MovieFormModal = ({ isOpen, onClose, initialData = null, onSuccess }) => {
  const { addMovie, updateMovie } = useMovies();

  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    poster: '',
    backdrop: '',
    genres: 'Sci-Fi, Action',
    language: 'English',
    runtime: '120',
    rating: '8.0',
    releaseDate: new Date().toISOString().split('T')[0],
    status: 'Now Showing',
    activeShows: '10',
    overview: '',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        originalTitle: initialData.originalTitle || '',
        poster: initialData.poster || '',
        backdrop: initialData.backdrop || '',
        genres: Array.isArray(initialData.genres) ? initialData.genres.join(', ') : initialData.genres || 'Sci-Fi',
        language: initialData.language || 'English',
        runtime: String(initialData.runtime || 120),
        rating: String(initialData.rating || 8.0),
        releaseDate: initialData.releaseDate || new Date().toISOString().split('T')[0],
        status: initialData.status || 'Now Showing',
        activeShows: String(initialData.activeShows || 10),
        overview: initialData.overview || '',
        trailerUrl: initialData.trailerUrl || 'https://www.youtube.com/embed/Way9Dexny3w'
      });
    } else {
      setFormData({
        title: '',
        originalTitle: '',
        poster: '',
        backdrop: '',
        genres: 'Sci-Fi, Action',
        language: 'English',
        runtime: '120',
        rating: '8.0',
        releaseDate: new Date().toISOString().split('T')[0],
        status: 'Now Showing',
        activeShows: '10',
        overview: '',
        trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const moviePayload = {
      ...formData,
      genres: formData.genres.split(',').map((g) => g.trim()).filter(Boolean),
      runtime: Number(formData.runtime),
      rating: Number(formData.rating),
      activeShows: Number(formData.activeShows)
    };

    if (initialData && initialData.id) {
      updateMovie(initialData.id, moviePayload);
      if (onSuccess) onSuccess(`Successfully updated "${formData.title}"`);
    } else {
      addMovie(moviePayload);
      if (onSuccess) onSuccess(`Successfully added "${formData.title}"`);
    }

    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Edit Movie Details' : 'Add New Movie'}
      subtitle={initialData ? 'Modify details & click Save Changes' : 'Fill in the information below to add a movie'}
      icon={initialData ? Edit3 : PlusCircle}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left py-1">
        
        {/* Row 1: Title & Subtitle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Input
            label="Movie Title"
            icon={Film}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Inception / Kalki 2898 AD"
            required
          />

          <Input
            label="Original / Sub Title"
            icon={Tag}
            value={formData.originalTitle}
            onChange={(e) => setFormData({ ...formData, originalTitle: e.target.value })}
            placeholder="e.g. The Mind is the Scene of the Crime"
          />
        </div>

        {/* Row 2: Language & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Input
            label="Language"
            icon={Globe}
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            placeholder="English, Telugu, Hindi, etc."
            required
          />

          <div className="w-full space-y-1.5 text-left">
            <label className="block text-xs font-bold text-[var(--text-heading)] tracking-wide">
              Release Status <span className="text-[var(--primary)]">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-2xl text-xs py-3 px-3.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] font-bold cursor-pointer transition-colors"
            >
              <option value="Now Showing">Now Showing</option>
              <option value="Published">Published</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Row 3: Genres & Release Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Input
            label="Genres (comma separated)"
            icon={Tag}
            value={formData.genres}
            onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
            placeholder="Sci-Fi, Action, Drama"
            required
          />

          <Input
            label="Release Date"
            type="date"
            icon={Calendar}
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
            required
          />
        </div>

        {/* Row 4: Metrics (Rating, Runtime, Active Shows) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-start">
          <Input
            label="Rating (1-10)"
            type="number"
            step="0.1"
            icon={Star}
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            placeholder="8.5"
            required
          />

          <Input
            label="Runtime (min)"
            type="number"
            icon={Clock}
            value={formData.runtime}
            onChange={(e) => setFormData({ ...formData, runtime: e.target.value })}
            placeholder="150"
            required
          />

          <Input
            label="Active Shows"
            type="number"
            icon={Ticket}
            value={formData.activeShows}
            onChange={(e) => setFormData({ ...formData, activeShows: e.target.value })}
            placeholder="12"
            required
          />
        </div>

        {/* Row 5: Media URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Input
            label="Poster Image URL"
            icon={Image}
            value={formData.poster}
            onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
            placeholder="https://image.tmdb.org/t/p/w780/..."
          />

          <Input
            label="YouTube Trailer Embed URL"
            icon={Video}
            value={formData.trailerUrl}
            onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>

        {/* Row 6: Overview */}
        <div className="w-full space-y-1.5 text-left">
          <label className="text-xs font-bold text-[var(--text-heading)] block tracking-wide">
            Movie Synopsis / Overview
          </label>
          <textarea
            rows="3"
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            placeholder="Enter full storyline, cast highlights, and plot description..."
            className="w-full rounded-2xl text-xs p-3.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 resize-none font-normal leading-relaxed"
          />
        </div>

        {/* Row 7: Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={onClose} type="button" className="font-semibold text-xs">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="teal" 
            className="flex items-center gap-1.5 font-black text-xs px-6 py-2.5 shadow-md shadow-[#14B8A0]/30 hover:scale-105 transition-transform cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            {initialData ? 'Save Changes' : 'Create Movie'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};

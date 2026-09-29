import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useMovies } from '../../context/MovieContext';
import { Film, Calendar, Clock, Star, Globe, Tag, Tv, Ticket, Image, Video } from 'lucide-react';

export const MovieFormModal = ({ isOpen, onClose, initialData = null }) => {
  const { addMovie, updateMovie } = useMovies();

  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    poster: '',
    backdrop: '',
    genres: 'Sci-Fi',
    language: 'English',
    runtime: '120',
    rating: '8.0',
    releaseDate: '2025-01-01',
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
        releaseDate: initialData.releaseDate || '2025-01-01',
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
        genres: 'Sci-Fi',
        language: 'English',
        runtime: '120',
        rating: '8.0',
        releaseDate: '2025-01-01',
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
      genres: formData.genres.split(',').map((g) => g.trim()),
      runtime: Number(formData.runtime),
      rating: Number(formData.rating),
      activeShows: Number(formData.activeShows)
    };

    if (initialData && initialData.id) {
      updateMovie(initialData.id, moviePayload);
    } else {
      addMovie(moviePayload);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Movie Details' : 'Add New Movie'}>
      <form onSubmit={handleSubmit} className="space-y-4 text-left p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Movie Title"
            icon={Film}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Avatar: The Way of Water"
            required
          />

          <Input
            label="Original / Sub Title"
            icon={Tag}
            value={formData.originalTitle}
            onChange={(e) => setFormData({ ...formData, originalTitle: e.target.value })}
            placeholder="Avatar 2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Language"
            icon={Globe}
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            placeholder="English / Telugu"
            required
          />

          <Input
            label="Genres (comma separated)"
            icon={Tag}
            value={formData.genres}
            onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
            placeholder="Sci-Fi, Action, Drama"
            required
          />

          <div>
            <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-2xl text-xs py-3 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="Now Showing">Now Showing</option>
              <option value="Published">Published</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Draft">Draft</option>
              <option value="Unpublished">Unpublished</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Input
            label="Release Date"
            type="date"
            icon={Calendar}
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
            required
          />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Poster URL"
            icon={Image}
            value={formData.poster}
            onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
            placeholder="https://image.tmdb.org/..."
          />

          <Input
            label="Trailer YouTube Embed URL"
            icon={Video}
            value={formData.trailerUrl}
            onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--text-heading)] mb-1">Movie Synopsis / Overview</label>
          <textarea
            rows="3"
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            placeholder="Enter full movie storyline and description..."
            className="w-full rounded-2xl text-xs p-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="teal">
            {initialData ? 'Save Changes' : 'Create Movie'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

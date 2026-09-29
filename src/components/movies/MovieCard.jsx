import React, { useState } from 'react';
import { Star, Clock, Calendar, Ticket, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';

export const MovieCard = ({ movie, onViewDetails, onEdit }) => {
  const { deleteMovie } = useMovies();
  const [showDropdown, setShowDropdown] = useState(false);

  // Status color styles matching the MOVTEGO reference screenshot
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Now Showing':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30';
      case 'Published':
        return 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30';
      case 'Upcoming':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30';
      case 'Draft':
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30';
      case 'Unpublished':
        return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30';
      case 'Archived':
        return 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30';
      default:
        return 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '18 Dec 2009';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="movtego-card p-4 transition-all duration-200 hover:border-[#14B8A0]/60 hover:shadow-lg flex flex-col justify-between text-left group relative">
      
      {/* Top Main Section: Poster Thumbnail + Right Info Details */}
      <div className="flex gap-3 items-start">
        
        {/* Left Vertical Poster Image */}
        <div 
          onClick={() => onViewDetails && onViewDetails(movie)}
          className="w-24 h-32 shrink-0 rounded-xl overflow-hidden border border-[var(--border)] shadow-sm bg-slate-900 cursor-pointer relative group/poster"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Details Column */}
        <div className="flex-1 min-w-0 space-y-1.5">
          
          {/* Header Row: Title & 3-Dots Menu */}
          <div className="flex items-start justify-between gap-1">
            <h3 
              onClick={() => onViewDetails && onViewDetails(movie)}
              className="font-bold text-sm text-[var(--text-heading)] hover:text-[var(--primary)] transition-colors line-clamp-1 cursor-pointer"
            >
              {movie.title}
            </h3>

            {/* Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-1 rounded-lg hover:bg-[var(--primary-light)] text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {/* Dropdown Options */}
              {showDropdown && (
                <div className="absolute right-0 top-6 w-32 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-xl shadow-xl z-30 py-1 text-xs">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onViewDetails && onViewDetails(movie);
                    }}
                    className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-[var(--primary-light)] text-[var(--text-heading)]"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-500" /> View Details
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onEdit && onEdit(movie);
                    }}
                    className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-[var(--primary-light)] text-[var(--text-heading)]"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-500" /> Edit Movie
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      deleteMovie(movie.id);
                    }}
                    className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-red-500/10 text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" /> Delete Movie
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Badges Row: Language & Genre */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="px-2 py-0.5 rounded-md bg-[var(--input-bg)] border border-[var(--border)] font-medium text-[var(--text-muted)]">
              {movie.language || 'English'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--input-bg)] border border-[var(--border)] font-medium text-[var(--text-muted)]">
              {movie.genres?.[0] || 'Sci-Fi'}
            </span>
          </div>

          {/* Release Date Row */}
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] pt-0.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>

          {/* Rating & Duration Row */}
          <div className="flex items-center gap-3 text-[11px] font-semibold text-[var(--text-heading)]">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {movie.rating}
            </span>
            <span className="flex items-center gap-1 text-[var(--text-muted)] font-normal">
              <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" /> {movie.runtime || 120} min
            </span>
          </div>

          {/* Status Badge */}
          <div className="pt-1">
            <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${getStatusBadge(movie.status)}`}>
              {movie.status || 'Now Showing'}
            </span>
          </div>

        </div>

      </div>

      {/* Card Footer Divider & Action Buttons */}
      <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-xs">
        
        {/* Active Shows Tag */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--primary)]">
          <Ticket className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span className="text-[10px] text-[var(--text-muted)]">Active Shows:</span>
          <strong className="text-[11px]">{movie.activeShows || 12}</strong>
        </div>

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewDetails && onViewDetails(movie)}
            className="p-1.5 rounded-lg hover:bg-[var(--primary-light)] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onEdit && onEdit(movie)}
            className="p-1.5 rounded-lg hover:bg-[var(--primary-light)] text-[var(--text-muted)] hover:text-[#14B8A0] transition-colors cursor-pointer"
            title="Edit Movie"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => deleteMovie(movie.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500 transition-colors cursor-pointer"
            title="Delete Movie"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Star, Clock, Calendar, Ticket, Eye, Edit, Trash2, Play, Heart, MoreVertical } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';

export const MovieCard = ({ movie, viewMode = 'grid', onViewDetails, onEdit, onDelete }) => {
  const { deleteMovie, isFavorite, toggleFavorite } = useMovies();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDeleteTrigger = (e) => {
    e.stopPropagation();
    setShowDropdown(false);
    if (onDelete) {
      onDelete(movie);
    } else {
      deleteMovie(movie.id);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80';
  };

  const favorite = isFavorite(movie.id);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBA';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // Status color styles matching design system tokens
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Now Showing':
        return 'bg-emerald-500 text-white font-black';
      case 'Published':
        return 'bg-teal-500 text-white font-black';
      case 'Upcoming':
        return 'bg-purple-600 text-white font-black';
      case 'Draft':
        return 'bg-amber-500 text-white font-black';
      case 'Archived':
        return 'bg-cyan-600 text-white font-black';
      default:
        return 'bg-[#14B8A0] text-white font-black';
    }
  };

  // ----------------------------------------------------
  // LIST VIEW LAYOUT (BookMyShow Studio Row)
  // ----------------------------------------------------
  if (viewMode === 'list') {
    return (
      <div className="movtego-card p-4 rounded-2xl border border-[var(--border)] transition-all duration-300 hover:border-[#14B8A0]/70 hover:shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 group text-left relative shadow-sm">
        
        {/* Left Poster + Title Details */}
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full sm:w-auto">
          <div 
            onClick={() => onViewDetails && onViewDetails(movie)}
            className="w-20 aspect-[2/3] shrink-0 rounded-xl overflow-hidden border border-[var(--border)] shadow-md bg-slate-900 cursor-pointer relative group/poster"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover/poster:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 flex items-center justify-center transition-opacity">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 
                onClick={() => onViewDetails && onViewDetails(movie)}
                className="font-extrabold text-base sm:text-lg text-[var(--text-heading)] hover:text-[var(--primary)] transition-colors line-clamp-1 cursor-pointer tracking-tight"
              >
                {movie.title}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-[var(--input-bg)] text-[10px] font-black border border-[var(--border)] text-[var(--text-heading)]">
                UA
              </span>
              <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${getStatusBadge(movie.status)}`}>
                {movie.status || 'Now Showing'}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] line-clamp-1 font-medium">
              {movie.tagline || movie.overview}
            </p>

            <div className="flex items-center gap-3 text-xs flex-wrap font-semibold text-[var(--text-heading)]">
              <span className="flex items-center gap-1 text-amber-500 font-extrabold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {movie.rating}
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-muted)] font-medium">
                {movie.runtime || 135} min
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--primary)] font-bold">
                {movie.language || 'English'}
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-muted)] font-medium">
                {formatDate(movie.releaseDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Center Genres & Formats */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {(movie.genres || ['Sci-Fi', 'Action']).slice(0, 2).map((g, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-xs font-semibold text-[var(--text-heading)]">
              {g}
            </span>
          ))}
          {(movie.formats || ['IMAX 3D']).slice(0, 1).map((f, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold">
              {f}
            </span>
          ))}
        </div>

        {/* Right Book Shows & Admin Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[var(--border)] w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => onViewDetails && onViewDetails(movie)}
            className="px-4 py-2 rounded-xl bg-primary-gradient text-white font-extrabold text-xs shadow-md shadow-[#14B8A0]/30 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
          >
            <Ticket className="w-4 h-4" /> Book Tickets ({movie.activeShows || 14})
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit && onEdit(movie)}
              className="p-2 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] hover:text-[#14B8A0] transition-colors cursor-pointer"
              title="Edit Movie"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDeleteTrigger}
              className="p-2 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] hover:text-red-500 transition-colors cursor-pointer"
              title="Delete Movie"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // GRID VIEW LAYOUT (Original 2:3 Vertical Card Size)
  // ----------------------------------------------------
  return (
    <div 
      onClick={() => onViewDetails && onViewDetails(movie)}
      className="movtego-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#14B8A0]/80 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between text-left group relative border border-[var(--border)] cursor-pointer h-full shadow-sm"
    >
      
      {/* 1. BOOKMYSHOW 2:3 POSTER CONTAINER WITH OVERLAY METRICS */}
      <div className="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden group/poster shrink-0">
        
        {/* Main Vertical Poster Image */}
        <img
          src={movie.poster}
          alt={movie.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-500"
        />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          
          {/* Status Badge */}
          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md ${getStatusBadge(movie.status)}`}>
            {movie.status || 'Now Showing'}
          </span>

          {/* Watchlist Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              favorite ? 'bg-red-500 text-white' : 'bg-black/60 text-white hover:bg-black/90'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Action Play Trailer Circle Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/poster:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <div className="w-14 h-14 rounded-full bg-primary-gradient text-white flex items-center justify-center shadow-2xl shadow-[#14B8A0]/60 hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-white ml-1" />
          </div>
        </div>

        {/* BOOKMYSHOW SIGNATURE BOTTOM POSTER OVERLAY BAR */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pt-6 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white z-10">
          
          {/* Rating Pill */}
          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-amber-400/40 text-amber-400 font-black text-xs shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{movie.rating}</span>
          </div>

          {/* Formats / Language Tag */}
          <span className="text-[10px] font-black tracking-wider uppercase bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 text-slate-100">
            {movie.language?.toUpperCase() || 'ENGLISH'}
          </span>

        </div>

      </div>

      {/* 2. BOOKMYSHOW CARD DETAILS BELOW POSTER */}
      <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-1">
          
          {/* Header Row: Title & Options Dropdown */}
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="font-extrabold text-base text-[var(--text-heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-1 tracking-tight">
              {movie.title}
            </h3>

            {/* Menu Dropdown Trigger */}
            <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-1 rounded-lg hover:bg-[var(--primary-light)] text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Options Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-7 w-36 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-2xl shadow-2xl z-30 py-1.5 text-xs font-semibold animate-in fade-in">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onViewDetails && onViewDetails(movie);
                    }}
                    className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[var(--primary-light)] text-[var(--text-heading)] cursor-pointer text-left"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-500" /> View Details
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onEdit && onEdit(movie);
                    }}
                    className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[var(--primary-light)] text-[var(--text-heading)] cursor-pointer text-left"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-500" /> Edit Movie
                  </button>
                  <button
                    onClick={handleDeleteTrigger}
                    className="w-full px-3 py-2 flex items-center gap-2 hover:bg-red-500/10 text-red-500 cursor-pointer text-left"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" /> Delete Movie
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Certificate & Genre Line */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium flex-wrap">
            <span className="px-1.5 py-0.5 rounded bg-[var(--input-bg)] border border-[var(--border)] text-[10px] font-black text-[var(--text-heading)]">
              UA
            </span>
            <span>{(movie.genres || ['Sci-Fi', 'Action']).join(', ')}</span>
          </div>

          {/* Duration & Active Shows */}
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-0.5 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" /> {movie.runtime || 135} mins
            </span>
            <span className="flex items-center gap-1 font-bold text-[var(--primary)]">
              <Ticket className="w-3.5 h-3.5 text-[var(--primary)]" /> {movie.activeShows || 14} Shows
            </span>
          </div>

        </div>

        {/* BOOKMYSHOW PRIMARY ACTION CTA BUTTON */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails && onViewDetails(movie);
            }}
            className="w-full py-2.5 rounded-xl bg-primary-gradient text-white font-extrabold text-xs shadow-md shadow-[#14B8A0]/30 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Ticket className="w-4 h-4" /> Book Tickets
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(movie);
            }}
            className="p-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] hover:text-[#14B8A0] transition-colors cursor-pointer shrink-0"
            title="Edit Movie"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

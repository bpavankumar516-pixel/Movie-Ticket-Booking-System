import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Star, Clock, Calendar, Globe, Heart, Play, Ticket, Flame, X } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export const MovieDetailsModal = ({ movie, isOpen, onClose }) => {
  const { isFavorite, toggleFavorite } = useMovies();
  const navigate = useNavigate();
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  if (!movie) return null;

  const favorite = isFavorite(movie.id);

  const handleBookClick = () => {
    onClose();
    navigate('/theatres', { state: { movieId: movie.id, movieTitle: movie.title } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="relative space-y-6 text-left -m-6 p-6 sm:p-8 bg-[#0E1411] border border-white/10 rounded-3xl overflow-hidden max-h-[85vh] overflow-y-auto">
        
        {/* Backdrop Banner */}
        <div className="relative h-64 sm:h-80 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1411] via-[#0E1411]/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-black border border-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Trailer Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={() => setIsPlayingTrailer(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#00D690] hover:bg-[#00EF9F] text-[#060A08] font-black text-xs shadow-2xl shadow-emerald-500/50 hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4 fill-current" /> Watch Trailer
            </button>
          </div>
        </div>

        {/* Trailer Modal Player inside */}
        {isPlayingTrailer && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 mb-6 shadow-2xl">
            <button
              onClick={() => setIsPlayingTrailer(false)}
              className="absolute top-3 right-3 z-30 px-3 py-1 bg-black/80 text-white rounded-full text-xs font-bold border border-white/20"
            >
              Close Trailer ✕
            </button>
            <iframe
              src={`${movie.trailerUrl || 'https://www.youtube.com/embed/Way9Dexny3w'}?autoplay=1`}
              title={`${movie.title} Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Header Details Info */}
        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
          
          {/* Poster */}
          <div className="shrink-0 w-36 h-52 sm:w-44 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#00D690]/40 shadow-2xl -mt-16 sm:-mt-24 relative z-20 bg-slate-900">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#00D690]/15 border border-[#00D690]/30 text-[#00D690] text-xs font-bold rounded-full">
                  {movie.status || 'Now Showing'}
                </span>
                <span className="flex items-center gap-1 text-xs font-extrabold text-[#060A08] bg-[#00D690] px-3 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#060A08]" /> {movie.rating} / 10
                </span>
              </div>

              <button
                onClick={() => toggleFavorite(movie.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  favorite
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current text-red-500' : ''}`} />
                <span>{favorite ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-white leading-tight">
              {movie.title} {movie.originalTitle && <span className="text-slate-400 text-lg font-medium">({movie.originalTitle})</span>}
            </h2>

            {movie.tagline && (
              <p className="text-xs italic text-[#00D690] font-medium">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#00D690]" /> {movie.runtime} min</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#00D690]" /> {movie.releaseDate}</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-[#00D690]" /> {movie.language || 'English'}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {movie.genres && movie.genres.map((g, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold rounded-full">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Synopsis</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {movie.overview}
          </p>
        </div>

        {/* Cast & Crew */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cast & Crew</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {movie.cast.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 bg-white/5 rounded-2xl border border-white/5">
                  <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-[#00D690]/50" />
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-xs font-bold text-white truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-400 truncate">{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formats */}
        {movie.formats && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Cinema Formats</h4>
            <div className="flex flex-wrap gap-2">
              {movie.formats.map((fmt, i) => (
                <span key={i} className="px-3 py-1 bg-[#00D690]/10 border border-[#00D690]/30 text-[#00D690] text-xs font-bold rounded-full">
                  ⚡ {fmt}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Booking CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
            <span className="text-xs font-extrabold text-[#00D690]">Pre-Bookings Open</span>
          </div>

          <Button variant="emerald" size="lg" icon={Ticket} onClick={handleBookClick} className="px-8 shadow-xl shadow-emerald-500/30">
            Select Showtimes & Book Seats
          </Button>
        </div>

      </div>
    </Modal>
  );
};

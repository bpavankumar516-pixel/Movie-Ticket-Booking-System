import React from 'react';
import { Star, Heart, Clock, Calendar, Ticket, Play } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';
import { Button } from '../common/Button';

export const MovieCard = ({ movie, onBook, onViewDetails }) => {
  const { isFavorite, toggleFavorite } = useMovies();
  const favorite = isFavorite(movie.id);

  return (
    <div className="group relative bg-[#0E1411] border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#00D690]/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col h-full text-left">
      
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewDetails && onViewDetails(movie)}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1411] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="flex items-center gap-1 text-[11px] font-extrabold text-[#060A08] bg-[#00D690] px-2.5 py-0.5 rounded-full shadow-lg">
            <Star className="w-3 h-3 fill-[#060A08]" /> {movie.rating}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              favorite 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/40' 
                : 'bg-black/60 text-white/70 hover:text-white hover:bg-black'
            }`}
            title={favorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Play Trailer Icon Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/30 backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-[#00D690] text-[#060A08] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Formats Pills on Bottom of Poster */}
        {movie.formats && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 z-10">
            {movie.formats.slice(0, 2).map((fmt, i) => (
              <span key={i} className="text-[9px] font-extrabold text-white bg-black/60 px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-wider backdrop-blur-md">
                {fmt}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-1.5" onClick={() => onViewDetails && onViewDetails(movie)}>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>{movie.genres?.[0] || 'Sci-Fi'}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#00D690]" /> {movie.runtime}m</span>
          </div>

          <h3 className="text-base font-extrabold font-outfit text-white group-hover:text-[#00D690] transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> {movie.releaseDate}
          </span>

          <Button
            variant="emerald"
            size="sm"
            icon={Ticket}
            onClick={() => onBook ? onBook(movie) : (onViewDetails && onViewDetails(movie))}
          >
            Book Now
          </Button>
        </div>

      </div>

    </div>
  );
};

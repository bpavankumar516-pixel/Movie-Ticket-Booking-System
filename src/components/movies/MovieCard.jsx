import React from 'react';
import { Star, Heart, Clock, Calendar, Ticket, Play } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';
import { Button } from '../common/Button';

export const MovieCard = ({ movie, onBook, onViewDetails }) => {
  const { isFavorite, toggleFavorite } = useMovies();
  const favorite = isFavorite(movie.id);

  return (
    <div className="group relative movtego-card overflow-hidden transition-all duration-300 hover:border-[#0FA58A] hover:-translate-y-1 hover:shadow-lg flex flex-col h-full text-left">
      
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onViewDetails && onViewDetails(movie)}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#0FA58A] px-2.5 py-0.5 rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {movie.rating}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              favorite 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-black/50 text-white hover:bg-black/80'
            }`}
            title={favorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Play Trailer Icon Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/20 backdrop-blur-[1px]">
          <div className="w-11 h-11 rounded-full bg-[#0FA58A] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Formats Pills on Bottom of Poster */}
        {movie.formats && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 z-10">
            {movie.formats.slice(0, 2).map((fmt, i) => (
              <span key={i} className="text-[9px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md border border-white/20 uppercase tracking-wider backdrop-blur-md">
                {fmt}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-1" onClick={() => onViewDetails && onViewDetails(movie)}>
          <div className="flex items-center gap-2 text-[10px] text-[#8A97A6] font-semibold uppercase tracking-wider">
            <span>{movie.genres?.[0] || 'Sci-Fi'}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#0FA58A]" /> {movie.runtime}m</span>
          </div>

          <h3 className="text-sm font-bold text-[#0F1F2E] group-hover:text-[#0FA58A] transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <p className="text-xs text-[#8A97A6] line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2 border-t border-[#E8F0F0] flex items-center justify-between gap-2">
          <span className="text-[10px] text-[#8A97A6] font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#8A97A6]" /> {movie.releaseDate}
          </span>

          <Button
            variant="teal"
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

import React, { useState } from 'react';
import { Building2, MapPin, Monitor, Armchair, Eye, Edit3, Trash2, Heart } from 'lucide-react';

export const TheatreCard = ({ theatre, viewMode = 'grid', onViewDetails, onEdit, onDelete }) => {
  const { id, name, city, address, rating, reviewsCount, screensCount, totalSeats, status = 'Active', type = 'Multiplex', brandLogo, image } = theatre;

  const [isLiked, setIsLiked] = useState(false);

  const getStatusBadgeStyle = (st) => {
    switch (st) {
      case 'Active':
        return 'bg-emerald-500 text-white font-black';
      case 'Inactive':
        return 'bg-rose-500 text-white font-black';
      case 'Upcoming':
        return 'bg-amber-500 text-white font-black';
      default:
        return 'bg-[#14B8A0] text-white font-black';
    }
  };

  const getTypeBadgeStyle = (tp) => {
    if (tp === 'Single Screen') {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
    return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
  };

  // --------------------------------------------------
  // LIST VIEW LAYOUT
  // --------------------------------------------------
  if (viewMode === 'list') {
    return (
      <div className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--primary)] transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 group text-left shadow-sm">
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full sm:w-auto">
          <div 
            onClick={() => onViewDetails && onViewDetails(theatre)}
            className="w-24 aspect-[4/3] shrink-0 rounded-xl overflow-hidden border border-[var(--border)] bg-slate-900 cursor-pointer relative group/img"
          >
            <img
              src={image || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80'}
              alt={name}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
            />
            <span className={`absolute top-1.5 left-1.5 px-2 py-0.5 text-[9px] font-black uppercase rounded-full ${getStatusBadgeStyle(status)}`}>
              {status}
            </span>
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 
                onClick={() => onViewDetails && onViewDetails(theatre)}
                className="font-extrabold text-base text-[var(--text-heading)] hover:text-[var(--primary)] transition-colors line-clamp-1 cursor-pointer tracking-tight"
              >
                {name}
              </h3>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getTypeBadgeStyle(type)}`}>
                {type}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 line-clamp-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
              {address || `${city}, Telangana`}
            </p>

            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-1 font-semibold">
              <span className="flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-[var(--primary)]" />
                {screensCount || 4} Screens
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Armchair className="w-3.5 h-3.5 text-[var(--primary)]" />
                {(totalSeats || 1200).toLocaleString()} Seats
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[var(--border)] w-full sm:w-auto justify-end">
          <button
            onClick={() => onViewDetails && onViewDetails(theatre)}
            className="p-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onEdit && onEdit(theatre)}
            className="p-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            title="Edit Theatre"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete && onDelete(theatre)}
            className="p-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-heading)] hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer"
            title="Delete Theatre"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // GRID VIEW LAYOUT (Exact Match to media_1790751385598.jpg)
  // --------------------------------------------------
  return (
    <div className="movtego-card rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--primary)]/70 transition-all duration-300 flex flex-col justify-between group h-full text-left shadow-sm hover:shadow-xl relative">
      
      {/* 1. Header Image Container */}
      <div 
        onClick={() => onViewDetails && onViewDetails(theatre)}
        className="relative h-32 sm:h-36 overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={image || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80'}
          alt={name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
        />

        {/* Top Status Pill (Left) & Heart Button (Right) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full shadow-md ${getStatusBadgeStyle(status)}`}>
            {status}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all cursor-pointer border border-white/20 shadow-sm"
            title="Save to Favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* 2. Middle Brand Logo & Main Title Row */}
      <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Brand Logo Circle + Title */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--primary)]/40 shrink-0 bg-slate-900 shadow-sm flex items-center justify-center font-black text-xs text-white uppercase">
              {brandLogo ? (
                <img src={brandLogo} alt={name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-4 h-4 text-[var(--primary)]" />
              )}
            </div>

            <div className="space-y-0.5 min-w-0 flex-1">
              <h3 
                onClick={() => onViewDetails && onViewDetails(theatre)}
                className="font-extrabold text-sm text-[var(--text-heading)] line-clamp-1 hover:text-[var(--primary)] transition-colors cursor-pointer tracking-tight"
                title={name}
              >
                {name}
              </h3>

              <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 line-clamp-1 font-medium">
                <MapPin className="w-3 h-3 text-[var(--primary)] shrink-0" />
                {address || `${city}, Telangana`}
              </p>
            </div>
          </div>

          {/* Specs Row: Screens & Seats */}
          <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-bold pt-0.5">
            <span className="flex items-center gap-1">
              <Monitor className="w-3 h-3 text-slate-400" />
              {screensCount || 4} Screens
            </span>
            <span className="flex items-center gap-1">
              <Armchair className="w-3 h-3 text-slate-400" />
              {(totalSeats || 1200).toLocaleString()} Seats
            </span>
          </div>
        </div>

        {/* 3. Bottom Type Tag & Action Buttons Bar */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border)]">
          
          {/* Type Tag (Multiplex / Single Screen) */}
          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${getTypeBadgeStyle(type)}`}>
            {type}
          </span>

          {/* Quick Actions (View Eye, Edit Pencil, Menu/Delete) */}
          <div className="flex items-center gap-1 text-[var(--text-muted)]">
            <button
              onClick={() => onViewDetails && onViewDetails(theatre)}
              className="p-1 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors cursor-pointer"
              title="View Theatre Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onEdit && onEdit(theatre)}
              className="p-1 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors cursor-pointer"
              title="Edit Theatre"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDelete && onDelete(theatre)}
              className="p-1 rounded-lg hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Delete Theatre"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

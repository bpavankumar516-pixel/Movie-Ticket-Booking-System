import React from 'react';
import { Building2, MapPin, Star, Monitor, Phone, ExternalLink, Edit3, Trash2, Clock, Sparkles } from 'lucide-react';

export const TheatreCard = ({ theatre, viewMode = 'grid', onViewDetails, onEdit, onDelete }) => {
  const { id, name, city, address, rating, reviewsCount, screensCount, amenities, image, contact, shows } = theatre;

  if (viewMode === 'list') {
    return (
      <div className="movtego-card p-5 hover:border-[var(--primary)] transition-all duration-300 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between text-left group">
        {/* Left Side: Thumbnail & Main Info */}
        <div className="flex gap-4 items-start w-full md:w-1/2">
          <img
            src={image || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-24 h-24 rounded-xl object-cover shrink-0 border border-[var(--border)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[var(--primary-light)] text-[var(--primary)] uppercase tracking-wider">
                {city}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                {rating || 4.8}
                <span className="text-[10px] text-[var(--text-muted)] font-normal">({reviewsCount || 100})</span>
              </span>
            </div>

            <h3 className="text-base font-bold text-[var(--text-heading)] truncate group-hover:text-[var(--primary)] transition-colors">
              {name}
            </h3>

            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--primary)]" />
              {address}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-[var(--text-heading)] bg-[var(--bg-page)] border border-[var(--border)] px-2 py-0.5 rounded-md flex items-center gap-1">
                <Monitor className="w-3 h-3 text-[var(--primary)]" />
                {screensCount || 4} Screens
              </span>
              {amenities && amenities.slice(0, 3).map((amenity, idx) => (
                <span key={idx} className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-page)] border border-[var(--border)] px-2 py-0.5 rounded-md">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Show Timings Preview */}
        <div className="w-full md:w-1/3 space-y-1.5 border-t md:border-t-0 md:border-l border-[var(--border)] pt-3 md:pt-0 md:pl-5">
          <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-[var(--primary)]" /> Today's Showtimes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {shows && shows.length > 0 ? (
              shows.slice(0, 4).map((show, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20"
                >
                  {show.time}
                </span>
              ))
            ) : (
              <span className="text-xs text-[var(--text-muted)]">No active shows scheduled</span>
            )}
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border)]">
          <button
            onClick={() => onViewDetails(theatre)}
            className="btn-teal px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> View Details & Timings
          </button>
          <button
            onClick={() => onEdit(theatre)}
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors cursor-pointer text-[var(--text-muted)]"
            title="Edit Theatre"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(theatre)}
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer text-[var(--text-muted)]"
            title="Delete Theatre"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="movtego-card rounded-2xl overflow-hidden hover:border-[var(--primary)] transition-all duration-300 flex flex-col justify-between group h-full text-left shadow-sm hover:shadow-md">
      <div>
        {/* Card Header Image with Badges */}
        <div className="relative h-44 overflow-hidden bg-[var(--bg-page)]">
          <img
            src={image || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
              {city}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {rating || 4.8}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-extrabold text-white line-clamp-1 drop-shadow-sm group-hover:text-[var(--primary)] transition-colors">
              {name}
            </h3>
            <p className="text-xs text-slate-200 flex items-center gap-1 line-clamp-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--primary)]" />
              {address}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          {/* Screen count & Amenities */}
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border)] pb-2.5">
            <span className="font-semibold text-[var(--text-heading)] flex items-center gap-1.5 bg-[var(--primary-light)] text-[var(--primary)] px-2.5 py-1 rounded-lg">
              <Monitor className="w-3.5 h-3.5" />
              {screensCount || 4} Screens
            </span>
            <span className="text-[11px]">
              {reviewsCount ? `${reviewsCount}+ reviews` : 'Verified Multiplex'}
            </span>
          </div>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5">
            {amenities && amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-page)] border border-[var(--border)] px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {amenities && amenities.length > 4 && (
              <span className="text-[10px] font-semibold text-[var(--primary)] bg-[var(--primary-light)] px-1.5 py-0.5 rounded-md">
                +{amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Show Timings Grid */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[var(--primary)]" /> Show Timings
              </span>
              <span className="text-[10px] text-[var(--primary)]">
                {shows ? `${shows.length} shows` : 'Active'}
              </span>
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              {shows && shows.length > 0 ? (
                shows.slice(0, 3).map((show, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 text-center text-xs font-bold rounded-lg bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 truncate"
                  >
                    {show.time}
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-1 text-xs text-[var(--text-muted)]">
                  No shows available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-0 space-y-2">
        <button
          onClick={() => onViewDetails(theatre)}
          className="w-full btn-teal py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-4 h-4" /> View Details & Bookings
        </button>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--border)]">
          {contact?.phone ? (
            <a
              href={`tel:${contact.phone}`}
              className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[var(--primary)]" />
              {contact.phone}
            </a>
          ) : (
            <span className="text-[11px] text-[var(--text-muted)]">Location Verified</span>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(theatre)}
              className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors cursor-pointer text-[var(--text-muted)]"
              title="Edit Theatre Details"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(theatre)}
              className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer text-[var(--text-muted)]"
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

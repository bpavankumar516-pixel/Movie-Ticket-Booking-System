import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Globe, Monitor, Star, Clock, Ticket, ShieldCheck, ExternalLink, Calendar, Film } from 'lucide-react';

export const TheatreDetailsModal = ({ theatre, onClose, onBookShow }) => {
  const [activeTab, setActiveTab] = useState('shows'); // 'shows' | 'screens' | 'amenities' | 'contact'

  if (!theatre) return null;

  const { name, city, address, rating, reviewsCount, screensCount, amenities, image, contact, screens, shows } = theatre;

  // Group shows by movie Title
  const groupedShows = (shows || []).reduce((acc, show) => {
    const title = show.movieTitle || 'Movie Show';
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(show);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="movtego-card max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl flex flex-col text-left shadow-2xl border border-[var(--border)] my-auto">
        
        {/* Header Hero Section */}
        <div className="relative h-56 shrink-0 overflow-hidden bg-[var(--bg-page)]">
          <img
            src={image || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer border border-white/20 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Badges & Title */}
          <div className="absolute bottom-4 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[var(--primary)] text-white uppercase tracking-wider">
                {city}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {rating || 4.8} ({reviewsCount || 120} reviews)
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-[var(--primary)]" />
                {screensCount || (screens ? screens.length : 4)} Active Screens
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
              {name}
            </h2>

            <p className="text-xs md:text-sm text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
              {address}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border)] px-6 bg-[var(--bg-card)] shrink-0 overflow-x-auto gap-2 pt-2">
          <button
            onClick={() => setActiveTab('shows')}
            className={`px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'shows'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Clock className="w-4 h-4" /> Available Shows & Timings ({shows ? shows.length : 0})
          </button>
          <button
            onClick={() => setActiveTab('screens')}
            className={`px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'screens'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Monitor className="w-4 h-4" /> Screen Specs & Audis ({screens ? screens.length : screensCount || 4})
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'amenities'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Amenities & Facilities
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Phone className="w-4 h-4" /> Location & Contact
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[var(--bg-card)]">
          {/* 1. SHOWS TAB */}
          {activeTab === 'shows' && (
            <div className="space-y-6">
              {Object.keys(groupedShows).length > 0 ? (
                Object.entries(groupedShows).map(([movieTitle, showList], idx) => (
                  <div key={idx} className="movtego-card p-4 rounded-2xl space-y-3 bg-[var(--bg-page)]/50 border border-[var(--border)]">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                          <Film className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[var(--text-heading)]">{movieTitle}</h4>
                          <p className="text-[11px] text-[var(--text-muted)]">{showList.length} Showtimes Available Today</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {showList.map((show) => {
                        const availableSeats = (show.totalSeats || 100) - (show.bookedCount || 0);
                        return (
                          <div
                            key={show.id}
                            className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 hover:border-[var(--primary)] transition-all flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-extrabold text-[var(--primary)] flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {show.time}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--primary-light)] text-[var(--primary)]">
                                {show.format || '2D'}
                              </span>
                            </div>

                            <p className="text-[11px] font-medium text-[var(--text-muted)] truncate">
                              {show.screen}
                            </p>

                            <div className="flex items-center justify-between pt-1 text-xs">
                              <span className="font-extrabold text-[var(--text-heading)]">
                                ₹{show.price || 250}
                              </span>
                              <span className={`text-[11px] font-semibold ${availableSeats < 15 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {availableSeats} seats left
                              </span>
                            </div>

                            {onBookShow && (
                              <button
                                onClick={() => onBookShow(show)}
                                className="w-full btn-teal py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer mt-1"
                              >
                                <Ticket className="w-3.5 h-3.5" /> Book Showtime
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-2">
                  <p className="text-base font-bold text-[var(--text-heading)]">No Active Shows Scheduled</p>
                  <p className="text-xs text-[var(--text-muted)]">Check back later or pick a different date.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. SCREENS TAB */}
          {activeTab === 'screens' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[var(--text-heading)]">Auditoriums & Projection Systems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screens && screens.length > 0 ? (
                  screens.map((screen, idx) => (
                    <div key={idx} className="movtego-card p-4 rounded-xl space-y-2 border border-[var(--border)] bg-[var(--bg-page)]/50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[var(--text-heading)] flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-[var(--primary)]" /> {screen.name}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[var(--primary-light)] text-[var(--primary)]">
                          {screen.type}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        Capacity: <strong className="text-[var(--text-heading)]">{screen.totalSeats || 200} Seats</strong> • 4K Laser Projection • Surround Sound
                      </p>
                    </div>
                  ))
                ) : (
                  Array.from({ length: screensCount || 4 }).map((_, idx) => (
                    <div key={idx} className="movtego-card p-4 rounded-xl space-y-2 border border-[var(--border)] bg-[var(--bg-page)]/50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[var(--text-heading)] flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-[var(--primary)]" /> Audi {idx + 1} - Premium Screen
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[var(--primary-light)] text-[var(--primary)]">
                          Dolby Atmos
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        Capacity: <strong className="text-[var(--text-heading)]">220 Seats</strong> • Dolby Atmos Surround
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 3. AMENITIES TAB */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[var(--text-heading)]">Available Cinema Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(amenities || ['IMAX 3D', 'Dolby Atmos', 'VIP Recliners', 'Gourmet Food', 'Valet Parking']).map((amenity, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-page)]/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-heading)]">{amenity}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">Verified Facility</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-[var(--text-heading)]">Theatre Information & Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-page)]/50 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Full Address</p>
                      <p className="text-xs font-medium text-[var(--text-heading)] leading-relaxed">{address}</p>
                      <p className="text-xs font-bold text-[var(--primary)]">{city}, India</p>
                    </div>
                  </div>

                  {contact?.mapUrl && (
                    <a
                      href={contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 btn-teal px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
                    </a>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-page)]/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Phone Support</p>
                      <a href={`tel:${contact?.phone || '+914023456789'}`} className="text-xs font-bold text-[var(--text-heading)] hover:text-[var(--primary)]">
                        {contact?.phone || '+91 40 2345 6789'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Email Inquiry</p>
                      <a href={`mailto:${contact?.email || 'support@cinema.com'}`} className="text-xs font-bold text-[var(--text-heading)] hover:text-[var(--primary)]">
                        {contact?.email || 'support@cinema.com'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Official Website</p>
                      <a href={contact?.website || 'https://movtego.com'} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[var(--primary)] hover:underline">
                        {contact?.website || 'https://movtego.com'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--border)] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold border border-[var(--border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors cursor-pointer text-[var(--text-muted)]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

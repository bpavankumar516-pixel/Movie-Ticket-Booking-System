import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Globe, Monitor, Star, Clock, Ticket, ShieldCheck, ExternalLink, Calendar, Film, CheckCircle2, Navigation, Users, ArrowLeft } from 'lucide-react';
import { SeatSelectionView } from '../booking/SeatSelectionView';

export const TheatreDetailsModal = ({ theatre, onClose, onBookShow }) => {
  const [activeTab, setActiveTab] = useState('shows'); // 'shows' | 'screens' | 'amenities' | 'contact'
  const [selectedShowForBooking, setSelectedShowForBooking] = useState(null);

  if (!theatre) return null;

  if (selectedShowForBooking) {
    return (
      <SeatSelectionView
        movieTitle={selectedShowForBooking.movieTitle || 'Resident Evil'}
        theatreName={theatre.name}
        showtime={selectedShowForBooking.time || '07:30 PM'}
        dateStr="Today, 30 Sep"
        format={selectedShowForBooking.format || 'Screen 1 (IMAX 4K)'}
        genre={selectedShowForBooking.genre || 'Horror'}
        moviePoster={selectedShowForBooking.poster}
        pricePerSeat={selectedShowForBooking.price || 16}
        onBack={() => setSelectedShowForBooking(null)}
        onBookingComplete={(bookingData) => {
          if (onBookShow) {
            onBookShow({
              ...selectedShowForBooking,
              seats: bookingData.seats,
              tickets: bookingData.seatCount,
              totalPrice: bookingData.totalPrice
            });
          }
          setSelectedShowForBooking(null);
        }}
      />
    );
  }

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

  const handleOpenBooking = (show) => {
    setSelectedShowForBooking(show);
  };

  return (
    <div className="w-full text-[var(--text-heading)] animate-fade-in flex flex-col space-y-6">
      
      {/* 1. Hero Banner with Floating Overlay Back Button */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl min-h-[300px] sm:min-h-[340px] flex items-end border border-white/10 shadow-2xl">
        
        {/* Background Backdrop Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={image || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-full h-full object-cover filter brightness-90 contrast-105 saturate-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />
        </div>

        {/* Floating User-Friendly Back Button */}
        <div className="absolute top-5 left-6 z-20">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-teal-300 font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer group drop-shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:text-teal-300 group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-tight">Back to Theatres</span>
          </button>
        </div>

        {/* Hero Content Banner */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 py-6 flex flex-col justify-end space-y-2 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-black rounded-lg bg-[var(--primary)] text-white uppercase tracking-wider shadow-md">
              {city}
            </span>
            <span className="flex items-center gap-1 text-xs font-extrabold text-amber-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {rating || 4.8} ({reviewsCount || 120} reviews)
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5 text-[var(--primary)]" />
              {screensCount || (screens ? screens.length : 4)} Active Auditoriums
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-md tracking-tight">
            {name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
            {address}
          </p>
        </div>
      </div>

      {/* 2. Tab Navigation Strip */}
      <div className="movtego-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-sm">
        <div className="flex border-b border-[var(--border)]/60 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('shows')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'shows'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Clock className="w-4 h-4" /> Available Shows & Timings ({shows ? shows.length : 0})
          </button>
          <button
            onClick={() => setActiveTab('screens')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'screens'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Monitor className="w-4 h-4" /> Screen Specs & Audis ({screens ? screens.length : screensCount || 4})
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'amenities'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Amenities & Facilities
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-5 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]'
            }`}
          >
            <Phone className="w-4 h-4" /> Location & Support
          </button>
        </div>
      </div>

      {/* 3. Tab Content Area */}
      <div className="space-y-6">
        {/* SHOWS TAB */}
        {activeTab === 'shows' && (
          <div className="space-y-6">
            {Object.keys(groupedShows).length > 0 ? (
              Object.entries(groupedShows).map(([movieTitle, showList], idx) => (
                <div key={idx} className="movtego-card p-6 rounded-3xl space-y-4 bg-[var(--bg-card)] border border-[var(--border)] shadow-sm">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold shadow-sm">
                        <Film className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-[var(--text-heading)]">{movieTitle}</h4>
                        <p className="text-xs text-[var(--text-muted)]">{showList.length} Showtimes Available Today • Verified Screenings</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {showList.map((show) => {
                      const total = show.totalSeats || 100;
                      const booked = show.bookedCount || 0;
                      const availableSeats = total - booked;
                      const percentLeft = Math.round((availableSeats / total) * 100);

                      return (
                        <div
                          key={show.id}
                          className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--input-bg)] space-y-3 hover:border-[var(--primary)] transition-all flex flex-col justify-between shadow-sm group hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base font-black text-[var(--primary)] flex items-center gap-1.5">
                              <Clock className="w-4 h-4" /> {show.time}
                            </span>
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
                              {show.format || '2D'}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-[var(--text-muted)] truncate">
                            {show.screen}
                          </p>

                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-extrabold text-[var(--text-heading)]">₹{show.price || 250}</span>
                              <span className={`font-bold ${availableSeats <= 15 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {availableSeats} seats left
                              </span>
                            </div>
                            <div className="w-full bg-[var(--bg-card)] rounded-full h-1.5 overflow-hidden border border-[var(--border)]">
                              <div
                                className={`h-full transition-all rounded-full ${availableSeats <= 15 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                style={{ width: `${percentLeft}%` }}
                              ></div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenBooking(show)}
                            className="w-full btn-teal py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer mt-1 shadow-md hover:scale-[1.02] transition-transform"
                          >
                            <Ticket className="w-4 h-4" /> Select Seats & Book
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="movtego-card p-12 text-center rounded-3xl space-y-3 border border-[var(--border)] bg-[var(--bg-card)]">
                <Clock className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
                <h4 className="text-base font-bold text-[var(--text-heading)]">No Active Showtimes Scheduled</h4>
                <p className="text-xs text-[var(--text-muted)]">Check back later or select another theatre.</p>
              </div>
            )}
          </div>
        )}

        {/* SCREENS TAB */}
        {activeTab === 'screens' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(screens || []).map((screen) => (
              <div key={screen.id} className="movtego-card p-5 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)] font-black text-xs">
                    {screen.type}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-muted)]">{screen.totalSeats} Seats</span>
                </div>
                <h4 className="text-base font-black text-[var(--text-heading)]">{screen.name}</h4>
                <p className="text-xs text-[var(--text-muted)]">High contrast digital projection with immersive Surround Sound.</p>
              </div>
            ))}
          </div>
        )}

        {/* AMENITIES TAB */}
        {activeTab === 'amenities' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(amenities || []).map((amenity, idx) => (
              <div key={idx} className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-3 text-left">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)] shrink-0" />
                <span className="text-xs font-extrabold text-[var(--text-heading)]">{amenity}</span>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="movtego-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] space-y-4 text-left">
            <h4 className="text-base font-black text-[var(--text-heading)]">Theatre Address & Contact Info</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[var(--text-muted)] block">Address</span>
                <span className="font-extrabold text-[var(--text-heading)] block">{address}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[var(--text-muted)] block">Phone</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

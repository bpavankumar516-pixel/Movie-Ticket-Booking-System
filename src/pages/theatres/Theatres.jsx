import React, { useState, useMemo } from 'react';
import { useTheatre } from '../../context/TheatreContext';
import { TheatreCard } from '../../components/theatres/TheatreCard';
import { TheatreDetailsModal } from '../../components/theatres/TheatreDetailsModal';
import { TheatreFormModal } from '../../components/theatres/TheatreFormModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import {
  Building2, Plus, Search, MapPin, Monitor, Clock, Grid, List,
  CheckCircle2, ChevronLeft, ChevronRight, RefreshCw, X, Calendar, Armchair, TrendingUp, AlertCircle
} from 'lucide-react';

export const Theatres = () => {
  const {
    theatres,
    cities,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    addTheatre,
    updateTheatre,
    deleteTheatre,
    resetTheatres,
    getFilteredTheatres,
  } = useTheatre();

  // Local UI state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Today');
  const itemsPerPage = 8;

  // Modal states
  const [selectedTheatreForDetail, setSelectedTheatreForDetail] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTheatre, setEditingTheatre] = useState(null);
  const [deletingTheatre, setDeletingTheatre] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter & Sort logic
  const filteredTheatres = useMemo(() => {
    let list = getFilteredTheatres();

    if (selectedStatusFilter !== 'All') {
      list = list.filter((t) => (t.status || 'Active').toLowerCase() === selectedStatusFilter.toLowerCase());
    }

    if (selectedTypeFilter !== 'All') {
      list = list.filter((t) => (t.type || 'Multiplex').toLowerCase() === selectedTypeFilter.toLowerCase());
    }

    return list;
  }, [getFilteredTheatres, selectedStatusFilter, selectedTypeFilter]);

  // Statistics calculation for the 5 KPI cards
  const stats = useMemo(() => {
    const totalTheatres = 12;
    const activeTheatres = theatres.filter(t => (t.status || 'Active') === 'Active').length || 10;
    const inactiveTheatres = theatres.filter(t => t.status === 'Inactive').length || 2;
    const totalScreens = theatres.reduce((acc, t) => acc + (t.screensCount || 4), 0) || 48;
    const totalSeats = theatres.reduce((acc, t) => acc + (t.totalSeats || 1200), 0) || 8640;

    return {
      totalTheatres,
      activeTheatres,
      inactiveTheatres,
      totalScreens,
      totalSeats
    };
  }, [theatres]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredTheatres.length / itemsPerPage));
  const currentPaginatedTheatres = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTheatres.slice(start, start + itemsPerPage);
  }, [filteredTheatres, currentPage, itemsPerPage]);

  const handleOpenAddModal = () => {
    setEditingTheatre(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (theatre) => {
    setEditingTheatre(theatre);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingTheatre) {
      updateTheatre(editingTheatre.id, formData);
      showToast(`Successfully updated "${formData.name}"`);
    } else {
      addTheatre(formData);
      showToast(`Successfully added "${formData.name}"`);
    }
    setIsFormModalOpen(false);
    setEditingTheatre(null);
  };

  const handleConfirmDelete = () => {
    if (deletingTheatre) {
      deleteTheatre(deletingTheatre.id);
      showToast(`Successfully deleted "${deletingTheatre.name}"`);
      setDeletingTheatre(null);
    }
  };

  // Render Theatre Details Page in-place with single window scrollbar
  if (selectedTheatreForDetail) {
    return (
      <div className="w-full animate-fade-in space-y-6">
        <TheatreDetailsModal
          theatre={selectedTheatreForDetail}
          onClose={() => setSelectedTheatreForDetail(null)}
          onBookShow={(bookingData) => {
            showToast(`🎉 Booking Confirmed! Reserved Seats: ${bookingData.seats} (${bookingData.tickets} Tickets) for "${bookingData.movieTitle}"!`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-fade-in relative pb-12">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B8F7A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs animate-bounce border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}



      {/* 2. Stats Summary Row (5 Cards grid with full-image Add New Theatre card) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Theatres */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Total Theatres</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)]">{stats.totalTheatres}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
            <TrendingUp className="w-3 h-3" />
            <span>↑ 20.0%</span>
          </div>
        </div>

        {/* Card 2: Inactive Theatres */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Inactive Theatres</span>
            <div className="w-8 h-8 rounded-xl bg-slate-500/10 text-slate-500 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)]">{stats.inactiveTheatres}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <span>↑ 0.0%</span>
          </div>
        </div>

        {/* Card 3: Total Screens */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Total Screens</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <Monitor className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)]">{stats.totalScreens}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
            <TrendingUp className="w-3 h-3" />
            <span>↑ 14.3%</span>
          </div>
        </div>

        {/* Card 4: Total Seats */}
        <div className="movtego-card p-4.5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)]">Total Seats</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Armchair className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--text-heading)]">{stats.totalSeats.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
            <TrendingUp className="w-3 h-3" />
            <span>↑ 18.2%</span>
          </div>
        </div>

        {/* Card 5: Action - Add New Theatre Card with 100% Image Background */}
        <div 
          onClick={handleOpenAddModal}
          className="movtego-card relative overflow-hidden rounded-2xl border border-[var(--primary)]/60 p-4.5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:border-[var(--primary)] group col-span-2 sm:col-span-1 flex flex-col justify-between min-h-[105px]"
        >
          {/* High Clarity Cinema Background Image covering 100% of the complete card */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80" 
              alt="Add theatre artwork" 
              className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.15] saturate-[1.1] group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
            <div className="absolute inset-0 bg-[var(--primary)]/20 group-hover:bg-[var(--primary)]/30 transition-colors duration-300" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-black text-white bg-emerald-500/90 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-emerald-400/40">
              Action
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary-gradient text-white flex items-center justify-center font-bold shadow-lg shadow-[#14B8A0]/40 group-hover:scale-110 transition-transform border border-white/30">
              <Plus className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="relative z-10 space-y-0.5 pt-2 text-left">
            <div className="text-base font-black text-white drop-shadow-md">
              + Add New Theatre
            </div>
            <p className="text-[11px] font-bold text-teal-200 truncate">
              Create multiplex or single screen
            </p>
          </div>
        </div>
      </div>

      {/* 3. Filter Toolbar matching media_1790751385598.jpg */}
      <div className="movtego-card p-3 sm:p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by theatre name, location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-heading)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Cities Filter */}
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All' ? 'All Cities' : city}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => {
                setSelectedStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedTypeFilter}
              onChange={(e) => {
                setSelectedTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Multiplex">Multiplex</option>
              <option value="Single Screen">Single Screen</option>
              <option value="IMAX">IMAX</option>
            </select>

            {/* Date Select Button */}
            <button className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-xs font-bold text-[var(--text-heading)] flex items-center gap-1.5 cursor-pointer hover:border-[var(--primary)] transition-colors">
              <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>Select Date</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[var(--input-bg)] border border-[var(--border)]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Theatres Cards Grid */}
      {currentPaginatedTheatres.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
              : 'space-y-4'
          }
        >
          {currentPaginatedTheatres.map((theatre) => (
            <TheatreCard
              key={theatre.id}
              theatre={theatre}
              viewMode={viewMode}
              onViewDetails={(th) => setSelectedTheatreForDetail(th)}
              onEdit={(th) => handleOpenEditModal(th)}
              onDelete={(th) => setDeletingTheatre(th)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="movtego-card p-12 text-center rounded-3xl space-y-4 border border-[var(--border)] bg-[var(--bg-card)] my-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-[var(--text-heading)]">No Cinema Theatres Found</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              We couldn't find any multiplexes matching your search query or status filter.
            </p>
          </div>
        </div>
      )}

      {/* 5. Pagination matching media_1790751385598.jpg */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[var(--text-muted)] font-bold px-1">
        <span>
          Showing 1 - {currentPaginatedTheatres.length} of {filteredTheatres.length} theatres
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-colors cursor-pointer flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-heading)] hover:border-[var(--primary)]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="w-8 h-8 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-colors cursor-pointer flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modal: Theatre Details Modal */}
      {selectedTheatreForDetail && (
        <TheatreDetailsModal
          theatre={selectedTheatreForDetail}
          onClose={() => setSelectedTheatreForDetail(null)}
          onBookShow={(bookingData) => {
            showToast(`Booked ${bookingData.tickets} tickets for ${bookingData.movieTitle}!`);
          }}
        />
      )}

      {/* Modal: Add/Edit Form Modal */}
      <TheatreFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingTheatre(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingTheatre}
      />

      {/* Modal: Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingTheatre)}
        onClose={() => setDeletingTheatre(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Theatre Record"
        message={`Are you sure you want to delete "${deletingTheatre?.name}"? This action cannot be undone.`}
        confirmText="Delete Theatre"
        cancelText="Cancel"
        variant="danger"
      />

    </div>
  );
};

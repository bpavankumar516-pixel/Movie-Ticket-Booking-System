import React, { useState, useMemo } from 'react';
import { useTheatre } from '../../context/TheatreContext';
import { TheatreCard } from '../../components/theatres/TheatreCard';
import { TheatreDetailsModal } from '../../components/theatres/TheatreDetailsModal';
import { TheatreFormModal } from '../../components/theatres/TheatreFormModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import {
  Building2, Plus, Search, MapPin, Monitor, Clock, Star, Grid, List,
  CheckCircle2, Sparkles, Filter, ChevronLeft, ChevronRight, RefreshCw, X, ShieldCheck, Award
} from 'lucide-react';

export const Theatres = () => {
  const {
    theatres,
    cities,
    amenities,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    selectedAmenity,
    setSelectedAmenity,
    selectedScreenFilter,
    setSelectedScreenFilter,
    addTheatre,
    updateTheatre,
    deleteTheatre,
    resetTheatres,
    getFilteredTheatres,
    getTheatreStats
  } = useTheatre();

  // Local UI state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const stats = useMemo(() => getTheatreStats(), [getTheatreStats]);
  const filteredTheatres = useMemo(() => getFilteredTheatres(), [getFilteredTheatres]);

  // Reset pagination when filters change
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
      showToast(`Updated "${formData.name}" details successfully!`);
    } else {
      addTheatre(formData);
      showToast(`Added new theatre "${formData.name}" successfully!`);
    }
    setIsFormModalOpen(false);
    setEditingTheatre(null);
  };

  const handleConfirmDelete = () => {
    if (deletingTheatre) {
      deleteTheatre(deletingTheatre.id);
      showToast(`Deleted theatre "${deletingTheatre.name}"`);
      setDeletingTheatre(null);
    }
  };

  const handleResetFilters = () => {
    setSelectedCity('All');
    setSearchQuery('');
    setSelectedAmenity('All');
    setSelectedScreenFilter('All');
    setCurrentPage(1);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all theatre listings back to default multiplex entries?')) {
      resetTheatres();
      showToast('Reset theatre dataset to defaults!');
      setCurrentPage(1);
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in relative pb-10">
      
      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 hover:opacity-80">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="movtego-card p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--primary-light)]/20 border border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold border border-[var(--primary)]/20">
              <Building2 className="w-3.5 h-3.5" /> Cinema & Multiplex Directory
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">
              Theatre & Screen Management
            </h1>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
              Explore partner auditoriums, active screens, show timings, and location details across top cities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all cursor-pointer flex items-center gap-1.5"
              title="Reset data back to defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Data
            </button>
            <button
              onClick={handleOpenAddModal}
              className="btn-teal px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Theatre
            </button>
          </div>
        </div>
      </div>

      {/* 5 Summary Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Stat 1 */}
        <div className="movtego-card p-4 rounded-2xl space-y-2 border border-[var(--border)] hover:border-[var(--primary)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Theatres</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-heading)]">{stats.totalTheatres}</div>
          <p className="text-[10px] text-[var(--text-muted)]">Verified Partners</p>
        </div>

        {/* Stat 2 */}
        <div className="movtego-card p-4 rounded-2xl space-y-2 border border-[var(--border)] hover:border-[var(--primary)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Cities</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-heading)]">{stats.totalCities}</div>
          <p className="text-[10px] text-[var(--text-muted)]">Cinema Hubs</p>
        </div>

        {/* Stat 3 */}
        <div className="movtego-card p-4 rounded-2xl space-y-2 border border-[var(--border)] hover:border-[var(--primary)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Auditoriums</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Monitor className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-heading)]">{stats.totalScreens}+</div>
          <p className="text-[10px] text-[var(--text-muted)]">Active Screens</p>
        </div>

        {/* Stat 4 */}
        <div className="movtego-card p-4 rounded-2xl space-y-2 border border-[var(--border)] hover:border-[var(--primary)] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Today's Shows</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-heading)]">{stats.totalShows}+</div>
          <p className="text-[10px] text-[var(--text-muted)]">Active Timings</p>
        </div>

        {/* Stat 5 */}
        <div className="movtego-card p-4 rounded-2xl space-y-2 border border-[var(--border)] hover:border-[var(--primary)] transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Multiplex Brands</span>
            <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-heading)]">{stats.totalBrands}</div>
          <p className="text-[10px] text-[var(--text-muted)]">PVR, AMB, Inox, Sathyam</p>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="movtego-card p-4 rounded-2xl space-y-3 border border-[var(--border)] bg-[var(--bg-card)]">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by Theatre Name, City, Address, or Amenity..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
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

          {/* Dropdown Filters & Layout Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All' ? 'All Cities' : city}
                </option>
              ))}
            </select>

            {/* Screen Count Filter */}
            <select
              value={selectedScreenFilter}
              onChange={(e) => {
                setSelectedScreenFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <option value="All">All Screens</option>
              <option value="1-4">1 - 4 Screens</option>
              <option value="5+">5+ Screens</option>
              <option value="8+">8+ Screens (Mega Multiplex)</option>
            </select>

            {/* Amenities Filter */}
            <select
              value={selectedAmenity}
              onChange={(e) => {
                setSelectedAmenity(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs font-semibold text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <option value="All">All Amenities</option>
              {amenities.map((amenity) => (
                <option key={amenity} value={amenity}>
                  {amenity}
                </option>
              ))}
            </select>

            {/* Reset Filters button */}
            {(selectedCity !== 'All' || searchQuery !== '' || selectedAmenity !== 'All' || selectedScreenFilter !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="p-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors text-xs font-bold cursor-pointer"
                title="Clear all active filters"
              >
                Clear Filters
              </button>
            )}

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[var(--bg-page)] border border-[var(--border)] ml-auto md:ml-0">
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

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold px-1">
        <span>
          Showing <strong className="text-[var(--text-heading)]">{filteredTheatres.length}</strong> theatres
          {selectedCity !== 'All' ? ` in ${selectedCity}` : ''}
        </span>
        {totalPages > 1 && (
          <span>
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Theatres Listing (Grid or List View) */}
      {currentPaginatedTheatres.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
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
        <div className="movtego-card p-12 text-center rounded-3xl space-y-4 border border-[var(--border)] my-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[var(--text-heading)]">No Cinema Theatres Found</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              We couldn't find any multiplexes matching your search criteria or selected city filter.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="btn-teal px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" /> Clear Search & Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-colors cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[var(--primary)] text-white shadow-md'
                    : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-heading)] hover:border-[var(--primary)]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-heading)] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-colors cursor-pointer flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal: Theatre Details Modal */}
      {selectedTheatreForDetail && (
        <TheatreDetailsModal
          theatre={selectedTheatreForDetail}
          onClose={() => setSelectedTheatreForDetail(null)}
          onBookShow={(show) => {
            showToast(`Selected showtime "${show.time}" for ${show.movieTitle}`);
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

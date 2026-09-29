import React, { useState, useEffect } from 'react';
import { X, Building2, MapPin, Phone, Mail, Globe, Monitor, ShieldCheck, Image as ImageIcon, Save } from 'lucide-react';
import { CITIES, AMENITIES_LIST } from '../../services/theatreApi';

export const TheatreFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: 'Hyderabad',
    address: '',
    screensCount: 4,
    phone: '',
    email: '',
    website: '',
    mapUrl: '',
    image: '',
    amenities: ['Dolby Atmos', 'VIP Recliners']
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        city: initialData.city || 'Hyderabad',
        address: initialData.address || '',
        screensCount: initialData.screensCount || 4,
        phone: initialData.contact?.phone || initialData.phone || '',
        email: initialData.contact?.email || initialData.email || '',
        website: initialData.contact?.website || initialData.website || '',
        mapUrl: initialData.contact?.mapUrl || initialData.mapUrl || '',
        image: initialData.image || '',
        amenities: initialData.amenities || ['Dolby Atmos', 'VIP Recliners']
      });
    } else {
      setFormData({
        name: '',
        city: 'Hyderabad',
        address: '',
        screensCount: 4,
        phone: '',
        email: '',
        website: '',
        mapUrl: '',
        image: '',
        amenities: ['Dolby Atmos', 'VIP Recliners']
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      alert('Please provide theatre name and address.');
      return;
    }
    onSubmit(formData);
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      if (exists) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) };
      } else {
        return { ...prev, amenities: [...prev.amenities, amenity] };
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="movtego-card max-w-2xl w-full rounded-3xl overflow-hidden text-left shadow-2xl border border-[var(--border)] bg-[var(--bg-card)] my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-page)]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[var(--text-heading)]">
                {initialData ? 'Edit Theatre Info' : 'Add New Multiplex / Theatre'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {initialData ? 'Update location, screens & amenities' : 'Register a new cinema partner into the system'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors cursor-pointer text-[var(--text-muted)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Theatre Name & City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[var(--primary)]" /> Theatre / Multiplex Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AMB Cinemas Multiplex"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" /> City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
              >
                {CITIES.filter((c) => c !== 'All').map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Full Address */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" /> Full Address & Location Landmark *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Gachibowli - Miyapur Rd, Whitefields, Gachibowli, Hyderabad"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>

          {/* Number of Screens & Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-[var(--primary)]" /> Number of Screens
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={formData.screensCount}
                onChange={(e) => setFormData({ ...formData, screensCount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[var(--primary)]" /> Cover Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[var(--primary)]" /> Contact Phone
              </label>
              <input
                type="text"
                placeholder="+91 40 2345 6789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[var(--primary)]" /> Contact Email
              </label>
              <input
                type="email"
                placeholder="support@cinema.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[var(--primary)]" /> Website Link
              </label>
              <input
                type="url"
                placeholder="https://pvrcinemas.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" /> Google Maps Link
              </label>
              <input
                type="url"
                placeholder="https://maps.google.com/?q=..."
                value={formData.mapUrl}
                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          {/* Amenities Checkbox Group */}
          <div className="space-y-2 pt-2 border-t border-[var(--border)]">
            <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" /> Cinema Amenities & Facilities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AMENITIES_LIST.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]'
                        : 'bg-[var(--bg-page)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="accent-[var(--primary)] rounded cursor-pointer"
                    />
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[var(--border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors cursor-pointer text-[var(--text-muted)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-teal px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> {initialData ? 'Update Theatre' : 'Save New Theatre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

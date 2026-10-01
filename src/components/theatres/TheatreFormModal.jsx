import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Building2, MapPin, Phone, Mail, Monitor, ShieldCheck, Image as ImageIcon, CheckCircle2, Edit3, PlusCircle, Armchair, Tag } from 'lucide-react';
import { CITIES, AMENITIES_LIST } from '../../services/theatreApi';

export const TheatreFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: 'Hyderabad',
    address: '',
    status: 'Active',
    type: 'Multiplex',
    screensCount: 6,
    totalSeats: 1850,
    phone: '',
    email: '',
    website: '',
    mapUrl: '',
    image: '',
    brandLogo: '',
    amenities: ['Dolby Atmos', 'VIP Recliners']
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        city: initialData.city || 'Hyderabad',
        address: initialData.address || '',
        status: initialData.status || 'Active',
        type: initialData.type || 'Multiplex',
        screensCount: initialData.screensCount || 6,
        totalSeats: initialData.totalSeats || 1850,
        phone: initialData.contact?.phone || initialData.phone || '',
        email: initialData.contact?.email || initialData.email || '',
        website: initialData.contact?.website || initialData.website || '',
        mapUrl: initialData.contact?.mapUrl || initialData.mapUrl || '',
        image: initialData.image || '',
        brandLogo: initialData.brandLogo || '',
        amenities: initialData.amenities || ['Dolby Atmos', 'VIP Recliners']
      });
    } else {
      setFormData({
        name: '',
        city: 'Hyderabad',
        address: '',
        status: 'Active',
        type: 'Multiplex',
        screensCount: 6,
        totalSeats: 1850,
        phone: '',
        email: '',
        website: '',
        mapUrl: '',
        image: '',
        brandLogo: '',
        amenities: ['Dolby Atmos', 'VIP Recliners']
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      return;
    }
    onSubmit({
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1000&auto=format&fit=crop&q=80',
      brandLogo: formData.brandLogo || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&auto=format&fit=crop&q=80',
      screensCount: Number(formData.screensCount),
      totalSeats: Number(formData.totalSeats),
      contact: {
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        mapUrl: formData.mapUrl
      }
    });
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Theatre Details' : 'Add New Theatre'}
      subtitle={initialData ? 'Modify cinema info, screens & amenities' : 'Register a new multiplex or single screen partner'}
      icon={initialData ? Edit3 : PlusCircle}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left py-1">
        
        {/* Name & City */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-start">
          <div className="sm:col-span-2">
            <Input
              label="Theatre / Multiplex Name"
              icon={Building2}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PVR Cinemas - Nexus Mall"
              required
            />
          </div>

          <div className="w-full space-y-1.5 text-left">
            <label className="block text-xs font-bold text-[var(--text-heading)] tracking-wide">
              City <span className="text-[var(--primary)]">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-2xl text-xs py-3 px-3.5 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] font-bold cursor-pointer transition-colors"
            >
              {CITIES.filter((c) => c !== 'All').map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <Input
          label="Full Address & Location Landmark"
          icon={MapPin}
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="e.g. Kukatpally, Hyderabad, Telangana"
          required
        />

        {/* Status, Type, Screens & Seats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 items-start">
          <div className="w-full space-y-1.5 text-left">
            <label className="block text-xs font-bold text-[var(--text-heading)] tracking-wide">
              Status <span className="text-[var(--primary)]">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-2xl text-xs py-3 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] font-bold cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <div className="w-full space-y-1.5 text-left">
            <label className="block text-xs font-bold text-[var(--text-heading)] tracking-wide">
              Category Type <span className="text-[var(--primary)]">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-2xl text-xs py-3 px-3 bg-[var(--input-bg)] text-[var(--text-heading)] border border-[var(--input-border)] focus:outline-none focus:border-[var(--primary)] font-bold cursor-pointer"
            >
              <option value="Multiplex">Multiplex</option>
              <option value="Single Screen">Single Screen</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>

          <Input
            label="Screens Count"
            type="number"
            icon={Monitor}
            value={formData.screensCount}
            onChange={(e) => setFormData({ ...formData, screensCount: e.target.value })}
            placeholder="6"
            required
          />

          <Input
            label="Total Seats"
            type="number"
            icon={Armchair}
            value={formData.totalSeats}
            onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
            placeholder="1850"
            required
          />
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Input
            label="Theatre Cover Image URL"
            icon={ImageIcon}
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />

          <Input
            label="Brand Logo Circle Image URL"
            icon={Tag}
            value={formData.brandLogo}
            onChange={(e) => setFormData({ ...formData, brandLogo: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Input
            label="Contact Phone"
            icon={Phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 40 4567 8901"
          />

          <Input
            label="Contact Email"
            icon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="support@pvrcinemas.com"
          />
        </div>

        {/* Amenities Selection */}
        <div className="space-y-2 pt-2 border-t border-[var(--border)]">
          <label className="text-xs font-bold text-[var(--text-heading)] flex items-center gap-1.5">
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
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]'
                      : 'bg-[var(--input-bg)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[var(--primary)]' : 'bg-slate-400'}`} />
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="teal" 
            className="flex items-center gap-1.5 font-black px-6 py-2.5 shadow-md shadow-[#14B8A0]/30 hover:scale-105 transition-transform cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            {initialData ? 'Save Changes' : 'Create Theatre'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};

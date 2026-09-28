import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Save, Edit3, MapPin, Ticket, Heart } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    location: user?.location || 'ChengDu, Wuhou',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 animate-fade-in text-left">
      {/* Profile Header Card */}
      <div className="movtego-card p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative shrink-0">
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#0FA58A] shadow-md"
            />
          </div>

          <div className="text-center md:text-left space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-[#0F1F2E]">
                {user.name}
              </h1>
              <span className="px-3 py-0.5 bg-[#DFF5F0] text-[#0FA58A] text-[10px] font-bold rounded-full uppercase tracking-wider">
                {user.role === 'admin' ? 'System Administrator' : 'MOVTEGO VIP Member'}
              </span>
            </div>

            <p className="text-xs text-[#8A97A6] flex items-center justify-center md:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0FA58A]" /> {user.email}
            </p>
            <p className="text-xs text-[#8A97A6] flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0FA58A]" /> {user.location || 'ChengDu, Wuhou'}
            </p>
          </div>

          <Button
            variant={isEditing ? 'outline' : 'teal'}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            icon={Edit3}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="movtego-card p-4 text-center">
          <p className="text-xs text-[#8A97A6] uppercase font-semibold">Total Bookings</p>
          <p className="text-2xl font-bold text-[#0F1F2E] mt-1">
            {user.stats?.totalBookings || 18}
          </p>
        </div>
        <div className="movtego-card p-4 text-center">
          <p className="text-xs text-[#8A97A6] uppercase font-semibold">Confirmed</p>
          <p className="text-2xl font-bold text-[#0FA58A] mt-1">
            {user.stats?.completedBookings || 16}
          </p>
        </div>
        <div className="movtego-card p-4 text-center">
          <p className="text-xs text-[#8A97A6] uppercase font-semibold">Cancelled</p>
          <p className="text-2xl font-bold text-red-500 mt-1">
            {user.stats?.cancelledBookings || 2}
          </p>
        </div>
        <div className="movtego-card p-4 text-center">
          <p className="text-xs text-[#8A97A6] uppercase font-semibold">Favorite Genre</p>
          <p className="text-base font-bold text-[#0FA58A] mt-2">
            {user.stats?.favoriteGenre || 'Sci-Fi'}
          </p>
        </div>
      </div>

      {/* Edit Form or Quick Action Links */}
      {isEditing ? (
        <div className="movtego-card p-6 space-y-6">
          <h2 className="text-base font-bold text-[#0F1F2E] border-b border-[#E8F0F0] pb-3">
            Update Personal Details
          </h2>
          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              label="City / Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              label="Avatar Image URL"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              helperText="Paste direct image URL for profile photo"
            />
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="teal" icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/booking-history"
            className="movtego-card p-6 flex items-center justify-between group hover:border-[#0FA58A] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DFF5F0] flex items-center justify-center text-[#0FA58A]">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1F2E] group-hover:text-[#0FA58A] transition-colors">
                  My MOVTEGO E-Tickets
                </h3>
                <p className="text-xs text-[#8A97A6]">View seat numbers & digital tickets</p>
              </div>
            </div>
          </Link>

          <Link
            to="/movies"
            className="movtego-card p-6 flex items-center justify-between group hover:border-[#0FA58A] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DFF5F0] flex items-center justify-center text-[#0FA58A]">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F1F2E] group-hover:text-[#0FA58A] transition-colors">
                  Movie Watchlist
                </h3>
                <p className="text-xs text-[#8A97A6]">Saved upcoming releases and favorites</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Calendar, ShieldCheck, Ticket, Heart, Save, Edit3, MapPin } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fade-in text-left">
      {/* Profile Header Card */}
      <div className="glass-card-moviego rounded-3xl p-6 md:p-8 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D690]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-3xl object-cover border-2 border-[#00D690] shadow-xl shadow-emerald-500/30"
            />
          </div>

          <div className="text-center md:text-left space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">
                {user.name}
              </h1>
              {user.role === 'admin' ? (
                <span className="px-2.5 py-0.5 bg-purple-950 border border-purple-700 text-purple-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Admin System
                </span>
              ) : (
                <span className="px-2.5 py-0.5 bg-[#00D690]/20 border border-[#00D690]/40 text-[#00D690] text-[10px] font-bold rounded-full uppercase tracking-wider">
                  MOVIEGO VIP Club
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#00D690]" /> {user.email}
            </p>
            <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00D690]" /> {user.location || 'ChengDu, Wuhou'}
            </p>
          </div>

          <Button
            variant={isEditing ? 'outline' : 'emerald'}
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
        <div className="glass-card-moviego rounded-2xl p-4 text-center border border-white/10">
          <p className="text-xs text-slate-400 uppercase font-bold">Total Bookings</p>
          <p className="text-2xl font-black font-outfit text-white mt-1">
            {user.stats?.totalBookings || 18}
          </p>
        </div>
        <div className="glass-card-moviego rounded-2xl p-4 text-center border border-white/10">
          <p className="text-xs text-slate-400 uppercase font-bold">Confirmed</p>
          <p className="text-2xl font-black font-outfit text-[#00D690] mt-1">
            {user.stats?.completedBookings || 16}
          </p>
        </div>
        <div className="glass-card-moviego rounded-2xl p-4 text-center border border-white/10">
          <p className="text-xs text-slate-400 uppercase font-bold">Cancelled</p>
          <p className="text-2xl font-black font-outfit text-red-400 mt-1">
            {user.stats?.cancelledBookings || 2}
          </p>
        </div>
        <div className="glass-card-moviego rounded-2xl p-4 text-center border border-white/10">
          <p className="text-xs text-slate-400 uppercase font-bold">Favorite Genre</p>
          <p className="text-base font-bold font-outfit text-[#00D690] mt-2">
            {user.stats?.favoriteGenre || 'Sci-Fi'}
          </p>
        </div>
      </div>

      {/* Edit Form or Quick Action Links */}
      {isEditing ? (
        <div className="glass-card-moviego rounded-3xl p-6 border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-outfit text-white border-b border-white/10 pb-3">
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
              <Button type="submit" variant="emerald" icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/booking-history"
            className="glass-card-moviego glass-card-hover rounded-2xl p-6 border border-white/10 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00D690]/20 border border-[#00D690]/40 flex items-center justify-center text-[#00D690]">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00D690] transition-colors">
                  My MOVIEGO E-Tickets
                </h3>
                <p className="text-xs text-slate-400">View barcodes, seat numbers & digital tickets</p>
              </div>
            </div>
          </Link>

          <Link
            to="/favorites"
            className="glass-card-moviego glass-card-hover rounded-2xl p-6 border border-white/10 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00D690]/20 border border-[#00D690]/40 flex items-center justify-center text-[#00D690]">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00D690] transition-colors">
                  Movie Watchlist
                </h3>
                <p className="text-xs text-slate-400">Saved upcoming releases and favorite blockbusters</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

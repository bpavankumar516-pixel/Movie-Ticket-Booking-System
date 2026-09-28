import React from 'react';
import { Building2, Monitor, Armchair, Plus } from 'lucide-react';

export const Theatres = () => (
  <div className="space-y-6 text-left animate-fade-in">
    <div className="flex items-center justify-between movtego-card p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0F1F2E]">Cinema Theatres & Screens</h1>
        <p className="text-xs text-[#8A97A6]">Manage multiplex auditoriums, seating layouts & screen projections.</p>
      </div>
      <button className="bg-[#0FA58A] hover:bg-[#0D947B] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#0FA58A]/20 cursor-pointer">
        <Plus className="w-4 h-4" /> Add New Theatre
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="movtego-card p-5 space-y-3">
        <div className="w-10 h-10 rounded-xl bg-[#DFF5F0] text-[#0FA58A] flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-[#0F1F2E]">PVR Cinemas - Grand Mall</h3>
        <p className="text-xs text-[#8A97A6]">Downtown Plaza, Screen 1-6 • Dolby Atmos</p>
        <span className="inline-block px-2.5 py-0.5 bg-[#E6FDF5] text-[#0FA58A] text-[10px] font-bold rounded-full">
          Active • 6 Screens
        </span>
      </div>

      <div className="movtego-card p-5 space-y-3">
        <div className="w-10 h-10 rounded-xl bg-[#DFF5F0] text-[#0FA58A] flex items-center justify-center">
          <Monitor className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-[#0F1F2E]">INOX Multiplex</h3>
        <p className="text-xs text-[#8A97A6]">Central Square, Screen A-D • IMAX 4K</p>
        <span className="inline-block px-2.5 py-0.5 bg-[#E6FDF5] text-[#0FA58A] text-[10px] font-bold rounded-full">
          Active • 4 Screens
        </span>
      </div>

      <div className="movtego-card p-5 space-y-3">
        <div className="w-10 h-10 rounded-xl bg-[#DFF5F0] text-[#0FA58A] flex items-center justify-center">
          <Armchair className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-[#0F1F2E]">Cinepolis Royal</h3>
        <p className="text-xs text-[#8A97A6]">West Avenue, Screen 1-8 • Recliner VIP</p>
        <span className="inline-block px-2.5 py-0.5 bg-[#E6FDF5] text-[#0FA58A] text-[10px] font-bold rounded-full">
          Active • 8 Screens
        </span>
      </div>
    </div>
  </div>
);

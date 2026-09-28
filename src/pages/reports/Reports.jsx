import React from 'react';
import { TrendingUp, IndianRupee, Ticket, Users, ArrowUpRight } from 'lucide-react';

export const Reports = () => (
  <div className="space-y-6 text-left animate-fade-in">
    <div className="movtego-card p-6">
      <h1 className="text-2xl font-bold text-[#0F1F2E]">Analytics & Revenue Reports</h1>
      <p className="text-xs text-[#8A97A6]">Comprehensive financial insights, seat occupancy, and ticketing analytics.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="movtego-card p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8A97A6]">Total Revenue</span>
          <div className="p-2 rounded-xl bg-[#DFF5F0] text-[#0FA58A]">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-bold text-[#0F1F2E]">₹ 8,42,500</p>
        <span className="text-xs text-[#0FA58A] font-bold flex items-center gap-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" /> +15.8% vs last month
        </span>
      </div>

      <div className="movtego-card p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8A97A6]">Tickets Sold</span>
          <div className="p-2 rounded-xl bg-[#DFF5F0] text-[#0FA58A]">
            <Ticket className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-bold text-[#0F1F2E]">1,284</p>
        <span className="text-xs text-[#0FA58A] font-bold flex items-center gap-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" /> +18.2% vs last month
        </span>
      </div>

      <div className="movtego-card p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8A97A6]">Seat Occupancy</span>
          <div className="p-2 rounded-xl bg-[#DFF5F0] text-[#0FA58A]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-bold text-[#0F1F2E]">78.4%</p>
        <span className="text-xs text-[#0FA58A] font-bold flex items-center gap-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" /> +6.1% vs last month
        </span>
      </div>

      <div className="movtego-card p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8A97A6]">Active Members</span>
          <div className="p-2 rounded-xl bg-[#DFF5F0] text-[#0FA58A]">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-bold text-[#0F1F2E]">3,420</p>
        <span className="text-xs text-[#0FA58A] font-bold flex items-center gap-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs last month
        </span>
      </div>
    </div>
  </div>
);

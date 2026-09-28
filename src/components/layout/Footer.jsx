import React from 'react';
import { Film, ShieldCheck, Heart, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 text-gray-400 py-10 px-4 md:px-8 mt-16 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF1A1A] flex items-center justify-center text-white font-bold">
              <Film className="w-4 h-4" />
            </div>
            <span className="font-montserrat font-extrabold text-lg text-white">
              CINE<span className="text-[#FF1A1A]">BOXX</span>
            </span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed">
            The ultimate next-gen movie ticket booking experience. IMAX, 4K Dolby Atmos, VIP Recliners and Instant E-Tickets.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/movies" className="hover:text-white transition-colors">Now Showing</Link></li>
            <li><Link to="/movies" className="hover:text-white transition-colors">Upcoming Blockbusters</Link></li>
            <li><Link to="/theatres" className="hover:text-white transition-colors">Find Theatres</Link></li>
            <li><Link to="/booking-history" className="hover:text-white transition-colors">My E-Tickets</Link></li>
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Formats & Sound</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white">IMAX 3D Experience</li>
            <li className="hover:text-white">Dolby Atmos Surround</li>
            <li className="hover:text-white">4DX Motion Seats</li>
            <li className="hover:text-white">Director's Cut Lounge</li>
          </ul>
        </div>

        {/* Security & Support */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Guaranteed Booking</h4>
          <p className="text-xs text-gray-400 mb-3">
            Instant booking confirmation with 256-bit encrypted checkout.
          </p>
          <div className="flex items-center gap-2 text-xs text-green-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> 100% Verified Seats
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <p>© 2026 CineBoxx Ticket Booking System. Built with React & Tailwind CSS.</p>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span className="flex items-center gap-1 text-gray-300">
            Made with <Heart className="w-3 h-3 text-[#FF1A1A] fill-[#FF1A1A]" /> for Cinema Lovers
          </span>
        </div>
      </div>
    </footer>
  );
};

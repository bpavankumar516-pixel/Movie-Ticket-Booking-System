import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search movies, theatres...', onClear, className = '' }) => {
  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-[#0E1411] border border-white/10 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D690] focus:ring-2 focus:ring-[#00D690]/30 transition-all"
      />
      {value && (
        <button
          onClick={onClear || (() => onChange(''))}
          className="absolute right-3.5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

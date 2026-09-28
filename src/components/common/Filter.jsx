import React from 'react';
import { Filter as FilterIcon } from 'lucide-react';

export const Filter = ({ options, selected, onChange, label = 'Filter', className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
          <FilterIcon className="w-3.5 h-3.5 text-[#00D690]" /> {label}:
        </span>
      )}
      <div className="flex flex-wrap items-center gap-1.5">
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          const isActive = selected === val;

          return (
            <button
              key={val}
              onClick={() => onChange(val)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 select-none
                ${isActive 
                  ? 'bg-[#00D690] text-[#060A08] shadow-lg shadow-emerald-500/30 scale-105' 
                  : 'bg-[#0E1411] text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'}
              `}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
};

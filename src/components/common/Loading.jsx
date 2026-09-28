import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ text = 'Loading content...' }) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#00D690]/20 border border-[#00D690]/40 flex items-center justify-center text-[#00D690] shadow-lg shadow-emerald-500/20">
        <Loader2 className="w-6 h-6 animate-spin text-[#00D690]" />
      </div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{text}</p>
    </div>
  );
};

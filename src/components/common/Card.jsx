import React from 'react';

export const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#0E1411] border border-white/10 rounded-3xl p-6 transition-all duration-300 shadow-xl
        ${hover ? 'hover:bg-[#141E1A] hover:border-[#00D690]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

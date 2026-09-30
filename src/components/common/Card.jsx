import React from 'react';

export const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        movtego-card p-6 transition-all duration-300
        ${hover ? 'hover:border-[var(--primary)]/40 hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

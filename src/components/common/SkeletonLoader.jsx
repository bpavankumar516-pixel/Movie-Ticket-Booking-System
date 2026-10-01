import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 4 }) => {
  const items = Array.from({ length: count });

  if (type === 'table') {
    return (
      <div className="space-y-3 w-full animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="h-16 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] w-full flex items-center px-4 justify-between gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-400/20 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 bg-slate-400/20 rounded-md w-1/3" />
              <div className="h-2.5 bg-slate-400/15 rounded-md w-1/4" />
            </div>
            <div className="h-6 w-20 bg-slate-400/20 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4 w-full animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="movtego-card p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="w-20 aspect-[2/3] bg-slate-400/20 rounded-xl shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-400/20 rounded-md w-2/5" />
                <div className="h-3 bg-slate-400/15 rounded-md w-3/4" />
                <div className="h-3 bg-slate-400/15 rounded-md w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="movtego-card rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] p-3 space-y-3 flex flex-col justify-between">
          <div className="aspect-[2/3] bg-slate-400/20 rounded-xl w-full" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-400/20 rounded-md w-3/4" />
            <div className="h-3 bg-slate-400/15 rounded-md w-1/2" />
          </div>
          <div className="h-9 bg-slate-400/20 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

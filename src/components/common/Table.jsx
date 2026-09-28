import React from 'react';

export const Table = ({ headers, children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-3xl border border-white/10 bg-[#0E1411] ${className}`}>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#141F1A] border-b border-white/10 text-slate-400 font-extrabold uppercase tracking-wider">
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-300">
          {children}
        </tbody>
      </table>
    </div>
  );
};

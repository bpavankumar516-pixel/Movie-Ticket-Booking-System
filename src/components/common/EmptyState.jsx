import React from 'react';
import { Film } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Film,
  title = 'No Results Found',
  description = 'We could not find anything matching your request.',
  actionText,
  onAction,
}) => {
  return (
    <div className="py-16 px-6 glass-card-moviego rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-6">
      <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-8 h-8 text-[#00D690]" />
      </div>
      <h3 className="text-xl font-black font-outfit text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="emerald" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

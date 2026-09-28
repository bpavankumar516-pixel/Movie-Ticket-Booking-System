import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something Went Wrong',
  message = 'Failed to load requested data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="py-16 px-6 glass-card-moviego rounded-3xl border border-red-500/20 flex flex-col items-center justify-center text-center max-w-md mx-auto my-6">
      <div className="w-16 h-16 rounded-3xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-black font-outfit text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="emerald" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon = Sparkles,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 dark:bg-slate-950/75 backdrop-blur-md transition-colors duration-300 animate-fade-in">
      {/* Theme-based Glassmorphism Overlay (Light: soft translucent blur, Dark: deep dark blur) */}
      <div 
        className="fixed inset-0 bg-slate-900/30 dark:bg-black/60 backdrop-blur-md cursor-pointer transition-colors duration-300" 
        onClick={onClose} 
      />

      {/* Modal Card Box (Centered in Viewport with Theme Adaptation) */}
      <div 
        className={`relative w-full ${maxWidth} bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-5 sm:p-6 shadow-2xl z-10 overflow-hidden text-[var(--text-heading)] max-h-[85vh] flex flex-col my-auto transition-all duration-300`}
      >
        {/* Top Decorative Teal Gradient Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary-gradient z-20 rounded-t-3xl" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 flex items-center justify-center shrink-0 shadow-sm">
                <Icon className="w-4.5 h-4.5" />
              </div>
            )}
            <div className="space-y-0.5 text-left">
              <h3 className="text-base sm:text-lg font-black font-montserrat text-[var(--text-heading)] tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-heading)] bg-[var(--input-bg)] rounded-full transition-colors cursor-pointer border border-transparent hover:border-[var(--border)]"
            title="Close (Esc)"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Modal Body with Custom Scrollbar */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

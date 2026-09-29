import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'emerald', 'teal', 'coral', 'secondary', 'outline', 'ghost'
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const variants = {
    primary: 'bg-primary-gradient hover:opacity-95 text-white shadow-md shadow-[#14B8A0]/30',
    emerald: 'bg-primary-gradient hover:opacity-95 text-white shadow-md shadow-[#14B8A0]/30',
    teal: 'bg-primary-gradient hover:opacity-95 text-white shadow-md shadow-[#14B8A0]/30',
    coral: 'bg-primary-gradient hover:opacity-95 text-white shadow-md shadow-[#14B8A0]/30',
    secondary: 'bg-[var(--primary-light)] hover:opacity-90 text-[var(--primary)] border border-[var(--border)] font-semibold',
    outline: 'bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary-light)]',
    ghost: 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--primary-light)]',
    danger: 'bg-[#D64550] hover:bg-red-600 text-white shadow-md shadow-red-500/20',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3 text-sm font-bold gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

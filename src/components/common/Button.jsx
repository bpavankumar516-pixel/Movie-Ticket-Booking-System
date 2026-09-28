import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'emerald', 'coral', 'secondary', 'outline', 'ghost'
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
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'btn-emerald-gradient text-[#060A08]',
    emerald: 'btn-emerald-gradient text-[#060A08]',
    coral: 'btn-coral-gradient text-white',
    secondary: 'bg-[#0E1411] hover:bg-[#151E1A] text-white border border-white/10 hover:border-[#00D690]/40',
    outline: 'bg-transparent text-[#00D690] border border-[#00D690] hover:bg-[#00D690]/10 hover:border-[#00EF9F]',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
    danger: 'bg-red-600/80 hover:bg-red-600 text-white shadow-lg shadow-red-900/40',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base font-bold gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
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

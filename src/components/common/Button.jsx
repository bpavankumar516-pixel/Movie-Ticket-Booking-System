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
    primary: 'bg-[#0FA58A] hover:bg-[#0D947B] text-white shadow-md shadow-[#0FA58A]/25',
    emerald: 'bg-[#0FA58A] hover:bg-[#0D947B] text-white shadow-md shadow-[#0FA58A]/25',
    teal: 'bg-[#0FA58A] hover:bg-[#0D947B] text-white shadow-md shadow-[#0FA58A]/25',
    coral: 'bg-[#0FA58A] hover:bg-[#0D947B] text-white shadow-md shadow-[#0FA58A]/25',
    secondary: 'bg-[#DFF5F0] hover:bg-[#C8EFE7] text-[#0FA58A] font-bold',
    outline: 'bg-transparent text-[#0FA58A] border border-[#0FA58A] hover:bg-[#DFF5F0]',
    ghost: 'bg-transparent text-[#8A97A6] hover:text-[#0F1F2E] hover:bg-[#E8F0F0]',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20',
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

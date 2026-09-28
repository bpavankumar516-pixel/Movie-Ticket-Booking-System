import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = React.forwardRef(({
  label,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  className = '',
  labelClassName = '',
  required = false,
  helperText,
  variant = 'light',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className={`block text-xs font-bold text-[#0F1F2E] tracking-wide ${labelClassName}`}>
          {label} {required && <span className="text-[#0FA58A]">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-[#8A97A6]">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full rounded-2xl text-xs py-3 transition-all duration-200
            bg-white text-[#0F1F2E] border border-[#E8F0F0] placeholder-[#8A97A6]
            focus:outline-none focus:border-[#0FA58A] focus:ring-2 focus:ring-[#0FA58A]/20
            ${Icon ? 'pl-10' : 'pl-4'}
            ${isPassword ? 'pr-10' : 'pr-4'}
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-[#8A97A6] hover:text-[#0F1F2E] transition-colors focus:outline-none cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1 font-medium animate-fade-in">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-[#8A97A6] mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

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
  variant = 'dark', // 'dark' or 'light'
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const isLight = variant === 'light';

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className={`block text-xs font-bold tracking-wide uppercase ${isLight ? 'text-slate-700' : 'text-gray-300'} ${labelClassName}`}>
          {label} {required && <span className="text-[#00D690]">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className={`absolute left-3.5 pointer-events-none transition-colors ${isLight ? 'text-slate-400' : 'text-gray-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full rounded-2xl text-sm transition-all duration-300 py-3.5
            focus:outline-none focus:ring-2 focus:ring-[#00D690]/40
            ${Icon ? 'pl-10' : 'pl-4'}
            ${isPassword ? 'pr-10' : 'pr-4'}
            ${isLight 
              ? 'bg-slate-100 text-slate-900 border border-slate-300 placeholder-slate-400 focus:bg-white focus:border-[#00D690]' 
              : 'bg-[#0E1411] text-white border border-white/10 placeholder-gray-500 focus:border-[#00D690]'}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40' : ''}
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3.5 transition-colors focus:outline-none ${isLight ? 'text-slate-400 hover:text-slate-700' : 'text-gray-400 hover:text-white'}`}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-1 font-medium animate-fade-in">{error}</p>
      )}
      {helperText && !error && (
        <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

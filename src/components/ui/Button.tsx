import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'outline' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3FB6B4] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer';

  const variantStyles = {
    primary:
      'bg-[#3FB6B4] text-white hover:bg-[#35A3A1] shadow-md hover:shadow-lg shadow-teal-500/20 active:scale-95',
    outline:
      'border-2 border-[#3FB6B4] text-[#0E3B3D] hover:bg-[#3FB6B4]/10 active:scale-95',
    secondary:
      'bg-[#EBF8F7] text-[#0E3B3D] hover:bg-[#D5F1F0] active:scale-95',
    dark:
      'bg-[#0E3B3D] text-white hover:bg-[#092829] shadow-md hover:shadow-lg active:scale-95',
    ghost:
      'text-slate-700 hover:bg-slate-100 active:scale-95',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

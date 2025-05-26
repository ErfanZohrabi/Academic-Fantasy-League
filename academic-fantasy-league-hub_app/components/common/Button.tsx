import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-opacity-75 transition-all duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 border border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 border border-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-transparent',
    outline: 'bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white focus:ring-purple-500',
    ghost: 'bg-transparent text-purple-400 hover:bg-purple-500/20 focus:ring-purple-500 shadow-none hover:shadow-none',
  };

  const loadingSpinner = (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <span className="mr-2">{loadingSpinner}</span>}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {!isLoading ? children : <span>Loading...</span>}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;

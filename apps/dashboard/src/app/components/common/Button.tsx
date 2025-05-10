import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  title?: string;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  title,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'rounded-md font-medium transition-colors duration-300 focus:outline-none';

  const variantClasses = {
    primary: disabled
      ? 'text-white bg-blue-400'
      : 'text-white bg-blue-600 hover:bg-blue-700',
    secondary: disabled
      ? 'text-gray-500 bg-gray-100'
      : 'text-gray-700 bg-gray-200 hover:bg-gray-300',
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-5 py-3 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children || title}
    </button>
  );
};

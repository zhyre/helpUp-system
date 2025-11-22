import React from 'react';

const DonateButton = ({
  onClick,
  text = 'Donate',
  className = '',
  size = 'lg',
  variant = 'primary'
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-[#a50805] hover:bg-red-700',
    secondary: 'bg-[#4caf50] hover:bg-green-600',
    outline: 'bg-transparent border-2 border-[#a50805] text-[#a50805] hover:bg-[#a50805] hover:text-white'
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant]} text-white rounded-xl font-semibold transition-colors duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default DonateButton;
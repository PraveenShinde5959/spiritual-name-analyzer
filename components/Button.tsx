
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-transparent rounded-full shadow-lg group focus:outline-none
        ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:scale-105'}
        bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600
        active:translate-y-0.5
        ${className}`}
      disabled={isLoading}
      {...props}
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-gold-400 to-yellow-300 group-hover:translate-x-0 ease"></span>
      <span className="relative flex items-center gap-2 text-white">
        {isLoading && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};

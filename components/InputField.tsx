
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  className = '',
  type = 'text',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block text-lg font-medium text-gold-200 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full p-3 rounded-lg bg-purple-900/50 border border-purple-700 focus:border-gold-300 focus:ring-1 focus:ring-gold-300 text-white placeholder-purple-300 transition duration-300 ease-in-out shadow-inner"
        {...props}
      />
    </div>
  );
};

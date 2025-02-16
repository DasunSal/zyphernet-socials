// components/EmailInput.tsx
import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, error }) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic regex for valid email

  const validateEmail = (email: string) => {
    if (email && !emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const errorMessage = error || validateEmail(value);

  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
      <input
        id="email"
        type="email"
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-base"
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
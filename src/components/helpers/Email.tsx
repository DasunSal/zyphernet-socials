// components/EmailInput.tsx
import React from 'react';

type EmailInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EmailInput = ({ value, onChange }: EmailInputProps) => (
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1.5">
      Email
    </label>
    <input
      id="email"
      type="email"
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg
        text-white placeholder-gray-400 focus:outline-none focus:ring-2 
        focus:ring-gray-600 focus:border-transparent text-base"
      placeholder="Email"
    />
  </div>
);

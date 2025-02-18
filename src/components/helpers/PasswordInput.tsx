import React, { useId } from 'react';  // Add useId import
import { Eye, EyeOff } from 'lucide-react';
import { useRestrictKeys } from '@/hooks/useRestrictKeys';  // Import the custom hook

type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;  // Make onKeyDown optional
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordInput = ({
  value,
  onChange,
  onKeyDown = () => {},  // Default to empty function if onKeyDown is not passed
  showPassword,
  setShowPassword,
}: PasswordInputProps) => {
  const id = useId();  // Generate unique ID
  
  // Use the custom hook to restrict space key
  const restrictSpace = useRestrictKeys([' ']); // Restrict the space key
  
  // Combine with any other onKeyDown functionality you need
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    restrictSpace(e);  // Apply the restriction
    onKeyDown(e);  // Call the original onKeyDown prop function
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1.5">
        Password
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onKeyDown={handleKeyDown}  // Use the new keydown handler
          onChange={onChange}
          required
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg
            text-white placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-gray-600 focus:border-transparent text-base pr-12"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
            hover:text-white focus:outline-none transition-colors duration-200"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

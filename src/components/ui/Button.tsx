// components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"; // Allows you to define different button styles
}

export const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  const buttonClasses = variant === "primary" 
    ? "w-full mt-4 p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
    : "w-full mt-4 p-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300";

  return (
    <button
      {...props}
      className={`${buttonClasses} disabled:bg-gray-300 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

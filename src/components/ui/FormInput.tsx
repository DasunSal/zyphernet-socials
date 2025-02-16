import React from "react";

interface FormInputProps {
  label: string;
  error?: { message: string };
  type: string;
  // For better typing, replace `any` with input props specific to HTMLInputElement
  // This is a good practice to prevent broad type usage like `any`
  [rest: string]: string | number | boolean | React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, type, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...props}
      className={`mt-1 p-2 w-full border rounded-md ${
        error ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {error && <p className="text-sm text-red-500">{error.message}</p>}
  </div>
);

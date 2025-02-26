"use client";

import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  const id = `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full px-4 py-2 rounded-lg border transition-colors duration-200
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800"
              : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800"
          }
          ${
            props.disabled
              ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75"
              : "bg-white dark:bg-gray-800"
          }
        `}
        {...props}
      />
      {(error || helperText) && (
        <p
          className={`mt-1 text-sm ${
            error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;

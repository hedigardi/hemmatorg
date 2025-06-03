import React from "react";

export default function Button({ children, onClick, type = "button", variant = "primary", disabled = false }) {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition duration-200";

  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100 dark:text-white dark:border-gray-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

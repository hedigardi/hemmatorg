import React from "react";

export default function Button({ children, onClick, type = "button", variant = "primary", disabled = false }) {
  const baseStyles = "px-6 py-2 rounded-full font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"; // Changed to rounded-full, increased px

  const variants = {
    primary: "bg-primary-main text-white hover:bg-primary-light disabled:bg-primary-light disabled:opacity-70", // Använder -main istället för -DEFAULT
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 disabled:opacity-70",
    outline: "border border-primary-main text-primary-main hover:bg-primary-main hover:text-white dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900 disabled:opacity-70" // Använder -main
  };

  // Add focus ring color based on variant
  const focusRingColors = {
    primary: "focus:ring-primary-main", // Använder -main
    secondary: "focus:ring-gray-500",
    outline: "focus:ring-primary-main" // Använder -main
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${focusRingColors[variant]} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

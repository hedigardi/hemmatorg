import React from "react";

export default function FileInput({ label, onChange, name }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className="w-full text-gray-700 dark:text-white"
      />
    </div>
  );
}

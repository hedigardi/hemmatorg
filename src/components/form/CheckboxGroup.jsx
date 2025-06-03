import React from "react";

export default function CheckboxGroup({ label, options, selected, onChange }) {
  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">{label}</p>
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-2 text-gray-800 dark:text-white">
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

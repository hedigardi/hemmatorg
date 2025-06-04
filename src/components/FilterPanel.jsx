import React from "react";
import Dropdown from "./form/Dropdown";

export default function FilterPanel({ filters, setFilters }) {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-md">
      <Dropdown
        label="Stad"
        options={[
          { label: "Stockholm", value: "stockholm" },
          { label: "Göteborg", value: "goteborg" },
          { label: "Malmö", value: "malmo" },
        ]}
        value={filters.city}
        onChange={(val) => setFilters({ ...filters, city: val })}
      />
      <Dropdown
        label="Kategori"
        options={[
          { label: "Vegetariskt", value: "vegetarian" },
          { label: "Kött", value: "meat" },
          { label: "Veganskt", value: "vegan" },
        ]}
        value={filters.category}
        onChange={(val) => setFilters({ ...filters, category: val })}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Dropdown from './form/Dropdown';
import TextInput from './form/TextInput';

// Definiera alternativ för dropdown-menyer
// Se till att 'value' matchar de värden du har i din databas för maträtternas kategorier (och eventuellt städer)
const cityOptions = [
  { label: "Alla Städer", value: "" },
  { label: "Stockholm", value: "Stockholm" },
  { label: "Göteborg", value: "Göteborg" },
  { label: "Malmö", value: "Malmö" },
  // Lägg till fler städer vid behov. Detta filter fungerar bara om dina 'dish'-objekt har ett 'city'-fält.
];

const categoryOptions = [
  { label: "Alla Kategorier", value: "" },
  { label: "Vegetariskt", value: "vegetariskt" },
  { label: "Kött", value: "kött" },
  { label: "Fisk", value: "fisk" },
  { label: "Efterrätt", value: "efterrätt" },
  { label: "Veganskt", value: "veganskt" },
  { label: "Soppor", value: "soppor" },
];

export default function DishFilters({ onFilterChange }) {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onFilterChange({ city, category, searchTerm });
  }, [city, category, searchTerm, onFilterChange]);

  return (
    <div className="p-4 bg-pageTheme-card dark:bg-gray-800 rounded-lg shadow-md mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
      <div className="flex-1 min-w-0"> {/* Added min-w-0 for better flex handling */}
        <TextInput
          label="Sök maträtt..."
          name="searchTerm"
          placeholder="T.ex. lasagne, sushi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* City filter can be enabled if your dish data includes a 'city' field 
      <div className="flex-1">
        <Dropdown label="Stad" options={cityOptions} value={city} onChange={setCity} />
      </div>
      */}
      <div className="flex-1">
        <Dropdown label="Kategori" options={categoryOptions} value={category} onChange={setCategory} />
      </div>
    </div>
  );
}
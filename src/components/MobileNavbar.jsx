// src/components/MobileNavbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importera useCart

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart(); // Hämta totalItems från CartContext

  return (
    <nav className="md:hidden bg-white dark:bg-gray-900 p-4 shadow-md relative z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-orange-500">HemmaTorg</Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 dark:text-gray-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-100">
            Hem
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-100">Logga in</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-100">Profil</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-100">Varukorg</Link>
        </div>
      )}
    </nav>
  );
}

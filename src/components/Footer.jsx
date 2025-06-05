// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pageTheme-light dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-8 mt-12 border-t-2 border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-6 text-center md:flex md:justify-between md:items-center">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {currentYear} HemmaTorg. Alla rättigheter förbehållna.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/integritetspolicy" className="text-sm hover:text-primary-main dark:hover:text-primary-light">Integritetspolicy</Link>
          <Link to="/anvandarvillkor" className="text-sm hover:text-primary-main dark:hover:text-primary-light">Användarvillkor</Link>
          <Link to="/kontakt" className="text-sm hover:text-primary-main dark:hover:text-primary-light">Kontakt</Link>
          {/* Du behöver skapa sidor/routes för dessa länkar */}
        </div>
      </div>
    </footer>
  );
}
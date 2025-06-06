// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pageTheme-light dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-8 mt-12 border-t-2 border-primary-main dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05),0_-2px_4px_-2px_rgba(255,255,255,0.03)]"> {/* Changed light theme border color to primary-main */}
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
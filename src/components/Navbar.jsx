import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);  

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className="bg-orange-400 dark:bg-gray-900 text-white dark:text-gray-100 p-4">
      <div className="flex justify-between items-center">
        {/* Left side: logo + toggle */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold">HemmaTorg</Link>
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded hover:bg-white/10"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Right side: links + hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden md:flex gap-4">
            <Link to="/preview">Preview</Link>
            <Link to="/cart">Varukorg</Link>
            <Link to="/profile">Profil</Link>
            <Link to="/login">Logga in</Link>
          </div>

          {/* Hamburger icon */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">
          <Link to="/preview" onClick={() => setIsOpen(false)}>Preview</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>Varukorg</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>Profil</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Logga in</Link>
        </div>
      )}
    </nav>
  );
}

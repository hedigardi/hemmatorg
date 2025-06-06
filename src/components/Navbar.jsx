import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Home, Info, LogIn, LogOut, ShoppingCart, UserCircle, ListOrdered, UtensilsCrossed, PlusCircle } from 'lucide-react'; // Added ListOrdered, PlusCircle
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Importera useCart

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    // Starta i ljust läge om inget sparat tema finns, annars använd sparat tema
    return storedTheme === "dark"; // Starta i mörkt endast om localStorage explicit säger "dark"
  });
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth(); 
  const { uniqueItemsCount } = useCart(); // Flytta useCart() hit, FÖRE villkorlig logik
  const navigate = useNavigate(); // Se till att navigate är definierad
  const handleLogout = async () => { 
    await logout();
    navigate("/login");
  };
  
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

  // Visa inte innehåll som beror på auth förrän auth-status är laddad
  // Detta förhindrar "flimmer" mellan inloggat/utloggat läge.
  if (authLoading) return null; // Eller en enkel laddningsindikator för navbaren
  return (
    <nav className="bg-pageTheme-light dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md sticky top-0 z-50 border-b-2 border-primary-main dark:border-gray-700"> {/* Changed light theme border color to primary-main */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center"> {/* Increased px */}
        {/* Left side: logo + toggle */}
        <div className="flex items-center gap-4">
        <Link to="/" className="text-lg font-bold text-primary-main font-headline">HemmaTorg</Link> {/* Använder primary-main och font-headline */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          > {/* Subtle hover for toggle */}
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Right side: links + hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent-DEFAULT text-textColors-onAccent dark:text-white hover:bg-accent-light dark:hover:text-textColors-onAccent transition-colors text-sm">
                  <Home className="h-4 w-4" /> Hem
                </Link>
                <Link to="/how-it-works" className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent-DEFAULT text-textColors-onAccent dark:text-white hover:bg-accent-light dark:hover:text-textColors-onAccent transition-colors text-sm">
                  <Info className="h-4 w-4" /> Så funkar det
                </Link>
                <Link to="/login" className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent-DEFAULT text-textColors-onAccent dark:text-white hover:bg-accent-light dark:hover:text-textColors-onAccent transition-colors text-sm">
                  <LogIn className="h-4 w-4" /> Logga in
                </Link>
                <Link to="/cart" className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent-light text-textColors-onAccent dark:text-textColors-onAccent hover:bg-accent-light transition-colors text-sm">
                  <ShoppingCart className="h-4 w-4" /> Varukorg {uniqueItemsCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{uniqueItemsCount}</span>} {/* Använd uniqueItemsCount */}
                </Link>
              </>
            ) : (
              <>
                {/* Inloggade användarens standardlänkar */}
                {/* 1. Hem */}
                <Link to="/" className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Home className="h-4 w-4" /> Hem
                </Link>
                {/* 2. Så funkar det */}
                <Link to="/how-it-works" className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Info className="h-4 w-4" /> Så funkar det
                </Link>
                {/* 3. Säljpanel */}
                <Link to="/seller" className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <UtensilsCrossed className="h-4 w-4" /> Säljpanel
                </Link>
                {/* 4. Logga ut */}
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logga ut
                </button>
                {/* 5. Profil */}
                <Link 
                  to="/profile" 
                  className="flex items-center gap-1 px-3 py-2 rounded-full border border-primary-main text-primary-main hover:bg-primary-main hover:text-white dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900 transition-colors text-sm"
                >
                  <UserCircle className="h-4 w-4" /> {user?.displayName || "Profil"}
                </Link>
                {/* 6. Varukorg (Konsekvent stil) */}
                <Link to="/cart" className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent-light text-textColors-onAccent dark:text-textColors-onAccent hover:bg-accent-light transition-colors text-sm">
                  <ShoppingCart className="h-4 w-4" /> Varukorg {uniqueItemsCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{uniqueItemsCount}</span>} {/* Använd uniqueItemsCount */}
                </Link>
              </>
            )}
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
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700"> {/* Lättare border-top för mobilmenyn, eller kan också tas bort om skuggan från nav är tillräcklig */}
          <div className="container mx-auto px-6 py-3 flex flex-col gap-3 text-gray-700 dark:text-gray-200"> {/* Container for mobile menu items, increased px */}
            {!isAuthenticated ? (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block w-full text-left px-4 py-2 rounded-full bg-accent-DEFAULT text-textColors-onAccent dark:text-white hover:bg-accent-light dark:hover:text-textColors-onAccent transition-colors text-sm">
                  <Home className="h-5 w-5" /> Hem
                </Link>
                <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block w-full text-left px-4 py-2 rounded-full bg-accent-DEFAULT text-textColors-onAccent dark:text-white hover:bg-accent-light dark:hover:text-textColors-onAccent transition-colors text-sm">
                  <Info className="h-5 w-5" /> Så funkar det
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block w-full text-left px-4 py-2 rounded-full bg-accent-DEFAULT text-textColors-onAccent dark:text-white hover:bg-accent-light dark:hover:text-textColors-onAccent transition-colors text-sm">
                  <LogIn className="h-5 w-5" /> Logga in
                </Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block w-full text-left px-4 py-2 rounded-full bg-accent-light text-textColors-onAccent dark:text-textColors-onAccent hover:bg-accent-light transition-colors text-sm">
                  <ShoppingCart className="h-5 w-5" /> Varukorg {uniqueItemsCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{uniqueItemsCount}</span>} {/* Använd uniqueItemsCount */}
                </Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Home className="h-5 w-5" /> Hem
                </Link>
                <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Info className="h-5 w-5" /> Så funkar det
                </Link>
                {/* Säljarspecifika länkar, kan villkoras om du har rollhantering senare */}
                <Link to="/seller" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <UtensilsCrossed className="h-5 w-5" /> Säljpanel
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" /> Logga ut
                </button>
                {/* Profil-länk med outline-stil - Anpassad för mobil */}
                <Link 
                  to="/profile" onClick={() => setIsOpen(false)} 
                  className="flex items-center gap-1 block w-full text-left px-3 py-2 rounded-full border border-primary-main text-primary-main hover:bg-primary-main hover:text-white dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900 transition-colors text-sm"
                >
                  <UserCircle className="h-5 w-5" /> {user?.displayName || "Profil"}
                </Link>
                {/* Konsekvent Varukorg-stil för mobil */}
                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 block w-full text-left px-4 py-2 rounded-full bg-accent-light text-textColors-onAccent dark:text-textColors-onAccent hover:bg-accent-light transition-colors text-sm">
                  <ShoppingCart className="h-5 w-5" /> Varukorg {uniqueItemsCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{uniqueItemsCount}</span>} {/* Använd uniqueItemsCount */}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

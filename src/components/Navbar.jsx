import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Importera useCart

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    // Starta i ljust läge om inget sparat tema finns, annars använd sparat tema
    return storedTheme === "dark"; // Starta i mörkt endast om localStorage explicit säger "dark"
  });
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth(); // Lägg till user och authLoading
  const { totalItems } = useCart();
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
    <nav className="bg-pageTheme-light dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md"> {/* Borttagen border-b, förlitar sig på shadow-md för separation */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center"> {/* Increased px */}
        {/* Left side: logo + toggle */}
        <div className="flex items-center gap-4">
        <Link to="/" className="text-lg font-bold text-primary-DEFAULT">HemmaTorg</Link> {/* Logotyp i primärfärg */}
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
          <div className="hidden md:flex items-center gap-3"> {/* Adjusted gap */}
            <Link to="/preview" className="px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Preview</Link> {/* Justerad hover */}
            <Link to="/cart" className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-primary-dark transition-colors">
              Varukorg {totalItems > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>}
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Profil</Link>
                <Link to="/orders" className="px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Orderhistorik</Link>
                <Link to="/seller" className="px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Säljardashboard</Link>
                <Link to="/add" className="px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Lägg till maträtt</Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                {user?.displayName && <span className="hidden md:inline">Välkommen, {user.displayName}!</span>}
                <button onClick={handleLogout} className="px-3 py-2 rounded-full text-primary-DEFAULT hover:bg-primary-light hover:text-white transition-colors"> {/* Logout som en textknapp med primärfärg */}
                  Logga ut
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-2 rounded-md bg-primary-DEFAULT text-white hover:bg-primary-dark transition-colors">Logga in</Link> /* Login as primary button */
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
          <div className="container mx-auto px-6 py-2 flex flex-col gap-2"> {/* Container for mobile menu items, increased px */}
            <Link to="/preview" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Preview</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-primary-dark transition-colors">
              Varukorg {totalItems > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>}
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Profil</Link>
                <Link to="/seller" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Säljardashboard</Link>
                <Link to="/add" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:text-primary-dark transition-colors">Lägg till maträtt</Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                {user?.displayName && <span className="block px-3 py-2">Välkommen, {user.displayName}!</span>}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-full text-primary-DEFAULT hover:bg-primary-light hover:text-white transition-colors">
                  Logga ut
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md bg-primary-DEFAULT text-white hover:bg-primary-dark transition-colors">Logga in</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

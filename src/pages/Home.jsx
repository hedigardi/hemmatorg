import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDishes } from "../services/dishService"; // Importera den nya service-funktionen
import DishCard from "../components/DishCard"; // Importera DishCard
import DishFilters from "../components/DishFilters"; // Importera den nya filterkomponenten
import Button from "../components/form/Button"; // Importera Button
import { AlertTriangle } from "lucide-react"; // För "inga resultat"-meddelande

export default function Home() {
  const [allDishesFromDB, setAllDishesFromDB] = useState([]); // Alla rätter från DB
  const [displayedDishes, setDisplayedDishes] = useState([]); // Rätter som visas efter filtrering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ city: "", category: "", searchTerm: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const fetchedDishes = await getAllDishes();
        setAllDishesFromDB(fetchedDishes);
        setDisplayedDishes(fetchedDishes); // Visa alla rätter initialt
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dishes:", err);
        setError("Kunde inte ladda maträtter. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []); // Körs en gång när komponenten mountas

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setLoading(true); // Visa laddning medan filtrering sker

    let tempDishes = [...allDishesFromDB];

    // Filtrera på stad (om 'city'-fältet finns på dina dish-objekt)
    // if (newFilters.city && newFilters.city !== "") {
    //   tempDishes = tempDishes.filter(dish => dish.city && dish.city.toLowerCase() === newFilters.city.toLowerCase());
    // }

    if (newFilters.category && newFilters.category !== "") {
      tempDishes = tempDishes.filter(dish => dish.category && dish.category.toLowerCase() === newFilters.category.toLowerCase());
    }

    if (newFilters.searchTerm) {
      const searchTermLower = newFilters.searchTerm.toLowerCase();
      tempDishes = tempDishes.filter(dish =>
        (dish.title && dish.title.toLowerCase().includes(searchTermLower)) ||
        (dish.description && dish.description.toLowerCase().includes(searchTermLower))
      );
    }
    setDisplayedDishes(tempDishes);
    setLoading(false);
  }, [allDishesFromDB]);

  if (loading) return <p className="p-4 text-center">Laddar maträtter...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen"> {/* Bakgrunden styrs nu av App.jsx och index.css (bg-pageTheme-light) */}
      {/* Hero Section - Bakgrunden är redan vit/ljusgrå från App.jsx eller body, så ingen extra bg här behövs om det är designen */}
      <section className="bg-pageTheme-hero dark:bg-pageTheme-heroDark py-16 md:py-24 text-center shadow-sm"> {/* Uppdaterad mörk bakgrund för hero */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-main dark:text-primary-main mb-6">
            Välkommen till HemmaTorg!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Upptäck utsökt hemlagad mat från dina grannar, eller dela med dig av dina egna kulinariska skapelser.
          </p> {/* Knappen använder redan primärfärgen */}
          <Button variant="primary" onClick={() => document.getElementById('dishes-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Utforska alla rätter
          </Button>
        </div>
      </section>

      {/* Dishes Section */}
      <section id="dishes-section" className="py-12 md:py-16 bg-pageTheme-light dark:bg-gray-900"> {/* Huvudsektionens bakgrund */}
        <div className="container mx-auto px-6">
          <DishFilters onFilterChange={handleFilterChange} />

          {loading && displayedDishes.length === 0 ? ( // Visar laddning om vi filtrerar och inte har några resultat än
            <p className="p-4 text-center">Filtrerar maträtter...</p>
          ) : !loading && displayedDishes.length === 0 ? (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-xl text-gray-700 dark:text-gray-200">Inga maträtter matchade din sökning.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Prova att ändra dina filter eller söktermer.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onClick={() => navigate(`/dish/${dish.id}`)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

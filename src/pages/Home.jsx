import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDishes } from "../services/dishService"; // Importera den nya service-funktionen
import DishCard from "../components/DishCard"; // Importera DishCard
import FilterPanel from "../components/FilterPanel"; // Importera FilterPanel (för framtida bruk)
import Button from "../components/form/Button"; // Importera Button

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [filters, setFilters] = useState({ city: "", category: "" }); // För framtida filtrering
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const fetchedDishes = await getAllDishes();
        setDishes(fetchedDishes);
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

  if (loading) return <p className="p-4 text-center">Laddar maträtter...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen"> {/* Bakgrunden styrs nu av App.jsx och index.css (bg-pageTheme-light) */}
      {/* Hero Section - Bakgrunden är redan vit/ljusgrå från App.jsx eller body, så ingen extra bg här behövs om det är designen */}
      <section className="bg-pageTheme-hero dark:bg-pageTheme-heroDark py-16 md:py-24 text-center shadow-sm"> {/* Uppdaterad mörk bakgrund för hero */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Upptäck HemmaLagat!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Din marknadsplats för utsökt hemlagad mat från lokala kockar.
          </p> {/* Knappen använder redan primärfärgen */}
          <Button variant="primary" onClick={() => document.getElementById('dishes-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Utforska alla rätter
          </Button>
        </div>
      </section>

      {/* Dishes Section */}
      <section id="dishes-section" className="py-12 md:py-16 bg-pageTheme-light dark:bg-gray-900"> {/* Huvudsektionens bakgrund */}
        <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white">
          Populära Rätter
        </h2>
      {/* <FilterPanel filters={filters} setFilters={setFilters} /> // Kan läggas till senare */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onClick={() => navigate(`/dish/${dish.id}`)} />
          ))
        ) : (
          <p>Inga maträtter tillgängliga för tillfället.</p>
        )}
      </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDishes } from "../services/dishService"; // Importera den nya service-funktionen
import DishCard from "../components/DishCard"; // Importera DishCard
import FilterPanel from "../components/FilterPanel"; // Importera FilterPanel (för framtida bruk)

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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Upptäck HemmaLagat!</h1>
      {/* <FilterPanel filters={filters} setFilters={setFilters} /> // Kan läggas till senare */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onClick={() => navigate(`/dish/${dish.id}`)} />
          ))
        ) : (
          <p>Inga maträtter tillgängliga för tillfället.</p>
        )}
      </div>
    </div>
  );
}

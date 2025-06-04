import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDishesBySellerId } from "../services/dishService";
import DishCard from "../components/DishCard"; // Importera DishCard

export default function SellerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [sellerDishes, setSellerDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerDishes = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        // Inte nödvändigtvis ett fel, ProtectedRoute hanterar detta,
        // men bra att inte försöka hämta data om ingen användare finns.
        return;
      }

      try {
        setLoading(true);
        const dishes = await getDishesBySellerId(user.uid);
        setSellerDishes(dishes);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch seller dishes:", err);
        setError("Kunde inte ladda dina maträtter. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDishes();
  }, [isAuthenticated, user]); // Körs om när inloggningsstatus eller användare ändras

  // ProtectedRoute bör hantera omdirigering om inte autentiserad
  if (loading) return <p className="p-4 text-center">Laddar dina maträtter...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Säljarpanel</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dina rätter</h2>
        <Link
          to="/add"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Lägg till ny rätt
        </Link>
      </div>

      {sellerDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {sellerDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              // onClick={() => navigate(`/dish/${dish.id}`)} // Kan leda till detaljsida eller redigeringsvy
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Du har ännu inte lagt upp några rätter.</p>
      )}
    </div>
  );
}

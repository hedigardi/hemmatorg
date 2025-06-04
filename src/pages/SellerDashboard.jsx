import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importera useNavigate
import { useAuth } from "../context/AuthContext";
import { getDishesBySellerId, deleteDishFromFirestore } from "../services/dishService";
import DishCard from "../components/DishCard"; // Importera DishCard

export default function SellerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [sellerDishes, setSellerDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook för navigering

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

  const handleEditDish = (dishId) => {
    navigate(`/seller/edit-dish/${dishId}`);
  };

  const handleDeleteDish = async (dishId, dishTitle) => {
    if (window.confirm(`Är du säker på att du vill ta bort rätten "${dishTitle}"?`)) {
      try {
        await deleteDishFromFirestore(dishId);
        setSellerDishes(prevDishes => prevDishes.filter(dish => dish.id !== dishId));
        // Kanske visa en notifikation om lyckad borttagning
      } catch (err) {
        console.error("Failed to delete dish:", err);
        setError(`Kunde inte ta bort rätten "${dishTitle}". Försök igen.`);
        // Återställ felet efter en stund om du vill
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const handleCardClick = (dishId) => {
    navigate(`/dish/${dishId}`); // Navigera till den vanliga detaljsidan
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Säljarpanel</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        {/* Link to Seller Orders */}
        <Link
          to="/seller/orders"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Visa inkomna beställningar
        </Link>
        {/* Link to Add New Dish */}
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
              onClick={() => handleCardClick(dish.id)} // Klick på kortet leder till detaljsida
              showAdminControls={true}
              onEdit={() => handleEditDish(dish.id)}
              onDelete={() => handleDeleteDish(dish.id, dish.title)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Du har ännu inte lagt upp några rätter.</p>
      )}
    </div>
  );
}

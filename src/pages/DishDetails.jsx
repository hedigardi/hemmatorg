import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDishById } from "../services/dishService";
import RatingStars from "../components/RatingStars"; // Om du vill visa betyg
import Button from "../components/form/Button"; // Importera Button
import { useCart } from "../context/CartContext"; // Importera useCart

export default function DishDetails() {
  const { id } = useParams(); // Hämta 'id' från URL:en
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItemToCart } = useCart(); // Hämta funktionen för att lägga till i varukorgen
  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        setLoading(true);
        const fetchedDish = await getDishById(id);
        setDish(fetchedDish);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch dish with id ${id}:`, err);
        setError(err.message || "Kunde inte ladda maträttens detaljer. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDishDetails();
    }
  }, [id]); // Körs om när 'id' ändras

  const handleAddToCart = () => {
    if (dish) {
      addItemToCart(dish, 1); // Lägg till 1 av den aktuella rätten
    }
  };
  if (loading) return <p className="p-4 text-center">Laddar maträttsdetaljer...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!dish) return <p className="p-4 text-center">Maträtten kunde inte hittas.</p>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden md:flex">
        <img src={dish.imageUrl || 'https://via.placeholder.com/400x300.png?text=Ingen+bild'} alt={dish.title} className="w-full md:w-1/2 h-64 md:h-auto object-cover"/>
        <div className="p-6 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{dish.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{dish.description}</p>
          {dish.ingredients && <p className="text-sm text-gray-700 dark:text-gray-200 mb-1"><strong>Ingredienser:</strong> {dish.ingredients}</p>}
          {dish.allergens && <p className="text-sm text-gray-700 dark:text-gray-200 mb-4"><strong>Allergener:</strong> {dish.allergens}</p>}
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl text-orange-500 font-bold">{dish.price} kr</span>
            <RatingStars rating={dish.rating || 0} /> {/* Antag att rating finns, annars default 0 */}
          </div>
          <Button variant="primary" onClick={handleAddToCart}>Lägg i varukorg</Button> {/* Lägg till knappen */}
        </div>
      </div>
    </div>
  );
}
  
// src/pages/EditDishPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DishForm from '../components/DishForm';
import { getDishById, updateDishInFirestore } from '../services/dishService'; // Importera updateDishInFirestore

export default function EditDishPage() {
  const { id: dishId } = useParams(); // Hämta dishId från URL
  const navigate = useNavigate();
  const [initialDishData, setInitialDishData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        const dish = await getDishById(dishId);
        setInitialDishData(dish); // Sätt initial data för formuläret
        setError(null);
      } catch (err) {
        setError("Kunde inte ladda maträtten för redigering.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (dishId) fetchDish();
  }, [dishId]);

  // Denna funktion skickas till DishForm som onSubmit-prop
  const handleSubmit = async (updatedDishData) => {
    try {
        await updateDishInFirestore(dishId, updatedDishData);
        alert("Rätten uppdaterades framgångsrikt!"); // Eller en snyggare notifikation
        navigate('/seller'); // Navigera tillbaka till säljarpanelen efter uppdatering
      } catch (err) {
        setError("Kunde inte uppdatera maträtten. Försök igen.");
      }
    };

  if (loading) return <p className="p-4 text-center">Laddar maträtt för redigering...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!initialDishData && !loading) return <p className="p-4 text-center">Kunde inte hitta maträtten.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Redigera Maträtt</h1>
      {initialDishData && (
        <DishForm
          onSubmit={handleSubmit} // Skicka den lokala handleSubmit-funktionen
          initialData={initialDishData}
          isEditMode={true}
        />
      )}
    </div>
  );
}
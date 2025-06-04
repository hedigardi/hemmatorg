import React from "react";
import DishForm from "../components/DishForm";
import { addDishToFirestore } from "../services/addDishToFirestore";

export default function AddDish() {
  const handleSubmit = async (dishData) => {
    try {
      const newDishId = await addDishToFirestore(dishData);
      alert(`Rätt sparad! (ID: ${newDishId})`);
    } catch (error) {
      alert("Det gick inte att spara rätten.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lägg till maträtt</h1>
      <DishForm onSubmit={handleSubmit} />
    </div>
  );
}

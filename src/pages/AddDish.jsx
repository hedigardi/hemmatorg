import React from "react";
import DishForm from "../components/DishForm";

export default function AddDish() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Här kan du hämta och skicka formulärdata senare
    alert("Rätt sparad! (simulerat)");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lägg till maträtt</h1>
      <DishForm onSubmit={handleSubmit} />
    </div>
  );
}

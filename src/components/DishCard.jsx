import React from "react";
import RatingStars from "./RatingStars";
import Button from "./form/Button"; // Importera Button

export default function DishCard({ dish, onClick, showAdminControls = false, onEdit, onDelete }) {
  return (
    <div
      className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
    >
      <div onClick={onClick} className="cursor-pointer"> {/* Gör endast bild och text klickbar om inte admin */}
      <img
        src={dish.imageUrl || 'https://via.placeholder.com/300x160.png?text=Ingen+bild'} // Use imageUrl and a fallback
        alt={dish.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{dish.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{dish.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-orange-500 font-bold">{dish.price} kr</span>
          <RatingStars rating={dish.rating} />
        </div>
      </div>
      </div>
      {showAdminControls && (
        <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-2">
          <Button variant="secondary" onClick={onEdit} size="sm">Redigera</Button>
          <Button variant="outline" onClick={onDelete} className="border-red-500 text-red-500 hover:bg-red-50" size="sm">
            Ta bort
          </Button>
        </div>
      )}
    </div>
  );
}

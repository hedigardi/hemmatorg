import React from "react";
import RatingStars from "./RatingStars";
import Button from "./form/Button"; // Importera Button

export default function DishCard({ dish, onClick, showAdminControls = false, onEdit, onDelete }) {
  return (
    <div
      className="bg-pageTheme-card dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-600 flex flex-col" // Använder pageTheme.card, justerad shadow och border
    >
      {/* Klickbar del för bild och titel */}
      <div onClick={onClick} className="cursor-pointer">
      <img
        src={dish.imageUrl || 'https://via.placeholder.com/300x160.png?text=Ingen+bild'} // Use imageUrl and a fallback
        alt={dish.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-5 flex-grow"> {/* Ökad padding */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{dish.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 h-10 overflow-hidden line-clamp-2">{dish.description}</p> {/* line-clamp för att begränsa till 2 rader */}
        {/* RatingStars är borttagen för att matcha startsida.jpg */}
      </div>
      </div>
      {/* Pris och Visa-knapp (alltid längst ner) */}
      <div className="p-5 border-t border-gray-200 dark:border-gray-600 mt-auto"> {/* Ökad padding, mt-auto för att trycka ner */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800 dark:text-white">{dish.price} kr</span> {/* Prisfärg mörkare */}
          {!showAdminControls && <Button variant="primary" onClick={onClick} size="sm">Visa</Button>}
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

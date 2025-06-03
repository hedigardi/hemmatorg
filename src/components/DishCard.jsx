import React from "react";
import RatingStars from "./RatingStars";

export default function DishCard({ dish, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={dish.image}
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
  );
}

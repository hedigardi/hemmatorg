import React from "react";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
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

      {/* Här kommer vi senare visa en lista med DishCard-komponenter */}
      <p className="text-gray-600 dark:text-gray-300">
        Du har ännu inte lagt upp några rätter.
      </p>
    </div>
  );
}

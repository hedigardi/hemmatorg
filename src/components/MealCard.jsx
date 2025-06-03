function MealCard() {
    return (
      <div className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700">
        <img
          src="https://www.jetpunk.com/img/user-img/f6/f689ded540-450.webp"
          alt="Maträtt"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">Hemlagad Sushi</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Säljs av Anna i Sundbyberg</p>
          <p className="mt-2 font-bold">120 kr</p>
          <button className="mt-3 w-full bg-green-500 text-white py-2 rounded">Visa mer</button>
        </div>
      </div>
    );
  }
  
  export default MealCard;
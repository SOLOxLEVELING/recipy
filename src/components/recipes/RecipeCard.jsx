import React from "react";

const RecipeCard = ({ recipe, onSelect }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
    onClick={() => onSelect(recipe.id)}
  >
    <img
      // Use 'image_url' from the database
      src={recipe.image_url}
      // Use 'title' from the database
      alt={recipe.title}
      className="w-full h-48 object-cover bg-gray-200" // Added a background color for loading
    />
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
        {/* Use 'title' from the database */}
        {recipe.title}
      </h3>
    </div>
  </div>
);

export default RecipeCard;

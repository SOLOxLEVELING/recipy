import React from "react";

const RecipeCard = ({ recipe, onSelect }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
    onClick={() => onSelect(recipe.id)}
  >
    <img
      src={recipe.image}
      alt={recipe.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
        {recipe.name}
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          {recipe.category}
        </span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {recipe.cuisine}
        </span>

        {/* MODIFIED LINE: Added optional chaining '?.' */}
        {recipe.dietary?.map((d) => (
          <span
            key={d}
            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default RecipeCard;

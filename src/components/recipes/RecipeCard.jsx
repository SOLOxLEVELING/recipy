import React from "react";
import SaveRecipeButton from "./SaveRecipeButton"; // <-- Import the button

const RecipeCard = ({ recipe, onSelect }) => {
  // We use a separate click handler for the card to avoid triggering it when the button is clicked
  const handleCardClick = () => {
    onSelect(recipe.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group relative">
      {/* Save Button positioned at the top-right corner */}
      <div className="absolute top-2 right-2 z-10">
        <SaveRecipeButton recipe={recipe} />
      </div>

      <div onClick={handleCardClick} className="cursor-pointer">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-48 object-cover bg-gray-200"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors pr-16">
            {recipe.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

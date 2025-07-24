import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCardGrid = ({ recipes, onSelectRecipe }) => {
  // Defensive Check: Ensure 'recipes' is a mappable array.
  // If it's not an array, or if it's null/undefined, it won't crash the app.
  if (!Array.isArray(recipes)) {
    // You can log an error to the console to help with debugging
    console.error(
      "RecipeCardGrid expected the 'recipes' prop to be an array, but received:",
      recipes
    );
    // Return null or a message so the app doesn't crash
    return (
      <p className="col-span-full text-center text-gray-500">
        Could not display recipes.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={onSelectRecipe}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No recipes found. Try adding some to your database!
        </p>
      )}
    </div>
  );
};

export default RecipeCardGrid;

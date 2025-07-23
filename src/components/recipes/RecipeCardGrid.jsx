import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCardGrid = ({ recipes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {recipes.length > 0 ? (
      recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
    ) : (
      <p className="col-span-full text-center text-gray-500">
        No recipes found. Try adjusting your search or filters.
      </p>
    )}
  </div>
);

export default RecipeCardGrid;

import React from "react";
import { useRecipeBox } from "../context/RecipeBoxContext";
import { mockRecipes } from "../data/mockData";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";

const RecipeBoxPage = ({ onSelectRecipe }) => {
  const { savedRecipeIds } = useRecipeBox();

  const savedRecipes = mockRecipes.filter((recipe) =>
    savedRecipeIds.includes(recipe.id)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Recipe Box</h2>
      {savedRecipes.length > 0 ? (
        <RecipeCardGrid
          recipes={savedRecipes}
          onSelectRecipe={onSelectRecipe}
        />
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">
            Your Recipe Box is Empty
          </h3>
          <p className="text-gray-500 mt-2">
            Click the "Save Recipe" button on any recipe to add it to your
            collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeBoxPage;

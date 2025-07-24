import React, { useState, useEffect } from "react";
import { fetchSavedRecipes } from "../services/api"; // Use our new api function
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";

const RecipeBoxPage = ({ onSelectRecipe }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetchSavedRecipes();
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch saved recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecipes();
  }, []); // The empty array ensures this runs only once on page load

  if (isLoading) {
    return <p className="text-center">Loading your recipe box...</p>;
  }

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

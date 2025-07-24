import React, { useState, useEffect } from "react";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";
import { fetchRecipes } from "../services/api"; // Use the api service

const DiscoverRecipesPage = ({ onSelectRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetchRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipes();
  }, []);

  if (isLoading) return <p className="text-center">Loading recipes...</p>;

  return (
    <div>
      {/* Search/Filter UI would go here */}
      <RecipeCardGrid recipes={recipes} onSelectRecipe={onSelectRecipe} />
    </div>
  );
};

export default DiscoverRecipesPage;

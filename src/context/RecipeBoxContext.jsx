import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const RecipeBoxContext = createContext();

export const useRecipeBox = () => {
  return useContext(RecipeBoxContext);
};

export const RecipeBoxProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await api.get("/api/saved-recipes");
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Could not fetch saved recipes", error);
      }
    };
    fetchSaved();
  }, []);

  const addRecipe = async (recipeToAdd) => {
    try {
      setSavedRecipes((prevRecipes) => [
        ...prevRecipes,
        {
          id: recipeToAdd.id,
          title: recipeToAdd.title,
          image_url: recipeToAdd.image_url,
        },
      ]); // Optimistic UI update
      await api.post("/api/saved-recipes", { recipeId: recipeToAdd.id });
    } catch (error) {
      console.error("Failed to save recipe", error);
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== recipeToAdd.id)
      ); // Revert on error
    }
  };

  const removeRecipe = async (idToRemove) => {
    try {
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== idToRemove)
      ); // Optimistic UI update
      await api.delete(`/api/saved-recipes/${idToRemove}`);
    } catch (error) {
      console.error("Failed to remove recipe", error);
      // Revert logic would be more complex, fetching the list again is simplest
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.some((r) => r.id === id);
  };

  const value = {
    savedRecipes,
    addRecipe,
    removeRecipe,
    isRecipeSaved, // Provide the new helper function
  };

  return (
    <RecipeBoxContext.Provider value={value}>
      {children}
    </RecipeBoxContext.Provider>
  );
};

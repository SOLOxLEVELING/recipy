import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchSavedRecipes, saveRecipeToBox, removeRecipeFromBox } from "../services/api";
import { useAuth } from "./AuthContext";

const RecipeBoxContext = createContext();

export const useRecipeBox = () => {
  return useContext(RecipeBoxContext);
};

export const RecipeBoxProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { user } = useAuth(); // Get user

  // Fetch saved recipes when user is logged in
  useEffect(() => {
    const fetchSaved = async () => {
      if (user) {
        try {
          const response = await fetchSavedRecipes();
          setSavedRecipes(response.data || []);
        } catch (error) {
          console.error("Could not fetch saved recipes", error);
        }
      } else {
        setSavedRecipes([]);
      }
    };

    fetchSaved();
  }, [user]);

  const addRecipe = async (recipeToAdd) => {
    try {
      // Optimistic update
      setSavedRecipes((prevRecipes) => [
        ...prevRecipes,
        {
          id: recipeToAdd.id,
          title: recipeToAdd.title,
          image_url: recipeToAdd.image_url,
        },
      ]);
      await saveRecipeToBox(recipeToAdd.id);
    } catch (error) {
      console.error("Failed to save recipe", error);
      // Revert on failure
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== recipeToAdd.id)
      );
    }
  };

  const removeRecipe = async (idToRemove) => {
    try {
      // Optimistic update
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== idToRemove)
      );
      await removeRecipeFromBox(idToRemove);
    } catch (error) {
      console.error("Failed to remove recipe", error);
      // Could revert here if needed, but less critical for removal
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.some((r) => r.id === id);
  };

  const value = {
    savedRecipes,
    addRecipe,
    removeRecipe,
    isRecipeSaved,
  };

  return (
    <RecipeBoxContext.Provider value={value}>
      {children}
    </RecipeBoxContext.Provider>
  );
};

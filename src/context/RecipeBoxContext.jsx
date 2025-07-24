import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api"; // Changed to use the default export from api.js
import { useAuth } from "./AuthContext"; // <-- 1. Import the useAuth hook

const RecipeBoxContext = createContext();

export const useRecipeBox = () => {
  return useContext(RecipeBoxContext);
};

export const RecipeBoxProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { token } = useAuth(); // <-- 2. Get the token directly from the AuthContext

  // This useEffect will now automatically re-run whenever a user logs in or out,
  // because its dependency 'token' comes from the AuthContext.
  useEffect(() => {
    const fetchSaved = async () => {
      // If the user is logged in (token exists), fetch their saved recipes.
      if (token) {
        try {
          const response = await api.get("/api/saved-recipes");
          setSavedRecipes(response.data);
        } catch (error) {
          console.error("Could not fetch saved recipes", error);
          if (error.response && error.response.status === 401) {
            console.error("Auth token is invalid or expired.");
          }
        }
      } else {
        // If the user logs out (token is null), clear the saved recipes from the state.
        setSavedRecipes([]);
      }
    };

    fetchSaved();
  }, [token]); // The dependency is the token from AuthContext

  const addRecipe = async (recipeToAdd) => {
    try {
      setSavedRecipes((prevRecipes) => [
        ...prevRecipes,
        {
          id: recipeToAdd.id,
          title: recipeToAdd.title,
          image_url: recipeToAdd.image_url,
        },
      ]);
      await api.post("/api/saved-recipes", { recipeId: recipeToAdd.id });
    } catch (error) {
      console.error("Failed to save recipe", error);
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== recipeToAdd.id)
      );
    }
  };

  const removeRecipe = async (idToRemove) => {
    try {
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r.id !== idToRemove)
      );
      await api.delete(`/api/saved-recipes/${idToRemove}`);
    } catch (error) {
      console.error("Failed to remove recipe", error);
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

import React, { createContext, useState, useEffect, useContext } from "react";

const RecipeBoxContext = createContext();

export const useRecipeBox = () => {
  return useContext(RecipeBoxContext);
};

export const RecipeBoxProvider = ({ children }) => {
  const [savedRecipeIds, setSavedRecipeIds] = useState(() => {
    try {
      const item = window.localStorage.getItem("recipeBox");
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("recipeBox", JSON.stringify(savedRecipeIds));
  }, [savedRecipeIds]);

  const addRecipe = (id) => {
    setSavedRecipeIds((prevIds) => [...prevIds, id]);
  };

  const removeRecipe = (id) => {
    setSavedRecipeIds((prevIds) =>
      prevIds.filter((recipeId) => recipeId !== id)
    );
  };

  const value = {
    savedRecipeIds,
    addRecipe,
    removeRecipe,
  };

  return (
    <RecipeBoxContext.Provider value={value}>
      {children}
    </RecipeBoxContext.Provider>
  );
};

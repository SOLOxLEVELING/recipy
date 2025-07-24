import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRecipeBox } from "../../context/RecipeBoxContext";

const SaveRecipeButton = ({ recipe }) => {
  // It must accept the full 'recipe' object
  const { isRecipeSaved, addRecipe, removeRecipe } = useRecipeBox();
  if (!recipe || !recipe.id) return null; // Safety check

  const isSaved = isRecipeSaved(recipe.id);

  const handleToggleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      removeRecipe(recipe.id);
    } else {
      addRecipe(recipe); // Pass the full recipe object to the context
    }
  };

  return (
    <button
      onClick={handleToggleSave}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors text-sm
                ${
                  isSaved
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
    >
      {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      {isSaved ? "Saved" : "Save Recipe"}
    </button>
  );
};

export default SaveRecipeButton;

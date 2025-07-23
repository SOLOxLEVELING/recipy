import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRecipeBox } from "../../context/RecipeBoxContext";

const SaveRecipeButton = ({ recipeId }) => {
  const { savedRecipeIds, addRecipe, removeRecipe } = useRecipeBox();
  const isSaved = savedRecipeIds.includes(recipeId);

  const handleToggleSave = (e) => {
    e.stopPropagation(); // Prevents card click when saving from grid view
    if (isSaved) {
      removeRecipe(recipeId);
    } else {
      addRecipe(recipeId);
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

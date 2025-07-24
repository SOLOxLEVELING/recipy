import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRecipeBox } from "../../context/RecipeBoxContext";
import { useAuth } from "../../context/AuthContext"; // <-- Import useAuth

const SaveRecipeButton = ({ recipe }) => {
  const { isAuthenticated } = useAuth(); // <-- Get user's login status
  const { isRecipeSaved, addRecipe, removeRecipe } = useRecipeBox();

  // If the user is not logged in, do not render the button
  if (!isAuthenticated) {
    return null;
  }

  if (!recipe || !recipe.id) return null;

  const isSaved = isRecipeSaved(recipe.id);

  const handleToggleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      removeRecipe(recipe.id);
    } else {
      addRecipe(recipe);
    }
  };

  return (
    <button
      onClick={handleToggleSave}
      className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold transition-colors text-sm
                ${
                  isSaved
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
    >
      {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

export default SaveRecipeButton;

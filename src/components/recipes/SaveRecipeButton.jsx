import React from "react";
import {Bookmark} from "lucide-react"; // Only need the one icon
import {useRecipeBox} from "../../context/RecipeBoxContext";
import {useAuth} from "../../context/AuthContext";

const SaveRecipeButton = ({recipe}) => {
    const {isAuthenticated} = useAuth();
    const {isRecipeSaved, addRecipe, removeRecipe} = useRecipeBox();

    // If the user is not logged in, do not render the button
    if (!isAuthenticated) {
        return null;
    }

    if (!recipe || !recipe.id) return null;

    const isSaved = isRecipeSaved(recipe.id);

    const handleToggleSave = (e) => {
        e.stopPropagation(); // Stop the click from bubbling up to the card
        if (isSaved) {
            removeRecipe(recipe.id);
        } else {
            addRecipe(recipe);
        }
    };

    return (
        <button
            onClick={handleToggleSave}
            className={`
        flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${
                isSaved
                    ? "bg-primary-600 text-white" // Solid green background when saved
                    : "bg-white/80 text-neutral-700 backdrop-blur-sm hover:bg-white" // Semi-transparent white
            }
      `}
            aria-label={isSaved ? "Remove from Recipe Box" : "Save to Recipe Box"}
        >
            <Bookmark
                size={20}
                // Use 'fill' to make the icon solid when saved
                fill={isSaved ? 'currentColor' : 'none'}
            />
        </button>
    );
};

export default SaveRecipeButton;
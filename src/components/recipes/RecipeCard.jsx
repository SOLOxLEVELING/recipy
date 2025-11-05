import React from "react";
import {Clock, Users} from "lucide-react";
import SaveRecipeButton from "./SaveRecipeButton";

const RecipeCard = ({recipe, onSelect}) => {
    const handleCardClick = () => {
        onSelect(recipe.id);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm overflow-hidden
                 transform transition-all duration-300
                 hover:shadow-lg hover:-translate-y-1 group"
        >
            <div className="relative">
                {/* Save Button positioned at the top-right corner */}
                <div className="absolute top-3 right-3 z-10">
                    <SaveRecipeButton recipe={recipe}/>
                </div>

                {/* Image */}
                <div onClick={handleCardClick} className="cursor-pointer">
                    <img
                        // --- CHANGE: Use 'image' from mockData, not 'image_url' ---
                        src={recipe.image}
                        alt={recipe.name} // --- CHANGE: Use 'name' for alt text ---
                        className="w-full h-auto aspect-video object-cover bg-neutral-200"
                    />
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4" onClick={handleCardClick}>
                <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-600 transition-colors font-serif">
                    {/* --- CHANGE: Use 'name' not 'title' --- */}
                    {recipe.name}
                </h3>

                {/* Recipe Meta Info */}
                <div className="flex items-center text-neutral-500 text-sm mt-3 gap-6">
                    {/* --- CHANGE: Use 'prepTime' not 'prep_time_minutes' --- */}
                    {recipe.prepTime && (
                        <div className="flex items-center gap-1.5">
                            <Clock size={16}/>
                            {/* --- CHANGE: Use 'prepTime' not 'prep_time_minutes' --- */}
                            <span>{recipe.prepTime} min</span>
                        </div>
                    )}
                    {recipe.servings && (
                        <div className="flex items-center gap-1.5">
                            <Users size={16}/>
                            <span>{recipe.servings} Servings</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
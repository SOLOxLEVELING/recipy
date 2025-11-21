import React from "react";
import {Clock, Users} from "lucide-react";
import SaveRecipeButton from "./SaveRecipeButton";
import { Link } from "react-router-dom";

const RecipeCard = ({recipe}) => {
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
                <Link to={`/recipe/${recipe.id}`} className="cursor-pointer block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-auto aspect-video object-cover bg-neutral-200"
                    />
                </Link>
            </div>

            {/* Card Content */}
            <div className="p-4">
                <Link to={`/recipe/${recipe.id}`} className="block focus:outline-none focus:underline">
                    <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-600 transition-colors font-serif">
                        {recipe.name}
                    </h3>
                </Link>

                {/* Recipe Meta Info */}
                <div className="flex items-center text-neutral-500 text-sm mt-3 gap-6">
                    {recipe.prepTime && (
                        <div className="flex items-center gap-1.5">
                            <Clock size={16}/>
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
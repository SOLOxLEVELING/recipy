import React from "react";
import { Clock, Users, Heart, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import SaveRecipeButton from "./SaveRecipeButton";
import { getOptimizedImageUrl } from "../../utils/imageUtils";

const RecipeCard = ({ recipe, onSelectRecipe }) => {
    const {
        id,
        title,
        image_url,
        prep_time_minutes,
        servings,
        average_rating,
    } = recipe;

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-neutral-100 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <Link to={`/recipe/${id}`} className="block w-full h-full">
                    <img
                        src={getOptimizedImageUrl(image_url)}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                <div className="absolute top-3 right-3 z-10">
                    <SaveRecipeButton recipe={recipe} />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/recipe/${id}`} className="group-hover:text-primary-600 transition-colors">
                        <h3 className="font-serif font-bold text-xl text-neutral-800 line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                    <div className="flex items-center bg-secondary-50 px-2 py-1 rounded-md">
                        <Heart size={14} className="text-primary-500 mr-1 fill-primary-500" />
                        <span className="text-xs font-bold text-neutral-700">
                            {average_rating ? Number(average_rating).toFixed(1) : "New"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 mt-auto pt-4 border-t border-neutral-100">
                    <div className="flex items-center">
                        <Clock size={16} className="mr-1.5 text-neutral-400" />
                        <span>{prep_time_minutes || 30}m</span>
                    </div>
                    <div className="flex items-center">
                        <Users size={16} className="mr-1.5 text-neutral-400" />
                        <span>{servings || 4} ppl</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
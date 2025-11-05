import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCardGrid = ({recipes, onSelectRecipe}) => {
    if (!Array.isArray(recipes)) {
        console.error(
            "RecipeCardGrid expected the 'recipes' prop to be an array, but received:",
            recipes
        );
        return (
            <p className="col-span-full text-center text-neutral-500">
                Could not display recipes.
            </p>
        );
    }

    return (
        // Updated gap-8 for more breathing room
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onSelect={onSelectRecipe}
                    />
                ))
            ) : (
                <p className="col-span-full text-center text-neutral-500">
                    No recipes found.
                </p>
            )}
        </div>
    );
};

export default RecipeCardGrid;
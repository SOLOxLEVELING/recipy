import React, {useMemo, useState} from "react";
import {Check, Users} from "lucide-react";

// NOTE: This component's props have changed.
// It now takes the *original* ingredients and the base servings.
const IngredientChecklist = ({ingredients, baseServings}) => {
    const [desiredServings, setDesiredServings] = useState(baseServings || 1);

    const scaledIngredients = useMemo(() => {
        if (!Array.isArray(ingredients)) return [];

        // If base data is missing, just return names
        if (!baseServings || !desiredServings || desiredServings <= 0) {
            return ingredients.map((ing) => ({
                id: ing.id || ing.name,
                text: `${ing.quantity || ""} ${ing.unit || ""} ${ing.name}`.trim(),
            }));
        }

        const scalingFactor = desiredServings / baseServings;
        return ingredients.map((ing) => {
            let text;
            if (ing.quantity) {
                // Simple scaling, rounded to 2 decimal places
                const scaled = Number(
                    (parseFloat(ing.quantity) * scalingFactor).toFixed(2)
                );
                // Remove trailing .00 if it exists
                const formattedScaled = scaled.toString().replace(/\.00$/, '');
                text = `${formattedScaled} ${ing.unit || ""} ${ing.name}`.trim();
            } else {
                text = ing.name; // No quantity to scale
            }
            return {id: ing.id || ing.name, text};
        });
    }, [ingredients, baseServings, desiredServings]);

    return (
        // Use the theme's neutral colors for a softer, warmer feel
        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 sticky top-8">
            {/* Servings Adjuster */}
            <div className="mb-6">
                <label
                    htmlFor="servings"
                    className="flex items-center text-xl font-bold text-neutral-800 mb-3"
                >
                    <Users className="mr-2 text-primary-600" size={24}/>
                    Ingredients
                </label>
                <div className="flex items-center gap-3">
                    <span className="text-neutral-600 font-medium">Servings:</span>
                    <input
                        type="number"
                        id="servings"
                        min="1"
                        value={desiredServings}
                        onChange={(e) => setDesiredServings(Number(e.target.value))}
                        className="w-20 p-2 border border-neutral-300 rounded-md text-center font-semibold"
                    />
                </div>
            </div>

            {/* Ingredient List */}
            <ul className="space-y-4">
                {scaledIngredients.map((ingredient, index) => (
                    <li key={index}>
                        <label className="flex items-center text-lg text-neutral-700 cursor-pointer group">
                            {/* This is a custom-styled checkbox */}
                            <input type="checkbox" className="sr-only peer"/>
                            <span
                                className="flex items-center justify-center h-6 w-6 mr-3
                           border-2 border-neutral-300 rounded
                           peer-checked:bg-primary-600 peer-checked:border-primary-600
                           transition-colors duration-200
                           group-hover:border-primary-500"
                            >
                <Check className="hidden h-4 w-4 text-white peer-checked:block"/>
              </span>
                            <span className="peer-checked:line-through peer-checked:text-neutral-400">
                {ingredient.text}
              </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientChecklist;
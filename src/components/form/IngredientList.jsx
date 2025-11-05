import React from "react";
import IngredientInput from "./IngredientInput";
import {Plus} from "lucide-react";

const IngredientList = ({
                            ingredients,
                            handleIngredientChange,
                            addIngredient,
                            removeIngredient,
                        }) => (
    <div>
        <h3 className="text-lg font-semibold text-neutral-700 mb-3">
            Ingredients
        </h3>
        <div className="space-y-2">
            {ingredients.map((ing, index) => (
                <IngredientInput
                    key={index}
                    index={index}
                    ingredient={ing}
                    handleIngredientChange={handleIngredientChange}
                    removeIngredient={removeIngredient}
                />
            ))}
        </div>
        <button
            type="button"
            onClick={addIngredient}
            className="mt-3 flex items-center gap-2 px-4 py-2
                 bg-primary-50 text-primary-600 font-semibold rounded-full
                 hover:bg-primary-100 transition-colors"
        >
            <Plus size={18}/>
            Add Ingredient
        </button>
    </div>
);

export default IngredientList;
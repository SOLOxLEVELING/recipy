// File: src/components/IngredientList.jsx
import React from "react";
import IngredientInput from "./IngredientInput";

const IngredientList = ({
  ingredients,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
}) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h3>
    {ingredients.map((ing, index) => (
      <IngredientInput
        key={index}
        index={index}
        ingredient={ing}
        handleIngredientChange={handleIngredientChange}
        removeIngredient={removeIngredient}
      />
    ))}
    <button
      type="button"
      onClick={addIngredient}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
    >
      + Add Ingredient
    </button>
  </div>
);

export default IngredientList;

// File: src/components/IngredientInput.jsx
import React from 'react';

const IngredientInput = ({ ingredient, index, handleIngredientChange, removeIngredient }) => (
  <div className="flex items-center space-x-2 mb-2">
    <input
      type="text"
      name="name"
      placeholder="e.g., All-Purpose Flour"
      value={ingredient.name}
      onChange={(e) => handleIngredientChange(index, e)}
      className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
    <input
      type="text"
      name="quantity"
      placeholder="e.g., 2 cups"
      value={ingredient.quantity}
      onChange={(e) => handleIngredientChange(index, e)}
      className="w-1/4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
    <button
      type="button"
      onClick={() => removeIngredient(index)}
      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
    >
      Remove
    </button>
  </div>
);

export default IngredientInput;
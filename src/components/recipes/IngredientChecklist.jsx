import React from "react";
import { CheckSquare, Square } from "lucide-react";

const IngredientChecklist = ({ ingredients }) => (
  <div className="bg-green-50 p-6 rounded-lg">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h3>
    <ul className="space-y-3">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="flex items-center">
          <label className="flex items-center text-lg text-gray-700 cursor-pointer group">
            <input type="checkbox" className="sr-only peer" />
            <Square className="inline-block mr-3 text-gray-400 group-hover:text-green-600 peer-checked:hidden" />
            <CheckSquare className="hidden mr-3 text-green-600 peer-checked:inline-block" />
            <span className="peer-checked:line-through peer-checked:text-gray-500">
              {ingredient}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientChecklist;

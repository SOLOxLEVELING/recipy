import React from "react";
import {X} from "lucide-react";

// A small, reusable styled input
const FormInput = ({className, ...props}) => (
    <input
        {...props}
        className={`w-full p-2.5 border border-neutral-300 rounded-md 
                focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                ${className}`}
    />
);

const IngredientInput = ({
                             ingredient,
                             index,
                             handleIngredientChange,
                             removeIngredient,
                         }) => (
    <div
        className="flex flex-col md:flex-row items-center gap-2 mb-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
        {/* Responsive fields */}
        <div className="w-full md:w-1/2">
            <label className="text-xs font-medium text-neutral-500 md:sr-only">Quantity</label>
            <FormInput
                type="text"
                name="quantity"
                placeholder="e.g., 2"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
            />
        </div>
        <div className="w-full md:w-1/4">
            <label className="text-xs font-medium text-neutral-500 md:sr-only">Unit</label>
            <FormInput
                type="text"
                name="unit"
                placeholder="e.g., cups"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
            />
        </div>
        <div className="w-full">
            <label className="text-xs font-medium text-neutral-500 md:sr-only">Name</label>
            <FormInput
                type="text"
                name="name"
                placeholder="e.g., All-Purpose Flour"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
            />
        </div>

        {/* Remove Button */}
        <button
            type="button"
            onClick={() => removeIngredient(index)}
            className="w-full md:w-auto p-2.5 bg-red-500 text-white rounded-md
                 hover:bg-red-600 transition-colors flex-shrink-0
                 flex items-center justify-center gap-1"
        >
            <X size={16}/>
            <span className="md:hidden">Remove</span>
        </button>
    </div>
);

export default IngredientInput;
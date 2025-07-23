// File: src/components/RecipeForm.jsx
import React, { useState } from "react";
import IngredientList from "./IngredientList";
import InstructionStep from "./InstructionStep";

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState([""]);
  const [image, setImage] = useState(null);

  const handleIngredientChange = (index, event) => {
    const newIngredients = ingredients.map((ing, i) =>
      index === i ? { ...ing, [event.target.name]: event.target.value } : ing
    );
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index, event) => {
    const newInstructions = instructions.map((step, i) =>
      index === i ? event.target.value : step
    );
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      name: recipeName,
      prepTime,
      cookTime,
      ingredients,
      instructions,
      image,
    };
    console.log("Submitting Recipe Data:", recipeData);
    alert("Recipe submitted! Check the console for the data.");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Create a New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="recipeName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="prepTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prep Time (minutes)
            </label>
            <input
              type="number"
              id="prepTime"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="cookTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cook Time (minutes)
            </label>
            <input
              type="number"
              id="cookTime"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <IngredientList
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Instructions
          </h3>
          {instructions.map((step, index) => (
            <InstructionStep
              key={index}
              index={index}
              step={step}
              handleInstructionChange={handleInstructionChange}
              removeInstruction={removeInstruction}
            />
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            + Add Step
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {image ? (
                <img
                  src={image}
                  alt="Recipe preview"
                  className="mx-auto h-48 w-auto rounded-md"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;

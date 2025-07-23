import React, { useState } from "react";
import IngredientList from "../components/form/IngredientList";
import InstructionStep from "../components/form/InstructionStep";
import ImageUploader from "../components/form/ImageUploader";

const CreateRecipePage = () => {
  const [recipeName, setRecipeName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState([""]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleIngredientChange = (index, event) =>
    setIngredients(
      ingredients.map((ing, i) =>
        i === index ? { ...ing, [event.target.name]: event.target.value } : ing
      )
    );
  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleInstructionChange = (index, event) =>
    setInstructions(
      instructions.map((step, i) => (i === index ? event.target.value : step))
    );
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: recipeName,
      prepTime,
      cookTime,
      ingredients,
      instructions,
      image,
    };
    console.log("Submitting Recipe Data:", formData);
    alert("Recipe submitted! Check the console for the form data object.");
    // In a real app, you would send this data to your API
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
        <ImageUploader
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
        />
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

export default CreateRecipePage;

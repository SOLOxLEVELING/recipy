import React, { useState } from "react";
import { postRecipe } from "../services/api"; // Import the API function
import IngredientList from "../components/form/IngredientList";
import InstructionStep from "../components/form/InstructionStep";
import ImageUploader from "../components/form/ImageUploader";

const CreateRecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([""]);
  // Image handling can be complex; we will send a placeholder URL for now.

  const handleIngredientChange = (index, event) => {
    const newIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, [event.target.name]: event.target.value } : ing
    );
    setIngredients(newIngredients);
  };
  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleInstructionChange = (index, event) => {
    setInstructions(
      instructions.map((step, i) => (i === index ? event.target.value : step))
    );
  };
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the data to match the database schema
    const payload = {
      title,
      description,
      prep_time_minutes: parseInt(prepTime, 10),
      cook_time_minutes: parseInt(cookTime, 10),
      servings: parseInt(servings, 10),
      image_url: "https://placehold.co/600x400/cccccc/ffffff?text=New+Recipe", // Placeholder
      ingredients: ingredients.map((ing) => ({
        ...ing,
        quantity: parseFloat(ing.quantity),
      })),
      instructions: instructions.map((desc, index) => ({
        step_number: index + 1,
        description: desc,
      })),
    };

    try {
      await postRecipe(payload);
      alert("Recipe created successfully!");
      // Optionally, redirect the user or clear the form
    } catch (error) {
      console.error("Failed to create recipe:", error);
      alert("Error: Could not create recipe.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Create a New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields for title, description, servings, etc. would go here */}
        {/* Example for Title: */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <IngredientList
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />

        <div>
          <h3 className="text-lg font-semibold">Instructions</h3>
          {instructions.map((step, index) => (
            <InstructionStep
              key={index}
              index={index}
              step={step}
              handleInstructionChange={handleInstructionChange}
              removeInstruction={removeInstruction}
            />
          ))}
          <button type="button" onClick={addInstruction}>
            + Add Step
          </button>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipePage;

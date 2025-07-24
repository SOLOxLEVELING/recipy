// src/pages/RecipeDetailPage.jsx (Corrected)
import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, Sun, Moon, Users } from "lucide-react";
import IngredientChecklist from "../components/recipes/IngredientChecklist";
import InstructionList from "../components/recipes/InstructionList";
import RatingStars from "../components/reviews/RatingStars";
import CommentThread from "../components/reviews/CommentThread";
import SaveRecipeButton from "../components/recipes/SaveRecipeButton";
import { fetchRecipeById } from "../services/api";

const RecipeDetailPage = ({ recipeId, onBack }) => {
  // Correctly accepts recipeId
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;

    const getRecipe = async () => {
      setIsLoading(true);
      try {
        const response = await fetchRecipeById(recipeId);
        setRecipe(response.data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecipe();
  }, [recipeId]);

  if (isLoading) return <p className="text-center">Loading recipe...</p>;
  if (!recipe) return <p className="text-center">Recipe not found.</p>;

  // The rest of the component logic can now safely use the `recipe` object.
  // We can define the other states here, now that we know `recipe` exists.
  return <RecipeDetailContent recipe={recipe} onBack={onBack} />;
};

// We move the main component logic into a sub-component to keep it clean
// This component only renders when `recipe` is guaranteed to exist.
const RecipeDetailContent = ({ recipe, onBack }) => {
  const [desiredServings, setDesiredServings] = useState(recipe.servings);
  const [isCookMode, setIsCookMode] = useState(false);
  // ... other states like comments, ratings, etc. can be managed here.

  const scaledIngredients = useMemo(() => {
    if (
      !recipe.servings ||
      !desiredServings ||
      desiredServings <= 0 ||
      desiredServings === recipe.servings
    ) {
      return recipe.ingredients.map((ing) =>
        `${ing.quantity || ""} ${ing.unit || ""} ${ing.name}`.trim()
      );
    }
    const scalingFactor = desiredServings / recipe.servings;
    return recipe.ingredients.map((ing) => {
      if (ing.quantity) {
        const scaled = Number((ing.quantity * scalingFactor).toFixed(2));
        return `${scaled} ${ing.unit || ""} ${ing.name}`.trim();
      }
      return ing.name;
    });
  }, [recipe.ingredients, recipe.servings, desiredServings]);

  // ... The rest of the original JSX for the detail page goes here.
  return (
    <div className="max-w-5xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-lg">
      {/* Header with title, save button, etc. */}
      <header className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-green-600 hover:text-green-800 font-semibold mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Discover
        </button>
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-64 sm:h-96 object-cover rounded-lg mb-4"
        />
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {recipe.title}
            </h1>
            <p className="text-lg text-gray-600 mt-1">By {recipe.author}</p>
          </div>
          <div className="flex items-center gap-4">
            <SaveRecipeButton recipeId={recipe.id} />
            {/* Cook Mode Button Here */}
          </div>
        </div>
      </header>

      {/* Main content with scaler and ingredient list */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {/* Servings Scaler UI */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <label
              htmlFor="servings"
              className="flex items-center text-lg font-bold text-gray-800 mb-2"
            >
              <Users className="mr-2" size={24} /> Servings
            </label>
            <input
              type="number"
              id="servings"
              min="1"
              value={desiredServings}
              onChange={(e) => setDesiredServings(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <IngredientChecklist ingredients={scaledIngredients} />
        </div>
        <div className="lg:col-span-2">
          <InstructionList
            instructions={recipe.instructions.map((inst) => inst.description)}
          />
        </div>
      </main>
      {/* ... Ratings and Comments Section ... */}
    </div>
  );
};

export default RecipeDetailPage;

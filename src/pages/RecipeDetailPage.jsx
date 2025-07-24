import React, { useState, useEffect, useMemo, useRef } from "react";
import { ArrowLeft, Sun, Moon, Users } from "lucide-react";
import IngredientChecklist from "../components/recipes/IngredientChecklist";
import InstructionList from "../components/recipes/InstructionList";
import RatingStars from "../components/reviews/RatingStars";
import CommentThread from "../components/reviews/CommentThread";
import SaveRecipeButton from "../components/recipes/SaveRecipeButton";
import { fetchRecipeById } from "../services/api";

const RecipeDetailPage = ({ recipeId, onBack }) => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) {
      setIsLoading(false);
      return;
    }
    const getRecipe = async () => {
      setIsLoading(true);
      try {
        const response = await fetchRecipeById(recipeId);
        setRecipe(response.data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipe();
  }, [recipeId]);

  if (isLoading) return <p className="text-center">Loading recipe...</p>;
  if (!recipe)
    return <p className="text-center">Recipe could not be loaded.</p>;

  return <RecipeDetailContent recipe={recipe} onBack={onBack} />;
};

// Sub-component to keep logic clean and ensure 'recipe' object exists
const RecipeDetailContent = ({ recipe, onBack }) => {
  const [desiredServings, setDesiredServings] = useState(recipe.servings || 1);
  const [isCookMode, setIsCookMode] = useState(false);
  const wakeLockRef = useRef(null);

  // State for ratings and comments, initialized from the fetched recipe
  const [ratings, setRatings] = useState(recipe.ratings || []);
  const [comments, setComments] = useState(recipe.comments || []);

  // Effect for Cook Mode screen wake lock
  useEffect(() => {
    const acquireWakeLock = async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        } catch (err) {
          console.error(err);
        }
      }
    };
    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
    if (isCookMode) acquireWakeLock();
    return () => {
      releaseWakeLock();
    };
  }, [isCookMode]);

  const averageRating = useMemo(() => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.score, 0);
    return sum / ratings.length;
  }, [ratings]);

  const scaledIngredients = useMemo(() => {
    if (!Array.isArray(recipe.ingredients)) return [];
    if (!recipe.servings || !desiredServings || desiredServings <= 0) {
      return recipe.ingredients.map((ing) =>
        `${ing.quantity || ""} ${ing.unit || ""} ${ing.name}`.trim()
      );
    }
    const scalingFactor = desiredServings / recipe.servings;
    return recipe.ingredients.map((ing) => {
      if (ing.quantity) {
        const scaled = Number(
          (parseFloat(ing.quantity) * scalingFactor).toFixed(2)
        );
        return `${scaled} ${ing.unit || ""} ${ing.name}`.trim();
      }
      return ing.name;
    });
  }, [recipe.ingredients, recipe.servings, desiredServings]);

  return (
    <div className="max-w-5xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-lg">
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
            <div className="flex items-center mt-2 gap-2 text-gray-500">
              <RatingStars initialRating={averageRating} />
              <span className="text-sm">({ratings.length} reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0 mt-2">
            {/* ✅ CORRECTED: Pass the entire recipe object to the button */}
            <SaveRecipeButton recipe={recipe} />
            <button
              onClick={() => setIsCookMode(!isCookMode)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold transition-colors text-sm ${
                isCookMode
                  ? "bg-yellow-400 text-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isCookMode ? <Moon size={20} /> : <Sun size={20} />}
              <span>Cook Mode</span>
            </button>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
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
            instructions={
              Array.isArray(recipe.instructions)
                ? recipe.instructions.map((inst) => inst.description)
                : []
            }
          />
        </div>
      </main>

      <section className="mt-10 col-span-1 lg:col-span-3">
        <CommentThread
          comments={comments}
          onAddComment={(commentText) =>
            console.log("New comment:", commentText)
          }
        />
      </section>
    </div>
  );
};

export default RecipeDetailPage;

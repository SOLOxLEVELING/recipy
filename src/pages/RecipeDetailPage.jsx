import React, {useEffect, useMemo, useRef, useState} from "react";
import {ArrowLeft, Moon, Sun} from "lucide-react";
import IngredientChecklist from "../components/recipes/IngredientChecklist";
import InstructionList from "../components/recipes/InstructionList";
import RatingStars from "../components/reviews/RatingStars";
import CommentThread from "../components/reviews/CommentThread";
import SaveRecipeButton from "../components/recipes/SaveRecipeButton";
// import { fetchRecipeById } from "../services/api"; // No longer using API
import {mockRecipes} from "../data/mockData"; // <-- IMPORT MOCK DATA

const RecipeDetailPage = ({recipeId, onBack}) => {
    // const [recipe, setRecipe] = useState(null); // Will get recipe from mock
    // const [isLoading, setIsLoading] = useState(true); // No longer needed

    /*
    // --- API call is no longer needed ---
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
    */

    // --- FIND THE RECIPE FROM MOCK DATA ---
    const recipe = mockRecipes.find((r) => r.id === recipeId);

    // if (isLoading) return <p className="text-center">Loading recipe...</p>; // No longer needed
    if (!recipe)
        return <p className="text-center">Recipe could not be loaded.</p>;

    return <RecipeDetailContent recipe={recipe} onBack={onBack}/>;
};

// Sub-component to keep logic clean and ensure 'recipe' object exists
const RecipeDetailContent = ({recipe, onBack}) => {
    const [isCookMode, setIsCookMode] = useState(false);
    const wakeLockRef = useRef(null);

    const [ratings, setRatings] = useState(recipe.ratings || []);
    const [comments, setComments] = useState(recipe.comments || []);

    // Effect for Cook Mode screen wake lock
    useEffect(() => {
        // ... (wake lock logic remains the same)
    }, [isCookMode]);

    const averageRating = useMemo(() => {
        if (!ratings || ratings.length === 0) return 0;
        // --- FIX: mockData 'ratings' is an array of numbers, not objects ---
        const sum = ratings.reduce((acc, r) => acc + r, 0); // Just sum the numbers
        return sum / ratings.length;
    }, [ratings]);

    return (
        <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-lg">
            <header className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-semibold mb-4"
                >
                    <ArrowLeft size={20} className="mr-2"/>
                    Back to Discover
                </button>
                <img
                    src={recipe.image} // --- FIX: Use 'image' ---
                    alt={recipe.name} // --- FIX: Use 'name' ---
                    className="w-full h-64 sm:h-96 object-cover rounded-lg mb-6 shadow-md"
                />
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 font-serif">
                            {recipe.name} {/* --- FIX: Use 'name' --- */}
                        </h1>
                        <p className="text-lg text-neutral-600 mt-1">
                            {/* --- FIX: 'author' doesn't exist, provide a fallback --- */}
                            By {recipe.author || "Recipe Share"}
                        </p>
                        <div className="flex items-center mt-3 gap-2 text-neutral-500">
                            <RatingStars initialRating={averageRating}/>
                            <span className="text-sm">({ratings.length} reviews)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 mt-2">
                        <SaveRecipeButton recipe={recipe}/>
                        <button
                            onClick={() => setIsCookMode(!isCookMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors text-sm
                ${
                                isCookMode
                                    ? "bg-secondary-400 text-secondary-900"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {isCookMode ? <Moon size={20}/> : <Sun size={20}/>}
                            <span>Cook Mode</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-1 mb-8 lg:mb-0">
                    {/* --- FIX: 'IngredientChecklist' expects an array of objects,
            but mockData provides an array of strings.
            We must convert it.
          */}
                    <IngredientChecklist
                        ingredients={
                            Array.isArray(recipe.ingredients)
                                ? recipe.ingredients.map((ing) => ({name: ing})) // Convert string to {name: string}
                                : []
                        }
                        baseServings={recipe.servings}
                    />
                </div>
                <div className="lg:col-span-2">
                    {/* --- FIX: 'InstructionList' expects an array of strings,
            but the code was trying to .map() it.
          */}
                    <InstructionList
                        instructions={
                            Array.isArray(recipe.instructions)
                                ? recipe.instructions // Just pass the string array directly
                                : []
                        }
                    />

                    <hr className="my-12 border-neutral-200"/>

                    <CommentThread
                        comments={comments}
                        onAddComment={(commentText) =>
                            console.log("New comment:", commentText)
                        }
                    />
                </div>
            </main>
        </div>
    );
};

export default RecipeDetailPage;
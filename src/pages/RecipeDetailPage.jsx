import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import IngredientChecklist from "../components/recipes/IngredientChecklist";
import InstructionList from "../components/recipes/InstructionList";
import RatingStars from "../components/reviews/RatingStars";
import CommentThread from "../components/reviews/CommentThread";

const RecipeDetailPage = ({ recipe, onBack }) => {
  // Guard clause: If there's no recipe, exit early. This is the most important check.
  if (!recipe) {
    return (
      <p className="text-center text-gray-500">
        Recipe not found. Please go back and select a recipe.
      </p>
    );
  }

  const [isCookMode, setIsCookMode] = useState(false);
  const wakeLockRef = useRef(null);

  // State is now initialized safely with the recipe's data
  const [ratings, setRatings] = useState(recipe.ratings || []);
  const [comments, setComments] = useState(recipe.comments || []);

  // This effect ensures the component updates if a different recipe is selected without a full page reload
  useEffect(() => {
    setRatings(recipe.ratings || []);
    setComments(recipe.comments || []);
  }, [recipe]);

  const averageRating = useMemo(() => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  const handleAddRating = (newRating) => {
    setRatings([...ratings, newRating]);
    console.log(`New rating submitted for ${recipe.name}: ${newRating}`);
    alert("Thanks for your rating!");
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      user: "GuestChef",
      date: new Date().toISOString(),
      text: commentText,
    };
    setComments([newComment, ...comments]);
    console.log(`New comment for ${recipe.name}:`, newComment);
  };

  useEffect(() => {
    // ... (wake lock logic remains the same)
    const acquireWakeLock = async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        } catch (err) {
          console.error(`${err.name}, ${err.message}`);
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
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 sm:h-96 object-cover rounded-lg mb-4"
        />
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {recipe.name}
            </h1>
            <div className="flex items-center mt-2 gap-2 text-gray-500">
              <RatingStars initialRating={averageRating} />
              <span className="text-sm">({ratings.length} reviews)</span>
            </div>
          </div>
          <button
            onClick={() => setIsCookMode(!isCookMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
              isCookMode
                ? "bg-yellow-400 text-gray-800"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isCookMode ? <Moon size={20} /> : <Sun size={20} />}
            {isCookMode ? "Cook Mode: ON" : "Cook Mode: OFF"}
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <IngredientChecklist ingredients={recipe.ingredients} />
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Rate this recipe!</h4>
            <RatingStars onRate={handleAddRating} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <InstructionList instructions={recipe.instructions} />
        </div>
      </main>

      <section className="col-span-1 lg:col-span-3">
        <CommentThread comments={comments} onAddComment={handleAddComment} />
      </section>
    </div>
  );
};

export default RecipeDetailPage;

import React, { useState, useEffect } from "react";
import { fetchMyRecipes, deleteRecipe } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Edit, Trash2, Plus, Clock, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton, { RecipeCardSkeleton } from "../components/ui/Skeleton";
import toast from "react-hot-toast";

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchMyRecipes();
        setRecipes(response.data || []);
      } catch (error) {
        console.error("Failed to fetch my recipes", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadRecipes();
    }
  }, [user]);

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-white shadow-xl rounded-2xl pointer-events-auto border border-neutral-100 overflow-hidden`}
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-red-50 p-2 rounded-full">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-neutral-900 font-serif">
                Delete Recipe?
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2 bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmDelete(id);
              }}
              className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors shadow-sm shadow-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const confirmDelete = async (id) => {
    const toastId = toast.loading("Deleting recipe...");
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter(r => r.id !== id));
      toast.success("Recipe deleted successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to delete recipe", error);
      toast.error("Failed to delete recipe", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 font-serif">My Recipes</h1>
          <p className="text-neutral-500 mt-1">Manage your culinary creations</p>
        </div>
        <Link
          to="/create"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} />
          Create New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 border-dashed">
          <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">No recipes yet</h3>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            You haven't created any recipes yet. Share your first culinary masterpiece with the world!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} />
            Create Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image_url || "https://placehold.co/600x400"}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link
                    to={`/edit/${recipe.id}`}
                    className="p-2 bg-white/90 backdrop-blur-sm text-neutral-700 rounded-full hover:bg-white hover:text-primary-600 transition-colors shadow-sm"
                  >
                    <Edit size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(recipe.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm text-neutral-700 rounded-full hover:bg-white hover:text-red-600 transition-colors shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <Link to={`/recipe/${recipe.id}`}>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2 hover:text-primary-600 transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                </Link>
                <p className="text-neutral-500 text-sm line-clamp-2 mb-4">
                  {recipe.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{recipe.prep_time_minutes + recipe.cook_time_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat size={14} />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;

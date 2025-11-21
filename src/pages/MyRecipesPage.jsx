import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Edit, Trash2, Plus, Clock, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton, { RecipeCardSkeleton } from "../components/ui/Skeleton";

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/recipes/my-recipes/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch my recipes", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyRecipes();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-5 w-96" />
            </div>
             <Skeleton className="h-12 w-48 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-2">
            My Recipes
          </h1>
          <p className="text-neutral-600">
            Manage your culinary creations and share them with the world.
          </p>
        </div>
        <Link
          to="/create"
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
        >
          <Plus size={20} />
          <span>Create New Recipe</span>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-neutral-100">
          <div className="bg-secondary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat size={40} className="text-primary-600" />
          </div>
          <h3 className="text-2xl font-serif font-semibold text-neutral-900 mb-3">
            No recipes yet
          </h3>
          <p className="text-neutral-500 mb-8 max-w-md mx-auto">
            You haven't created any recipes yet. Start your journey by adding your
            first masterpiece!
          </p>
          <Link
            to="/create"
            className="text-primary-600 font-medium hover:text-primary-700 underline decoration-2 underline-offset-4"
          >
            Create your first recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-neutral-100 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={recipe.image_url || "https://placehold.co/600x400"}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2 w-full">
                    <Link
                      to={`/edit/${recipe.id}`}
                      className="flex-1 bg-white/90 backdrop-blur-sm text-neutral-900 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit size={16} /> Edit
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2 line-clamp-1">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                   {recipe.average_rating && (
                       <div className="flex items-center gap-1 text-secondary-500">
                           <span>★</span>
                           <span>{Number(recipe.average_rating).toFixed(1)}</span>
                       </div>
                   )}
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

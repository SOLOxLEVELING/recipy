import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

console.log("API base URL is:", import.meta.env.VITE_API_BASE_URL);

export const fetchRecipes = () => api.get("/api/recipes");
export const fetchRecipeById = (id) => api.get(`/api/recipes/${id}`);
export const postRecipe = (recipeData) => api.post("/api/recipes", recipeData);
export const fetchSavedRecipes = () => api.get("/api/saved-recipes");

// Add other API functions here (ratings, user collections, etc.)

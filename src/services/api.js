// src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
});

// This automatically adds the auth token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchRecipes = (params) => api.get("/api/recipes", { params });
export const fetchCategories = () => api.get("/api/recipes/categories");
export const fetchRecipeById = (id) => api.get(`/api/recipes/${id}`);
export const postRecipe = (recipeData) => api.post("/api/recipes", recipeData);
export const fetchSavedRecipes = () => api.get("/api/saved-recipes");
export const fetchUserProfile = () => api.get("/api/auth/me");
export const updateUserProfile = (data) => api.put("/api/auth/me", data);
export const fetchMyRecipes = () => api.get("/api/recipes/my-recipes/all");

// We no longer need specific login/register functions here as the AuthContext handles them.
export default api;

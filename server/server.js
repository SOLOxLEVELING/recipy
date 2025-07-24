// server.js (Corrected)
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const queries = require("./queries");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- RECIPE ROUTES ---
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await queries.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await queries.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

app.post("/api/recipes", async (req, res) => {
  const recipeData = { ...req.body, author_id: 1 };
  try {
    const newRecipe = await queries.createRecipe(recipeData);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to create recipe" });
  }
});

// --- RECIPE BOX ROUTES ---
// This is now the ONLY route for GET /api/saved-recipes
app.get("/api/saved-recipes", async (req, res) => {
  try {
    const savedRecipes = await queries.getSavedRecipes(1);
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
});

app.post("/api/saved-recipes", async (req, res) => {
  const { recipeId } = req.body;
  try {
    const savedRecipe = await queries.saveRecipeToBox(1, recipeId);
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

app.delete("/api/saved-recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    await queries.removeRecipeFromBox(1, recipeId);
    res.status(200).json({ message: "Recipe removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove recipe" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

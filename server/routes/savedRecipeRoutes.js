const express = require("express");
const router = express.Router();
const queries = require("../queries");

// All routes in this file are protected by the authMiddleware in server.js

router.get("/", async (req, res) => {
  try {
    const savedRecipes = await queries.getSavedRecipes(req.user.id);
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
});

router.post("/", async (req, res) => {
  const { recipeId } = req.body;
  try {
    const savedRecipe = await queries.saveRecipeToBox(req.user.id, recipeId);
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

router.delete("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    await queries.removeRecipeFromBox(req.user.id, recipeId);
    res.status(200).json({ message: "Recipe removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove recipe" });
  }
});

module.exports = router;

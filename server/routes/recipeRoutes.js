const express = require('express');
const router = express.Router();
const queries = require('../queries');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.get("/", async (req, res) => {
    try {
        const recipes = await queries.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const recipe = await queries.getRecipeById(req.params.id);
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipe" });
    }
});

// Protected Route
router.post("/", authMiddleware, async (req, res) => {
    const recipeData = { ...req.body, author_id: req.user.id };
    try {
        const newRecipe = await queries.createRecipe(recipeData);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: "Failed to create recipe" });
    }
});

module.exports = router;
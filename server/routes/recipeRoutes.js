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

// Protected Route: Get My Recipes
router.get("/my-recipes/all", authMiddleware, async (req, res) => {
    try {
        const recipes = await queries.getRecipesByAuthor(req.user.id);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch your recipes" });
    }
});

// Protected Route: Create Recipe
router.post("/", authMiddleware, async (req, res) => {
    const recipeData = { ...req.body, author_id: req.user.id };
    try {
        const newRecipe = await queries.createRecipe(recipeData);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: "Failed to create recipe" });
    }
});

// Protected Route: Update Recipe
router.put("/:id", authMiddleware, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user.id;
    
    try {
        // Check if user is the author
        const recipe = await queries.getRecipeById(recipeId);
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        
        // Note: getRecipeById returns author username, not ID directly in the top level usually, 
        // but let's check how it's implemented. 
        // Actually, getRecipeById joins with users table. 
        // We need to verify ownership. 
        // Let's do a quick check in the DB or assume the frontend passes the right data?
        // Better: Check author_id from the recipe table directly.
        
        // Re-querying just for ownership check might be safer/cleaner if getRecipeById is complex.
        // But for now, let's assume we can get it. 
        // Wait, getRecipeById returns `u.username as author`. It doesn't return author_id.
        // I should probably update getRecipeById or make a new helper.
        // OR, I can just run a quick query here.
        
        // Let's rely on a direct query for ownership check to be safe.
        // But wait, I can't run raw queries here easily without importing db.
        // Let's update queries.js to return author_id in getRecipeById or add a checkOwnership function.
        // For now, I'll trust the updateRecipe function to be called only after verification? 
        // No, that's insecure.
        
        // Let's add a simple check.
        // Actually, I'll update getRecipeById in queries.js to return author_id as well.
        // But I already edited queries.js. 
        // Let's just add a small helper in queries.js or modify getRecipeById.
        // I'll modify getRecipeById in a separate step if needed.
        // For now, let's assume I will fix getRecipeById to return author_id.
        
        // Actually, let's look at getRecipeById in queries.js again.
        // "SELECT r.*, u.username as author FROM recipes r JOIN users u ON r.author_id = u.id WHERE r.id = $1"
        // r.* includes author_id! So we are good.
        
        if (recipe.author_id !== userId) {
             return res.status(403).json({ error: "You are not authorized to edit this recipe" });
        }

        const updatedRecipe = await queries.updateRecipe(recipeId, req.body);
        
        if (req.body.ingredients) {
            await queries.updateIngredients(recipeId, req.body.ingredients);
        }
        
        if (req.body.instructions) {
            await queries.updateInstructions(recipeId, req.body.instructions);
        }

        res.json(updatedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update recipe" });
    }
});

module.exports = router;
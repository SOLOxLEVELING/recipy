import { supabase } from "../lib/supabase";

// --- Recipes ---

export const fetchRecipes = async ({ search, category }) => {
    let query = supabase
        .from('recipes')
        .select(`
            *,
            author:profiles(username),
            ratings(score),
            recipe_categories!inner(
                category:categories(name)
            )
        `);

    if (search) {
        query = query.ilike('title', `%${search}%`);
    }

    if (category && category !== 'All') {
        query = query.eq('recipe_categories.category.name', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    // Transform data to match previous API structure if needed
    // Calculate average rating
    const recipes = data.map(recipe => {
        const scores = recipe.ratings?.map(r => r.score) || [];
        const avgRating = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        return { ...recipe, average_rating: avgRating };
    });

    return { data: recipes };
};

export const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return { data };
};

export const fetchRecipeById = async (id) => {
    const { data, error } = await supabase
        .from('recipes')
        .select(`
            *,
            author:profiles(username),
            ingredients(*),
            instructions(*),
            ratings(
                *,
                user:profiles(username)
            )
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return { data };
};

export const postRecipe = async (recipeData) => {
    const {
        title, description, prep_time_minutes, cook_time_minutes, servings, image_url,
        ingredients, instructions
    } = recipeData;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // 1. Insert Recipe
    const { data: recipe, error: recipeError } = await supabase
        .from('recipes')
        .insert([{
            title, description, prep_time_minutes, cook_time_minutes, servings, image_url,
            author_id: user.id
        }])
        .select()
        .single();

    if (recipeError) throw recipeError;

    // 2. Insert Ingredients
    if (ingredients && ingredients.length > 0) {
        const ingredientsData = ingredients.map(ing => ({
            recipe_id: recipe.id,
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit
        }));
        const { error: ingError } = await supabase.from('ingredients').insert(ingredientsData);
        if (ingError) console.error("Error inserting ingredients:", ingError);
    }

    // 3. Insert Instructions
    if (instructions && instructions.length > 0) {
        const instructionsData = instructions.map(inst => ({
            recipe_id: recipe.id,
            step_number: inst.step_number,
            description: inst.description
        }));
        const { error: instError } = await supabase.from('instructions').insert(instructionsData);
        if (instError) console.error("Error inserting instructions:", instError);
    }

    return { data: recipe };
};

// --- User & Profile ---

export const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) throw error;
    return { data };
};

export const updateUserProfile = async (updates) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

    if (error) throw error;
    return { data };
};

export const fetchMyRecipes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('author_id', user.id);

    if (error) throw error;
    return { data };
};

export const fetchSavedRecipes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
        .from('saved_recipes')
        .select(`
            recipe:recipes(*)
        `)
        .eq('user_id', user.id);

    if (error) throw error;
    
    // Flatten structure to match expected format
    const saved = data.map(item => item.recipe);
    return { data: saved };
};

export const saveRecipeToBox = async (recipeId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
        .from('saved_recipes')
        .insert([{ user_id: user.id, recipe_id: recipeId }])
        .select();

    if (error) {
        // Ignore duplicate key error (already saved)
        if (error.code === '23505') return { data: null }; 
        throw error;
    }
    return { data };
};

export const removeRecipeFromBox = async (recipeId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { error } = await supabase
        .from('saved_recipes')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);

    if (error) throw error;
    return { success: true };
};

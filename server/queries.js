// queries.js (Corrected)
const db = require("./db");

const getAllRecipes = async () => {
  const { rows } = await db.query(`
    SELECT r.id, r.title, r.image_url, 
           (SELECT AVG(score) FROM ratings WHERE recipe_id = r.id) as average_rating
    FROM recipes r;
  `);
  return rows;
};

const getRecipeById = async (id) => {
  const recipeResult = await db.query(
    "SELECT r.*, u.username as author FROM recipes r JOIN users u ON r.author_id = u.id WHERE r.id = $1",
    [id]
  );
  if (recipeResult.rows.length === 0) return null;
  const recipe = recipeResult.rows[0];

  const [ingredientsResult, instructionsResult, ratingsResult] =
    await Promise.all([
      db.query(
        "SELECT name, quantity, unit FROM ingredients WHERE recipe_id = $1",
        [id]
      ),
      db.query(
        "SELECT step_number, description FROM instructions WHERE recipe_id = $1 ORDER BY step_number",
        [id]
      ),
      db.query(
        "SELECT r.score, r.comment, u.username FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.recipe_id = $1",
        [id]
      ),
    ]);

  recipe.ingredients = ingredientsResult.rows;
  recipe.instructions = instructionsResult.rows;
  recipe.ratings = ratingsResult.rows;
  return recipe;
};

// In queries.js, replace the entire createRecipe function with this one.

const createRecipe = async (recipeData) => {
  const {
    title,
    description,
    prep_time_minutes,
    cook_time_minutes,
    servings,
    image_url,
    author_id,
    ingredients,
    instructions,
  } = recipeData;

  // This is the line that was broken. We now correctly get the pool from our db module.
  const client = await db.pool.connect();

  try {
    await client.query("BEGIN");

    const recipeQuery =
      "INSERT INTO recipes (title, description, prep_time_minutes, cook_time_minutes, servings, image_url, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
    const recipeValues = [
      title,
      description,
      prep_time_minutes,
      cook_time_minutes,
      servings,
      image_url,
      author_id,
    ];
    const newRecipe = await client.query(recipeQuery, recipeValues);
    const recipeId = newRecipe.rows[0].id;

    for (const ing of ingredients) {
      await client.query(
        "INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES ($1, $2, $3, $4)",
        [recipeId, ing.name, parseFloat(ing.quantity) || null, ing.unit]
      );
    }

    for (const inst of instructions) {
      await client.query(
        "INSERT INTO instructions (recipe_id, step_number, description) VALUES ($1, $2, $3)",
        [recipeId, inst.step_number, inst.description]
      );
    }

    await client.query("COMMIT");
    return { id: recipeId, ...recipeData };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e; // This will be caught by the server.js route handler
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// This function now requires a userId
const getSavedRecipes = async (userId) => {
  const { rows } = await db.query(
    `SELECT r.id, r.title, r.image_url FROM recipes r JOIN saved_recipes sr ON r.id = sr.recipe_id WHERE sr.user_id = $1`,
    [userId]
  );
  return rows;
};

const saveRecipeToBox = async (userId, recipeId) => {
  // This query will now ignore the insert if the recipe is already saved, preventing a crash.
  const { rows } = await db.query(
    `INSERT INTO saved_recipes (user_id, recipe_id) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id, recipe_id) DO NOTHING 
       RETURNING *`,
    [userId, recipeId]
  );
  return rows[0];
};

// This function now requires a userId
const removeRecipeFromBox = async (userId, recipeId) => {
  await db.query(
    "DELETE FROM saved_recipes WHERE user_id = $1 AND recipe_id = $2",
    [userId, recipeId]
  );
  return { success: true, recipeId: recipeId };
};

// Added these new functions inside queries.js

const createUser = async ({ username, email, passwordHash }) => {
  const { rows } = await db.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, passwordHash]
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getSavedRecipes,
  saveRecipeToBox,
  removeRecipeFromBox,
  createUser,
  findUserByEmail,
};

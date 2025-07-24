// server.js (Final Corrected Version)

require("dotenv").config(); // MUST BE THE VERY FIRST LINE OF THE FILE

const express = require("express");
const cors = require("cors");
const queries = require("./queries");
const authRoutes = require("./auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/recipes", require("./routes/recipeRoutes")); // Using a router for recipes now
app.use(
  "/api/saved-recipes",
  authMiddleware,
  require("./routes/savedRecipeRoutes")
); // Using a router for saved recipes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

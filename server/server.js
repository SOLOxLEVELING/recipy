// server.js (Final Corrected Version)

require("dotenv").config(); // MUST BE THE VERY FIRST LINE OF THE FILE

const express = require("express");
const cors = require("cors");
const queries = require("./queries");
const authRoutes = require("./auth");
const authMiddleware = require("./middleware/authMiddleware");
const recipeRoutes = require('./routes/recipeRoutes'); // Moved import to top
const uploadRoutes = require('./routes/uploadRoutes'); // New import
const savedRecipeRoutes = require('./routes/savedRecipeRoutes'); // Moved import to top

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes); // Using the imported router
app.use("/api/upload", uploadRoutes); // New route for uploads
app.use(
  "/api/saved-recipes",
  authMiddleware,
  savedRecipeRoutes // Using the imported router
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

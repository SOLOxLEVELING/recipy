// File: src/App.jsx
import React from "react";
import RecipeForm from "./components/RecipeForm";

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Recipe Share</h1>
          <p className="text-lg text-gray-600">
            Your daily dose of culinary inspiration.
          </p>
        </header>
        <main>
          <RecipeForm />
        </main>
      </div>
    </div>
  );
}

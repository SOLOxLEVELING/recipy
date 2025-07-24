// src/App.jsx (Corrected)
import React, { useState } from "react";
import { RecipeBoxProvider } from "./context/RecipeBoxContext"; // Assuming you have this file
import Header from "./components/layout/Header";
import PageNavigator from "./components/layout/PageNavigator";
import DiscoverRecipesPage from "./pages/DiscoverRecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeBoxPage from "./pages/RecipeBoxPage";

export default function App() {
  const [view, setView] = useState({ page: "discover", recipeId: null });

  const handleSelectRecipe = (id) => setView({ page: "detail", recipeId: id });
  const handleBackToDiscover = () =>
    setView({ page: "discover", recipeId: null });
  const setPage = (pageName) => setView({ page: pageName, recipeId: null });

  const renderContent = () => {
    switch (view.page) {
      case "create":
        return <CreateRecipePage />;
      case "detail":
        return (
          <RecipeDetailPage
            recipeId={view.recipeId}
            onBack={handleBackToDiscover}
          />
        );
      case "recipeBox":
        return <RecipeBoxPage onSelectRecipe={handleSelectRecipe} />;
      case "discover":
      default:
        return <DiscoverRecipesPage onSelectRecipe={handleSelectRecipe} />;
    }
  };

  return (
    <RecipeBoxProvider>
      {" "}
      {/* This wrapper is essential */}
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="container mx-auto px-4 py-8">
          <Header />
          {view.page !== "detail" && (
            <PageNavigator page={view.page} setPage={setPage} />
          )}
          <main>{renderContent()}</main>
        </div>
      </div>
    </RecipeBoxProvider>
  );
}

import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RecipeBoxProvider } from "./context/RecipeBoxContext";
import Header from "./components/layout/Header";
import PageNavigator from "./components/layout/PageNavigator";
import DiscoverRecipesPage from "./pages/DiscoverRecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeBoxPage from "./pages/RecipeBoxPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Main App Content, which has access to auth context
const AppContent = () => {
  const [view, setView] = useState({ page: "discover", recipeId: null });
  const { isAuthenticated, logout } = useAuth();

  const handleSelectRecipe = (id) => setView({ page: "detail", recipeId: id });
  const handleBack = () =>
    setView({ page: view.previousPage || "discover", recipeId: null });

  const setPage = (pageName) => {
    setView((prev) => ({ ...prev, page: pageName, previousPage: prev.page }));
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      switch (view.page) {
        case "login":
          return <LoginPage />;
        case "register":
          return <RegisterPage setPage={setPage} />;
        default:
          return <LoginPage />; // Default to login page if not authenticated
      }
    }

    // Pages for authenticated users
    switch (view.page) {
      case "create":
        return <CreateRecipePage />;
      case "detail":
        return (
          <RecipeDetailPage recipeId={view.recipeId} onBack={handleBack} />
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
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <PageNavigator
            page={view.page}
            setPage={setPage}
            isAuthenticated={isAuthenticated}
            logout={logout}
          />
          <main>{renderContent()}</main>
        </div>
      </div>
    </RecipeBoxProvider>
  );
};

// The main App component wraps everything in the AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

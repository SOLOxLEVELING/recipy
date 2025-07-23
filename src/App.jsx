import React, { useState } from "react";
import Header from "./components/layout/Header";
import PageNavigator from "./components/layout/PageNavigator";
import DiscoverRecipesPage from "./pages/DiscoverRecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";

export default function App() {
  const [page, setPage] = useState("discover"); // 'discover' or 'create'

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <PageNavigator page={page} setPage={setPage} />
        <main>
          {page === "discover" && <DiscoverRecipesPage />}
          {page === "create" && <CreateRecipePage />}
        </main>
      </div>
    </div>
  );
}

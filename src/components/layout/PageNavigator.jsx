import React from "react";

const PageNavigator = ({ page, setPage }) => (
  <nav className="flex justify-center mb-8 bg-white p-2 rounded-lg shadow-sm max-w-md mx-auto">
    <button
      onClick={() => setPage("discover")}
      className={`w-1/3 py-2 px-4 rounded-md font-semibold transition-colors ${
        page === "discover"
          ? "bg-green-600 text-white"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      Discover
    </button>
    <button
      onClick={() => setPage("recipeBox")}
      className={`w-1/3 py-2 px-4 rounded-md font-semibold transition-colors ${
        page === "recipeBox"
          ? "bg-green-600 text-white"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      Recipe Box
    </button>
    <button
      onClick={() => setPage("create")}
      className={`w-1/3 py-2 px-4 rounded-md font-semibold transition-colors ${
        page === "create"
          ? "bg-green-600 text-white"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      Create
    </button>
  </nav>
);

export default PageNavigator;

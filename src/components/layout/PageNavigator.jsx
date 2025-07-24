import React from "react";

const PageNavigator = ({ page, setPage, isAuthenticated, logout }) => {
  const baseStyle =
    "w-1/3 py-2 px-4 rounded-md font-semibold transition-colors";
  const activeStyle = "bg-green-600 text-white";
  const inactiveStyle = "text-gray-600 hover:bg-gray-200";

  if (!isAuthenticated) {
    return (
      <nav className="flex justify-center mb-8 bg-white p-2 rounded-lg shadow-sm max-w-sm mx-auto">
        <button
          onClick={() => setPage("login")}
          className={`${baseStyle} ${
            page === "login" ? activeStyle : inactiveStyle
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setPage("register")}
          className={`${baseStyle} ${
            page === "register" ? activeStyle : inactiveStyle
          }`}
        >
          Register
        </button>
      </nav>
    );
  }

  // If we are on the detail page, don't show the main navigator
  if (page === "detail") return null;

  return (
    <nav className="flex justify-between items-center mb-8 bg-white p-2 rounded-lg shadow-sm max-w-lg mx-auto">
      <div className="flex w-full">
        <button
          onClick={() => setPage("discover")}
          className={`${baseStyle} ${
            page === "discover" ? activeStyle : inactiveStyle
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setPage("recipeBox")}
          className={`${baseStyle} ${
            page === "recipeBox" ? activeStyle : inactiveStyle
          }`}
        >
          Recipe Box
        </button>
        <button
          onClick={() => setPage("create")}
          className={`${baseStyle} ${
            page === "create" ? activeStyle : inactiveStyle
          }`}
        >
          Create
        </button>
      </div>
      <button
        onClick={logout}
        className="py-2 px-4 text-sm text-red-500 hover:text-red-700 font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default PageNavigator;

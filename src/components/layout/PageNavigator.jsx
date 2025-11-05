import React from "react";
import {Bookmark, Home, LogOut, PlusSquare} from 'lucide-react';

const PageNavigator = ({page, setPage, isAuthenticated, logout}) => {
    // --- Logged-out State ---
    // This remains a simple centered toggle
    if (!isAuthenticated) {
        return (
            <nav className="flex justify-center mb-8 bg-white p-2 rounded-lg shadow-sm max-w-sm mx-auto">
                <button
                    onClick={() => setPage("login")}
                    className={`w-1/2 py-2 px-4 rounded-md font-semibold transition-colors ${
                        page === "login"
                            ? "bg-primary-600 text-white"
                            : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setPage("register")}
                    className={`w-1/2 py-2 px-4 rounded-md font-semibold transition-colors ${
                        page === "register"
                            ? "bg-primary-600 text-white"
                            : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                >
                    Register
                </button>
            </nav>
        );
    }

    // --- Logged-in State (Responsive) ---
    // Don't show the nav bar on the detail page
    if (page === "detail") return null;

    // Helper for nav button styles
    const getNavButtonClasses = (navPage) => {
        const base = "flex md:flex-row flex-col items-center justify-center gap-1 md:gap-2 md:px-4 md:py-2 py-2 px-2 rounded-md font-semibold transition-colors w-full md:w-auto";
        const active = "text-primary-600 bg-primary-50 md:bg-transparent";
        const inactive = "text-neutral-500 hover:text-primary-600 hover:bg-neutral-100";
        return `${base} ${page === navPage ? active : inactive}`;
    };

    return (
        <>
            {/* This is the main responsive navigation container.
        - Mobile: Fixed to the bottom, z-index 50, row flex.
        - Desktop: Sits in flow, centered, max-width, row flex.
      */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-inner
                     md:relative md:bottom-auto md:border-none md:shadow-sm md:bg-white
                     md:p-2 md:rounded-lg md:max-w-lg md:mx-auto md:mb-8">

                <div className="flex justify-around md:justify-center md:gap-4">
                    {/* Discover */}
                    <button
                        onClick={() => setPage("discover")}
                        className={getNavButtonClasses("discover")}
                    >
                        <Home size={24}/>
                        <span className="text-xs md:text-sm">Discover</span>
                    </button>

                    {/* Recipe Box */}
                    <button
                        onClick={() => setPage("recipeBox")}
                        className={getNavButtonClasses("recipeBox")}
                    >
                        <Bookmark size={24}/>
                        <span className="text-xs md:text-sm">Recipe Box</span>
                    </button>

                    {/* Create */}
                    <button
                        onClick={() => setPage("create")}
                        className={getNavButtonClasses("create")}
                    >
                        <PlusSquare size={24}/>
                        <span className="text-xs md:text-sm">Create</span>
                    </button>

                    {/* Logout (Visible only on mobile bottom bar) */}
                    <button
                        onClick={logout}
                        className="flex md:hidden flex-col items-center justify-center gap-1 py-2 px-2 font-semibold text-neutral-500 w-full"
                    >
                        <LogOut size={24}/>
                        <span className="text-xs">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Spacer for mobile view to prevent content from hiding behind the fixed nav */}
            <div className="pb-20 md:pb-0"></div>
        </>
    );
};

export default PageNavigator;
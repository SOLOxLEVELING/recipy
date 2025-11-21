import React from "react";
import { Bookmark, Home, LogOut, PlusSquare, ChefHat } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const PageNavigator = () => {
    const location = useLocation();
    
    // Hide nav on detail pages if desired, or keep it. 
    // The original code hid it on "detail". 
    // We can check if the path starts with /recipe/
    if (location.pathname.startsWith('/recipe/')) return null;

    // Helper for nav button styles
    const getNavButtonClasses = ({ isActive }) => {
        const base = "flex md:flex-row flex-col items-center justify-center gap-1 md:gap-2 md:px-4 md:py-2 py-2 px-2 rounded-md font-semibold transition-colors w-full md:w-auto";
        const active = "text-primary-600 bg-primary-50 md:bg-transparent";
        const inactive = "text-neutral-500 hover:text-primary-600 hover:bg-neutral-100";
        return `${base} ${isActive ? active : inactive}`;
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
                    <NavLink
                        to="/discover"
                        className={getNavButtonClasses}
                    >
                        <Home size={24} />
                        <span className="text-xs md:text-sm">Discover</span>
                    </NavLink>

                    {/* Recipe Box */}
                    <NavLink
                        to="/box"
                        className={getNavButtonClasses}
                    >
                        <Bookmark size={24} />
                        <span className="text-xs md:text-sm">Recipe Box</span>
                    </NavLink>

                    {/* Create */}
                    <NavLink
                        to="/create"
                        className={getNavButtonClasses}
                    >
                        <PlusSquare size={24} />
                        <span className="text-xs md:text-sm">Create</span>
                    </NavLink>

                    {/* My Recipes */}
                    <NavLink
                        to="/my-recipes"
                        className={getNavButtonClasses}
                    >
                        <ChefHat size={24} />
                        <span className="text-xs md:text-sm">My Recipes</span>
                    </NavLink>

                    {/* Logout (Visible only on mobile bottom bar) - Handled by Header on Desktop */}
                    {/* We can keep a logout button here for mobile if we want, or rely on Header */}
                </div>
            </nav>

            {/* Spacer for mobile view to prevent content from hiding behind the fixed nav */}
            <div className="pb-20 md:pb-0"></div>
        </>
    );
};

export default PageNavigator;
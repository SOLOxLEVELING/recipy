import React, {useMemo, useState} from "react";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";
import AdvancedFilterModal from "../components/recipes/AdvancedFilterModal.jsx";
import {filterOptions, mockRecipes} from ".././data/mockData"; // <-- Import filterOptions
import {Search, SlidersHorizontal} from "lucide-react";

// Get the category list and add "All" to the beginning
const categories = ["All", ...filterOptions.category];

const DiscoverRecipesPage = ({onSelectRecipe}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // Get the currently selected category from state (defaults to "All")
    const selectedCategory = activeFilters.category?.[0] || "All";

    const recipes = mockRecipes;

    const handleCategoryClick = (category) => {
        setActiveFilters(prevFilters => {
            if (category === "All") {
                // If "All" is clicked, remove the category filter entirely
                const {category, ...rest} = prevFilters;
                return rest;
            } else {
                // Otherwise, set the category filter to *only* the clicked one
                return {
                    ...prevFilters,
                    category: [category]
                };
            }
        });
    };

    const filteredRecipes = useMemo(() => {
        // 1. Filter by Search Term
        let recipesBySearch = recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // 2. Filter by Active Filters (including the category)
        const filters = Object.entries(activeFilters);
        if (filters.length === 0) {
            return recipesBySearch;
        }

        return recipesBySearch.filter(recipe => {
            return filters.every(([type, values]) => {
                if (!values || values.length === 0) return true;
                if (type === 'dietary') {
                    return values.every(value => recipe.dietary.includes(value));
                } else {
                    // This logic now also handles our 'category' filter
                    const key = type === 'title' ? 'name' : type;
                    return values.includes(recipe[key]);
                }
            });
        });
    }, [recipes, activeFilters, searchTerm]);

    const filterCount = Object.values(activeFilters).reduce((acc, val) => acc + (val ? val.length : 0), 0);

    return (
        <div>
            {/* --- Page Header --- */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-neutral-800 font-serif">
                    Discover
                </h2>
            </div>

            {/* --- Search and Filter Bar --- */}
            <div className="flex flex-col md:flex-row gap-4 mb-6"> {/* <-- Reduced margin */}
                {/* Search Bar */}
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-full
                       bg-white shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 bg-white border border-neutral-300
                     rounded-full font-semibold text-neutral-700
                     hover:bg-neutral-50 hover:border-neutral-400 transition-colors shadow-sm"
                >
                    <SlidersHorizontal size={16}/>
                    <span>Filters</span>
                    {filterCount > 0 && (
                        <span
                            className="flex items-center justify-center h-5 w-5 bg-primary-600 text-white text-xs font-bold rounded-full">
              {filterCount}
            </span>
                    )}
                </button>
            </div>

            {/* --- NEW Category Filter Chips --- */}
            <div className="mb-8">
                <h3 className="text-xl font-bold font-serif text-neutral-800 mb-4">Categories</h3>
                <div className="flex gap-3 pb-2 -mx-4 px-4 overflow-x-auto">
                    {categories.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`
                  flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-colors
                  ${
                                    isActive
                                        ? "bg-primary-600 text-white"
                                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                }
                `}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- Recipe Grid --- */}
            <RecipeCardGrid
                recipes={filteredRecipes}
                onSelectRecipe={onSelectRecipe}
            />

            {/* --- Render the Modal --- */}
            <AdvancedFilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
            />
        </div>
    );
};

export default DiscoverRecipesPage;
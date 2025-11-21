import React, {useMemo, useState, useEffect} from "react";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";
import AdvancedFilterModal from "../components/recipes/AdvancedFilterModal.jsx";
import {filterOptions, mockRecipes} from ".././data/mockData";
import {Search, SlidersHorizontal} from "lucide-react";
import {RecipeCardSkeleton} from "../components/ui/Skeleton";

// Get the category list and add "All" to the beginning
const categories = ["All", ...filterOptions.category];



// ...

const DiscoverRecipesPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Simulated loading

    useEffect(() => {
        // Simulate network request
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // ... rest of the code ...

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
            {/* --- Hero Section --- */}
            <div className="relative rounded-3xl overflow-hidden mb-12 bg-neutral-900 text-white">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                        alt="Cooking" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                </div>
                <div className="relative z-10 p-12 md:p-20 max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                        Discover the Art of <span className="text-primary-400">Cooking</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
                        Explore thousands of recipes, share your own culinary masterpieces, and join a community of food lovers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="What are you craving?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white/30 transition-all"
                            />
                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-200"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Filter Bar --- */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 font-serif">
                    Latest Recipes
                </h2>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-200 rounded-full font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"
                >
                    <SlidersHorizontal size={18}/>
                    <span>Filters</span>
                    {filterCount > 0 && (
                        <span className="flex items-center justify-center h-5 w-5 bg-primary-600 text-white text-xs font-bold rounded-full">
                            {filterCount}
                        </span>
                    )}
                </button>
            </div>

            {/* --- Category Chips --- */}
            <div className="mb-10">
                <div className="flex gap-3 pb-4 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`
                                    flex-shrink-0 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 border
                                    ${isActive
                                        ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/25"
                                        : "bg-white text-neutral-600 border-neutral-200 hover:border-primary-200 hover:text-primary-700 hover:bg-primary-50"
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
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <RecipeCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <RecipeCardGrid recipes={filteredRecipes} />
            )}

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
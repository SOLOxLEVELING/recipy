import React, {useMemo, useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";
import AdvancedFilterModal from "../components/recipes/AdvancedFilterModal.jsx";
import {Search, SlidersHorizontal} from "lucide-react";
import {RecipeCardSkeleton} from "../components/ui/Skeleton";
import { fetchRecipes, fetchCategories } from "../services/api";
import SEO from "../components/common/SEO";

const DiscoverRecipesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    
    // State for data
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [isLoading, setIsLoading] = useState(true);

    // Read initial state from URL
    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category");
    
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    
    // Initialize activeFilters from URL
    useEffect(() => {
        const category = searchParams.get("category");
        if (category) {
            setActiveFilters(prev => ({ ...prev, category: [category] }));
        } else {
            setActiveFilters(prev => {
                const { category, ...rest } = prev;
                return rest;
            });
        }
    }, [searchParams]);

    // Fetch Categories on Mount
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchCategories();
                // Extract names from category objects
                const categoryNames = ["All", ...response.data.map(c => c.name)];
                setCategories(categoryNames);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        loadCategories();
    }, []);

    // Debounce Search Term & Sync ActiveFilters to URL
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = {};
            if (searchTerm) params.search = searchTerm;
            
            // Sync activeFilters to URL
            // We only take the first category since backend supports one for now
            const cat = activeFilters.category?.[0];
            if (cat && cat !== "All") params.category = cat;
            
            setSearchParams(params);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, activeFilters, setSearchParams]);

    // Fetch Recipes when URL params change
    useEffect(() => {
        const loadRecipes = async () => {
            setIsLoading(true);
            try {
                const search = searchParams.get("search");
                const category = searchParams.get("category");
                
                const response = await fetchRecipes({ search, category });
                setRecipes(response.data);
            } catch (error) {
                console.error("Failed to load recipes", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadRecipes();
    }, [searchParams]);

    const handleCategoryClick = (category) => {
        setActiveFilters(prev => {
            if (category === "All") {
                const { category, ...rest } = prev;
                return rest;
            }
            return { ...prev, category: [category] };
        });
    };

    // Derived state for UI
    const selectedCategory = activeFilters.category?.[0] || "All";
    const filterCount = Object.values(activeFilters).reduce((acc, val) => acc + (val ? val.length : 0), 0);

    const pageTitle = searchTerm 
        ? `Search: ${searchTerm}` 
        : selectedCategory !== "All" 
            ? `${selectedCategory} Recipes` 
            : "Discover Recipes";

    return (
        <div>
            <SEO title={pageTitle} description="Find the perfect recipe for any occasion." />
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
            ) : recipes.length > 0 ? (
                <RecipeCardGrid recipes={recipes} />
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-neutral-500">No recipes found matching your criteria.</p>
                </div>
            )}

            {/* --- Render the Modal --- */}
            <AdvancedFilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                categories={categories}
            />
        </div>
    );
};

export default DiscoverRecipesPage;
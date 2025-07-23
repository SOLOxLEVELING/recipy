import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockRecipes } from "../data/mockData";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";
import AdvancedFilterModal from "../components/recipes/AdvancedFilterModal";

const DiscoverRecipesPage = ({ onSelectRecipe }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchLower === "" ||
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchLower)
        );

      const matchesFilters = Object.entries(activeFilters).every(
        ([type, values]) => {
          if (!values || values.length === 0) return true;
          if (type === "dietary") {
            return values.every((val) => recipe.dietary.includes(val));
          }
          return values.includes(recipe[type]);
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, activeFilters]);

  const filterCount = Object.values(activeFilters).reduce(
    (acc, curr) => acc + (curr ? curr.length : 0),
    0
  );

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-4 z-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by recipe name or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
            {filterCount > 0 && (
              <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {filterCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <RecipeCardGrid recipes={filteredRecipes} />
      <AdvancedFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <RecipeCardGrid
        recipes={filteredRecipes}
        onSelectRecipe={onSelectRecipe}
      />

      <AdvancedFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </div>
  );
};

export default DiscoverRecipesPage;

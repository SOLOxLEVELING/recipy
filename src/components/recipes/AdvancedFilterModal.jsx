import React, {useEffect} from "react";
import {SlidersHorizontal, Trash2, X} from "lucide-react";
import {filterOptions} from "../../data/constants.js";

const AdvancedFilterModal = ({
                                 isOpen,
                                 onClose,
                                 activeFilters,
                                 setActiveFilters,
                                 categories = [], // Default to empty array
                             }) => {
    // Effect to prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFilterChange = (filterType, value) => {
        setActiveFilters((prevFilters) => {
            const currentValues = prevFilters[filterType] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return {...prevFilters, [filterType]: newValues};
        });
    };

    const getFilterCount = () => {
        return Object.values(activeFilters).reduce(
            (acc, curr) => acc + (curr ? curr.length : 0),
            0
        );
    };
    const filterCount = getFilterCount();

    const handleClear = () => {
        setActiveFilters({});
    };

    return (
        // --- Backdrop ---
        <div
            className="fixed inset-0 bg-black/60 z-40 flex items-end sm:items-center justify-center"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* --- Modal Content --- */}
            {/* Responsive behavior: slides up on mobile, fades in on desktop */}
            <div
                className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full max-w-lg
                   p-6 flex flex-col max-h-[90vh]
                   transform transition-transform duration-300 ease-out
                   animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Header --- */}
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
                    <h3 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                        <SlidersHorizontal size={20} className="text-primary-600"/>
                        Filters
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-neutral-500 hover:text-neutral-800 p-1 rounded-full hover:bg-neutral-100"
                        aria-label="Close filters"
                    >
                        <X size={24}/>
                    </button>
                </div>

                {/* --- Filter Sections (Scrollable) --- */}
                <div className="flex-grow overflow-y-auto py-6 space-y-6">
                    {/* Categories Section */}
                    <div>
                        <h4 className="font-semibold text-neutral-800 capitalize mb-3 text-lg">
                            Category
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((option) => {
                                if (option === "All") return null; // Skip "All" in modal
                                const isChecked = (activeFilters.category || []).includes(option);
                                return (
                                    <label
                                        key={option}
                                        className={`
                        flex items-center justify-center px-4 py-2 rounded-full cursor-pointer
                        font-semibold text-sm transition-colors border
                        ${
                                            isChecked
                                                ? "bg-primary-600 border-primary-600 text-white"
                                                : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                                        }
                      `}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleFilterChange("category", option)}
                                            className="sr-only"
                                        />
                                        <span>{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Other Filters (Cuisine, Dietary) - Still from mockData for now, or could be dynamic later */}
                    {Object.entries(filterOptions).map(([type, options]) => {
                        if (type === 'category') return null; // We handled category above
                        return (
                        <div key={type}>
                            <h4 className="font-semibold text-neutral-800 capitalize mb-3 text-lg">
                                {type}
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {options.map((option) => {
                                    const isChecked = (activeFilters[type] || []).includes(option);
                                    return (
                                        <label
                                            key={option}
                                            className={`
                        flex items-center justify-center px-4 py-2 rounded-full cursor-pointer
                        font-semibold text-sm transition-colors border
                        ${
                                                isChecked
                                                    ? "bg-primary-600 border-primary-600 text-white"
                                                    : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                                            }
                      `}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleFilterChange(type, option)}
                                                className="sr-only" // Visually hidden, but accessible
                                            />
                                            <span>{option}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    )})}
                </div>

                {/* --- Footer / Actions --- */}
                <div className="pt-4 border-t border-neutral-200 flex justify-between items-center gap-4">
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-4 py-2 bg-transparent text-neutral-600
                       font-semibold rounded-full hover:bg-neutral-100"
                        disabled={filterCount === 0}
                    >
                        <Trash2 size={16}/>
                        Clear All ({filterCount})
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-full
                       hover:bg-primary-700"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilterModal;
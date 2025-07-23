import React from "react";
import { X } from "lucide-react";
import { filterOptions } from "../../data/mockData";

const AdvancedFilterModal = ({
  isOpen,
  onClose,
  activeFilters,
  setActiveFilters,
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prevFilters) => {
      const currentValues = prevFilters[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prevFilters, [filterType]: newValues };
    });
  };

  const getFilterCount = () => {
    return Object.values(activeFilters).reduce(
      (acc, curr) => acc + (curr ? curr.length : 0),
      0
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-4">Filters</h3>
        <div className="space-y-4">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type}>
              <h4 className="font-semibold text-gray-800 capitalize mb-2 border-b pb-1">
                {type}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(activeFilters[type] || []).includes(option)}
                      onChange={() => handleFilterChange(type, option)}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setActiveFilters({})}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Clear All ({getFilterCount()})
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterModal;

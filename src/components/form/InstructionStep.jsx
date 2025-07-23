import React from "react";

const InstructionStep = ({
  step,
  index,
  handleInstructionChange,
  removeInstruction,
}) => (
  <div className="flex items-start space-x-2 mb-2">
    <span className="pt-2 font-semibold text-gray-600">{index + 1}.</span>
    <textarea
      placeholder="e.g., Preheat oven to 350°F (175°C)."
      value={step}
      onChange={(e) => handleInstructionChange(index, e)}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
      rows="2"
    ></textarea>
    <button
      type="button"
      onClick={() => removeInstruction(index)}
      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors mt-1"
    >
      Remove
    </button>
  </div>
);

export default InstructionStep;

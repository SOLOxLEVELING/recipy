import React from "react";
import {X} from "lucide-react";

const InstructionStep = ({
                             step,
                             index,
                             handleInstructionChange,
                             removeInstruction,
                         }) => (
    <div className="flex items-start space-x-3 mb-3">
    <span className="pt-2 font-bold text-neutral-500">
      {index + 1}.
    </span>
        <textarea
            placeholder="e.g., Preheat oven to 350°F (175°C)."
            value={step}
            onChange={(e) => handleInstructionChange(index, e)}
            className="w-full p-2.5 border border-neutral-300 rounded-md
                 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows="3"
        ></textarea>
        <button
            type="button"
            onClick={() => removeInstruction(index)}
            className="p-2.5 bg-red-500 text-white rounded-md
                 hover:bg-red-600 transition-colors flex-shrink-0 mt-1"
            aria-label="Remove step"
        >
            <X size={20}/>
        </button>
    </div>
);

export default InstructionStep;
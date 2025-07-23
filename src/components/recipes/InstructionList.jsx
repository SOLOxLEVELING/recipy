import React from "react";

const InstructionList = ({ instructions }) => (
  <div className="bg-blue-50 p-6 rounded-lg">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h3>
    <ol className="space-y-4">
      {instructions.map((step, index) => (
        <li key={index} className="flex items-start">
          <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 bg-blue-600 text-white font-bold rounded-full mr-4">
            {index + 1}
          </span>
          <p className="text-lg text-gray-800 leading-relaxed pt-1">{step}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default InstructionList;

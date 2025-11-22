import React from "react";

const InstructionList = ({instructions}) => (
    <div className="w-full">
        <h3 className="text-3xl font-bold text-neutral-800 mb-8">Instructions</h3>
        <ol className="space-y-8">
            {instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                    {/* Typographic Step Number */}
                    <span
                        className="text-4xl font-bold text-primary-600/50"
                        style={{fontVariantNumeric: 'tabular-nums'}}
                    >
            {/* Pad with '0' for a consistent look */}
                        {(index + 1).toString().padStart(2, '0')}
          </span>
                    <p className="text-lg text-neutral-700 leading-relaxed pt-2">
                        {typeof step === 'object' ? step.description : step}
                    </p>
                </li>
            ))}
        </ol>
    </div>
);

export default InstructionList;
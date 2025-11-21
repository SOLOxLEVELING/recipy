import React, {useState} from "react";
import {postRecipe} from "../services/api";
import IngredientList from "../components/form/IngredientList"; // Corrected path
import InstructionStep from "../components/form/InstructionStep";
import ImageUpload from "../components/common/ImageUpload";
import {Plus, Send} from "lucide-react";

// A reusable styled input component for this form
const FormInput = (props) => (
    <input
        {...props}
        className="w-full p-2.5 border border-neutral-300 rounded-md
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
);

// A reusable styled label
const FormLabel = (props) => (
    <label {...props} className="block text-sm font-semibold text-neutral-700 mb-1"/>
);

const CreateRecipePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState(4);
    const [ingredients, setIngredients] = useState([
        {name: "", quantity: "", unit: ""},
    ]);
    const [instructions, setInstructions] = useState([""]);
    const [imageUrl, setImageUrl] = useState("");

    const handleIngredientChange = (index, event) => {
        const newIngredients = ingredients.map((ing, i) =>
            i === index ? {...ing, [event.target.name]: event.target.value} : ing
        );
        setIngredients(newIngredients);
    };
    const addIngredient = () =>
        setIngredients([...ingredients, {name: "", quantity: "", unit: ""}]);
    const removeIngredient = (index) =>
        setIngredients(ingredients.filter((_, i) => i !== index));

    const handleInstructionChange = (index, event) => {
        setInstructions(
            instructions.map((step, i) => (i === index ? event.target.value : step))
        );
    };
    const addInstruction = () => setInstructions([...instructions, ""]);
    const removeInstruction = (index) =>
        setInstructions(instructions.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        // In a real app, you would handle image upload to a service (e.g., S3, Cloudinary)
        // and get back a URL. For now, we'll continue to send a placeholder.
        console.log("Form data submitted:", {
            title, description, prepTime, cookTime, servings, ingredients, instructions, image
        });

        const payload = {
            title,
            description,
            prep_time_minutes: parseInt(prepTime, 10),
            cook_time_minutes: parseInt(cookTime, 10),
            servings: parseInt(servings, 10),
            image_url: imageUrl || "https://placehold.co/600x400/22c55e/ffffff?text=New+Recipe",
            ingredients: ingredients.map((ing) => ({
                ...ing,
                quantity: parseFloat(ing.quantity),
            })),
            instructions: instructions.map((desc, index) => ({
                step_number: index + 1,
                description: desc,
            })),
        };

        try {
            await postRecipe(payload);
            alert("Recipe created successfully!");
            // Reset form (optional)
        } catch (error) {
            console.error("Failed to create recipe:", error);
            alert("Error: Could not create recipe.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-800 mb-6 font-serif">
                Create Your Recipe
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">

                {/* --- Main Form Fields (Left Column) --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <FormLabel htmlFor="title">Recipe Title</FormLabel>
                        <FormInput
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Classic Spaghetti Carbonara"
                            required
                        />
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <textarea
                            id="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2.5 border border-neutral-300 rounded-md
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="A brief, tasty description of your recipe..."
                        ></textarea>
                    </div>

                    <div
                        className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <FormLabel htmlFor="prepTime">Prep Time (min)</FormLabel>
                            <FormInput
                                type="number"
                                id="prepTime"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                                placeholder="e.g., 15"
                            />
                        </div>
                        <div>
                            <FormLabel htmlFor="cookTime">Cook Time (min)</FormLabel>
                            <FormInput
                                type="number"
                                id="cookTime"
                                value={cookTime}
                                onChange={(e) => setCookTime(e.target.value)}
                                placeholder="e.g., 20"
                            />
                        </div>
                        <div>
                            <FormLabel htmlFor="servings">Servings</FormLabel>
                            <FormInput
                                type="number"
                                id="servings"
                                value={servings}
                                onChange={(e) => setServings(e.target.value)}
                                placeholder="e.g., 4"
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <IngredientList
                            ingredients={ingredients}
                            handleIngredientChange={handleIngredientChange}
                            addIngredient={addIngredient}
                            removeIngredient={removeIngredient}
                        />
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                        <h3 className="text-lg font-semibold text-neutral-700 mb-3">
                            Instructions
                        </h3>
                        <div className="space-y-2">
                            {instructions.map((step, index) => (
                                <InstructionStep
                                    key={index}
                                    index={index}
                                    step={step}
                                    handleInstructionChange={handleInstructionChange}
                                    removeInstruction={removeInstruction}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addInstruction}
                            className="mt-3 flex items-center gap-2 px-4 py-2
                         bg-primary-50 text-primary-600 font-semibold rounded-full
                         hover:bg-primary-100 transition-colors"
                        >
                            <Plus size={18}/>
                            Add Step
                        </button>
                    </div>
                </div>

                {/* --- Sticky Right Column (Image & Submit) --- */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="sticky top-8 space-y-6">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                            <label className="block text-sm font-semibold text-neutral-700 mb-3">Recipe Image</label>
                            <ImageUpload
                                value={imageUrl}
                                onChange={setImageUrl}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 px-6
                         bg-primary-600 text-white font-bold rounded-full
                         hover:bg-primary-700 transition-colors text-lg"
                        >
                            <Send size={20}/>
                            Submit Recipe
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateRecipePage;
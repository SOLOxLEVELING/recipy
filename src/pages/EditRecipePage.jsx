import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUpload from "../components/common/ImageUpload";

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prep_time_minutes: "",
    cook_time_minutes: "",
    servings: "",
    image_url: "",
    ingredients: [],
    instructions: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/recipes/${recipeId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch recipe", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index].description = value;
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step_number: prev.instructions.length + 1, description: "" },
      ],
    }));
  };

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    // Re-index steps
    const reindexed = newInstructions.map((inst, i) => ({
      ...inst,
      step_number: i + 1,
    }));
    setFormData((prev) => ({ ...prev, instructions: reindexed }));
  };



// ...

const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const loadingToast = toast.loading("Saving changes...");
    try {
      await axios.put(
        `http://localhost:3001/api/recipes/${recipeId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Recipe updated successfully!", { id: loadingToast });
      navigate("/my-recipes");
    } catch (error) {
      console.error("Failed to update recipe", error);
      toast.error("Failed to update recipe", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button
        onClick={() => navigate("/my-recipes")}
        className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to My Recipes
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-8">
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-8">
          Edit Recipe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Prep Time (mins)
              </label>
              <input
                type="number"
                name="prep_time_minutes"
                value={formData.prep_time_minutes}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Cook Time (mins)
              </label>
              <input
                type="number"
                name="cook_time_minutes"
                value={formData.cook_time_minutes}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Servings
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Recipe Image
              </label>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">
                Ingredients
              </h3>
              <button
                type="button"
                onClick={addIngredient}
                className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
              >
                <Plus size={16} /> Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {formData.ingredients.map((ing, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <input
                    type="text"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Qty"
                    value={ing.quantity || ""}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                    className="w-20 px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={ing.unit || ""}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    className="w-24 px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">
                Instructions
              </h3>
              <button
                type="button"
                onClick={addInstruction}
                className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
              >
                <Plus size={16} /> Add Step
              </button>
            </div>
            <div className="space-y-3">
              {formData.instructions.map((inst, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="pt-3 text-sm font-medium text-neutral-400 w-6">
                    {index + 1}.
                  </span>
                  <textarea
                    value={inst.description}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value)
                    }
                    rows="2"
                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 outline-none"
                    placeholder="Describe this step..."
                  />
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors mt-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-recipes")}
              className="px-6 py-2 rounded-lg text-neutral-600 font-medium hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 flex items-center gap-2"
            >
              {saving ? "Saving..." : "Save Changes"}
              {!saving && <Save size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipePage;

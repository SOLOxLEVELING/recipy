import React, {useEffect, useMemo, useRef, useState} from "react";
import {ArrowLeft, Moon, Sun} from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import IngredientChecklist from "../components/recipes/IngredientChecklist";
import InstructionList from "../components/recipes/InstructionList";
import RatingStars from "../components/reviews/RatingStars";
import CommentThread from "../components/reviews/CommentThread";
import SaveRecipeButton from "../components/recipes/SaveRecipeButton";
import { fetchRecipeById } from "../services/api";
import SEO from "../components/common/SEO";
import { getOptimizedImageUrl } from "../utils/imageUtils";

const RecipeDetailPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const response = await fetchRecipeById(id);
                setRecipe(response.data);
            } catch (err) {
                console.error("Failed to fetch recipe", err);
                setError("Recipe not found");
            } finally {
                setLoading(false);
            }
        };
        loadRecipe();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;

    if (error || !recipe)
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-neutral-700">Recipe not found</h2>
                <Link to="/discover" className="text-primary-600 hover:underline mt-4 inline-block">
                    Return to Discover
                </Link>
            </div>
        );

    return <RecipeDetailContent recipe={recipe} />;
};

// Sub-component to keep logic clean and ensure 'recipe' object exists
const RecipeDetailContent = ({recipe}) => {
    const [isCookMode, setIsCookMode] = useState(false);
    const navigate = useNavigate();

    const [ratings, setRatings] = useState(recipe.ratings || []);
    const [comments, setComments] = useState(recipe.comments || []);

    // Effect for Cook Mode screen wake lock
    useEffect(() => {
        // Wake lock logic would go here
    }, [isCookMode]);

    const averageRating = useMemo(() => {
        if (!ratings || ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, r) => acc + r, 0);
        return sum / ratings.length;
    }, [ratings]);

    return (
        <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-lg">
            <SEO 
                title={recipe.title || recipe.name} 
                description={recipe.description}
                image={getOptimizedImageUrl(recipe.image_url || recipe.image)}
            />
            <header className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-semibold mb-4"
                >
                    <ArrowLeft size={20} className="mr-2"/>
                    Back
                </button>
                <img
                    src={getOptimizedImageUrl(recipe.image_url || recipe.image)}
                    alt={recipe.title || recipe.name}
                    className="w-full h-64 sm:h-96 object-cover rounded-lg mb-6 shadow-md"
                />
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 font-serif">
                            {recipe.title || recipe.name}
                        </h1>
                        <p className="text-lg text-neutral-600 mt-1">
                            By {recipe.author || "Recipe Share"}
                        </p>
                        <div className="flex items-center mt-3 gap-2 text-neutral-500">
                            <RatingStars initialRating={averageRating}/>
                            <span className="text-sm">({ratings.length} reviews)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 mt-2">
                        <SaveRecipeButton recipe={recipe}/>
                        <button
                            onClick={() => setIsCookMode(!isCookMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors text-sm
                ${
                                isCookMode
                                    ? "bg-secondary-400 text-secondary-900"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {isCookMode ? <Moon size={20}/> : <Sun size={20}/>}
                            <span>Cook Mode</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                <div className="lg:col-span-1 mb-8 lg:mb-0">
                    <IngredientChecklist
                        ingredients={recipe.ingredients || []}
                        baseServings={recipe.servings}
                    />
                </div>
                <div className="lg:col-span-2">
                    <InstructionList
                        instructions={
                            Array.isArray(recipe.instructions)
                                ? recipe.instructions
                                : []
                        }
                    />

                    <hr className="my-12 border-neutral-200"/>

                    <CommentThread
                        comments={comments}
                        onAddComment={(commentText) =>
                            console.log("New comment:", commentText)
                        }
                    />
                </div>
            </main>
        </div>
    );
};

export default RecipeDetailPage;
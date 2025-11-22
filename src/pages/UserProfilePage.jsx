import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserProfile, updateUserProfile, fetchMyRecipes } from "../services/api";
import RecipeCardGrid from "../components/recipes/RecipeCardGrid";
import ImageUpload from "../components/common/ImageUpload";
import { User, Mail, Calendar, Edit2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";

const UserProfilePage = () => {
    const { logout } = useAuth();
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Edit Form State
    const [formData, setFormData] = useState({
        display_name: "",
        bio: "",
        avatar_url: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [profileRes, recipesRes] = await Promise.all([
                fetchUserProfile(),
                fetchMyRecipes()
            ]);
            setUser(profileRes.data);
            setRecipes(recipesRes.data);
            setFormData({
                display_name: profileRes.data.display_name || "",
                bio: profileRes.data.bio || "",
                avatar_url: profileRes.data.avatar_url || ""
            });
        } catch (error) {
            console.error("Failed to load profile", error);
            toast.error("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Updating profile...");
        try {
            const res = await updateUserProfile(formData);
            setUser(res.data);
            setIsEditing(false);
            toast.success("Profile updated!", { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile", { id: toastId });
        }
    };

    if (loading) return <div className="p-12 text-center">Loading profile...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <SEO 
                title={`${user?.display_name || user?.username || 'User'}'s Profile`} 
                description={`Check out ${user?.display_name || user?.username}'s recipes on Recipy.`}
                image={user?.avatar_url}
            />
            {/* Profile Header Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-8 mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Avatar Section */}
                    <div className="flex-shrink-0">
                        {isEditing ? (
                            <div className="w-32 h-32">
                                <ImageUpload 
                                    value={formData.avatar_url} 
                                    onChange={(url) => setFormData({...formData, avatar_url: url})}
                                    className="h-full w-full rounded-full overflow-hidden"
                                />
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-100 border-4 border-white shadow-lg">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                        <User size={48} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-grow w-full">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={formData.display_name}
                                        onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                                        className="text-3xl font-bold font-serif text-neutral-900 border-b-2 border-primary-200 focus:border-primary-500 outline-none bg-transparent w-full mb-2"
                                        placeholder="Display Name"
                                    />
                                ) : (
                                    <h1 className="text-3xl font-bold font-serif text-neutral-900 mb-1">
                                        {user.display_name || user.username}
                                    </h1>
                                )}
                                <p className="text-neutral-500">@{user.username}</p>
                            </div>
                            
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-colors"
                                >
                                    <Edit2 size={16} /> Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500"
                                    >
                                        <X size={20} />
                                    </button>
                                    <button 
                                        onClick={handleUpdate}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="mb-6">
                            {isEditing ? (
                                <textarea 
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                    className="w-full p-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none min-h-[100px]"
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <p className="text-neutral-600 leading-relaxed max-w-2xl">
                                    {user.bio || "No bio yet."}
                                </p>
                            )}
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                            <div className="flex items-center gap-2">
                                <Mail size={16} /> {user.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} /> Joined {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Recipes Section */}
            <div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">My Recipes ({recipes.length})</h2>
                {recipes.length > 0 ? (
                    <RecipeCardGrid recipes={recipes} />
                ) : (
                    <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-neutral-100 border-dashed">
                        <p className="text-neutral-500">You haven't created any recipes yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;

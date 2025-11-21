import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RecipeBoxProvider } from "./context/RecipeBoxContext";
import Header from "./components/layout/Header";
import PageNavigator from "./components/layout/PageNavigator";
import DiscoverRecipesPage from "./pages/DiscoverRecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeBoxPage from "./pages/RecipeBoxPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import EditRecipePage from "./pages/EditRecipePage";
import LandingPage from "./pages/LandingPage";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

// Public Route Wrapper (redirects to discover if already logged in)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/discover" replace />;
    }

    return children;
};

import { Toaster } from 'react-hot-toast';

// ... imports ...

const AppContent = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <RecipeBoxProvider>
            <div className="min-h-screen font-sans text-neutral-800 bg-secondary-50">
                <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
                <Header isAuthenticated={isAuthenticated} logout={logout} />
                
                {isAuthenticated && <PageNavigator />}

                <div className="container mx-auto px-4 pb-20">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={
                            <PublicRoute>
                                <LandingPage />
                            </PublicRoute>
                        } />
                        <Route path="/landing" element={<Navigate to="/" replace />} />
                        <Route path="/login" element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        } />
                        <Route path="/register" element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        } />

                        {/* Protected Routes */}
                        <Route path="/discover" element={
                            <ProtectedRoute>
                                <DiscoverRecipesPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/recipe/:id" element={
                            <ProtectedRoute>
                                <RecipeDetailPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/create" element={
                            <ProtectedRoute>
                                <CreateRecipePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/my-recipes" element={
                            <ProtectedRoute>
                                <MyRecipesPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/edit/:id" element={
                            <ProtectedRoute>
                                <EditRecipePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/box" element={
                            <ProtectedRoute>
                                <RecipeBoxPage />
                            </ProtectedRoute>
                        } />

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </RecipeBoxProvider>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RecipeBoxProvider } from "./context/RecipeBoxContext";
import Header from "./components/layout/Header";
import PageNavigator from "./components/layout/PageNavigator";
import { Toaster } from 'react-hot-toast';

// Lazy Load Pages
const DiscoverRecipesPage = lazy(() => import("./pages/DiscoverRecipesPage"));
const CreateRecipePage = lazy(() => import("./pages/CreateRecipePage"));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage"));
const RecipeBoxPage = lazy(() => import("./pages/RecipeBoxPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const MyRecipesPage = lazy(() => import("./pages/MyRecipesPage"));
const EditRecipePage = lazy(() => import("./pages/EditRecipePage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-secondary-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <PageLoader />;
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
        return <PageLoader />;
    }

    if (isAuthenticated) {
        return <Navigate to="/discover" replace />;
    }

    return children;
};

const AppContent = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <RecipeBoxProvider>
            <div className="min-h-screen font-sans text-neutral-800 bg-secondary-50">
                <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
                <Header isAuthenticated={isAuthenticated} logout={logout} />
                
                {isAuthenticated && <PageNavigator />}

                <div className="container mx-auto px-4 pb-20">
                    <Suspense fallback={<PageLoader />}>
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
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <UserProfilePage />
                                </ProtectedRoute>
                            } />

                            {/* Fallback */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
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
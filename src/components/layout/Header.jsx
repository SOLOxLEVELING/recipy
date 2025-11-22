import React from 'react';
import { ChefHat, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="py-6 mb-4 border-b border-neutral-200/75 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Brand Logo */}
                <Link
                    to={isAuthenticated ? "/discover" : "/"}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <ChefHat size={32} className="text-primary-600" />
                    <h1 className="text-3xl font-bold text-neutral-800 tracking-tight font-serif">
                        Recipe Share
                    </h1>
                </Link>

                {/* Auth Buttons */}
                {isAuthenticated ? (
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            to="/profile" 
                            className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors"
                        >
                            My Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 py-2 px-4 text-sm text-neutral-600 hover:text-primary-600 font-semibold transition-colors"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/register"
                            className="px-5 py-2 bg-primary-600 text-white rounded-full text-sm font-bold hover:bg-primary-700 transition-colors shadow-sm"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
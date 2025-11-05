import React from 'react';
import {ChefHat, LogOut} from 'lucide-react';

const Header = ({isAuthenticated, logout}) => (
    <header className="py-6 mb-4
                   border-b border-neutral-200/75"> {/* <-- ADDED BORDER */}
        <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Brand Logo */}
            <div className="flex items-center gap-2">
                <ChefHat size={32} className="text-primary-600"/>
                <h1 className="text-3xl font-bold text-neutral-800 tracking-tight font-serif">
                    Recipe Share
                </h1>
            </div>

            {/* Logout Button (now appears in the header on desktop) */}
            {isAuthenticated && (
                <button
                    onClick={logout}
                    className="hidden md:flex items-center gap-2 py-2 px-4 text-sm text-neutral-600 hover:text-primary-600 font-semibold transition-colors"
                >
                    <LogOut size={16}/>
                    <span>Logout</span>
                </button>
            )}
        </div>
    </header>
);

export default Header;
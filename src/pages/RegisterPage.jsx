import React, {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {UserPlus} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";

// ...

const FormInput = (props) => (
    <input
        {...props}
        className="w-full p-3 border border-neutral-300 rounded-lg
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
);

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    // const [error, setError] = useState("");
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) { // Use formData for password and confirmPassword
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            // Updated register call arguments and success message
            await register(formData.email, formData.password, formData.username);
            toast.success("Registration successful! Please check your email to confirm.");
            navigate("/login");
        } catch (err) {
            // Updated error handling
            setError(err.message || "Failed to register. Please try again.");
            toast.error(err.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (err) {
            toast.error("Google login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
            <SEO title="Register" description="Create a new Recipy account." />
            <div className="flex flex-col items-center mb-6">
                <ChefHat size={48} className="text-primary-600 mb-2" /> {/* Changed icon and size */}
                <h2 className="text-3xl font-bold text-neutral-800 font-serif">Join Recipy</h2> {/* Updated text and font */}
                <p className="text-neutral-500">Create an account to share your recipes</p> {/* Updated text */}
            </div>

            {error && ( // Display error message
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
                    {error}
                </div>
            )}

            <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-700 font-bold py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors mb-4"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Sign up with Google
            </button>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral-500">Or register with email</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6"> {/* Changed space-y-4 to space-y-6 */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Username</label>
                    <FormInput
                        type="text"
                        name="username"
                        placeholder="YourUsername"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Email</label>
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Password</label>
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Error handled by toast */}

                <button
                    type="submit"
                    className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg
                     hover:bg-primary-700 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Create Account
                </button>
            </form>

            <p className="text-center text-sm text-neutral-600 mt-6">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-primary-600 hover:text-primary-700"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
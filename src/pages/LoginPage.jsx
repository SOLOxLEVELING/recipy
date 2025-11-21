import React, {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {ChefHat} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

// ...

const FormInput = (props) => (
    <input
        {...props}
        className="w-full p-3 border border-neutral-300 rounded-lg
              focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
);

const LoginPage = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    // const [error, setError] = useState(""); // Removed local error state
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError("");
        const loadingToast = toast.loading("Logging in...");
        try {
            await login(formData.email, formData.password);
            toast.success("Welcome back!", { id: loadingToast });
            navigate("/discover");
        } catch (err) {
            const msg = err.response?.data?.error || "Login failed.";
            toast.error(msg, { id: loadingToast });
            // setError(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
            <div className="flex flex-col items-center mb-6">
                <ChefHat size={40} className="text-primary-600 mb-3"/>
                <h2 className="text-3xl font-bold text-center text-neutral-800">
                    Welcome Back
                </h2>
                <p className="text-neutral-500 mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="••••••••"
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
                    Login
                </button>
            </form>

            <p className="text-center text-sm text-neutral-600 mt-6">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-primary-600 hover:text-primary-700"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
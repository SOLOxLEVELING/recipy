import React, { useEffect, useState } from "react";
import { Search, ArrowRight, ChefHat, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

// High-quality food images for the slider
const sliderImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-secondary-50 font-sans text-neutral-800">
      <SEO 
        title="Home" 
        description="Join a community where flavors meet creativity. Discover, share, and savor the art of home cooking."
      />
      {/* --- Hero Section with Slider --- */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Slider */}
        {sliderImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
            <ChefHat size={20} className="text-primary-300" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Welcome to Recipe Share
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight animate-fade-in-up delay-100">
            Taste the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              Extraordinary
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
            Join a community where flavors meet creativity. Discover, share, and
            savor the art of home cooking.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300">
            <Link
              to="/register"
              className="px-10 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 hover:scale-105 transition-all shadow-xl shadow-primary-900/20 flex items-center justify-center gap-2"
            >
              Start Cooking <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-primary-500 w-8"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- Artistic Features Section --- */}
      <section className="py-32 bg-secondary-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Curated for Food Lovers
            </h2>
            <p className="text-neutral-600 text-lg font-light leading-relaxed">
              We believe cooking is an expression of love. Our platform provides
              the canvas for your culinary art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group p-10 rounded-[2.5rem] bg-white border border-secondary-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-500">
              <div className="w-16 h-16 bg-secondary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Search size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
                Explore
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Dive into a vast collection of recipes. Filter by ingredients,
                diet, or mood to find exactly what you need.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-10 rounded-[2.5rem] bg-white border border-secondary-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-500 relative top-0 md:-top-8">
              <div className="w-16 h-16 bg-secondary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <ChefHat size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
                Create
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Your kitchen, your rules. Document your recipes with beautiful
                photos and detailed instructions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-10 rounded-[2.5rem] bg-white border border-secondary-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-500">
              <div className="w-16 h-16 bg-secondary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Heart size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
                Connect
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Save your favorites, follow top chefs, and build your personal
                cookbook of joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Minimalist CTA --- */}
      <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover grayscale" alt="Texture" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
            Ready to Cook?
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto font-light">
            Join us today. It's free, simple, and delicious.
          </p>
          <Link
            to="/register"
            className="inline-block px-12 py-5 bg-white text-neutral-900 rounded-full font-bold text-lg hover:bg-primary-400 hover:text-white transition-all transform hover:-translate-y-1"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-secondary-50 text-neutral-500 py-12 border-t border-secondary-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-neutral-900">
            <ChefHat size={24} className="text-primary-600" />
            <span className="text-xl font-serif font-bold">Recipe Share</span>
          </div>
          <div className="text-sm font-medium">
            © {new Date().getFullYear()} Recipe Share. Crafted with care.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

/**
 * Optimizes a Cloudinary URL by adding f_auto and q_auto parameters.
 * @param {string} url - The original image URL.
 * @returns {string} - The optimized image URL.
 */
export const getOptimizedImageUrl = (url) => {
    if (!url) return "";
    
    // Check if it's a Cloudinary URL
    if (url.includes("cloudinary.com")) {
        // If already optimized, return as is
        if (url.includes("f_auto,q_auto")) {
            return url;
        }
        // Insert transformation after /upload/
        const parts = url.split("/upload/");
        if (parts.length === 2) {
            return `${parts[0]}/upload/f_auto,q_auto/${parts[1]}`;
        }
    }

    // Check if it's an Unsplash URL
    if (url.includes("images.unsplash.com")) {
        // Replace w=... with w=800
        return url.replace(/&w=\d+/, "&w=800").replace(/\?w=\d+/, "?w=800");
    }

    return url;
};

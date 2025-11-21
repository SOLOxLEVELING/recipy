import React, { useState } from 'react';
import axios from 'axios';
import { Upload, X, Loader } from 'lucide-react';

const ImageUpload = ({ value, onChange, className }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || "");

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Update parent with the Cloudinary URL
            onChange(response.data.url);
            setPreview(response.data.url); // Use the real URL now
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Please try again.');
            setPreview(value); // Revert to original value on error
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
        setPreview('');
    };

    // Sync preview with value prop if it changes externally (e.g. after data fetch)
    React.useEffect(() => {
        setPreview(value || "");
    }, [value]);

    return (
        <div className={`relative ${className}`}>
            {preview ? (
                <div className="relative rounded-lg overflow-hidden group border border-neutral-200">
                    <img 
                        src={preview} 
                        alt="Recipe preview" 
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader className="animate-spin text-white" size={32} />
                        </div>
                    )}
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <Loader className="animate-spin text-primary-500 mb-3" size={32} />
                        ) : (
                            <Upload className="text-neutral-400 mb-3" size={32} />
                        )}
                        <p className="mb-2 text-sm text-neutral-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-neutral-500">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
            )}
        </div>
    );
};

export default ImageUpload;

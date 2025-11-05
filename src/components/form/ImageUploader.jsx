import React from "react";
import {Image, UploadCloud} from "lucide-react";

const ImageUploader = ({imagePreview, handleImageChange}) => (
    <div>
        <label className="block text-lg font-semibold text-neutral-700 mb-2">
            Recipe Image
        </label>
        <div className="mt-1 flex justify-center p-6 border-2 border-neutral-300 border-dashed rounded-xl">
            <div className="space-y-2 text-center">
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Recipe preview"
                        className="mx-auto h-52 w-auto rounded-lg object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-52 text-neutral-400">
                        <Image size={64}/>
                    </div>
                )}
                <div className="flex text-sm justify-center">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium
                       text-primary-600 hover:text-primary-700
                       focus-within:outline-none focus-within:ring-2
                       focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
            <span
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-full hover:bg-neutral-50">
              <UploadCloud size={16}/>
              <span>Upload a file</span>
            </span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </label>
                </div>
                <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
    </div>
);

export default ImageUploader;
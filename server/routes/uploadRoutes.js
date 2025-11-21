const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer (Temporary storage)
const upload = multer({ dest: 'uploads/' });

// Upload Endpoint
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'recipy_uploads',
        });

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        // Return the URL
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        // Try to delete the file if it exists
        if (req.file && req.file.path) {
             try { fs.unlinkSync(req.file.path); } catch (e) {}
        }
        res.status(500).json({ error: 'Image upload failed' });
    }
});

module.exports = router;

# Recipy Deployment Guide 🚀

This guide covers how to deploy the full Recipy stack:
1.  **Database**: Neon (PostgreSQL)
2.  **Backend**: Fly.io or Koyeb (Node.js/Express)
3.  **Frontend**: Vercel (React/Vite)

---

## 1. Database Deployment (Neon)

1.  **Sign Up**: Go to [Neon.tech](https://neon.tech) and sign up.
2.  **Create Project**: Create a new project (e.g., `recipy-db`).
3.  **Get Connection String**: Copy the "Connection String" (looks like `postgres://user:pass@ep-xyz.region.neon.tech/neondb...`).
4.  **Run Schema**:
    -   Go to the **SQL Editor** in the Neon dashboard.
    -   Open the file `server/schema.sql` from this project.
    -   Copy the entire content and paste it into the SQL Editor.
    -   Click **Run**. This will create all your tables and seed initial data.

---

## 2. Backend Deployment (Fly.io or Koyeb)

### Option A: Koyeb (Easiest for beginners)
1.  **Sign Up**: Go to [Koyeb.com](https://koyeb.com).
2.  **Create Service**:
    -   Select **GitHub** as the source.
    -   Choose your `recipy` repository.
    -   **Builder**: Select "Node.js".
    -   **Build Command**: `npm install` (ensure you are targeting the `server` directory).
    -   **Run Command**: `npm start`.
    -   **Work Directory**: Set this to `server` (Important! The backend is in a subdirectory).
3.  **Environment Variables**: Add the following:
    -   `PORT`: `8000` (or `3001`, Koyeb usually detects it, but 8000 is safe).
    -   `DATABASE_URL`: Paste your Neon connection string.
    -   `JWT_SECRET`: Generate a random string.
    -   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Your Cloudinary credentials.
4.  **Deploy**: Click "Deploy". Wait for it to become healthy.
5.  **Copy URL**: Get your backend URL (e.g., `https://recipy-backend.koyeb.app`).

### Option B: Fly.io (CLI based)
1.  Install `flyctl`.
2.  Navigate to `server/`: `cd server`.
3.  Run `fly launch`.
4.  Follow the prompts.

---

## 3. Frontend Deployment (Vercel)

1.  **Sign Up**: Go to [Vercel.com](https://vercel.com).
2.  **Add New Project**: Import your `recipy` repository.
3.  **Configure Project**:
    -   **Framework Preset**: Vite.
    -   **Root Directory**: `recipy` (or `./` if it's the root).
    -   **Build Command**: `npm run build`.
    -   **Output Directory**: `dist`.
4.  **Environment Variables**:
    -   `VITE_API_URL`: Set this to your **Backend URL** from Step 2 (e.g., `https://recipy-backend.koyeb.app/api`).
        *Note: Ensure you add `/api` at the end if your frontend expects it, or configure the base URL accordingly.*
5.  **Deploy**: Click "Deploy".

---

## 4. Final Checks

1.  Open your Vercel URL.
2.  Try to **Login** (use `anna@example.com` / password from seed or register a new user).
3.  **Test Image Upload**: Create a recipe and upload an image to verify Cloudinary.
4.  **Test Database**: Save a recipe and check if it persists.

🎉 **Congratulations! Your Recipy app is live!**

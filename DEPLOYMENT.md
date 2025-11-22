# Recipy# Deployment Guide: Recipy (Serverless)

This guide explains how to deploy Recipy as a **Serverless Application** using **Vercel** (Frontend) and **Supabase** (Backend/Database).

## Prerequisites

1.  **GitHub Account**: To host your code.
2.  **Vercel Account**: To deploy the frontend.
3.  **Supabase Account**: To host the database and auth.

---

## Part 1: Supabase Setup (Database & Auth)

1.  **Create Project**:
    *   Go to [Supabase Dashboard](https://supabase.com/dashboard).
    *   Click **New Project**.
    *   Enter a name (e.g., `recipy-portfolio`) and a strong database password.
    *   Select a region close to you.

2.  **Setup Database**:
    *   Go to the **SQL Editor** (sidebar icon).
    *   Click **New Query**.
    *   Copy the content of `server/supabase_schema.sql` from this project.
    *   Paste it into the query editor and click **Run**.
    *   This creates all your tables (recipes, profiles, etc.) and sets up security policies.

3.  **Setup Storage (Images)**:
    *   Go to **Storage** (folder icon in sidebar).
    *   Click **New Bucket**.
    *   Name it `recipe-images`.
    *   Toggle **Public bucket** to ON.
    *   Click **Save**.
    *   **Important**: You need to set policies to allow uploads.
        *   Click on the `recipe-images` bucket.
        *   Click **Configuration** -> **Policies**.
        *   Click **New Policy** -> **For full customization**.
        *   Name: "Allow Public Read".
        *   Allowed operations: Select **SELECT**.
        *   Target roles: Select **anon** and **authenticated**.
        *   Click **Review** -> **Save**.
        *   Click **New Policy** -> **For full customization**.
        *   Name: "Allow Authenticated Uploads".
        *   Allowed operations: Select **INSERT**, **UPDATE**, **DELETE**.
        *   Target roles: Select **authenticated**.
        *   Click **Review** -> **Save**.

4.  **Setup Authentication**:
    *   Go to **Authentication** -> **Providers**.
    *   Enable **Google** (optional, requires Google Cloud Console setup) or just rely on **Email/Password** (enabled by default).
    *   **Important**: Go to **Authentication** -> **URL Configuration**.
    *   Set **Site URL** to your local URL for now (`http://localhost:5173`). You will update this to your Vercel URL later.

5.  **Get Credentials**:
    *   Go to **Project Settings** (gear icon) -> **API**.
    *   Copy the **Project URL** and **anon / public** Key. You will need these for Vercel.

---

## Part 2: Vercel Deployment (Frontend)

1.  **Push to GitHub**:
    *   Ensure your project is pushed to a GitHub repository.

2.  **Import to Vercel**:
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** -> **Project**.
    *   Import your `recipy` repository.

3.  **Configure Project**:
    *   **Framework Preset**: Vite (should be auto-detected).
    *   **Root Directory**: `recipy` (if your project is in a subdirectory, otherwise leave root).
    *   **Build Command**: `npm run build`.
    *   **Output Directory**: `dist`.

4.  **Environment Variables**:
    *   Expand the **Environment Variables** section.
    *   Add the following variables (using the values from Supabase):
        *   `VITE_SUPABASE_URL`: Your Supabase Project URL.
        *   `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon/Public Key.

5.  **Deploy**:
    *   Click **Deploy**.
    *   Vercel will build your site. Once done, you'll get a live URL (e.g., `https://recipy-portfolio.vercel.app`).

---

## Part 3: Final Configuration

1.  **Update Supabase Redirects**:
    *   Go back to **Supabase Dashboard** -> **Authentication** -> **URL Configuration**.
    *   Add your new Vercel URL (e.g., `https://recipy-portfolio.vercel.app`) to **Redirect URLs**.
    *   Update **Site URL** to your Vercel URL.

2.  **Verify**:
    *   Open your Vercel URL.
    *   Try to **Sign Up** (creates a user in Supabase).
    *   Try to **Create a Recipe** (saves to Supabase DB).
    *   Try to **Upload an Image** (saves to Supabase Storage).

**Congratulations! Your full-stack serverless app is live!** 🚀

🎉 **Congratulations! Your Recipy app is live!**

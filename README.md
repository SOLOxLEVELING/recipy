# Recipy - A Modern Social Recipe Platform 🍳

Recipy is a full-stack web application designed for food enthusiasts to discover, share, and organize their favorite recipes. Built with a modern tech stack, it features a responsive design, secure authentication, and a rich user experience.

![Recipy Screenshot](https://placehold.co/1200x630/10b981/ffffff?text=Recipy+Dashboard)

## 🚀 Features

-   **User Authentication**: Secure signup and login using JWT (JSON Web Tokens).
-   **Recipe Discovery**: Browse a vast collection of recipes with advanced filtering (category, prep time, etc.) and real-time search.
-   **Create & Share**: Users can create their own recipes with rich details, including ingredients, instructions, and image uploads.
-   **Recipe Box**: Save favorite recipes to a personal collection for easy access.
-   **User Profiles**: Customizable profiles with avatars and bios.
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
-   **SEO Optimized**: Dynamic meta tags for better search engine visibility and social sharing.
-   **Performance**: Route-based code splitting and image optimization for fast load times.

## 🛠️ Tech Stack

### Frontend
-   **React**: UI library for building interactive interfaces.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **Tailwind CSS**: Utility-first CSS framework for rapid styling.
-   **React Router**: Client-side routing.
-   **React Query / Axios**: Data fetching and state management.
-   **Lucide React**: Beautiful, consistent icons.

### Backend
-   **Node.js & Express**: Robust server-side runtime and framework.
-   **PostgreSQL**: Powerful, open-source relational database.
-   **Cloudinary**: Cloud-based image management and optimization.
-   **JsonWebToken**: Secure stateless authentication.

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites
-   Node.js (v16+)
-   PostgreSQL installed and running

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/recipy.git
cd recipy
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=recipy_db
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Initialize the database:
```bash
# Run the seed script (or use your preferred migration tool)
npm run seed
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the root directory, and install dependencies:
```bash
cd ..
npm install
```

Start the development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

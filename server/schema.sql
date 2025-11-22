-- schema.sql
-- Consolidated schema for Recipy deployment (Neon/PostgreSQL)

-- 1. Clean up existing tables (optional, be careful in production!)
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS recipe_categories CASCADE;
DROP TABLE IF EXISTS instructions CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. Create Tables

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER,
    image_url TEXT,
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    quantity NUMERIC,
    unit VARCHAR(100)
);

CREATE TABLE instructions (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE recipe_categories (
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, category_id)
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saved_recipes (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, recipe_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert Initial Data (Seed)

-- Users
INSERT INTO users (username, display_name, email, password_hash, bio, avatar_url) VALUES
('ChefAnna', 'Anna', 'anna@example.com', '$2a$10$abcdefg...', 'Passionate home cook loving Italian cuisine.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'),
('BudgetBytes', 'Beth', 'beth@example.com', '$2a$10$abcdefg...', 'Cooking on a budget without sacrificing flavor.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80');

-- Categories
INSERT INTO categories (name) VALUES
('Italian'),
('Pasta'),
('Main Course'),
('Indian'),
('Vegan');

-- Recipe 1: Spaghetti Carbonara
INSERT INTO recipes (title, description, prep_time_minutes, cook_time_minutes, servings, image_url, author_id) VALUES
(
    'Classic Spaghetti Carbonara',
    'A traditional and simple Italian pasta dish. The key is using high-quality ingredients and the heat of the pasta to cook the eggs.',
    10,
    15,
    4,
    'https://placehold.co/600x400/f4a261/ffffff?text=Spaghetti+Carbonara',
    1
);

-- Ingredients for Recipe 1
INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES
(1, 'Spaghetti', 400, 'grams'),
(1, 'Pancetta', 150, 'grams'),
(1, 'Large eggs', 4, 'count'),
(1, 'Pecorino Romano cheese', 50, 'grams'),
(1, 'Black pepper', NULL, 'to taste');

-- Instructions for Recipe 1
INSERT INTO instructions (recipe_id, step_number, description) VALUES
(1, 1, 'Boil spaghetti in salted water according to package directions.'),
(1, 2, 'While pasta cooks, fry diced pancetta in a skillet until crisp. Turn off heat.'),
(1, 3, 'In a bowl, whisk eggs, grated cheese, and a generous amount of black pepper.'),
(1, 4, 'Drain the pasta and immediately add it to the skillet with the pancetta. Toss quickly.'),
(1, 5, 'Pour the egg mixture over the hot pasta and stir vigorously to create a creamy sauce. Do not return to heat.');

-- Categories for Recipe 1
INSERT INTO recipe_categories (recipe_id, category_id) VALUES
(1, 1), -- Italian
(1, 2), -- Pasta
(1, 3); -- Main Course

-- Recipe 2: Vegan Chickpea Curry
INSERT INTO recipes (title, description, prep_time_minutes, cook_time_minutes, servings, image_url, author_id) VALUES
(
    '20-Minute Vegan Chickpea Curry',
    'A quick, easy, and flavorful curry that is perfect for a weeknight meal. Naturally gluten-free and vegan.',
    5,
    20,
    4,
    'https://placehold.co/600x400/2a9d8f/ffffff?text=Vegan+Curry',
    2
);

-- Ingredients for Recipe 2
INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES
(2, 'Onion', 1, 'count'),
(2, 'Garlic cloves', 2, 'count'),
(2, 'Canned chickpeas, drained', 1, 'can'),
(2, 'Full-fat coconut milk', 1, 'can'),
(2, 'Diced tomatoes, undrained', 1, 'can'),
(2, 'Curry powder', 1.5, 'tbsp');

-- Instructions for Recipe 2
INSERT INTO instructions (recipe_id, step_number, description) VALUES
(2, 1, 'Sauté chopped onion in a large pot over medium heat until soft.'),
(2, 2, 'Add minced garlic and curry powder and cook for one more minute until fragrant.'),
(2, 3, 'Add the chickpeas, coconut milk, and diced tomatoes to the pot. Stir to combine.'),
(2, 4, 'Bring to a simmer and cook for 15-20 minutes, allowing the curry to thicken slightly. Serve hot with rice.');

-- Categories for Recipe 2
INSERT INTO recipe_categories (recipe_id, category_id) VALUES
(2, 3), -- Main Course
(2, 4), -- Indian
(2, 5); -- Vegan

-- Ratings
INSERT INTO ratings (recipe_id, user_id, score, comment) VALUES
(1, 2, 5, 'This was amazing! So easy to follow and tasted just like what I had in Rome.');

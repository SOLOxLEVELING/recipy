-- seed.sql

-- Start with a clean slate (optional: deletes existing data)
TRUNCATE TABLE users, recipes, ingredients, instructions, categories, recipe_categories, ratings RESTART IDENTITY CASCADE;

-- Insert Users
-- In a real app, password_hash would be a securely hashed password
INSERT INTO users (username, display_name, email, password_hash) VALUES
('ChefAnna', 'Anna', 'anna@example.com', 'hashed_password_1'),
('BudgetBytes', 'Beth', 'beth@example.com', 'hashed_password_2');

-- Insert Categories
INSERT INTO categories (name) VALUES
('Italian'),
('Pasta'),
('Main Course'),
('Indian'),
('Vegan');

-- Insert Recipe 1: Spaghetti Carbonara
INSERT INTO recipes (title, description, prep_time_minutes, cook_time_minutes, servings, image_url, author_id) VALUES
(
    'Classic Spaghetti Carbonara',
    'A traditional and simple Italian pasta dish. The key is using high-quality ingredients and the heat of the pasta to cook the eggs.',
    10,
    15,
    4,
    'https://placehold.co/600x400/f4a261/ffffff?text=Spaghetti+Carbonara',
    1 -- Author is ChefAnna (id=1)
) RETURNING id;

-- Use the ID returned from the previous insert (which will be 1)
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

-- Link Recipe 1 to Categories
INSERT INTO recipe_categories (recipe_id, category_id) VALUES
(1, 1), -- Italian
(1, 2), -- Pasta
(1, 3); -- Main Course


-- Insert Recipe 2: Vegan Chickpea Curry
INSERT INTO recipes (title, description, prep_time_minutes, cook_time_minutes, servings, image_url, author_id) VALUES
(
    '20-Minute Vegan Chickpea Curry',
    'A quick, easy, and flavorful curry that is perfect for a weeknight meal. Naturally gluten-free and vegan.',
    5,
    20,
    4,
    'https://placehold.co/600x400/2a9d8f/ffffff?text=Vegan+Curry',
    2 -- Author is BudgetBytes (id=2)
) RETURNING id;

-- Ingredients for Recipe 2 (its ID will be 2)
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

-- Link Recipe 2 to Categories
INSERT INTO recipe_categories (recipe_id, category_id) VALUES
(2, 3), -- Main Course
(2, 4), -- Indian
(2, 5); -- Vegan

-- Add a Rating for Recipe 1
INSERT INTO ratings (recipe_id, user_id, score, comment) VALUES
(1, 2, 5, 'This was amazing! So easy to follow and tasted just like what I had in Rome.');
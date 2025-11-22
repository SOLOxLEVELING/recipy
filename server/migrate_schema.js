const db = require('./db');

const migrate = async () => {
  try {
    console.log('Starting schema migration...');
    
    // Helper to alter column type
    const alterColumn = async (table, column, type) => {
      try {
        await db.query(`ALTER TABLE ${table} ALTER COLUMN ${column} TYPE ${type}`);
        console.log(`Altered ${table}.${column} to ${type}`);
      } catch (err) {
        console.log(`Could not alter ${table}.${column}: ${err.message}`);
      }
    };

    // Recipes table
    await alterColumn('recipes', 'description', 'TEXT');
    await alterColumn('recipes', 'image_url', 'TEXT');
    await alterColumn('recipes', 'title', 'VARCHAR(255)'); // Ensure title is at least 255, or TEXT

    // Instructions table
    await alterColumn('instructions', 'description', 'TEXT');

    // Ingredients table
    await alterColumn('ingredients', 'name', 'VARCHAR(255)'); // Increase from potential 50/100
    await alterColumn('ingredients', 'unit', 'VARCHAR(100)');

    // Users table (already done in previous step, but good to ensure)
    await alterColumn('users', 'bio', 'TEXT');
    await alterColumn('users', 'avatar_url', 'TEXT');

    console.log('Schema migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();

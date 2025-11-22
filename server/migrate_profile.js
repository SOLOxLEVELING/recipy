const db = require('./db');

const migrate = async () => {
  try {
    console.log('Starting migration...');
    
    // Add bio column if it doesn't exist
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='bio') THEN 
          ALTER TABLE users ADD COLUMN bio TEXT; 
        END IF; 
      END $$;
    `);
    console.log('Added bio column.');

    // Add avatar_url column if it doesn't exist
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='avatar_url') THEN 
          ALTER TABLE users ADD COLUMN avatar_url TEXT; 
        END IF; 
      END $$;
    `);
    console.log('Added avatar_url column.');

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();

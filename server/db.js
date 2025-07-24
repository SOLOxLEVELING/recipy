// db.js (Corrected)

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  // The original query function
  query: (text, params) => pool.query(text, params),
  // Also export the pool itself for transactions
  pool: pool,
};

const { Pool } = require("pg");
require("dotenv").config(); // only needed locally

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Needed for Railway
});

module.exports = pool;

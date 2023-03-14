const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_HOST,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
});

module.exports = pool;

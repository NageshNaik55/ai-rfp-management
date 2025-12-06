import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "rfps",
  port: process.env.DB_PORT || 5432
});

export default {
  query: (text, params) => pool.query(text, params),
  pool
};

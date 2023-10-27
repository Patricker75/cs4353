import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PW,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const executeQuery = async (query) => {
  const res = await pool.query(query);

  return res;
};

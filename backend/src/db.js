import { Pool } from "pg";

console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const executeQuery = async (query) => {
  const res = await pool.query(query);

  return res;
};

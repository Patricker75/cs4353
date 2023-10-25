import { Pool } from "pg";

const pool = new Pool ({
  
})

export const executeQuery = async(query) => {
  const res = await pool.query(query);

  return res;
}
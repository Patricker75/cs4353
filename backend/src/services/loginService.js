import { executeQuery } from "../db";

export const getLogin = async (email) => {
  const query = {
    text: `
    SELECT
      *
    FROM
      login
    WHERE
      email = $1;`,
    values: [email],
  };

  let result = await executeQuery(query);

  return result.rows[0] || null;
};

export const addLogin = async (email, hashedPassword) => {
  const query = {
    text: `
    INSERT INTO login(email, password)
    VALUES ($1, $2)
    RETURNING id;
    `,
    values: [email, hashedPassword],
  };

  let result = await executeQuery(query);

  return result.rows[0]?.id;
};

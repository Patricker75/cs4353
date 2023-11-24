import { executeQuery } from "../db";

export const getLogin = async (email, hashedPassword) => {
  const query = {
    text: `
    SELECT
      id
    FROM
      login
    WHERE
      email = $1
    AND
      password = $2;
    `,
    values: [email, hashedPassword],
  };

  let result = await executeQuery(query);

  return result.rows[0]?.id || null;
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

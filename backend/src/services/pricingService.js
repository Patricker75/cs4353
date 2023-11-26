import { executeQuery } from "../db";

export const getUserState = async (userId) => {
  const query = {
    text: `
    SELECT
      state
    FROM
      profile
    WHERE
      user_id = $1;`,
    values: [userId],
  };

  let result = await executeQuery(query);

  return result.rows[0]?.state;
};

export const getUserStatus = async (userId) => {
  const query = {
    text: `
    SELECT
      returning_customer
    FROM
      profile
    WHERE
      user_id = $1;`,
    values: [userId],
  };

  let result = await executeQuery(query);

  return result.rows[0]?.returning_customer;
};

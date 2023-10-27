import { executeQuery } from "../db";

export const registerNewLogin = async (email, password) => {
  if (await checkEmail(email)) {
    throw Error("Email is already in use");
  } else {
    addNewLogin(email, password);
  }
};

export const verifyLogin = async (email, password) => {
  if (await getLogin(email, password)) {
    let user = await getUserId(email, password);

    if (!user) {
      return -1;
    }
    return user.user_id;
  }
};

const addNewLogin = async (email, password) => {
  let query = {
    text: `INSERT INTO logins(email, password) VALUES ($1, $2)`,
    values: [email, password],
  };

  await executeQuery(query);
};

const checkEmail = async (email) => {
  let query = {
    text: `
    SELECT
      email
    FROM
      logins
    WHERE
      logins.email = $1`,
    values: [email],
  };

  let res = await executeQuery(query);

  return res.rows[0];
};

const getLogin = async (email, password) => {
  let query = {
    text: `
    SELECT
      email
    FROM
      logins
    WHERE 
      logins.email = $1
    AND
      logins.password = $2`,
    values: [email, password],
  };

  let res = await executeQuery(query);

  return res.rows[0];
};

const getUserId = async (email) => {
  let query = {
    text: `
    SELECT
      user_id
    FROM
      users
    WHERE 
      users.email = $1`,
    values: [email],
  };

  let res = await executeQuery(query);

  return res.rows[0];
};

import { executeQuery } from "../db";

const addNewLogin = async (username, password) => {
  let query = {
    text: `
      INSERT INTO logins(username, password)
      VALUES ($1, $2)
    `,
    values: [username, password],
  };

  await executeQuery(query);
};

export const handleNewLogin = async (req, res) => {
  let { username, password } = req.body;

  await addNewLogin(username, password);

  res.status(200);
  res.send({
    message: "OK",
  });
};

export const handleGetLogin = (req, res) => {};

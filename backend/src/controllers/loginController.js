import { hashPassword, comparePassword } from "../utils/hash";
import { addLogin, getLogin } from "../services/loginService";

export const registerLogin = async (email, password) => {
  try {
    let hashedPassword = await hashPassword(password);

    let loginId = await addLogin(email, hashedPassword);

    return loginId;
  } catch (error) {
    if (error.code === "23505") {
      throw Error("Email is already in use");
    }

    throw error;
  }
};

export const attemptLogin = async (email, password) => {
  try {
    let login = await getLogin(email);

    // If no login exists in DB
    if (!login) {
      return -1;
    }

    let validPassword = await comparePassword(password, login.password);

    if (!validPassword) {
      return -1;
    }

    return login.id;
  } catch (error) {
    throw error;
  }
};

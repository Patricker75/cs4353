import { hashPassword } from "../utils/hash";
import { addLogin, getLogin } from "../services/loginService";

export const registerLogin = async (email, password) => {
  try {
    let hashedPassword = hashPassword(password);

    let loginId = await addLogin(email, hashedPassword);

    return loginId;
  } catch (error) {
    if (error.code === "23505") {
      throw Error("Email is already in use");
    }
  }
};

export const attemptLogin = async (email, password) => {
  try {
    let hashedPassword = hashPassword(password);

    let loginId = await getLogin(email, hashedPassword);

    if (!loginId) {
      return -1;
    }

    return loginId;
  } catch (error) {
    console.error(error);
  }
};

const bcrypt = require ('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt. The higher the saltRounds value, the more time the hashing algorithm takes.

export const hashPassword = async (password) => {
  // TODO Implement Password Hasher
  // console.log("IMPLEMENT!!");
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // Handle error while hashin
    throw new Error('Error hashing password');
  }

  // return `!!${password}!!`; // Is this salt? Or is this pepper? -Hiep
};

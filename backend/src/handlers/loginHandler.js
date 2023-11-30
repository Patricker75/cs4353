import { registerLogin, attemptLogin } from "../controllers/loginController";

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let loginId = await attemptLogin(email, password);

    if (loginId === -1) {
      res.status(401);
      res.send({
        message: "Invalid Email or Password",
        id: loginId,
      });

      return;
    }

    res.status(200);
    res.send({
      message: "Login Successful",
      id: loginId,
    });
  } catch (error) {
    res.status(500);
    res.send({ message: "Internal Server Error" });
  }
};

export const handleNewLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let loginId = await registerLogin(email, password);

    res.status(201);
    res.send({
      message: "Registration Successful",
      id: loginId,
    });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
};

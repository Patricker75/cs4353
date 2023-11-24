import { registerNewLogin, verifyLogin } from "../controllers/authController";

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let id = await verifyLogin(email, password);

    res.status(200);
    res.send({
      message: "Login successful",
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Internal Server Error" });
  }
};

export const handleLogout = async (req, res) => {
  req.user = undefined;
  res.status(200);
  res.send({ message: "Logout successful" });
};

export const handleStatus = async (req, res) => {
  const userId = req.user;

  if (!userId) {
    res.status(401);
    res.send({ message: "User is not logged in" });
    return;
  }

  const user = users[userId];

  res.status(200);
  res.send(user);
};

export const handleRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    await registerNewLogin(email, password);

    res.status(201);
    res.send({ message: "Registration successful" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
};

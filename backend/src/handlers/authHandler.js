import { registerNewLogin, verifyLogin } from "../controllers/authController";

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let id = await verifyLogin(email, password);

    // Send a success response
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
  // Clear the user ID in the request object
  req.user = undefined;

  // Send a success response
  res.status(200);
  res.send({ message: "Logout successful" });
};

export const handleStatus = async (req, res) => {
  // Get the user ID from the request object
  const userId = req.user;

  // Check if the user is logged in
  if (!userId) {
    res.status(401);
    res.send({ message: "User is not logged in" });
    return;
  }

  // Get the user's profile from the database
  const user = users[userId];

  // Send the user's profile in the response
  res.status(200);
  res.send(user);
};

export const handleRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    await registerNewLogin(email, password);

    // Send a success response
    res.status(201);
    res.send({ message: "Registration successful" });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
};

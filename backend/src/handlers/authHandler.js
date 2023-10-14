// Simulated database for storing user information
const users = {
  "john.doe@example.com": {
    id: 1,
    name: "John Doe",
    password: "password123",
  },
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users[email];
    if (!user) {
      res.status(401);
      res.send({ message: "Invalid email or password" });
      return;
    }

    if (password !== user.password) {
      res.status(401);
      res.send({ message: "Invalid email or password" });
      return;
    }

    // Set the user ID in the request object
    req.user = user.id;

    // Send a success response
    res.status(200);
    res.send({ message: "Login successful" });
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

    // Check if the email is already in use
    if (users[email]) {
      res.status(409);
      res.send({ message: "Email already in use" });
      return;
    }

    // Add the new user to the database (simulated in-memory storage)
    users[email] = {
      id: Object.keys(users).length + 1,
      name: email, // You can change this
      password: password,
    };

    // Set the user ID in the request object
    req.user = users[email].id;

    // Send a success response
    res.status(201);
    res.send({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Internal Server Error" });
  }
};

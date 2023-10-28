import express from 'express';

const app = express();
app.use(express.json());


// Initialize the "users" object with a sample user
const users = {
  "john.doe@example.com": {
    id: 1,
    email: "john.doe@example.com",
    password: "password123",
  },
};

// Custom validation function to check email
// Custom validation function to check email
const isEmailValid = (email) => {
  // Check if the email is not empty, is a string, and meets length criteria
  return email && typeof email === 'string' && email.length >= 1 && email.length <= 255;
};

// Custom validation function to check password
const isPasswordValid = (password) => {
  // Check if the password is not empty, is a string, and meets length criteria
  return password && password.length >= 3 && password.length <= 255;
};



export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isEmailValid(email) && !isPasswordValid(password)) {
      res.status(400);
      res.send({ message: "Invalid email or password" });
      return;
    }

    const user = users[email];
    if (!user || password !== user.password) {
      res.status(401);
      res.send({ message: "Invalid email or password" });
      return;
    }

    req.user = user.id;

    res.status(200);
    res.send({ message: "Login successful" });
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
    const { email, password} = req.body;

    if (!isEmailValid(email) || !isPasswordValid(password)) {
      res.status(400);
      res.send({ message: "Invalid input for registration" });
      return;
    }

    if (users[email]) {
      res.status(409);
      res.send({ message: "Email already in use" });
      return;
    }

    users[email] = {
      id: Object.keys(users).length + 1,
      password: password,
    };

    req.user = users[email].id;

    res.status(201);
    res.send({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Internal Server Error" });
  }
};
// authRouter.js
const express = require('express');
const router = express.Router();

// Simulated database for storing user information
const users = {
};

// Create a route to handle user login (POST)
router.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users[email];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set the user ID in the request object
    req.user = user.id;

    // Send a success response
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Create a route to handle user logout (POST)
router.post('/api/auth/logout', async (req, res) => {
  // Clear the user ID in the request object
  req.user = undefined;

  // Send a success response
  res.status(200).json({ message: 'Logout successful' });
});

// Create a route to get the current user's status (GET)
router.get('/api/auth/status', async (req, res) => {
  // Get the user ID from the request object
  const userId = req.user;

  // Check if the user is logged in
  if (!userId) {
    res.status(401).json({ message: 'User is not logged in' });
    return;
  }

  // Get the user's profile from the database
  const user = users[userId];

  // Send the user's profile in the response
  res.status(200).json(user);
});

// Create a route to handle user registration (POST)
router.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the email is already in use
    if (users[email]) {
      return res.status(409).json({ message: 'Email already in use' });
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
    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

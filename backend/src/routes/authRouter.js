// This file defines the Express router for the `/api/auth` endpoint.
// This router handles user login, logout, and status.

const express = require('express');
const router = express.Router();

// Simulated database for storing user information
const users = {
  'john.doe@example.com': {
    id: 1,
    name: 'John Doe',
    password: 'password123',
  },
};

// Create a route to handle user login (POST)
router.post('/api/auth/login', async (req, res) => {
  // Get the email and password from the request body.
  const { email, password } = req.body;

  // Look up the user by their email address.
  const user = users[email];

  // If the user does not exist or the password is incorrect, return an error response.
  if (!user || password !== user.password) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  // Set the user ID in the request object.
  req.user = user.id;

  // Send a success response.
  res.status(200).json({ message: 'Login successful' });
});

// Create a route to handle user logout (POST)
router.post('/api/auth/logout', async (req, res) => {
  // Clear the user ID in the request object.
  req.user = undefined;

  // Send a success response.
  res.status(200).json({ message: 'Logout successful' });
});

// Create a route to get the current user's status (GET)
router.get('/api/auth/status', async (req, res) => {
  // Get the user ID from the request object.
  const userId = req.user;

  // If the user is not logged in, return an error response.
  if (!userId) {
    res.status(401).json({ message: 'User is not logged in' });
    return;
  }

  // Get the user's profile from the database.
  const user = users[userId];

  // Send the user's profile in the response.
  res.status(200).json(user);
});

module.exports = router;

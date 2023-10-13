// profileRouter.js
const express = require('express');
const router = express.Router();

// Simulated database for storing user profiles
const profiles = {};

// Create a route to get the user's profile (GET)
router.get('/api/profile', async (req, res) => {
  // Get the user ID from the request object
  const userId = req.user;

  // Get the user's profile from the database
  const profile = profiles[userId];

  // Send the user's profile in the response
  res.status(200).json(profile);
});

// Create a route to update the user's profile (PUT)
router.put('/api/profile', async (req, res) => {
  // Get the user ID from the request object
  const userId = req.user;

  // Get the user's profile from the database
  const profile = profiles[userId];

  // Update the profile with the request body
  Object.assign(profile, req.body);

  // Save the updated profile to the database
  profiles[userId] = profile;

  // Send a success response
  res.status(200).json({ message: 'Profile updated successfully' });
});

module.exports = router;
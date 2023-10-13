// quotesRouter.js
const express = require('express');
const router = express.Router();

// Simulated database for storing fuel quotes
const quotes = [];

// Create a route to create a new fuel quote (POST)
router.post('/api/quotes/new', async (req, res) => {
  // Get the fuel quote data from the request body
  const quoteData = req.body;

  // Add the new fuel quote to the database
  quotes.push(quoteData);

  // Send a success response
  res.status(200).json({ message: 'New fuel quote created' });
});

// Create a route to retrieve fuel quote history (GET)
router.get('/api/quotes/history', async (req, res) => {
  // Send the fuel quote history in the response
  res.status(200).json(quotes);
});

module.exports = router;
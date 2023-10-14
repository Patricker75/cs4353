// Simulated database for storing fuel quotes
const quotes = [];

export const handleNewQuote = async (req, res) => {
  // Get the fuel quote data from the request body
  const quoteData = req.body;

  // Add the new fuel quote to the database
  quotes.push(quoteData);

  // Send a success response
  res.status(200).json({ message: 'New fuel quote created' });
}

export const handleGetHistory = async (req, res) => {
  // Send the fuel quote history in the response
  res.status(200).json(quotes);
}
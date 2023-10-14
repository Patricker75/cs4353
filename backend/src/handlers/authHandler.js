// Simulated database for storing user information
const users = {
  'john.doe@example.com': {
    id: 1,
    name: 'John Doe',
    password: 'password123',
  },
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = users[email];
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  if (password !== user.password) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  // Set the user ID in the request object
  req.user = user.id;

  // Send a success response
  res.status(200).json({ message: 'Login successful' });
}

export const handleLogout = async (req, res) => {
  // Clear the user ID in the request object
  req.user = undefined;

  // Send a success response
  res.status(200).json({ message: 'Logout successful' });
}

export const handleStatus = async (req, res) => {
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
}
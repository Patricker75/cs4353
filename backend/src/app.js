const express = require('express');
const cors = require('cors');
const { json } = require('express');

const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const quotesRouter = require('./routes/quotesRouter');

const app = express();

app.use(json());
app.use(cors());

// Register the auth router
app.use('/auth', authRouter);

// Register the profile router
app.use('/profile', profileRouter);

// Register the quotes router
app.use('/quotes', quotesRouter);

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// This module exports an array of Express routers.
// This is a common way to organize your routes in an Express application.

import authRouter from "./authRouter"; // Import the authentication router.
import profileRouter from "./profileRouter"; // Import the user profile router.
import quotesRouter from "./quotesRouter"; // Import the quote router.
import testRouter from "./testRouter";

export default [
  // Export an array of the three routers.
  authRouter,
  profileRouter,
  quotesRouter,
  testRouter,
];

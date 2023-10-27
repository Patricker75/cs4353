// This file defines an Express application that serves a single route at the root path.
import "dotenv/config";

const express = require("express"); // Import the Express framework.
const cors = require("cors"); // Import the CORS middleware.
const { json } = require("express"); // Import the `json()` middleware.

import routes from "./routes"; // Import the `routes` module, which contains all of the application's routes.

const app = express(); // Create a new Express application instance.

app.use(json()); // Tell the Express application to use the `json()` middleware.
app.use(cors()); // Tell the Express application to use the `cors()` middleware.

for (let index in routes) {
  app.use(routes[index]); // Add all of the routes in the `routes` module to the Express application.
}

const PORT = 4001; // Define the port number that the Express application will listen on.

app.get("/", (req, res) => {
  // Define a route that will be triggered when a client makes a GET request to the root path of the server.
  res.status(200); // Set the response status code to 200 OK.
  res.send({ message: "Hello from server" }); // Send a JSON response with the message "Hello from server".
});

app.listen(PORT, () => {
  // Tell the Express application to start listening for requests on the specified port number.
  console.log(`Listening on port ${PORT}`);
});

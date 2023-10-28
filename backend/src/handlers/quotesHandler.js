// Simulated database for storing fuel quotes
const quotes = [];

// Custom validation function to check if fuel quote data is valid
const isFuelQuoteDataValid = (requestData) => {
  return (
    requestData &&
    typeof requestData === 'object' &&
    typeof requestData.amount === 'number' && requestData.amount > 0 && requestData.amount <= 1000 &&
    typeof requestData.unitPrice === 'number' && requestData.unitPrice > 0 && requestData.unitPrice <= 10 &&
    typeof requestData.deliveryDate === 'string' && requestData.deliveryDate.trim() !== '' && requestData.deliveryDate.length <= 255 &&
    typeof requestData.mainAddress === 'string' && requestData.mainAddress.trim() !== '' && requestData.mainAddress.length <= 255
  );
};

export const handleNewQuote = async (req, res) => {
  try {
    // Get the fuel quote data from the request body
    const requestData = req.body.requestData; // Access the 'requestData' object
    const userId = req.body.userID;

    if (!userId) {
      res.status(400);
      res.send({ error: "User ID not provided in the request." });
      return;
    }

    if (!isFuelQuoteDataValid(requestData)) {
      res.status(400);
      res.send({ error: "Invalid fuel quote data provided." });
      return;
    }

    const newFuelQuote = {
      userID: userId,
      amount: requestData.amount,
      unitPrice: requestData.unitPrice,
      deliveryDate: requestData.deliveryDate,
      mainAddress: requestData.mainAddress,
    };
    quotes.push(newFuelQuote);

    // Log the updated data
    console.log("");
    console.log("----------------------------------");
    console.log("Received new fuel data");
    console.log("User ID:", userId);
    console.log("Amount:", requestData.amount); // Use 'requestData.amount'
    console.log("Unit Price:", requestData.unitPrice); // Use 'requestData.unitPrice'
    console.log("Delivery Date:", requestData.deliveryDate); // Use 'requestData.deliveryDate'
    console.log("Main Address:", requestData.mainAddress); // Use 'requestData.mainAddress'
    console.log("----------------------------------");
    console.log("");

    res.status(200);
    res.send({ message: "New fuel data stored" });
  } catch (error) {
    // Handle any errors that may occur during data addition
    console.error("Error adding fuel quote:", error);
    res.status(500);
    res.send({ error: "Internal server error" });
  }
};

export const handleGetHistory = async (req, res) => {
  // Send the fuel quote history in the response
  res.status(200);
  res.send(quotes);
};

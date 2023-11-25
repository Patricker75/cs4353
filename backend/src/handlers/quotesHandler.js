import {
  createNewFuelQuote,
  getUserFuelQuote,
  getUserQuoteHistory,
} from "../controllers/quotesController";

// Custom validation function to check if fuel quote data is valid
const isFuelQuoteDataValid = (requestData) => {
  return (
    requestData &&
    typeof requestData === "object" &&
    typeof requestData.amount === "number" &&
    requestData.amount > 0 &&
    requestData.amount <= 1000 &&
    typeof requestData.unitPrice === "number" &&
    requestData.unitPrice > 0 &&
    requestData.unitPrice <= 10 &&
    typeof requestData.deliveryDate === "string" &&
    requestData.deliveryDate.trim() !== "" &&
    requestData.deliveryDate.length <= 255 &&
    typeof requestData.mainAddress === "string" &&
    requestData.mainAddress.trim() !== "" &&
    requestData.mainAddress.length <= 255
  );
};

export const handleAddQuote = async (req, res) => {
  try {
    let userId = req.get("userId");

    if (!userId) {
      res.status(404);
      res.send({
        error: "Missing userId",
      });

      return;
    }

    let requestData = req.body;

    let requestId = await createNewFuelQuote(userId, requestData);

    res.status(200);
    res.send({
      message: "OK",
      requestId,
    });
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

export const handleGetFuelQuote = async (req, res) => {
  try {
    let userId = req.get("userId");

    if (!userId) {
      res.status(404);
      res.send({
        error: "Missing userId",
      });

      return;
    }

    let requestId = req.params.requestId;

    if (!requestId) {
      res.status(400);
      res.send({
        error: "Missing requestId",
      });

      return;
    }

    let quote = await getUserFuelQuote(userId, requestId);

    if (!quote) {
      throw Error("No Fuel Quote Found");
    }

    res.status(200);
    res.send({
      message: "OK",
      quote,
    });
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

export const handleGetQuoteHistory = async (req, res) => {
  try {
    let userId = req.get("userId");

    if (!userId) {
      res.status(404);
      res.send({
        error: "Missing userId",
      });

      return;
    }

    let quotes = await getUserQuoteHistory(userId);

    res.status(200);
    res.send({
      message: "OK",
      quotes,
    });
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

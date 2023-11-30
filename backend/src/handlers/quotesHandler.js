import {
  createNewFuelQuote,
  getUserFuelQuote,
  getUserQuoteHistory,
} from "../controllers/quotesController";

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

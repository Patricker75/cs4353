import {
  calculatePricePerGallon,
  calculateTotal,
} from "../controllers/pricingController";

export const handleGetPrice = async (req, res) => {
  try {
    let userId = req.get("userId");

    if (!userId) {
      res.status(404);
      res.send({
        error: "Missing userId",
      });

      return;
    }

    let amount = req.params.amount;

    if (!amount) {
      res.status(400);
      res.send({
        error: "Missing amount",
      });

      return;
    }

    let unitPrice = await calculatePricePerGallon(userId, amount);
    let total = await calculateTotal(amount, unitPrice);

    res.status(200);
    res.send({
      message: "OK",
      unitPrice,
      total,
    });
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

// quotesRouter.js
import { Router } from "express";
import {
  handleAddQuote,
  handleGetFuelQuote,
  handleGetQuoteHistory,
} from "../handlers/quotesHandler";

const router = Router();

// Create a route to create a new fuel quote (POST)
router.post("/api/quotes", handleAddQuote);

router.get("/api/quotes/:requestId", handleGetFuelQuote);

// Create a route to retrieve fuel quote history (GET)
router.get("/api/quotes", handleGetQuoteHistory);

export default router;

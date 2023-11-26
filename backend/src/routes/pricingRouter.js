import { Router } from "express";
import { handleGetPrice } from "../handlers/pricingHandler";

const router = Router();

router.get("/api/pricing/:amount", handleGetPrice);

export default router;

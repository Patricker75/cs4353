import { Router } from "express";
import {
  handleGetProfile,
  handleUpdateProfile,
} from "../handlers/profileHandler";

const router = Router();

router.post("/api/profile", handleUpdateProfile);

router.get("/api/profile", handleGetProfile);

export default router;

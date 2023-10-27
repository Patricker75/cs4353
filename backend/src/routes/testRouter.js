import { Router } from "express";
import { handleNewLogin, handleGetLogin } from "../handlers/testHandler";

const router = Router();

router.post("/test/new", handleNewLogin);

router.get("/test", handleGetLogin);

export default router;

// authRouter.js
// This file defines the Express router for the `/api/auth` endpoint.
// This router handles user login, logout, and status.
import { Router } from "express";
import { handleLogin, handleNewLogin } from "../handlers/loginHandler";

const router = Router();

// Create a route to handle user login (POST)
router.post("/api/login", handleLogin);

// Create a route to handle user registration (POST)
router.post("/api/login/register", handleNewLogin);

export default router;

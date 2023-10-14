// authRouter.js
// This file defines the Express router for the `/api/auth` endpoint.
// This router handles user login, logout, and status.
import { Router } from 'express';
import { handleLogin, handleLogout, handleStatus } from '../handlers/authHandler';

const router = Router();

// Create a route to handle user login (POST)
router.post('/api/auth/login', handleLogin);

// Create a route to handle user logout (POST)
router.post('/api/auth/logout', handleLogout);

// Create a route to get the current user's status (GET)
router.get('/api/auth/status', handleStatus);

export default router;

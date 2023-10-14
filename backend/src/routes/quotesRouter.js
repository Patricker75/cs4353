// quotesRouter.js
import { Router } from 'express';
import { handleNewQuote, handleGetHistory } from '../handlers/quotesHandler';

const router = Router();

// Create a route to create a new fuel quote (POST)
router.post('/api/quotes/new', handleNewQuote);

// Create a route to retrieve fuel quote history (GET)
router.get('/api/quotes/history', handleGetHistory);

export default router;
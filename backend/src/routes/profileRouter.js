import { Router } from 'express';
import { handleGetProfile, handleProfileUpdate } from '../handlers/profileHandler';

const router = Router();

router.put('/api/profile', handleProfileUpdate);

router.get('/api/profile', handleGetProfile);

export default router;

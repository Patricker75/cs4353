import { Router } from 'express';
import { handleProfileUpdate } from '../handlers/profileHandler';

const router = Router();

router.put('/api/profile', handleProfileUpdate);

export default router;

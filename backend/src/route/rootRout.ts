import { Router } from 'express';
import authRoute from '../feature/auth/auth.router';

const router = Router();

router.use('/auth', authRoute);

export default router;

import { Router } from 'express';
import authRoute from '../feature/auth/auth.router';
import locationRoute from '../feature/location/location.router';

const router = Router();

router.use('/auth', authRoute);
router.use("/location", locationRoute)

export default router;

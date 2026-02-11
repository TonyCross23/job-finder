import { Router } from 'express';
import authRoute from '../feature/auth/auth.router';
import locationRoute from '../feature/location/location.router';
import applicantProfileRoute from '../feature/applicantProfile/applicantProfile.router';

const router = Router();

router.use('/auth', authRoute);
router.use('/location', locationRoute);
router.use('/applicantprofile', applicantProfileRoute);

export default router;

import { Router } from 'express';
import authRoute from '../feature/auth/auth.router';
import locationRoute from '../feature/location/location.router';
import applicantProfileRoute from '../feature/applicantProfile/applicantProfile.router';
import socialRoute from '../feature/socialmedia/social.router';

const router = Router();

router.use('/auth', authRoute);
router.use('/location', locationRoute);
router.use('/applicantprofile', applicantProfileRoute);
router.use('/socialmedia', socialRoute);

export default router;

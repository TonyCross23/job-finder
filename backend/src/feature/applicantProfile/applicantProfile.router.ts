import { Router } from 'express';
import { container } from './applicantProfile.container';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validation } from '../../middlewares/validation.middleware';
import { applicantProfileSchema } from '../../schemas/applicantProfile/applicantProfile.validation';

export const applicantProfileRoute = Router();
const { applicantProfileController } = container;

applicantProfileRoute.post('/', authMiddleware.authenticate, validation(applicantProfileSchema), applicantProfileController.create);
applicantProfileRoute.put('/:id', authMiddleware.authenticate, validation(applicantProfileSchema), applicantProfileController.update);
applicantProfileRoute.get('/me', authMiddleware.authenticate, applicantProfileController.getMe);

export default applicantProfileRoute;

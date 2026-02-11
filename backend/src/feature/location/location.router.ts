import { Router } from 'express';
import { container } from './location.container';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validation } from '../../middlewares/validation.middleware';
import { locationSchema } from '../../schemas/location/location.validation';

const locationRoute = Router();
const { locationController } = container;

locationRoute.post(
  '/',
  authMiddleware.authenticate,
  validation(locationSchema),
  locationController.create,
);
locationRoute.get('/', authMiddleware.authenticate, locationController.getAll);
locationRoute.get('/:id', authMiddleware.authenticate, locationController.getById);
locationRoute.put('/:id', authMiddleware.authenticate, locationController.update);
locationRoute.delete('/:id', authMiddleware.authenticate, locationController.delete);

export default locationRoute;

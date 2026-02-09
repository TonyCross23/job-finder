import { prisma } from '../../database/prisma';
import { LocationController } from './controller/location.controller';
import { LocationRepository } from './infrastructure/location.repository';
import { LocationService } from './useCase/location.service';

const locationRepository = new LocationRepository(prisma);
const locationService = new LocationService(locationRepository);
const locationController = new LocationController(locationService);

export const container = { locationController };

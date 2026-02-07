import { prisma } from '../../database/prisma';
import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

const locationRepository = new LocationRepository(prisma);
const locationService = new LocationService(locationRepository);
const locationController = new LocationController(locationService);

export const container = {locationController};

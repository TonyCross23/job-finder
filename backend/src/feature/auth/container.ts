import { prisma } from '../../database/prisma.js';
import { AuthMiddleware } from '../../middlewares/auth.middleware.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthRepository } from './useCase/interface/auth.repository.js';

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware(authRepository);

export const container = {
  authController,
  authMiddleware,
};

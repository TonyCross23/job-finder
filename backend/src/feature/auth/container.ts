import { prisma } from '../../database/prisma';
import { AuthController } from './auth.controller';
import { AuthRepository } from './infrastructure/auth.repository';
import { AuthService } from './useCase/auth.service';

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export const container = { authController };

import { Request, Response, NextFunction } from 'express';
import { IAuthRepository } from '../feature/auth/useCase/interface/auth.repository.interface.js';
import { signAccessToken, verifyAccessToken } from '../utils/jwt.js';

export class AuthMiddleware {
  constructor(private authRepo: IAuthRepository) {}

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) {
      res.status(401).json({ message: 'No access token' });
      return;
    }

    try {
      const payload = verifyAccessToken(accessToken);
      req.userId = payload.userId;
      return next();
    } catch (err: any) {
      if (err.name !== 'TokenExpiredError') {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      // access token expired → try refresh
      const refreshToken = req.headers['x-refresh-token'] as string;
      if (!refreshToken) {
        res.status(401).json({ message: 'No refresh token' });
        return;
      }

      const stored = await this.authRepo.findRefreshToken(refreshToken);
      if (!stored || stored.expiresAt < new Date()) {
        res.status(401).json({ message: 'Invalid refresh token' });
        return;
      }

      const newAccessToken = signAccessToken(stored.userId);

      res.setHeader('x-access-token', newAccessToken);
      req.userId = stored.userId;

      return next();
    }
  };
}

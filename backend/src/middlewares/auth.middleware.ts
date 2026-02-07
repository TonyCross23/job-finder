// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { HTTP_STATUS } from '../config/httpStatusCode';

export class AuthMiddleware {

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'No access token' });
      return;
    }

    try {
      const payload = verifyAccessToken(accessToken);
      req.userId = payload.userId;
      return next();
    } catch (err: any) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Access token expired or invalid' });
    }
  };
}
export const authMiddleware = new AuthMiddleware();
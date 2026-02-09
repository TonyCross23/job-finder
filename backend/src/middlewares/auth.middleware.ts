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
      const userData = verifyAccessToken(accessToken);

      req.id = userData.id;
      req.userName = userData.name;
      req.userEmail = userData.email;

      if (!req.id) {
        throw new Error('User ID missing from token');
      }
      return next();
    } catch (err: any) {
      console.log("Verify Error Name:", err.name);
      console.log("Verify Error Message:", err.message);
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Access token expired or invalid' });
    }
  };
}
export const authMiddleware = new AuthMiddleware();

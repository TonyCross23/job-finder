import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/httpErrors.js';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
};

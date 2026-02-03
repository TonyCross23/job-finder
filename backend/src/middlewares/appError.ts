import { Request, Response } from 'express';
import { AppError } from '../errors/httpErrors.js';

// Must have 4 args: err, req, res, next
export const errorHandler = (err: unknown, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
};

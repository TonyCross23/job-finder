import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { dbConfig } from '../config/db';

export const signAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, dbConfig.access_secret, { expiresIn: '15m' });
};

export const verifyAccessToken = (token: string): { userId: string } => {
  const payload = jwt.verify(token, dbConfig.access_secret);
  if (typeof payload === 'object' && payload !== null && 'userId' in payload) {
    return payload as { userId: string };
  }
  throw new Error('Invalid token payload');
};

export const generateRefreshToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

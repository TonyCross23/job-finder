import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { dbConfig } from '../config/db';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

export const signAccessToken = (data: TokenPayload): string => {
  return jwt.sign({ data }, dbConfig.access_secret, { expiresIn: '15m' });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, dbConfig.access_secret) as any;
    console.log("Decoded raw data:", decoded);
    if (decoded && decoded.id) {
      return { id: decoded.id, name: decoded.name, email: decoded.email };
    }

    if (decoded && decoded.data && decoded.data.id) {
      return {
        id: decoded.data.id,
        name: decoded.data.name,
        email: decoded.data.email
      };
    }

    if (decoded && decoded.payload && decoded.payload.id) {
      return {
        id: decoded.payload.id,
        name: decoded.payload.name,
        email: decoded.payload.email
      };
    }

    throw new Error('Invalid token payload');
  } catch (error) {
    throw error
  }
};

export const generateRefreshToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

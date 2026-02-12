import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { dbConfig } from '../config/db';
import { Response } from 'express';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

export const signAccessToken = (data: TokenPayload): string => {
  return jwt.sign({ ...data }, dbConfig.access_secret, { expiresIn: '15m' });
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// logout
export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, dbConfig.access_secret) as any;
    if (!decoded.id || !decoded.email) {
      throw new Error('Invalid token payload');
    }
    return { id: decoded.id, name: decoded.name, email: decoded.email };
  } catch (error) {
    throw new Error('Token verification failed');
  }
};


export const generateRefreshToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

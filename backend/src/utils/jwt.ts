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

export const verifyAccessToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, dbConfig.access_secret) as any;

  if (decoded?.id) {
    return { id: decoded.id, name: decoded.name, email: decoded.email };
  }

  if (decoded?.data?.id) {
    return { id: decoded.data.id, name: decoded.data.name, email: decoded.data.email };
  }

  if (decoded?.payload?.id) {
    return { id: decoded.payload.id, name: decoded.payload.name, email: decoded.payload.email };
  }

  throw new Error('Invalid token payload');
};


export const generateRefreshToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

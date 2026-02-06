import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../utils/redis';

export const apiLimiter = rateLimit({
  store: new RedisStore({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendCommand: (...args: [string, ...any[]]) => redisClient.call(...args) as any,
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 20 requests per IP per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

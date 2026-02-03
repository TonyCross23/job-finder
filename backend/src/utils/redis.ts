import { Redis } from 'ioredis';
import { logger } from '../middlewares/logger.js';
import { dbConfig } from '../config/db.js';

export const redisClient = new Redis({
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  db: dbConfig.db,
});

redisClient.on('connect', () => logger.info('Redis connected'));
redisClient.on('error', (err: Error) => logger.error('Redis Client Error', err));

// Example usage
await redisClient.set('foo', 'bar');
const result = await redisClient.get('foo');
logger.info(result);

import app from './app';
import http from 'http';
import { logger } from './middlewares/logger';
import { dbConfig } from './config/db';
import { initCronJobs } from './cron';

const PORT = dbConfig.hport;

const server = http.createServer(app);

initCronJobs();

server.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down...');
  server.close(() => process.exit(0));
});

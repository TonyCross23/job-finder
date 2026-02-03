import app from './app.js';
import http from 'http';
import { logger } from './middlewares/logger.js';
import { dbConfig } from './config/db.js';

const PORT = dbConfig.hport;

const server = http.createServer(app);

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

import morgan from 'morgan';
import pino from 'pino';
import pretty from 'pino-pretty';
import winston from 'winston';
import 'winston-daily-rotate-file';

// --------------------
// Winston setup
// --------------------
const logDir = 'logs'; // folder for log files

const transport = new winston.transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-app.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`,
    ),
  ),
  transports: [transport, new winston.transports.Console()],
});

// --------------------
// Pino setup
// --------------------
export const pinoLogger = pino(
  pretty({
    colorize: true,
    translateTime: 'yyyy-mm-dd HH:MM:ss',
    ignore: 'pid,hostname',
  }),
);

// --------------------
//  Morgan middleware
// --------------------
export const morganMiddleware = morgan('dev', {
  stream: {
    write: (message) => pinoLogger.info(message.trim()),
  },
});

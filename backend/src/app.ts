import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middlewares/appError.js';
import healthRouter from './route/healthy.js';
import { morganMiddleware } from './middlewares/logger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

const app = express();

// Security Headers
app.use(helmet());

// Gzip compression
app.use(compression());

// JSON body parser
app.use(express.json());

// URL encoded parser
app.use(express.urlencoded({ extended: true }));

app.use(apiLimiter);

// Morgan → Pino → Winston
app.use(morganMiddleware);

app.use(healthRouter);

// errorHandler
app.use(errorHandler);

export default app;

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middlewares/appError';
import healthRouter from './route/healthy';
import { morganMiddleware } from './middlewares/logger';
import router from './route/rootRout';
import cookieParser from 'cookie-parser';

const app = express();

// Security Headers
app.use(helmet());

// Gzip compression
app.use(compression());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// JSON body parser
app.use(express.json());

// URL encoded parser
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Morgan → Pino → Winston
app.use(morganMiddleware);

app.use(healthRouter);
app.use('/api/v1', router);

// errorHandler
app.use(errorHandler);

export default app;

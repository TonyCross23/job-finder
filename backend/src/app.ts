import 'reflect-metadata';
import express from 'express';
import cors from "cors"
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middlewares/appError.js';
import healthRouter from './route/healthy.js';
import { morganMiddleware } from './middlewares/logger.js';
import router from './route/rootRout.js';

const app = express();

// Security Headers
app.use(helmet());

// Gzip compression
app.use(compression());

app.use(cors({
    origin: ['http://192.168.1.11:5173', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// JSON body parser
app.use(express.json());

// URL encoded parser
app.use(express.urlencoded({ extended: true }));


// Morgan → Pino → Winston
app.use(morganMiddleware);

app.use(healthRouter);
app.use('/api/v1', router);

// errorHandler
app.use(errorHandler);

export default app;

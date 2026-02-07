import { Router } from 'express';
import { apiLimiter } from '../middlewares/rateLimiter';

const healthRouter = Router();

healthRouter.get('/health', apiLimiter, (_req, res) => {
  res.json({ status: 'OK' });
});

export default healthRouter;

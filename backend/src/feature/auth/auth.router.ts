import { Router } from 'express';
import { container } from './container';
import { validation } from '../../middlewares/validation.middleware';
import { RegisterSchema } from '../../schemas/auth/regitst.validation';
import { ResetPasswordSchema } from '../../schemas/auth/reset.validation';
import { ForgotSchema } from '../../schemas/auth/forgot.validation';
import { authLimiter } from '../../middlewares/authRateLimit';

const authRoute = Router();
const { authController, authMiddleware } = container;

authRoute.post('/code', authController.sendCode);
authRoute.post('/register', authLimiter, validation(RegisterSchema), authController.register);
authRoute.post('/login', authLimiter, authController.login);
authRoute.post('/refresh', authController.refresh);
authRoute.post('/logout', authMiddleware.authenticate, authController.logout);
authRoute.post(
  '/forgot-password',
  validation(ForgotSchema),
  authLimiter,
  authController.forgotPassword,
);
authRoute.post(
  '/reset-password',
  validation(ResetPasswordSchema),
  authLimiter,
  authController.resetPassword,
);

authRoute.get('/me', authMiddleware.authenticate, (req, res) => {
  console.log(req.userId);
  res.json({ userId: req.userId });
});

export default authRoute;

import { Router } from 'express';
import { container } from './container';
import { validation } from '../../middlewares/validation.middleware';
import { RegisterSchema } from '../../schemas/auth/regitst.validation';
import { ResetPasswordSchema } from '../../schemas/auth/reset.validation';
import { ForgotSchema } from '../../schemas/auth/forgot.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const authRoute = Router();
const { authController } = container;

authRoute.post('/code', authController.sendCode);
authRoute.post('/register', validation(RegisterSchema), authController.register);
authRoute.post('/login', authController.login);
authRoute.post('/refresh', authController.refresh);
authRoute.post('/logout', authMiddleware.authenticate, authController.logout);
authRoute.post(
  '/forgot-password',
  validation(ForgotSchema),

  authController.forgotPassword,
);
authRoute.post(
  '/reset-password',
  validation(ResetPasswordSchema),

  authController.resetPassword,
);

authRoute.get('/me', authMiddleware.authenticate, (req, res) => {
  res.json({
    id: req.user!.id,
    name: req.user!.name,
    email: req.user!.email,
  });
});

export default authRoute;

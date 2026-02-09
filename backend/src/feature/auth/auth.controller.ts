import catchAsync from '../../config/catchAsync';
import { HTTP_STATUS } from '../../config/httpStatusCode';
import { AppError } from '../../errors/httpErrors';
import { IAuthService } from './useCase/auth.service.interface';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private service: IAuthService) {}

  sendCode = catchAsync(async (req: Request, res: Response) => {
    console.log('DEBUG: Request Body is', req.body);
    const { email } = req.body;
    const device = req.headers['user-agent'] || 'unknown device';
    const result = await this.service.sendVerificationCode(email, device);
    res.status(HTTP_STATUS.OK).json(result);
  });

  register = catchAsync(async (req: Request, res: Response) => {
    const { email, username, password, roleId, code } = req.body;
    const device = req.headers['user-agent'] || 'unknown device';

    const result = await this.service.registerWithCode(
      { email, username, password, roleId },
      code,
      device,
    );
    res.status(HTTP_STATUS.CREATED).json(result);
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const device = req.headers['user-agent'] || 'unknown device';
    const result = await this.service.login(email, password, device);
    res.status(HTTP_STATUS.OK).json(result);
  });

  refresh = catchAsync(async (req: Request, res: Response) => {
    console.log('refresh', req.body);
    const { refreshToken } = req.body;
    const device = req.headers['user-agent'] || 'unknown device';
    if (!refreshToken) throw new AppError('Refresh token required', 400);

    const token = await this.service.refresh(refreshToken, device);
    res.status(HTTP_STATUS.OK).json(token);
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.body;
    const device = req.headers['user-agent'] || 'unknown device';
    await this.service.loguot(token, device);
    res.status(HTTP_STATUS.OK).json({ message: 'Logout succefully' });
  });

  forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const device = req.headers['user-agent'] || 'unknown device';

    const result = await this.service.forgotPassword(email, device);
    res.status(200).json(result);
  });

  resetPassword = catchAsync(async (req, res) => {
    const device = req.headers['user-agent'] || 'unknown device';

    const result = await this.service.resetPassword(req.body, device);
    res.status(200).json(result);
  });
}

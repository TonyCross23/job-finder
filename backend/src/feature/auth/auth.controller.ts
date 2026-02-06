import catchAsync from '../../config/catchAsync';
import { HTTP_STATUS } from '../../config/httpStatusCode';
import { IAuthService } from './useCase/auth.service.interface';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private service: IAuthService) {}

  sendCode = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await this.service.sendVerificationCode(email);
    res.status(HTTP_STATUS.OK).json(result);
  });

  register = catchAsync(async (req: Request, res: Response) => {
    const { email, username, password, roleId, code } = req.body;
    const result = await this.service.registerWithCode({ email, username, password, roleId }, code);
    res.status(HTTP_STATUS.CREATED).json(result);
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    res.status(HTTP_STATUS.OK).json(result);
  });

  refresh = catchAsync(async (req: Request, res: Response) => {
    const token = await this.service.refresh(req.body.token);
    res.status(HTTP_STATUS.OK).json(token);
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.body;
    await this.service.loguot(token);
    res.status(HTTP_STATUS.OK).json({ message: 'Logout succefully' });
  });

  forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await this.service.forgotPassword(email);
    res.status(200).json(result);
  });

  resetPassword = catchAsync(async (req, res) => {
    const result = await this.service.resetPassword(req.body);
    res.status(200).json(result);
  });
}

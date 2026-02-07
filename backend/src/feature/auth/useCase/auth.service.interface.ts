import { CreateUserDTO } from '../dto/auth.dto';
import { AuthTokensDTO } from '../dto/auth.response.dto';
import { ResetPasswordDTO } from '../dto/forgot-password.dto';

export interface IAuthService {
  login(email: string, password: string, device: string): Promise<AuthTokensDTO>;
  sendVerificationCode(email: string, device: string): Promise<{ message: string }>;
  registerWithCode(dto: CreateUserDTO, code: string, device: string): Promise<AuthTokensDTO>;
  refresh(token: string, device: string): Promise<AuthTokensDTO>;
  loguot(token: string, device: string): Promise<void>;
  forgotPassword(email: string, device: string): Promise<{ message: string }>;
  resetPassword(dto: ResetPasswordDTO, device: string): Promise<{ message: string }>;
}

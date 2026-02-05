import { CreateUserDTO } from '../dto/auth.dto.js';
import { AuthTokensDTO } from '../dto/auth.response.dto.js';
import { ResetPasswordDTO } from '../dto/forgot-password.dto.js';

export interface IAuthService {
  login(email: string, password: string): Promise<AuthTokensDTO>;
  sendVerificationCode(email: string): Promise<{ message: string }>;
  registerWithCode(dto: CreateUserDTO, code: string): Promise<AuthTokensDTO>;
  refresh(token: string): Promise<AuthTokensDTO>;
  loguot(token: string): Promise<void>;
  forgotPassword(email: string): Promise<{ message: string }>;
  resetPassword(dto: ResetPasswordDTO): Promise<{ message: string }>;
}

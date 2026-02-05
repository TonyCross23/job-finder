import { CreateUserDTO, RefreshTokenDTO, UserDTO } from '../../dto/auth.dto.js';

export interface IAuthRepository {
  createUser(data: CreateUserDTO): Promise<UserDTO>;
  findUserByEmail(email: string): Promise<UserDTO | null>;
  saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>;
  saveEmailCode(email: string, code: string, expiresAt: Date): Promise<void>;
  getEmailCode(email: string): Promise<string | null>;
  deleteEmailCode(email: string): Promise<void>;
  findRefreshToken(token: string): Promise<RefreshTokenDTO | null>;
  deleteRefreshToken(token: string): Promise<void>;
  deleteExpiredTokens(userId: string, exceptToken: string): Promise<void>;
  forgotPasswordCode(email: string, code: string, expiresAt: Date): Promise<void>;

  getForgotPasswordCode(email: string): Promise<string | null>;

  deleteForgotPasswordCode(email: string): Promise<void>;

  updatePassword(email: string, password: string): Promise<void>;
}

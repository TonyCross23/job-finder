import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { IAuthService } from './auth.service.interface';
import { IAuthRepository } from '../infrastructure/auth.repository.interface';
import { AppError } from '../../../errors/httpErrors';
import { sendEmail } from '../../../utils/email';
import { CreateUserDTO } from '../dto/auth.dto';
import { AuthTokensDTO } from '../dto/auth.response.dto';
import { ResetPasswordDTO } from '../dto/forgot-password.dto';
import { signAccessToken } from '../../../utils/jwt';

export class AuthService implements IAuthService {
  constructor(private repo: IAuthRepository) { }
  async sendVerificationCode(email: string): Promise<{ message: string }> {
    const existingUser = await this.repo.findUserByEmail(email);
    if (existingUser) throw new AppError('Email already registered', 409);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10min

    await this.repo.saveEmailCode(email, code, expiresAt);

    await sendEmail({
      to: email,
      subject: 'Your verification code',
      text: `Your verification code is: ${code}`,
    });
    return { message: 'Verification code sent to your email' };
  }
  async registerWithCode(dto: CreateUserDTO, code: string, device: string): Promise<AuthTokensDTO> {
    const savedCode = await this.repo.getEmailCode(dto.email);
    if (!savedCode || savedCode !== code)
      throw new AppError('Invalid or expired verification code', 400);

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.repo.createUser({ ...dto, password: hashed });

    await this.repo.deleteEmailCode(dto.email);

    return this.issueTokens(user.id, device);
  }

  // async register(dto: CreateUserDTO): Promise<AuthTokensDTO> {
  //     const hashed = await bcrypt.hash(dto.password, 10);
  //     const user = await this.repo.createUser({ ...dto, password: hashed });
  //     return this.issueTokens(user.id);
  // }

  async login(email: string, password: string, device: string): Promise<AuthTokensDTO> {
    const user = await this.repo.findUserByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 409);
    }
    const compnarePassword = await bcrypt.compare(password, user.password);

    if (!user || !compnarePassword) {
      throw new AppError('Invalid credentials', 409);
    }

    return this.issueTokens(user.id, device);
  }

  async refresh(token: string, device: string): Promise<AuthTokensDTO> {
    const stored = await this.repo.findRefreshToken(token);
    if (!stored || stored.expiresAt < new Date()) {
      throw new AppError('Invalid refresh token', 400);
    }

    await this.repo.deleteRefreshToken(token);

    return this.issueTokens(stored.userId, device);
  }

  async loguot(token: string): Promise<void> {
    await this.repo.deleteRefreshToken(token);
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.repo.findUserByEmail(email);

    if (!user) {
      throw new AppError('Email not found', 404);
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.repo.forgotPasswordCode(email, code, new Date(Date.now() + 10 * 60 * 1000));

    await sendEmail({
      to: email,
      subject: 'Reset your password',
      text: `Your password reset code is: ${code}`,
    });

    return { message: 'Reset code sent to email' };
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const savedCode = await this.repo.getForgotPasswordCode(dto.email);

    if (!savedCode || savedCode !== dto.code) {
      throw new AppError('Invalid or expired reset code', 400);
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new AppError('Passwords do not match', 400);
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    await this.repo.updatePassword(dto.email, hashed);
    await this.repo.deleteForgotPasswordCode(dto.email);

    return { message: 'Password reset successfully' };
  }

  private async issueTokens(userId: string, device: string): Promise<AuthTokensDTO> {
    const user = await this.repo.findUserById(userId);

    if (!user) throw new AppError('User not found', 404);
    const accessToken = signAccessToken({
      id: user.id,
      name: user.username,
      email: user.email
    });
    const refreshToken = crypto.randomBytes(32).toString('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.repo.saveRefreshToken(userId, device, refreshToken, expiresAt);
    await this.repo.deleteExpiredTokens(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}

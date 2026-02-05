import { AppError } from '../../../../errors/httpErrors.js';
import { PrismaClient } from '../../../../generated/prisma/client.js';
import { CreateUserDTO, UserDTO, RefreshTokenDTO } from '../../dto/auth.dto.js';
import { IAuthRepository } from './auth.repository.interface.js';

interface MemoryEmailCode {
  code: string;
  expiresAt: Date;
}

interface ResetCode {
  code: string;
  expiresAt: Date;
}

const resetCodes: Record<string, ResetCode> = {};

const emailCodes: Record<string, MemoryEmailCode> = {};

export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaClient) {}

  async saveEmailCode(email: string, code: string, expiresAt: Date): Promise<void> {
    emailCodes[email] = { code, expiresAt };
  }
  async getEmailCode(email: string): Promise<string | null> {
    const record = emailCodes[email];
    if (!record) return null;
    if (record.expiresAt < new Date()) return null;
    return record.code;
  }

  async deleteEmailCode(email: string): Promise<void> {
    delete emailCodes[email];
  }

  async createUser(data: CreateUserDTO): Promise<UserDTO> {
    if (!data.roleId) data.roleId = 1;
    const roleExists = await this.prisma.role.findUnique({
      where: { id: data.roleId },
    });
    if (!roleExists) {
      throw new AppError(`Role with id ${data.roleId} does not exist`, 400);
    }

    try {
      const user = await this.prisma.user.create({ data });
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        roleId: user.roleId,
      };
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new AppError('Email already exists', 409);
      }
      throw err;
    }
  }
  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    };
  }
  async saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    await this.prisma.refreshToken.create({ data: { userId, token, expiresAt } });
  }
  async findRefreshToken(token: string): Promise<RefreshTokenDTO | null> {
    const user = await this.prisma.refreshToken.findUnique({ where: { token } });
    return user
      ? { id: user.id, token: user.token, userId: user.userId, expiresAt: user.expiresAt }
      : null;
  }
  async deleteRefreshToken(token: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
  }
  async deleteExpiredTokens(userId: string, exceptToken: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId, token: { not: exceptToken }, expiresAt: { lt: new Date() } },
    });
  }

  async forgotPasswordCode(email: string, code: string, expiresAt: Date) {
    resetCodes[email] = { code, expiresAt };
  }

  async getForgotPasswordCode(email: string): Promise<string | null> {
    const record = resetCodes[email];
    if (!record || record.expiresAt < new Date()) return null;
    return record.code;
  }

  async deleteForgotPasswordCode(email: string) {
    delete resetCodes[email];
  }

  async updatePassword(email: string, password: string) {
    await this.prisma.user.update({
      where: { email },
      data: { password },
    });
  }
}

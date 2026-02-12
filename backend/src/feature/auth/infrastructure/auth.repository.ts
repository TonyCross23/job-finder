import { AppError } from '../../../errors/httpErrors';
import { Prisma, PrismaClient } from '../../../generated/prisma/client';
import { redisClient } from '../../../utils/redis';
import { CreateUserDTO, UserDTO, RefreshTokenDTO } from '../dto/auth.dto';
import { IAuthRepository } from './auth.repository.interface';

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
  constructor(private prisma: PrismaClient) { }

  async saveEmailCode(email: string, code: string, expiresAt: Date): Promise<void> {
    const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
    await redisClient.set(`email_code:${email}`, code, 'EX', ttl);
  }
  
  async getEmailCode(email: string): Promise<string | null> {
    return await redisClient.get(`email_code:${email}`);
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
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new AppError('Email already exists', 409);
        }
      }
      throw err;

    }
  }
  async findUserById(id: string): Promise<UserDTO | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: {
        applicantProfile: true,
        socialMedia: true
      } 
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      roleId: user.roleId,
      createdAt: user.createdAt,
    };
  }
  async findUserByEmail(email: string): Promise<UserDTO | null> {
    if (!email) {
      return null;
    }
    const user = await this.prisma.user.findUnique({ where: { email: email } });

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
  async saveRefreshToken(
    userId: string,
    device: string,
    token: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.refreshToken.create({ data: { userId, device, token, expiresAt } });
    const ttlSeconds = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
    if (ttlSeconds > 0) {
      await redisClient.set(
        `refresh_token:${token}`,
        JSON.stringify({ userId, device }),
        'EX',
        ttlSeconds,
      );
    }
  }
  async findRefreshToken(token: string): Promise<RefreshTokenDTO | null> {
    // redis cache token
    const cachedToken = await redisClient.get(`refresh_token:${token}`);
    if (cachedToken) {
      const parsed = JSON.parse(cachedToken);
      return {
        id: '', // redis not store id
        token: token,
        userId: parsed.userId,
        device: parsed.device,
        expiresAt: new Date(), // valid ttl
      };
    }
    const dbToken = await this.prisma.refreshToken.findUnique({ where: { token } });
    if (dbToken && dbToken.expiresAt > new Date()) {
      return {
        id: dbToken.id,
        token: dbToken.token,
        userId: dbToken.userId,
        device: dbToken.device,
        expiresAt: dbToken.expiresAt,
      };
    }
    return null;
  }
  async deleteRefreshToken(token: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
    // delete redis cache token
    await redisClient.del(`refresh_token:${token}`);
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

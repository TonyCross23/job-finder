import request from 'supertest';
import { prisma } from '../database/prisma';
import app from '../app';

describe('Auth API Status Code Comprehensive Testing', () => {
  const testUser = {
    email: 'tonytest@gmail.com',
    username: 'tony_dev',
    password: 'SafePassword123!',
    roleId: 1,
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  // --- 200 OK & 409 Conflict (sendCode) ---
  describe('POST /api/v1/auth/code', () => {
    it('should return 200 if email is available for registration', async () => {
      const res = await request(app).post('/api/v1/auth/code').send({ email: testUser.email });

      expect(res.status).toBe(200); // [SUCCESS: 200]
      expect(res.body).toHaveProperty('message');
    });

    it('should return 409 if email is already registered', async () => {
      await prisma.user.create({ data: { ...testUser, password: 'hashed_password' } });

      const res = await request(app).post('/api/v1/auth/code').send({ email: testUser.email });

      expect(res.status).toBe(409); // [ERROR: 409 Conflict]
      expect(res.body.message).toBe('Email already registered');
    });
  });

  // --- 400 Bad Request (Validation/Logic Error) ---
  describe('POST /api/v1/auth/register', () => {
    it('should return 400 if validation fails or code is invalid', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        email: testUser.email,
        code: '000000', // Wrong code logic error
      });

      expect(res.status).toBe(400); // [ERROR: 400 Bad Request]
    });
  });

  // --- 404 Not Found (forgotPassword) ---
  describe('POST /api/v1/auth/forgot-password', () => {
    it('should return 404 if trying to reset password for non-existing email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/forgot-password')
        .send({ email: 'notfound_user@gmail.com' });

      expect(res.status).toBe(404); // [ERROR: 404 Not Found]
      expect(res.body.message).toBe('Email not found');
    });
  });
});

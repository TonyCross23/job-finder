import { jest, describe, it, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import authRoute from '../feature/auth/auth.router.js';
import { emailUtils } from './email.js';
import { AuthRepository } from '../feature/auth/useCase/interface/auth.repository.js';

const app = express();
app.use(express.json());
app.use('/auth', authRoute);

describe('Auth Routes (Complete Integration Test)', () => {
  let uniqueId = Date.now();
  let testEmail = `test_${uniqueId}@example.com`;
  let testPassword = 'Password123!';
  let refreshToken = '';
  const MOCK_CODE = '123456';

  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(emailUtils, 'sendEmail').mockResolvedValue({ messageId: 'mock-id' });
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    setTimeout(() => process.exit(0), 1000);
  });

  it('1. POST /auth/code - should send verification code', async () => {
    const res = await request(app).post('/auth/code').send({ email: testEmail });
    expect(res.statusCode).toBe(200);
  });

  it('2. POST /auth/register - correct code should create user', async () => {
    const getCodeSpy = jest.spyOn(AuthRepository.prototype, 'getEmailCode').mockResolvedValue(MOCK_CODE);

    const res = await request(app)
      .post('/auth/register')
      .send({
        email: testEmail,
        username: `user_${uniqueId}`,
        password: testPassword,
        confirmPassword: testPassword,
        code: MOCK_CODE,
        roleId: 1
      });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('accessToken');

    refreshToken = res.body.refreshToken;
    getCodeSpy.mockRestore();
  });

  it('3. POST /auth/login - should login successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('4. POST /auth/refresh - should get new access token', async () => {
    expect(refreshToken).toBeDefined();

    const res = await request(app)
      .post('/auth/refresh')
      .send({ token: refreshToken });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });
});
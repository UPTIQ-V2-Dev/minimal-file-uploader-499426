import app from '../app.ts';
import prisma from '../client.ts';
import { Role, TokenType } from '../generated/prisma/index.js';
import tokenService from '../services/token.service.ts';
import { encryptPassword } from '../utils/encryption.ts';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const setupTestData = async () => {
    // Clean up any existing test data (ignore errors if tables don't exist)
    try {
        await prisma.token.deleteMany({});
    } catch (error) {
        // Table might not exist yet, ignore the error
    }
    try {
        await prisma.user.deleteMany({});
    } catch (error) {
        // Table might not exist yet, ignore the error
    }

    // Create test user
    const hashedPassword = await encryptPassword('password123');
    const testUser = await prisma.user.create({
        data: {
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
            role: Role.USER,
            isEmailVerified: false
        }
    });

    return { testUser };
};

describe('Authentication Routes', () => {
    let testData: Awaited<ReturnType<typeof setupTestData>>;

    beforeAll(async () => {
        testData = await setupTestData();
    });

    afterAll(async () => {
        // Cleanup test data (ignore errors if tables don't exist)
        try {
            await prisma.token.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
        await prisma.$disconnect();
    });

    describe('POST /auth/register', () => {
        it('should register a new user successfully', async () => {
            const newUser = {
                name: 'New User',
                email: 'newuser@example.com',
                password: 'password123'
            };

            const res = await request(app).post('/v1/auth/register').send(newUser).expect(201);

            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('tokens');
            expect(res.body.user).toMatchObject({
                name: newUser.name,
                email: newUser.email,
                role: 'USER',
                isEmailVerified: false
            });
            expect(res.body.user).not.toHaveProperty('password');
            expect(res.body.tokens).toHaveProperty('access');
            expect(res.body.tokens).toHaveProperty('refresh');
        });

        it('should return 400 if email already exists', async () => {
            const existingUser = {
                name: 'Existing User',
                email: testData.testUser.email,
                password: 'password123'
            };

            const res = await request(app).post('/v1/auth/register').send(existingUser).expect(400);

            expect(res.body.message).toBe('Email already taken');
        });

        it('should return 400 for invalid input data', async () => {
            const invalidUser = {
                email: 'invalid-email',
                password: '123' // too short
            };

            await request(app).post('/v1/auth/register').send(invalidUser).expect(400);
        });

        it('should return 400 if required fields are missing', async () => {
            const incompleteUser = {
                email: 'test@example.com'
                // missing name and password
            };

            await request(app).post('/v1/auth/register').send(incompleteUser).expect(400);
        });
    });

    describe('POST /auth/login', () => {
        it('should login user successfully with correct credentials', async () => {
            const loginData = {
                email: testData.testUser.email,
                password: 'password123'
            };

            const res = await request(app).post('/v1/auth/login').send(loginData).expect(200);

            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('tokens');
            expect(res.body.user).toMatchObject({
                email: testData.testUser.email,
                name: testData.testUser.name
            });
            expect(res.body.user).not.toHaveProperty('password');
            expect(res.body.tokens).toHaveProperty('access');
            expect(res.body.tokens).toHaveProperty('refresh');
        });

        it('should return 401 for incorrect password', async () => {
            const loginData = {
                email: testData.testUser.email,
                password: 'wrongpassword'
            };

            const res = await request(app).post('/v1/auth/login').send(loginData).expect(401);

            expect(res.body.message).toBe('Incorrect email or password');
        });

        it('should return 401 for non-existent user', async () => {
            const loginData = {
                email: 'nonexistent@example.com',
                password: 'password123'
            };

            const res = await request(app).post('/v1/auth/login').send(loginData).expect(401);

            expect(res.body.message).toBe('Incorrect email or password');
        });

        it('should return 400 for invalid input data', async () => {
            const invalidLogin = {
                email: 'invalid-email'
                // missing password
            };

            await request(app).post('/v1/auth/login').send(invalidLogin).expect(400);
        });
    });

    describe('POST /auth/logout', () => {
        it('should logout user successfully with valid refresh token', async () => {
            // First generate tokens for the user
            const tokens = await tokenService.generateAuthTokens(testData.testUser);

            const logoutData = {
                refreshToken: tokens.refresh!.token
            };

            await request(app).post('/v1/auth/logout').send(logoutData).expect(204);

            // Verify token is deleted
            const tokenInDb = await prisma.token.findFirst({
                where: { token: tokens.refresh!.token }
            });
            expect(tokenInDb).toBeNull();
        });

        it('should return 404 for invalid refresh token', async () => {
            const logoutData = {
                refreshToken: 'invalid-token'
            };

            const res = await request(app).post('/v1/auth/logout').send(logoutData).expect(404);

            expect(res.body.message).toBe('Not found');
        });

        it('should return 400 for missing refresh token', async () => {
            await request(app).post('/v1/auth/logout').send({}).expect(400);
        });
    });

    describe('POST /auth/refresh-tokens', () => {
        it('should refresh tokens successfully with valid refresh token', async () => {
            // First generate tokens for the user
            const tokens = await tokenService.generateAuthTokens(testData.testUser);

            const refreshData = {
                refreshToken: tokens.refresh!.token
            };

            const res = await request(app).post('/v1/auth/refresh-tokens').send(refreshData).expect(200);

            expect(res.body).toHaveProperty('access');
            expect(res.body).toHaveProperty('refresh');
            expect(res.body.access.token).toBeDefined();
            expect(res.body.refresh.token).toBeDefined();

            // Old refresh token should be deleted
            const oldTokenInDb = await prisma.token.findFirst({
                where: { token: tokens.refresh!.token }
            });
            expect(oldTokenInDb).toBeNull();
        });

        it('should return 401 for invalid refresh token', async () => {
            const refreshData = {
                refreshToken: 'invalid-token'
            };

            const res = await request(app).post('/v1/auth/refresh-tokens').send(refreshData).expect(401);

            expect(res.body.message).toBe('Please authenticate');
        });

        it('should return 400 for missing refresh token', async () => {
            await request(app).post('/v1/auth/refresh-tokens').send({}).expect(400);
        });
    });

    describe('POST /auth/forgot-password', () => {
        it('should send reset password email for existing user', async () => {
            const forgotPasswordData = {
                email: testData.testUser.email
            };

            await request(app).post('/v1/auth/forgot-password').send(forgotPasswordData).expect(204);

            // Verify reset password token is created
            const resetToken = await prisma.token.findFirst({
                where: {
                    userId: testData.testUser.id,
                    type: TokenType.RESET_PASSWORD
                }
            });
            expect(resetToken).toBeDefined();
        });

        it('should return 404 for non-existent user', async () => {
            const forgotPasswordData = {
                email: 'nonexistent@example.com'
            };

            const res = await request(app).post('/v1/auth/forgot-password').send(forgotPasswordData).expect(404);

            expect(res.body.message).toBe('No users found with this email');
        });

        it('should return 400 for invalid email format', async () => {
            const forgotPasswordData = {
                email: 'invalid-email'
            };

            await request(app).post('/v1/auth/forgot-password').send(forgotPasswordData).expect(400);
        });
    });

    describe('POST /auth/reset-password', () => {
        it('should reset password successfully with valid token', async () => {
            // Generate reset password token
            const resetToken = await tokenService.generateResetPasswordToken(testData.testUser.email);

            const resetPasswordData = {
                password: 'newPassword123'
            };

            await request(app).post(`/v1/auth/reset-password?token=${resetToken}`).send(resetPasswordData).expect(204);

            // Verify password is updated by trying to login with new password
            const loginRes = await request(app)
                .post('/v1/auth/login')
                .send({
                    email: testData.testUser.email,
                    password: 'newPassword123'
                })
                .expect(200);

            expect(loginRes.body.user.email).toBe(testData.testUser.email);

            // Reset tokens should be deleted
            const resetTokenInDb = await prisma.token.findFirst({
                where: {
                    userId: testData.testUser.id,
                    type: TokenType.RESET_PASSWORD
                }
            });
            expect(resetTokenInDb).toBeNull();
        });

        it('should return 401 for invalid reset token', async () => {
            const resetPasswordData = {
                password: 'newPassword123'
            };

            const res = await request(app)
                .post('/v1/auth/reset-password?token=invalid-token')
                .send(resetPasswordData)
                .expect(401);

            expect(res.body.message).toBe('Password reset failed');
        });

        it('should return 400 for invalid password format', async () => {
            const resetToken = await tokenService.generateResetPasswordToken(testData.testUser.email);

            const resetPasswordData = {
                password: '123' // too short
            };

            await request(app).post(`/v1/auth/reset-password?token=${resetToken}`).send(resetPasswordData).expect(400);
        });
    });

    describe('POST /auth/verify-email', () => {
        it('should verify email successfully with valid token', async () => {
            // Generate verify email token
            const verifyToken = await tokenService.generateVerifyEmailToken(testData.testUser);

            await request(app).post(`/v1/auth/verify-email?token=${verifyToken}`).expect(204);

            // Verify user's email is marked as verified
            const updatedUser = await prisma.user.findUnique({
                where: { id: testData.testUser.id }
            });
            expect(updatedUser?.isEmailVerified).toBe(true);

            // Verify email tokens should be deleted
            const verifyTokenInDb = await prisma.token.findFirst({
                where: {
                    userId: testData.testUser.id,
                    type: TokenType.VERIFY_EMAIL
                }
            });
            expect(verifyTokenInDb).toBeNull();
        });

        it('should return 401 for invalid verification token', async () => {
            const res = await request(app).post('/v1/auth/verify-email?token=invalid-token').expect(401);

            expect(res.body.message).toBe('Email verification failed');
        });

        it('should return 400 for missing token', async () => {
            await request(app).post('/v1/auth/verify-email').expect(400);
        });
    });

    describe('POST /auth/send-verification-email', () => {
        it('should send verification email for authenticated user', async () => {
            // Generate access token for authentication
            const tokens = await tokenService.generateAuthTokens(testData.testUser);

            await request(app)
                .post('/v1/auth/send-verification-email')
                .set('Authorization', `Bearer ${tokens.access!.token}`)
                .expect(204);

            // Verify email token is created
            const verifyToken = await prisma.token.findFirst({
                where: {
                    userId: testData.testUser.id,
                    type: TokenType.VERIFY_EMAIL
                }
            });
            expect(verifyToken).toBeDefined();
        });

        it('should return 401 for unauthenticated request', async () => {
            await request(app).post('/v1/auth/send-verification-email').expect(401);
        });

        it('should return 401 for invalid access token', async () => {
            await request(app)
                .post('/v1/auth/send-verification-email')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });
});

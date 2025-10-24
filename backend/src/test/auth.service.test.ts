import prisma from '../client.ts';
import { Role, TokenType } from '../generated/prisma/index.js';
import authService from '../services/auth.service.ts';
import tokenService from '../services/token.service.ts';
import userService from '../services/user.service.ts';
import { encryptPassword } from '../utils/encryption.ts';
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

describe('Auth Service', () => {
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

    describe('loginUserWithEmailAndPassword', () => {
        it('should login user with correct credentials', async () => {
            const user = await authService.loginUserWithEmailAndPassword(testData.testUser.email, 'password123');

            expect(user).toMatchObject({
                id: testData.testUser.id,
                email: testData.testUser.email,
                name: testData.testUser.name,
                role: testData.testUser.role
            });
            expect(user).not.toHaveProperty('password');
        });

        it('should throw error for incorrect password', async () => {
            await expect(
                authService.loginUserWithEmailAndPassword(testData.testUser.email, 'wrongpassword')
            ).rejects.toThrow('Incorrect email or password');
        });

        it('should throw error for non-existent user', async () => {
            await expect(
                authService.loginUserWithEmailAndPassword('nonexistent@example.com', 'password123')
            ).rejects.toThrow('Incorrect email or password');
        });
    });

    describe('logout', () => {
        it('should logout user with valid refresh token', async () => {
            // Generate tokens
            const tokens = await tokenService.generateAuthTokens(testData.testUser);

            // Logout
            await expect(authService.logout(tokens.refresh!.token)).resolves.toBeUndefined();

            // Verify token is deleted
            const tokenInDb = await prisma.token.findFirst({
                where: { token: tokens.refresh!.token }
            });
            expect(tokenInDb).toBeNull();
        });

        it('should throw error for invalid refresh token', async () => {
            await expect(authService.logout('invalid-token')).rejects.toThrow('Not found');
        });
    });

    describe('refreshAuth', () => {
        it('should refresh tokens with valid refresh token', async () => {
            // Generate initial tokens
            const initialTokens = await tokenService.generateAuthTokens(testData.testUser);

            // Refresh tokens
            const newTokens = await authService.refreshAuth(initialTokens.refresh!.token);

            expect(newTokens).toHaveProperty('access');
            expect(newTokens).toHaveProperty('refresh');
            expect(newTokens.access.token).toBeDefined();
            expect(newTokens.refresh!.token).toBeDefined();
            expect(newTokens.access.token).not.toBe(initialTokens.access.token);
            expect(newTokens.refresh!.token).not.toBe(initialTokens.refresh!.token);

            // Old refresh token should be deleted
            const oldTokenInDb = await prisma.token.findFirst({
                where: { token: initialTokens.refresh!.token }
            });
            expect(oldTokenInDb).toBeNull();
        });

        it('should throw error for invalid refresh token', async () => {
            await expect(authService.refreshAuth('invalid-token')).rejects.toThrow('Please authenticate');
        });
    });

    describe('resetPassword', () => {
        it('should reset password with valid token', async () => {
            // Generate reset password token
            const resetToken = await tokenService.generateResetPasswordToken(testData.testUser.email);

            // Reset password
            await expect(authService.resetPassword(resetToken, 'newPassword123')).resolves.toBeUndefined();

            // Verify password is updated by attempting login
            const user = await authService.loginUserWithEmailAndPassword(testData.testUser.email, 'newPassword123');
            expect(user.email).toBe(testData.testUser.email);

            // Reset password tokens should be deleted
            const resetTokenInDb = await prisma.token.findFirst({
                where: {
                    userId: testData.testUser.id,
                    type: TokenType.RESET_PASSWORD
                }
            });
            expect(resetTokenInDb).toBeNull();
        });

        it('should throw error for invalid reset token', async () => {
            await expect(authService.resetPassword('invalid-token', 'newPassword123')).rejects.toThrow(
                'Password reset failed'
            );
        });
    });

    describe('verifyEmail', () => {
        it('should verify email with valid token', async () => {
            // Generate verify email token
            const verifyToken = await tokenService.generateVerifyEmailToken(testData.testUser);

            // Verify email
            await expect(authService.verifyEmail(verifyToken)).resolves.toBeUndefined();

            // Check user's email is marked as verified
            const updatedUser = await userService.getUserById(testData.testUser.id);
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

        it('should throw error for invalid verification token', async () => {
            await expect(authService.verifyEmail('invalid-token')).rejects.toThrow('Email verification failed');
        });
    });
});

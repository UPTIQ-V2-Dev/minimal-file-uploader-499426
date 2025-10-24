import prisma from '../client.ts';
import config from '../config/config.ts';
import { Role, TokenType } from '../generated/prisma/index.js';
import tokenService from '../services/token.service.ts';
import { encryptPassword } from '../utils/encryption.ts';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const setupTestData = async () => {
    // Clean up any existing test data
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

describe('Token Service', () => {
    let testData: Awaited<ReturnType<typeof setupTestData>>;

    beforeAll(async () => {
        testData = await setupTestData();
    });

    afterAll(async () => {
        // Cleanup test data
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

    describe('generateToken', () => {
        it('should generate a valid JWT token', () => {
            const expires = moment().add(15, 'minutes');
            const token = tokenService.generateToken(testData.testUser.id, expires, TokenType.ACCESS);

            // Verify token structure
            const decoded = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;
            expect(decoded.sub).toBe(testData.testUser.id);
            expect(decoded.type).toBe(TokenType.ACCESS);
            expect(decoded.exp).toBeDefined();
            expect(decoded.iat).toBeDefined();
        });

        it('should generate tokens with different signatures for different users', () => {
            const expires = moment().add(15, 'minutes');
            const token1 = tokenService.generateToken(1, expires, TokenType.ACCESS);
            const token2 = tokenService.generateToken(2, expires, TokenType.ACCESS);

            expect(token1).not.toBe(token2);
        });
    });

    describe('saveToken', () => {
        it('should save token to database', async () => {
            const expires = moment().add(30, 'minutes');
            const tokenString = tokenService.generateToken(testData.testUser.id, expires, TokenType.REFRESH);

            const savedToken = await tokenService.saveToken(
                tokenString,
                testData.testUser.id,
                expires,
                TokenType.REFRESH
            );

            expect(savedToken).toMatchObject({
                token: tokenString,
                userId: testData.testUser.id,
                type: TokenType.REFRESH,
                blacklisted: false
            });
            expect(savedToken.id).toBeDefined();
            expect(savedToken.expires).toBeInstanceOf(Date);
        });

        it('should save token as blacklisted when specified', async () => {
            const expires = moment().add(30, 'minutes');
            const tokenString = tokenService.generateToken(testData.testUser.id, expires, TokenType.ACCESS);

            const savedToken = await tokenService.saveToken(
                tokenString,
                testData.testUser.id,
                expires,
                TokenType.ACCESS,
                true
            );

            expect(savedToken.blacklisted).toBe(true);
        });
    });

    describe('verifyToken', () => {
        it('should verify valid token', async () => {
            const expires = moment().add(30, 'minutes');
            const tokenString = tokenService.generateToken(testData.testUser.id, expires, TokenType.REFRESH);

            // Save token to database
            await tokenService.saveToken(tokenString, testData.testUser.id, expires, TokenType.REFRESH);

            const tokenData = await tokenService.verifyToken(tokenString, TokenType.REFRESH);

            expect(tokenData).toMatchObject({
                token: tokenString,
                userId: testData.testUser.id,
                type: TokenType.REFRESH,
                blacklisted: false
            });
        });

        it('should throw error for token not in database', async () => {
            const expires = moment().add(30, 'minutes');
            const tokenString = tokenService.generateToken(testData.testUser.id, expires, TokenType.ACCESS);

            // Don't save token to database
            await expect(tokenService.verifyToken(tokenString, TokenType.ACCESS)).rejects.toThrow('Token not found');
        });

        it('should throw error for blacklisted token', async () => {
            const expires = moment().add(30, 'minutes');
            const tokenString = tokenService.generateToken(testData.testUser.id, expires, TokenType.ACCESS);

            // Save blacklisted token
            await tokenService.saveToken(tokenString, testData.testUser.id, expires, TokenType.ACCESS, true);

            await expect(tokenService.verifyToken(tokenString, TokenType.ACCESS)).rejects.toThrow('Token not found');
        });

        it('should throw error for invalid JWT signature', async () => {
            const invalidToken = 'invalid.jwt.token';

            await expect(tokenService.verifyToken(invalidToken, TokenType.ACCESS)).rejects.toThrow();
        });
    });

    describe('generateAuthTokens', () => {
        it('should generate both access and refresh tokens', async () => {
            const tokens = await tokenService.generateAuthTokens(testData.testUser);

            expect(tokens).toHaveProperty('access');
            expect(tokens).toHaveProperty('refresh');
            expect(tokens.access!.token).toBeDefined();
            expect(tokens.access!.expires).toBeInstanceOf(Date);
            expect(tokens.refresh!.token).toBeDefined();
            expect(tokens.refresh!.expires).toBeInstanceOf(Date);

            // Verify tokens are valid
            const accessDecoded = jwt.verify(tokens.access!.token, config.jwt.secret) as jwt.JwtPayload;
            const refreshDecoded = jwt.verify(tokens.refresh!.token, config.jwt.secret) as jwt.JwtPayload;

            expect(accessDecoded.sub).toBe(testData.testUser.id);
            expect(accessDecoded.type).toBe(TokenType.ACCESS);
            expect(refreshDecoded.sub).toBe(testData.testUser.id);
            expect(refreshDecoded.type).toBe(TokenType.REFRESH);

            // Verify refresh token is saved to database
            const refreshTokenInDb = await prisma.token.findFirst({
                where: { token: tokens.refresh!.token }
            });
            expect(refreshTokenInDb).toBeDefined();
        });

        it('should generate tokens with correct expiration times', async () => {
            const beforeGeneration = moment();
            const tokens = await tokenService.generateAuthTokens(testData.testUser);
            const afterGeneration = moment();

            // Access token should expire after configured minutes
            const accessExpected = beforeGeneration.add(config.jwt.accessExpirationMinutes, 'minutes');
            const accessActual = moment(tokens.access!.expires);
            expect(
                accessActual.isBetween(
                    accessExpected.subtract(1, 'second'),
                    afterGeneration.add(config.jwt.accessExpirationMinutes, 'minutes')
                )
            ).toBe(true);

            // Refresh token should expire after configured days
            const refreshExpected = beforeGeneration.add(config.jwt.refreshExpirationDays, 'days');
            const refreshActual = moment(tokens.refresh!.expires);
            expect(
                refreshActual.isBetween(
                    refreshExpected.subtract(1, 'second'),
                    afterGeneration.add(config.jwt.refreshExpirationDays, 'days')
                )
            ).toBe(true);
        });
    });

    describe('generateResetPasswordToken', () => {
        it('should generate reset password token for existing user', async () => {
            const resetToken = await tokenService.generateResetPasswordToken(testData.testUser.email);

            expect(resetToken).toBeDefined();

            // Verify token is valid and saved to database
            const tokenData = await tokenService.verifyToken(resetToken, TokenType.RESET_PASSWORD);
            expect(tokenData.userId).toBe(testData.testUser.id);
            expect(tokenData.type).toBe(TokenType.RESET_PASSWORD);

            // Verify JWT payload
            const decoded = jwt.verify(resetToken, config.jwt.secret) as jwt.JwtPayload;
            expect(decoded.sub).toBe(testData.testUser.id);
            expect(decoded.type).toBe(TokenType.RESET_PASSWORD);
        });

        it('should throw error for non-existent user', async () => {
            await expect(tokenService.generateResetPasswordToken('nonexistent@example.com')).rejects.toThrow(
                'No users found with this email'
            );
        });

        it('should generate token with correct expiration time', async () => {
            const beforeGeneration = moment();
            const resetToken = await tokenService.generateResetPasswordToken(testData.testUser.email);
            const afterGeneration = moment();

            const decoded = jwt.verify(resetToken, config.jwt.secret) as jwt.JwtPayload;
            const tokenExpiration = moment.unix(decoded.exp as number);

            const expectedExpiration = beforeGeneration.add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
            expect(
                tokenExpiration.isBetween(
                    expectedExpiration.subtract(1, 'second'),
                    afterGeneration.add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
                )
            ).toBe(true);
        });
    });

    describe('generateVerifyEmailToken', () => {
        it('should generate email verification token', async () => {
            const verifyToken = await tokenService.generateVerifyEmailToken(testData.testUser);

            expect(verifyToken).toBeDefined();

            // Verify token is valid and saved to database
            const tokenData = await tokenService.verifyToken(verifyToken, TokenType.VERIFY_EMAIL);
            expect(tokenData.userId).toBe(testData.testUser.id);
            expect(tokenData.type).toBe(TokenType.VERIFY_EMAIL);

            // Verify JWT payload
            const decoded = jwt.verify(verifyToken, config.jwt.secret) as jwt.JwtPayload;
            expect(decoded.sub).toBe(testData.testUser.id);
            expect(decoded.type).toBe(TokenType.VERIFY_EMAIL);
        });

        it('should generate token with correct expiration time', async () => {
            const beforeGeneration = moment();
            const verifyToken = await tokenService.generateVerifyEmailToken(testData.testUser);
            const afterGeneration = moment();

            const decoded = jwt.verify(verifyToken, config.jwt.secret) as jwt.JwtPayload;
            const tokenExpiration = moment.unix(decoded.exp as number);

            const expectedExpiration = beforeGeneration.add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
            expect(
                tokenExpiration.isBetween(
                    expectedExpiration.subtract(1, 'second'),
                    afterGeneration.add(config.jwt.verifyEmailExpirationMinutes, 'minutes')
                )
            ).toBe(true);
        });
    });
});

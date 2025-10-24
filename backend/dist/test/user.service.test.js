import prisma from "../client.js";
import { Role } from '../generated/prisma/index.js';
import userService from "../services/user.service.js";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
describe('User Service', () => {
    beforeAll(async () => {
        // Clean up any existing test data
        try {
            await prisma.token.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
    });
    beforeEach(async () => {
        // Clean up test data before each test
        try {
            await prisma.user.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
    });
    afterAll(async () => {
        // Final cleanup
        try {
            await prisma.token.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        await prisma.$disconnect();
    });
    describe('createUser', () => {
        it('should create user successfully', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            const user = await userService.createUser(userData.email, userData.password, userData.name, userData.role);
            expect(user).toMatchObject({
                email: userData.email,
                name: userData.name,
                role: userData.role,
                isEmailVerified: false
            });
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('createdAt');
            expect(user).toHaveProperty('updatedAt');
            expect(user).not.toHaveProperty('password');
        });
        it('should throw error if email already exists', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };
            await userService.createUser(userData.email, userData.password, userData.name);
            await expect(userService.createUser(userData.email, userData.password, 'Another User')).rejects.toThrow('Email already taken');
        });
        it('should create user with default USER role', async () => {
            const user = await userService.createUser('test@example.com', 'password123', 'Test User');
            expect(user.role).toBe(Role.USER);
        });
    });
    describe('queryUsers', () => {
        beforeEach(async () => {
            // Create test users
            await Promise.all([
                userService.createUser('user1@example.com', 'password123', 'User One', Role.USER),
                userService.createUser('user2@example.com', 'password123', 'User Two', Role.USER),
                userService.createUser('admin@example.com', 'password123', 'Admin User', Role.ADMIN)
            ]);
        });
        it('should return paginated users', async () => {
            const result = await userService.queryUsers({}, { page: 1, limit: 2 });
            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('page', 1);
            expect(result).toHaveProperty('limit', 2);
            expect(result).toHaveProperty('totalPages');
            expect(result).toHaveProperty('totalResults');
            expect(result.results).toHaveLength(2);
            expect(result.totalResults).toBe(3);
            expect(result.totalPages).toBe(2);
        });
        it('should filter users by role', async () => {
            const result = await userService.queryUsers({ role: Role.ADMIN }, { page: 1, limit: 10 });
            expect(result.results).toHaveLength(1);
            expect(result.results[0].role).toBe(Role.ADMIN);
            expect(result.totalResults).toBe(1);
        });
        it('should filter users by name', async () => {
            const result = await userService.queryUsers({ name: 'User One' }, { page: 1, limit: 10 });
            expect(result.results).toHaveLength(1);
            expect(result.results[0].name).toBe('User One');
        });
        it('should sort users', async () => {
            const result = await userService.queryUsers({}, {
                page: 1,
                limit: 10,
                sortBy: 'name',
                sortType: 'asc'
            });
            expect(result.results).toHaveLength(3);
            expect(result.results[0].name).toBe('Admin User');
            expect(result.results[1].name).toBe('User One');
            expect(result.results[2].name).toBe('User Two');
        });
        it('should not include password in results', async () => {
            const result = await userService.queryUsers({}, { page: 1, limit: 10 });
            result.results.forEach(user => {
                expect(user).not.toHaveProperty('password');
            });
        });
    });
    describe('getUserById', () => {
        let testUser;
        beforeEach(async () => {
            testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
        });
        it('should return user by id', async () => {
            const user = await userService.getUserById(testUser.id);
            expect(user).toMatchObject({
                id: testUser.id,
                email: testUser.email,
                name: testUser.name,
                role: testUser.role
            });
            expect(user).not.toHaveProperty('password');
        });
        it('should return null for non-existent user', async () => {
            const user = await userService.getUserById(999999);
            expect(user).toBeNull();
        });
    });
    describe('getUserByEmail', () => {
        let testUser;
        beforeEach(async () => {
            testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
        });
        it('should return user by email', async () => {
            const user = await userService.getUserByEmail('test@example.com');
            expect(user).toMatchObject({
                id: testUser.id,
                email: testUser.email,
                name: testUser.name,
                role: testUser.role
            });
            expect(user).toHaveProperty('password');
        });
        it('should return null for non-existent email', async () => {
            const user = await userService.getUserByEmail('nonexistent@example.com');
            expect(user).toBeNull();
        });
    });
    describe('updateUserById', () => {
        let testUser;
        beforeEach(async () => {
            testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
        });
        it('should update user successfully', async () => {
            const updateData = {
                name: 'Updated Name',
                email: 'updated@example.com'
            };
            const updatedUser = await userService.updateUserById(testUser.id, updateData);
            expect(updatedUser).toMatchObject({
                id: testUser.id,
                name: updateData.name,
                email: updateData.email,
                role: testUser.role
            });
            expect(updatedUser).not.toHaveProperty('password');
        });
        it('should encrypt password when updating', async () => {
            const newPassword = 'newpassword123';
            await userService.updateUserById(testUser.id, { password: newPassword });
            const userWithPassword = await userService.getUserByEmail(testUser.email, ['id', 'password']);
            expect(userWithPassword?.password).not.toBe(newPassword);
            expect(userWithPassword?.password).toBeDefined();
        });
        it('should throw error for non-existent user', async () => {
            await expect(userService.updateUserById(999999, { name: 'New Name' })).rejects.toThrow('User not found');
        });
        it('should throw error if email already taken', async () => {
            await userService.createUser('existing@example.com', 'password123', 'Existing User');
            await expect(userService.updateUserById(testUser.id, { email: 'existing@example.com' })).rejects.toThrow('Email already taken');
        });
        it('should update user role', async () => {
            const updatedUser = await userService.updateUserById(testUser.id, { role: Role.ADMIN });
            expect(updatedUser?.role).toBe(Role.ADMIN);
        });
    });
    describe('deleteUserById', () => {
        let testUser;
        beforeEach(async () => {
            testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
        });
        it('should delete user successfully', async () => {
            const deletedUser = await userService.deleteUserById(testUser.id);
            expect(deletedUser).toMatchObject({
                id: testUser.id,
                email: testUser.email,
                name: testUser.name,
                role: testUser.role
            });
            expect(deletedUser).not.toHaveProperty('password');
            // Verify user is actually deleted
            const user = await userService.getUserById(testUser.id);
            expect(user).toBeNull();
        });
        it('should throw error for non-existent user', async () => {
            await expect(userService.deleteUserById(999999)).rejects.toThrow('User not found');
        });
    });
});

import prisma from "../client.js";
import { Role } from '../generated/prisma/index.js';
import { userTools } from "../tools/user.tool.js";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
describe('User Tools (MCP)', () => {
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
    describe('createUserTool', () => {
        const createUserTool = userTools.find(tool => tool.id === 'user_create');
        it('should create user successfully', async () => {
            const inputs = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            const result = await createUserTool.fn(inputs);
            expect(result).toMatchObject({
                email: inputs.email,
                name: inputs.name,
                role: inputs.role,
                isEmailVerified: false
            });
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('createdAt');
            expect(result).toHaveProperty('updatedAt');
            expect(result).not.toHaveProperty('password');
        });
        it('should throw error for duplicate email', async () => {
            const inputs = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            };
            await createUserTool.fn(inputs);
            await expect(createUserTool.fn({ ...inputs, name: 'Another User' })).rejects.toThrow('Email already taken');
        });
    });
    describe('getUsersTool', () => {
        const getUsersTool = userTools.find(tool => tool.id === 'user_get_all');
        beforeEach(async () => {
            // Create test users
            const createUserTool = userTools.find(tool => tool.id === 'user_create');
            await Promise.all([
                createUserTool.fn({
                    email: 'user1@example.com',
                    password: 'password123',
                    name: 'User One',
                    role: Role.USER
                }),
                createUserTool.fn({
                    email: 'user2@example.com',
                    password: 'password123',
                    name: 'User Two',
                    role: Role.USER
                }),
                createUserTool.fn({
                    email: 'admin@example.com',
                    password: 'password123',
                    name: 'Admin User',
                    role: Role.ADMIN
                })
            ]);
        });
        it('should return paginated users', async () => {
            const result = await getUsersTool.fn({ page: 1, limit: 2 });
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
            const result = await getUsersTool.fn({ role: Role.ADMIN });
            expect(result.results).toHaveLength(1);
            expect(result.results[0].role).toBe(Role.ADMIN);
            expect(result.totalResults).toBe(1);
        });
        it('should filter users by name', async () => {
            const result = await getUsersTool.fn({ name: 'User One' });
            expect(result.results).toHaveLength(1);
            expect(result.results[0].name).toBe('User One');
        });
        it('should sort users', async () => {
            const result = await getUsersTool.fn({
                sortBy: 'name',
                sortType: 'asc',
                limit: 10
            });
            expect(result.results).toHaveLength(3);
            expect(result.results[0].name).toBe('Admin User');
            expect(result.results[1].name).toBe('User One');
            expect(result.results[2].name).toBe('User Two');
        });
        it('should not include password in results', async () => {
            const result = await getUsersTool.fn({});
            result.results.forEach((user) => {
                expect(user).not.toHaveProperty('password');
            });
        });
    });
    describe('getUserTool', () => {
        const getUserTool = userTools.find(tool => tool.id === 'user_get_by_id');
        let testUserId;
        beforeEach(async () => {
            const createUserTool = userTools.find(tool => tool.id === 'user_create');
            const user = await createUserTool.fn({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            });
            testUserId = user.id;
        });
        it('should return user by id', async () => {
            const result = await getUserTool.fn({ userId: testUserId });
            expect(result).toMatchObject({
                id: testUserId,
                email: 'test@example.com',
                name: 'Test User',
                role: Role.USER
            });
            expect(result).not.toHaveProperty('password');
        });
        it('should throw error for non-existent user', async () => {
            await expect(getUserTool.fn({ userId: 999999 })).rejects.toThrow('User not found');
        });
    });
    describe('updateUserTool', () => {
        const updateUserTool = userTools.find(tool => tool.id === 'user_update');
        let testUserId;
        beforeEach(async () => {
            const createUserTool = userTools.find(tool => tool.id === 'user_create');
            const user = await createUserTool.fn({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            });
            testUserId = user.id;
        });
        it('should update user successfully', async () => {
            const updateData = {
                userId: testUserId,
                name: 'Updated Name',
                email: 'updated@example.com'
            };
            const result = await updateUserTool.fn(updateData);
            expect(result).toMatchObject({
                id: testUserId,
                name: updateData.name,
                email: updateData.email,
                role: Role.USER
            });
            expect(result).not.toHaveProperty('password');
        });
        it('should update user role', async () => {
            const result = await updateUserTool.fn({
                userId: testUserId,
                role: Role.ADMIN
            });
            expect(result?.role).toBe(Role.ADMIN);
        });
        it('should encrypt password when updating', async () => {
            await updateUserTool.fn({
                userId: testUserId,
                password: 'newpassword123'
            });
            // Verify password was encrypted by checking it's not the plain text
            const updatedUser = await prisma.user.findUnique({
                where: { id: testUserId },
                select: { password: true }
            });
            expect(updatedUser?.password).not.toBe('newpassword123');
            expect(updatedUser?.password).toBeDefined();
        });
        it('should throw error for non-existent user', async () => {
            await expect(updateUserTool.fn({
                userId: 999999,
                name: 'New Name'
            })).rejects.toThrow();
        });
        it('should throw error for duplicate email', async () => {
            // Create another user
            const createUserTool = userTools.find(tool => tool.id === 'user_create');
            await createUserTool.fn({
                email: 'existing@example.com',
                password: 'password123',
                name: 'Existing User',
                role: Role.USER
            });
            await expect(updateUserTool.fn({
                userId: testUserId,
                email: 'existing@example.com'
            })).rejects.toThrow('Email already taken');
        });
    });
    describe('deleteUserTool', () => {
        const deleteUserTool = userTools.find(tool => tool.id === 'user_delete');
        let testUserId;
        beforeEach(async () => {
            const createUserTool = userTools.find(tool => tool.id === 'user_create');
            const user = await createUserTool.fn({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: Role.USER
            });
            testUserId = user.id;
        });
        it('should delete user successfully', async () => {
            const result = await deleteUserTool.fn({ userId: testUserId });
            expect(result).toEqual({ success: true });
            // Verify user is actually deleted
            const deletedUser = await prisma.user.findUnique({
                where: { id: testUserId }
            });
            expect(deletedUser).toBeNull();
        });
        it('should throw error for non-existent user', async () => {
            await expect(deleteUserTool.fn({ userId: 999999 })).rejects.toThrow();
        });
    });
    describe('Tool Schema Validation', () => {
        it('should have correct input/output schemas for all tools', () => {
            expect(userTools).toHaveLength(5);
            const toolIds = userTools.map(tool => tool.id);
            expect(toolIds).toContain('user_create');
            expect(toolIds).toContain('user_get_all');
            expect(toolIds).toContain('user_get_by_id');
            expect(toolIds).toContain('user_update');
            expect(toolIds).toContain('user_delete');
            userTools.forEach(tool => {
                expect(tool).toHaveProperty('id');
                expect(tool).toHaveProperty('name');
                expect(tool).toHaveProperty('description');
                expect(tool).toHaveProperty('inputSchema');
                expect(tool).toHaveProperty('outputSchema');
                expect(tool).toHaveProperty('fn');
                expect(typeof tool.fn).toBe('function');
            });
        });
    });
});

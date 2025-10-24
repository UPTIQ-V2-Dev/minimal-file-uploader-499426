import app from '../app.ts';
import prisma from '../client.ts';
import { Role, User } from '../generated/prisma/index.js';
import tokenService from '../services/token.service.ts';
import userService from '../services/user.service.ts';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

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

    // Create test users
    const testUser = await userService.createUser('user@example.com', 'password123', 'Test User', Role.USER);
    const testAdmin = await userService.createUser('admin@example.com', 'password123', 'Test Admin', Role.ADMIN);

    // Create access tokens
    const userAccessToken = await tokenService.generateAuthTokens({ id: testUser.id } as User);
    const adminAccessToken = await tokenService.generateAuthTokens({ id: testAdmin.id } as User);

    return {
        testUser,
        testAdmin,
        userAccessToken: userAccessToken.access.token,
        adminAccessToken: adminAccessToken.access.token
    };
};

describe('User Controller', () => {
    let testData: Awaited<ReturnType<typeof setupTestData>>;

    beforeAll(async () => {
        testData = await setupTestData();
    });

    beforeEach(async () => {
        // Clean up users created during tests but keep the main test users
        const existingUsers = await prisma.user.findMany({
            where: {
                email: {
                    notIn: ['user@example.com', 'admin@example.com']
                }
            }
        });

        if (existingUsers.length > 0) {
            await prisma.user.deleteMany({
                where: {
                    email: {
                        notIn: ['user@example.com', 'admin@example.com']
                    }
                }
            });
        }
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

    describe('POST /v1/users', () => {
        it('should create user successfully with admin token', async () => {
            const newUser = {
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User',
                role: 'USER'
            };

            const response = await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(newUser)
                .expect(201);

            expect(response.body).toMatchObject({
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                isEmailVerified: false
            });
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('createdAt');
            expect(response.body).toHaveProperty('updatedAt');
            expect(response.body).not.toHaveProperty('password');
        });

        it('should return 403 for non-admin user', async () => {
            const newUser = {
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User',
                role: 'USER'
            };

            await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .send(newUser)
                .expect(403);
        });

        it('should return 401 without authentication', async () => {
            const newUser = {
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User',
                role: 'USER'
            };

            await request(app).post('/v1/users').send(newUser).expect(401);
        });

        it('should return 400 for invalid email', async () => {
            const newUser = {
                email: 'invalid-email',
                password: 'password123',
                name: 'New User',
                role: 'USER'
            };

            await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(newUser)
                .expect(400);
        });

        it('should return 400 for duplicate email', async () => {
            const newUser = {
                email: testData.testUser.email,
                password: 'password123',
                name: 'New User',
                role: 'USER'
            };

            await request(app)
                .post('/v1/users')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(newUser)
                .expect(400);
        });
    });

    describe('GET /v1/users', () => {
        beforeEach(async () => {
            // Create additional test users for pagination testing
            await Promise.all([
                userService.createUser('user1@example.com', 'password123', 'User One', Role.USER),
                userService.createUser('user2@example.com', 'password123', 'User Two', Role.USER),
                userService.createUser('admin2@example.com', 'password123', 'Admin Two', Role.ADMIN)
            ]);
        });

        it('should get all users with admin token', async () => {
            const response = await request(app)
                .get('/v1/users')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('results');
            expect(response.body).toHaveProperty('page', 1);
            expect(response.body).toHaveProperty('limit', 10);
            expect(response.body).toHaveProperty('totalPages');
            expect(response.body).toHaveProperty('totalResults');
            expect(response.body.results.length).toBeGreaterThan(0);

            // Check that passwords are not included
            response.body.results.forEach((user: any) => {
                expect(user).not.toHaveProperty('password');
            });
        });

        it('should return 403 for non-admin user', async () => {
            await request(app).get('/v1/users').set('Authorization', `Bearer ${testData.userAccessToken}`).expect(403);
        });

        it('should return 401 without authentication', async () => {
            await request(app).get('/v1/users').expect(401);
        });

        it('should support pagination', async () => {
            const response = await request(app)
                .get('/v1/users?page=1&limit=2')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(200);

            expect(response.body.results).toHaveLength(2);
            expect(response.body.page).toBe(1);
            expect(response.body.limit).toBe(2);
        });

        it('should support role filtering', async () => {
            const response = await request(app)
                .get(`/v1/users?role=${Role.ADMIN}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(200);

            response.body.results.forEach((user: any) => {
                expect(user.role).toBe(Role.ADMIN);
            });
        });

        it('should support sorting', async () => {
            const response = await request(app)
                .get('/v1/users?sortBy=name&sortType=asc')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(200);

            expect(response.body.results.length).toBeGreaterThan(1);
            // Check if sorted correctly
            for (let i = 1; i < response.body.results.length; i++) {
                expect(response.body.results[i].name >= response.body.results[i - 1].name).toBe(true);
            }
        });
    });

    describe('GET /v1/users/:userId', () => {
        it('should get user by id with admin token', async () => {
            const response = await request(app)
                .get(`/v1/users/${testData.testUser.id}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(200);

            expect(response.body).toMatchObject({
                id: testData.testUser.id,
                email: testData.testUser.email,
                name: testData.testUser.name,
                role: testData.testUser.role
            });
            expect(response.body).not.toHaveProperty('password');
        });

        it('should allow user to get their own profile', async () => {
            const response = await request(app)
                .get(`/v1/users/${testData.testUser.id}`)
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .expect(200);

            expect(response.body.id).toBe(testData.testUser.id);
        });

        it('should return 403 when user tries to access another user', async () => {
            await request(app)
                .get(`/v1/users/${testData.testAdmin.id}`)
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .expect(403);
        });

        it('should return 404 for non-existent user', async () => {
            await request(app)
                .get('/v1/users/999999')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(404);
        });

        it('should return 401 without authentication', async () => {
            await request(app).get(`/v1/users/${testData.testUser.id}`).expect(401);
        });

        it('should return 400 for invalid user id format', async () => {
            await request(app)
                .get('/v1/users/invalid')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(400);
        });
    });

    describe('PATCH /v1/users/:userId', () => {
        let testUserForUpdate: any;

        beforeEach(async () => {
            testUserForUpdate = await userService.createUser(
                'updatetest@example.com',
                'password123',
                'Update Test User',
                Role.USER
            );
        });

        it('should update user with admin token', async () => {
            const updateData = {
                name: 'Updated Name',
                email: 'updated@example.com'
            };

            const response = await request(app)
                .patch(`/v1/users/${testUserForUpdate.id}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body).toMatchObject({
                id: testUserForUpdate.id,
                name: updateData.name,
                email: updateData.email
            });
            expect(response.body).not.toHaveProperty('password');
        });

        it('should allow user to update their own profile', async () => {
            const updateData = {
                name: 'Self Updated Name'
            };

            const response = await request(app)
                .patch(`/v1/users/${testData.testUser.id}`)
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe(updateData.name);
        });

        it('should return 403 when user tries to update another user', async () => {
            const updateData = {
                name: 'Unauthorized Update'
            };

            await request(app)
                .patch(`/v1/users/${testUserForUpdate.id}`)
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .send(updateData)
                .expect(403);
        });

        it('should return 404 for non-existent user', async () => {
            const updateData = {
                name: 'New Name'
            };

            await request(app)
                .patch('/v1/users/999999')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(updateData)
                .expect(404);
        });

        it('should return 400 for invalid update data', async () => {
            const updateData = {
                email: 'invalid-email'
            };

            await request(app)
                .patch(`/v1/users/${testUserForUpdate.id}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(updateData)
                .expect(400);
        });

        it('should return 400 for duplicate email', async () => {
            const updateData = {
                email: testData.testUser.email
            };

            await request(app)
                .patch(`/v1/users/${testUserForUpdate.id}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(updateData)
                .expect(400);
        });

        it('should allow admin to update user role', async () => {
            const updateData = {
                role: Role.ADMIN
            };

            const response = await request(app)
                .patch(`/v1/users/${testUserForUpdate.id}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.role).toBe(Role.ADMIN);
        });
    });

    describe('DELETE /v1/users/:userId', () => {
        let testUserForDelete: any;

        beforeEach(async () => {
            testUserForDelete = await userService.createUser(
                'deletetest@example.com',
                'password123',
                'Delete Test User',
                Role.USER
            );
        });

        it('should delete user with admin token', async () => {
            await request(app)
                .delete(`/v1/users/${testUserForDelete.id}`)
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(204);

            // Verify user is deleted
            const deletedUser = await userService.getUserById(testUserForDelete.id);
            expect(deletedUser).toBeNull();
        });

        it('should allow user to delete their own account', async () => {
            await request(app)
                .delete(`/v1/users/${testData.testUser.id}`)
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .expect(204);
        });

        it('should return 403 when user tries to delete another user', async () => {
            await request(app)
                .delete(`/v1/users/${testUserForDelete.id}`)
                .set('Authorization', `Bearer ${testData.userAccessToken}`)
                .expect(403);
        });

        it('should return 404 for non-existent user', async () => {
            await request(app)
                .delete('/v1/users/999999')
                .set('Authorization', `Bearer ${testData.adminAccessToken}`)
                .expect(404);
        });

        it('should return 401 without authentication', async () => {
            await request(app).delete(`/v1/users/${testUserForDelete.id}`).expect(401);
        });
    });
});

import app from '../app.ts';
import prisma from '../client.ts';
import { Role } from '../generated/prisma/index.js';
import { tokenService, userService } from '../services/index.ts';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('MCP REST Controller', () => {
    let userAccessToken: string;
    let testUser: any;
    let adminUser: any;

    beforeAll(async () => {
        // Clean up any existing test data
        try {
            await prisma.mCPOperation.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.mCPResource.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
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
        testUser = await userService.createUser('mcp-user@example.com', 'password123', 'MCP User', Role.USER);
        adminUser = await userService.createUser('mcp-admin@example.com', 'password123', 'MCP Admin', Role.ADMIN);

        // Generate tokens
        const userTokens = await tokenService.generateAuthTokens(testUser);
        await tokenService.generateAuthTokens(adminUser); // Admin tokens for future use

        userAccessToken = userTokens.access.token;
    });

    beforeEach(async () => {
        // Clean up MCP data before each test
        try {
            await prisma.mCPOperation.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.mCPResource.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
    });

    afterAll(async () => {
        // Final cleanup
        try {
            await prisma.mCPOperation.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.mCPResource.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
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

    describe('POST /v1/mcp - Execute Operation', () => {
        it('should execute operation successfully', async () => {
            const operationData = {
                operation: 'process',
                data: { input: 'test data' }
            };

            const response = await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(operationData)
                .expect(200);

            expect(response.body).toHaveProperty('result');
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.result).toHaveProperty('operationId');
            expect(response.body.result).toHaveProperty('operation', 'process');
            expect(response.body.result).toHaveProperty('status', 'COMPLETED');
        });

        it('should execute analyze operation', async () => {
            const operationData = {
                operation: 'analyze',
                data: { dataset: 'user_behavior' }
            };

            const response = await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(operationData)
                .expect(200);

            expect(response.body.result.operation).toBe('analyze');
            expect(response.body.result.result).toHaveProperty('analysis');
            expect(response.body.result.result).toHaveProperty('confidence');
        });

        it('should require authentication', async () => {
            const operationData = {
                operation: 'process',
                data: { input: 'test' }
            };

            await request(app).post('/v1/mcp').send(operationData).expect(401);
        });

        it('should validate request body', async () => {
            await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({}) // Missing required fields
                .expect(400);
        });

        it('should handle missing data field', async () => {
            const operationData = {
                operation: 'process'
                // data is optional
            };

            const response = await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(operationData)
                .expect(200);

            expect(response.body.result.operation).toBe('process');
        });
    });

    describe('GET /v1/mcp - Get MCP Data', () => {
        beforeEach(async () => {
            // Create test resources and operations
            await request(app).post('/v1/mcp/resources').set('Authorization', `Bearer ${userAccessToken}`).send({
                name: 'Test Resource',
                type: 'PROCESS',
                description: 'A test resource'
            });

            await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                    operation: 'process',
                    data: { input: 'test' }
                });
        });

        it('should return status data by default', async () => {
            const response = await request(app)
                .get('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0]).toHaveProperty('id', 'mcp-status');
            expect(response.body.data[0]).toHaveProperty('activeResources');
            expect(response.body.data[0]).toHaveProperty('pendingOperations');
            expect(response.body.data[0]).toHaveProperty('completedOperations');
        });

        it('should return resources data', async () => {
            const response = await request(app)
                .get('/v1/mcp')
                .query({ type: 'resources' })
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('pagination');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.pagination.totalResults).toBeGreaterThan(0);
        });

        it('should return operations data', async () => {
            const response = await request(app)
                .get('/v1/mcp')
                .query({ type: 'operations' })
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('pagination');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.pagination.totalResults).toBeGreaterThan(0);
        });

        it('should support pagination', async () => {
            const response = await request(app)
                .get('/v1/mcp')
                .query({ type: 'resources', page: 1, limit: 5 })
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body.pagination.page).toBe(1);
            expect(response.body.pagination.limit).toBe(5);
        });

        it('should support filtering', async () => {
            const response = await request(app)
                .get('/v1/mcp')
                .query({ type: 'resources', filter: 'Test' })
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body.data).toBeInstanceOf(Array);
            response.body.data.forEach((resource: any) => {
                expect(resource.name.toLowerCase()).toContain('test');
            });
        });

        it('should require authentication', async () => {
            await request(app).get('/v1/mcp').expect(401);
        });
    });

    describe('DELETE /v1/mcp - Delete Resource', () => {
        let createdResource: any;
        let createdOperation: any;

        beforeEach(async () => {
            // Create test resource
            const resourceResponse = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                    name: 'Delete Test Resource',
                    type: 'PROCESS',
                    description: 'Resource to be deleted'
                });
            createdResource = resourceResponse.body;

            // Create test operation
            const operationResponse = await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                    operation: 'test_delete',
                    data: { test: 'data' }
                });
            createdOperation = operationResponse.body.result;
        });

        it('should delete resource successfully', async () => {
            const deleteData = {
                resourceId: createdResource.id,
                type: 'resource'
            };

            const response = await request(app)
                .delete('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(deleteData)
                .expect(200);

            expect(response.body).toHaveProperty('deleted', true);
            expect(response.body).toHaveProperty('resourceId', createdResource.id);

            // Verify resource is soft-deleted
            const resourceResponse = await request(app)
                .get(`/v1/mcp/resources/${createdResource.id}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(resourceResponse.body.status).toBe('DELETED');
        });

        it('should delete operation successfully', async () => {
            const deleteData = {
                resourceId: createdOperation.operationId,
                type: 'operation'
            };

            const response = await request(app)
                .delete('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(deleteData)
                .expect(200);

            expect(response.body).toHaveProperty('deleted', true);
            expect(response.body).toHaveProperty('resourceId', createdOperation.operationId);

            // Verify operation is deleted
            await request(app)
                .get(`/v1/mcp/operations/${createdOperation.operationId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(404);
        });

        it('should delete all resources and operations', async () => {
            const deleteData = {
                resourceId: 'all',
                type: 'all'
            };

            const response = await request(app)
                .delete('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(deleteData)
                .expect(200);

            expect(response.body).toHaveProperty('deleted', true);
            expect(response.body).toHaveProperty('resourceId', 'all');

            // Verify resources are soft-deleted
            const resourcesResponse = await request(app)
                .get('/v1/mcp')
                .query({ type: 'resources', status: 'ACTIVE' })
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(resourcesResponse.body.data).toHaveLength(0);
        });

        it('should require authentication', async () => {
            const deleteData = {
                resourceId: createdResource.id,
                type: 'resource'
            };

            await request(app).delete('/v1/mcp').send(deleteData).expect(401);
        });

        it('should validate request body', async () => {
            await request(app)
                .delete('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({}) // Missing required fields
                .expect(400);
        });

        it('should return 404 for non-existent resource', async () => {
            const deleteData = {
                resourceId: 'non-existent-id',
                type: 'resource'
            };

            await request(app)
                .delete('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(deleteData)
                .expect(404);
        });
    });

    describe('POST /v1/mcp/resources - Create Resource', () => {
        it('should create PROCESS resource successfully', async () => {
            const resourceData = {
                name: 'Test Process Resource',
                type: 'PROCESS',
                description: 'A test processing resource',
                data: { config: { timeout: 5000 } }
            };

            const response = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(resourceData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(resourceData.name);
            expect(response.body.type).toBe(resourceData.type);
            expect(response.body.description).toBe(resourceData.description);
            expect(response.body.status).toBe('ACTIVE');
        });

        it('should create DATA resource successfully', async () => {
            const resourceData = {
                name: 'Test Data Resource',
                type: 'DATA',
                description: 'A test data resource'
            };

            const response = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(resourceData)
                .expect(201);

            expect(response.body.type).toBe('DATA');
        });

        it('should create TOOL resource successfully', async () => {
            const resourceData = {
                name: 'Test Tool Resource',
                type: 'TOOL',
                description: 'A test tool resource'
            };

            const response = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(resourceData)
                .expect(201);

            expect(response.body.type).toBe('TOOL');
        });

        it('should create CONTEXT resource successfully', async () => {
            const resourceData = {
                name: 'Test Context Resource',
                type: 'CONTEXT',
                description: 'A test context resource'
            };

            const response = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(resourceData)
                .expect(201);

            expect(response.body.type).toBe('CONTEXT');
        });

        it('should require authentication', async () => {
            const resourceData = {
                name: 'Test Resource',
                type: 'PROCESS'
            };

            await request(app).post('/v1/mcp/resources').send(resourceData).expect(401);
        });

        it('should validate request body', async () => {
            await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({}) // Missing required fields
                .expect(400);
        });

        it('should validate resource type', async () => {
            const resourceData = {
                name: 'Test Resource',
                type: 'INVALID_TYPE'
            };

            await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(resourceData)
                .expect(400);
        });
    });

    describe('GET /v1/mcp/resources/:resourceId - Get Resource', () => {
        let createdResource: any;

        beforeEach(async () => {
            const response = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                    name: 'Get Test Resource',
                    type: 'PROCESS',
                    description: 'Resource for testing get endpoint'
                });
            createdResource = response.body;
        });

        it('should get resource successfully', async () => {
            const response = await request(app)
                .get(`/v1/mcp/resources/${createdResource.id}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body.id).toBe(createdResource.id);
            expect(response.body.name).toBe('Get Test Resource');
            expect(response.body.type).toBe('PROCESS');
        });

        it('should return 404 for non-existent resource', async () => {
            await request(app)
                .get('/v1/mcp/resources/non-existent-id')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(404);
        });

        it('should require authentication', async () => {
            await request(app).get(`/v1/mcp/resources/${createdResource.id}`).expect(401);
        });
    });

    describe('PATCH /v1/mcp/resources/:resourceId - Update Resource', () => {
        let createdResource: any;

        beforeEach(async () => {
            const response = await request(app)
                .post('/v1/mcp/resources')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                    name: 'Update Test Resource',
                    type: 'PROCESS',
                    description: 'Resource for testing update endpoint'
                });
            createdResource = response.body;
        });

        it('should update resource successfully', async () => {
            const updateData = {
                name: 'Updated Resource Name',
                description: 'Updated description',
                status: 'INACTIVE'
            };

            const response = await request(app)
                .patch(`/v1/mcp/resources/${createdResource.id}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe(updateData.name);
            expect(response.body.description).toBe(updateData.description);
            expect(response.body.status).toBe(updateData.status);
        });

        it('should update partial fields', async () => {
            const updateData = {
                name: 'Partially Updated Name'
            };

            const response = await request(app)
                .patch(`/v1/mcp/resources/${createdResource.id}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe(updateData.name);
            expect(response.body.description).toBe(createdResource.description); // Should remain unchanged
        });

        it('should return 404 for non-existent resource', async () => {
            const updateData = { name: 'New Name' };

            await request(app)
                .patch('/v1/mcp/resources/non-existent-id')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(updateData)
                .expect(404);
        });

        it('should require authentication', async () => {
            const updateData = { name: 'New Name' };

            await request(app).patch(`/v1/mcp/resources/${createdResource.id}`).send(updateData).expect(401);
        });

        it('should validate request body', async () => {
            await request(app)
                .patch(`/v1/mcp/resources/${createdResource.id}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({}) // Empty body should fail validation
                .expect(400);
        });
    });

    describe('GET /v1/mcp/operations/:operationId - Get Operation', () => {
        let createdOperation: any;

        beforeEach(async () => {
            const response = await request(app)
                .post('/v1/mcp')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                    operation: 'get_test_operation',
                    data: { test: 'data' }
                });
            createdOperation = response.body.result;
        });

        it('should get operation successfully', async () => {
            const response = await request(app)
                .get(`/v1/mcp/operations/${createdOperation.operationId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);

            expect(response.body.id).toBe(createdOperation.operationId);
            expect(response.body.operation).toBe('get_test_operation');
            expect(response.body.status).toBe('COMPLETED');
        });

        it('should return 404 for non-existent operation', async () => {
            await request(app)
                .get('/v1/mcp/operations/non-existent-id')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(404);
        });

        it('should require authentication', async () => {
            await request(app).get(`/v1/mcp/operations/${createdOperation.operationId}`).expect(401);
        });
    });
});

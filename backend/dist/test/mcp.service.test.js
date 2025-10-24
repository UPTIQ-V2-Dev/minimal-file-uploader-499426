import prisma from "../client.js";
import { MCPOperationStatus, MCPResourceStatus, MCPResourceType, Role } from '../generated/prisma/index.js';
import mcpService from "../services/mcp.service.js";
import userService from "../services/user.service.js";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
describe('MCP Service', () => {
    let testUser;
    let adminUser;
    beforeAll(async () => {
        // Clean up any existing test data
        try {
            await prisma.mCPOperation.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.mCPResource.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
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
        // Create test users
        testUser = await userService.createUser('mcp-user@example.com', 'password123', 'MCP Test User', Role.USER);
        adminUser = await userService.createUser('mcp-admin@example.com', 'password123', 'MCP Admin User', Role.ADMIN);
    });
    beforeEach(async () => {
        // Clean up MCP data before each test
        try {
            await prisma.mCPOperation.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.mCPResource.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
    });
    afterAll(async () => {
        // Final cleanup
        try {
            await prisma.mCPOperation.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.mCPResource.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
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
    describe('executeOperation', () => {
        it('should execute operation successfully', async () => {
            const operation = await mcpService.executeOperation(testUser.id, 'process', { input: 'test data' });
            expect(operation).toHaveProperty('id');
            expect(operation.operation).toBe('process');
            expect(operation.status).toBe(MCPOperationStatus.COMPLETED);
            expect(operation.userId).toBe(testUser.id);
            expect(operation.result).toBeDefined();
            expect(operation.completedAt).toBeDefined();
        });
        it('should handle analyze operation', async () => {
            const operation = await mcpService.executeOperation(testUser.id, 'analyze', { dataset: 'user_data' });
            expect(operation.operation).toBe('analyze');
            expect(operation.status).toBe(MCPOperationStatus.COMPLETED);
            expect(operation.result).toHaveProperty('analysis');
            expect(operation.result).toHaveProperty('confidence');
        });
        it('should handle transform operation', async () => {
            const operation = await mcpService.executeOperation(testUser.id, 'transform', { data: { key: 'value' } });
            expect(operation.operation).toBe('transform');
            expect(operation.status).toBe(MCPOperationStatus.COMPLETED);
            expect(operation.result).toHaveProperty('transformed');
            expect(operation.result).toHaveProperty('transformationType');
        });
        it('should handle custom operations', async () => {
            const operation = await mcpService.executeOperation(testUser.id, 'custom_operation', { custom: 'data' });
            expect(operation.operation).toBe('custom_operation');
            expect(operation.status).toBe(MCPOperationStatus.COMPLETED);
            expect(operation.result).toHaveProperty('message');
        });
    });
    describe('createMCPResource', () => {
        it('should create PROCESS resource successfully', async () => {
            const resourceData = {
                name: 'Test Process',
                type: MCPResourceType.PROCESS,
                description: 'A test processing resource',
                data: { config: { timeout: 5000 } }
            };
            const resource = await mcpService.createMCPResource(testUser.id, resourceData);
            expect(resource).toHaveProperty('id');
            expect(resource.name).toBe(resourceData.name);
            expect(resource.type).toBe(resourceData.type);
            expect(resource.description).toBe(resourceData.description);
            expect(resource.userId).toBe(testUser.id);
            expect(resource.status).toBe(MCPResourceStatus.ACTIVE);
        });
        it('should create DATA resource successfully', async () => {
            const resourceData = {
                name: 'Test Dataset',
                type: MCPResourceType.DATA,
                description: 'A test data resource',
                data: { records: 100, format: 'json' }
            };
            const resource = await mcpService.createMCPResource(testUser.id, resourceData);
            expect(resource.type).toBe(MCPResourceType.DATA);
            expect(resource.data).toEqual(resourceData.data);
        });
        it('should create TOOL resource successfully', async () => {
            const resourceData = {
                name: 'Test Tool',
                type: MCPResourceType.TOOL,
                description: 'A test tool resource'
            };
            const resource = await mcpService.createMCPResource(testUser.id, resourceData);
            expect(resource.type).toBe(MCPResourceType.TOOL);
            expect(resource.data).toEqual({});
        });
        it('should create CONTEXT resource successfully', async () => {
            const resourceData = {
                name: 'Test Context',
                type: MCPResourceType.CONTEXT,
                description: 'A test context resource',
                data: { context: 'test context data' }
            };
            const resource = await mcpService.createMCPResource(testUser.id, resourceData);
            expect(resource.type).toBe(MCPResourceType.CONTEXT);
            expect(resource.data).toEqual(resourceData.data);
        });
    });
    describe('getMCPResourceById', () => {
        it('should retrieve resource successfully', async () => {
            const createdResource = await mcpService.createMCPResource(testUser.id, {
                name: 'Test Resource',
                type: MCPResourceType.PROCESS,
                description: 'Test description'
            });
            const resource = await mcpService.getMCPResourceById(testUser.id, createdResource.id);
            expect(resource.id).toBe(createdResource.id);
            expect(resource.name).toBe(createdResource.name);
            expect(resource.userId).toBe(testUser.id);
        });
        it('should throw error for non-existent resource', async () => {
            await expect(mcpService.getMCPResourceById(testUser.id, 'non-existent-id')).rejects.toThrow('Resource not found');
        });
        it("should throw error when accessing other user's resource", async () => {
            const createdResource = await mcpService.createMCPResource(testUser.id, {
                name: 'Test Resource',
                type: MCPResourceType.PROCESS
            });
            await expect(mcpService.getMCPResourceById(adminUser.id, createdResource.id)).rejects.toThrow('Resource not found');
        });
    });
    describe('updateMCPResource', () => {
        it('should update resource successfully', async () => {
            const createdResource = await mcpService.createMCPResource(testUser.id, {
                name: 'Original Name',
                type: MCPResourceType.PROCESS,
                description: 'Original description'
            });
            const updateData = {
                name: 'Updated Name',
                description: 'Updated description',
                status: MCPResourceStatus.INACTIVE
            };
            const updatedResource = await mcpService.updateMCPResource(testUser.id, createdResource.id, updateData);
            expect(updatedResource.name).toBe(updateData.name);
            expect(updatedResource.description).toBe(updateData.description);
            expect(updatedResource.status).toBe(updateData.status);
        });
        it('should throw error when updating non-existent resource', async () => {
            await expect(mcpService.updateMCPResource(testUser.id, 'non-existent-id', { name: 'New Name' })).rejects.toThrow('Resource not found');
        });
    });
    describe('deleteMCPResource', () => {
        it('should soft delete resource successfully', async () => {
            const createdResource = await mcpService.createMCPResource(testUser.id, {
                name: 'Test Resource',
                type: MCPResourceType.PROCESS
            });
            const result = await mcpService.deleteMCPResource(testUser.id, createdResource.id, 'resource');
            expect(result.deleted).toBe(true);
            expect(result.resourceId).toBe(createdResource.id);
            // Verify resource is marked as deleted
            const resource = await mcpService.getMCPResourceById(testUser.id, createdResource.id);
            expect(resource.status).toBe(MCPResourceStatus.DELETED);
        });
        it('should delete operation successfully', async () => {
            const operation = await mcpService.executeOperation(testUser.id, 'test_operation', { test: 'data' });
            const result = await mcpService.deleteMCPResource(testUser.id, operation.id, 'operation');
            expect(result.deleted).toBe(true);
            expect(result.resourceId).toBe(operation.id);
            // Verify operation is deleted
            await expect(mcpService.getMCPOperationById(testUser.id, operation.id)).rejects.toThrow('Operation not found');
        });
        it('should delete all resources and operations', async () => {
            // Create some resources and operations
            await mcpService.createMCPResource(testUser.id, {
                name: 'Resource 1',
                type: MCPResourceType.PROCESS
            });
            await mcpService.createMCPResource(testUser.id, {
                name: 'Resource 2',
                type: MCPResourceType.DATA
            });
            await mcpService.executeOperation(testUser.id, 'test_op', {});
            const result = await mcpService.deleteMCPResource(testUser.id, 'all', 'all');
            expect(result.deleted).toBe(true);
            // Verify all resources are marked as deleted
            const statusData = await mcpService.getMCPData(testUser.id, {
                type: 'resources',
                status: MCPResourceStatus.ACTIVE
            });
            expect(statusData.data).toHaveLength(0);
        });
        it('should throw error for invalid delete type', async () => {
            await expect(mcpService.deleteMCPResource(testUser.id, 'some-id', 'invalid_type')).rejects.toThrow('Invalid delete type');
        });
    });
    describe('getMCPData', () => {
        beforeEach(async () => {
            // Create test data
            await mcpService.createMCPResource(testUser.id, {
                name: 'Active Resource',
                type: MCPResourceType.PROCESS
            });
            await mcpService.createMCPResource(testUser.id, {
                name: 'Inactive Resource',
                type: MCPResourceType.DATA
            });
            await mcpService.executeOperation(testUser.id, 'completed_op', {});
        });
        it('should return status data', async () => {
            const statusData = await mcpService.getMCPData(testUser.id, { type: 'status' });
            expect(statusData.status).toBe('success');
            expect(statusData.data).toHaveLength(1);
            expect(statusData.data[0]).toHaveProperty('activeResources');
            expect(statusData.data[0]).toHaveProperty('pendingOperations');
            expect(statusData.data[0]).toHaveProperty('completedOperations');
            expect(statusData.data[0].activeResources).toBeGreaterThan(0);
        });
        it('should return resources data', async () => {
            const resourcesData = await mcpService.getMCPData(testUser.id, {
                type: 'resources',
                limit: 10,
                page: 1
            });
            expect(resourcesData.status).toBe('success');
            expect(resourcesData.data).toBeInstanceOf(Array);
            expect(resourcesData.pagination).toBeDefined();
            expect(resourcesData.pagination?.totalResults).toBeGreaterThan(0);
        });
        it('should return operations data', async () => {
            const operationsData = await mcpService.getMCPData(testUser.id, {
                type: 'operations',
                limit: 10,
                page: 1
            });
            expect(operationsData.status).toBe('success');
            expect(operationsData.data).toBeInstanceOf(Array);
            expect(operationsData.pagination).toBeDefined();
            expect(operationsData.pagination?.totalResults).toBeGreaterThan(0);
        });
        it('should filter resources by type', async () => {
            const processResources = await mcpService.getMCPData(testUser.id, {
                type: 'resources',
                resourceType: MCPResourceType.PROCESS
            });
            expect(processResources.status).toBe('success');
            expect(processResources.data).toBeInstanceOf(Array);
            processResources.data.forEach((resource) => {
                expect(resource.type).toBe(MCPResourceType.PROCESS);
            });
        });
        it('should filter resources by text search', async () => {
            const filteredResources = await mcpService.getMCPData(testUser.id, {
                type: 'resources',
                filter: 'Active'
            });
            expect(filteredResources.status).toBe('success');
            expect(filteredResources.data).toBeInstanceOf(Array);
            filteredResources.data.forEach((resource) => {
                expect(resource.name.toLowerCase()).toContain('active');
            });
        });
        it('should throw error for invalid type', async () => {
            await expect(mcpService.getMCPData(testUser.id, { type: 'invalid_type' })).rejects.toThrow('Invalid type parameter');
        });
    });
    describe('getMCPOperationById', () => {
        it('should retrieve operation successfully', async () => {
            const createdOperation = await mcpService.executeOperation(testUser.id, 'test_operation', { test: 'data' });
            const operation = await mcpService.getMCPOperationById(testUser.id, createdOperation.id);
            expect(operation.id).toBe(createdOperation.id);
            expect(operation.operation).toBe('test_operation');
            expect(operation.userId).toBe(testUser.id);
        });
        it('should throw error for non-existent operation', async () => {
            await expect(mcpService.getMCPOperationById(testUser.id, 'non-existent-id')).rejects.toThrow('Operation not found');
        });
        it("should throw error when accessing other user's operation", async () => {
            const createdOperation = await mcpService.executeOperation(testUser.id, 'test_operation', {});
            await expect(mcpService.getMCPOperationById(adminUser.id, createdOperation.id)).rejects.toThrow('Operation not found');
        });
    });
});

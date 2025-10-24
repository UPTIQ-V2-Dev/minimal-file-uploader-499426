import prisma from '../client.ts';
import { MCPResourceStatus, MCPResourceType, Role } from '../generated/prisma/index.js';
import userService from '../services/user.service.ts';
import { mcpTools } from '../tools/mcp.tool.ts';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('MCP Tools', () => {
    let testUser: any;

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
        testUser = await userService.createUser(
            'mcp-tool-user@example.com',
            'password123',
            'MCP Tool Test User',
            Role.USER
        );

        // Create admin user for future use if needed
        await userService.createUser('mcp-tool-admin@example.com', 'password123', 'MCP Tool Admin User', Role.ADMIN);
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

    describe('Execute Operation Tool', () => {
        const executeOperationTool = mcpTools.find(t => t.id === 'mcp_execute_operation')!;

        it('should execute process operation', async () => {
            const inputs = {
                userId: testUser.id,
                operation: 'process',
                data: { input: 'test data' }
            };

            const result = await executeOperationTool.fn(inputs);

            expect(result.operation).toBe('process');
            expect(result.status).toBe('COMPLETED');
            expect(result.result).toBeDefined();
            expect(result.createdAt).toBeDefined();
            expect(result.completedAt).toBeDefined();
        });

        it('should execute analyze operation', async () => {
            const inputs = {
                userId: testUser.id,
                operation: 'analyze',
                data: { dataset: 'user_behavior' }
            };

            const result = await executeOperationTool.fn(inputs);

            expect(result.operation).toBe('analyze');
            expect(result.status).toBe('COMPLETED');
            expect(result.result).toHaveProperty('analysis');
            expect(result.result).toHaveProperty('confidence');
        });

        it('should execute operation without data', async () => {
            const inputs = {
                userId: testUser.id,
                operation: 'custom_operation'
            };

            const result = await executeOperationTool.fn(inputs);

            expect(result.operation).toBe('custom_operation');
            expect(result.status).toBe('COMPLETED');
        });
    });

    describe('Get MCP Status Tool', () => {
        const getMCPStatusTool = mcpTools.find(t => t.id === 'mcp_get_status')!;

        beforeEach(async () => {
            // Create test data
            await executeOperationTool.fn({
                userId: testUser.id,
                operation: 'test_op',
                data: {}
            });
        });

        const executeOperationTool = mcpTools.find(t => t.id === 'mcp_execute_operation')!;

        it('should return status data by default', async () => {
            const inputs = {
                userId: testUser.id
            };

            const result = await getMCPStatusTool.fn(inputs);

            expect(result.status).toBe('success');
            expect(result.data).toHaveLength(1);
            expect(result.data[0]).toHaveProperty('id', 'mcp-status');
            expect(result.data[0]).toHaveProperty('status', 'active');
            expect(result.data[0]).toHaveProperty('activeResources');
            expect(result.data[0]).toHaveProperty('pendingOperations');
            expect(result.data[0]).toHaveProperty('completedOperations');
        });

        it('should return operations data', async () => {
            const inputs = {
                userId: testUser.id,
                type: 'operations',
                limit: 5,
                page: 1
            };

            const result = await getMCPStatusTool.fn(inputs);

            expect(result.status).toBe('success');
            expect(result.data).toBeInstanceOf(Array);
            expect(result.pagination).toBeDefined();
            expect(result.pagination?.totalResults).toBeGreaterThan(0);
        });
    });

    describe('Create MCP Resource Tool', () => {
        const createMCPResourceTool = mcpTools.find(t => t.id === 'mcp_create_resource')!;

        it('should create PROCESS resource', async () => {
            const inputs = {
                userId: testUser.id,
                name: 'Test Process',
                type: MCPResourceType.PROCESS,
                description: 'A test processing resource',
                data: { config: { timeout: 5000 } }
            };

            const result = await createMCPResourceTool.fn(inputs);

            expect(result.name).toBe(inputs.name);
            expect(result.type).toBe(inputs.type);
            expect(result.description).toBe(inputs.description);
            expect(result.userId).toBe(testUser.id);
            expect(result.status).toBe('ACTIVE');
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it('should create DATA resource', async () => {
            const inputs = {
                userId: testUser.id,
                name: 'Test Dataset',
                type: MCPResourceType.DATA,
                description: 'A test data resource'
            };

            const result = await createMCPResourceTool.fn(inputs);

            expect(result.type).toBe(MCPResourceType.DATA);
        });

        it('should create TOOL resource', async () => {
            const inputs = {
                userId: testUser.id,
                name: 'Test Tool',
                type: MCPResourceType.TOOL
            };

            const result = await createMCPResourceTool.fn(inputs);

            expect(result.type).toBe(MCPResourceType.TOOL);
        });

        it('should create CONTEXT resource', async () => {
            const inputs = {
                userId: testUser.id,
                name: 'Test Context',
                type: MCPResourceType.CONTEXT,
                description: 'A test context resource'
            };

            const result = await createMCPResourceTool.fn(inputs);

            expect(result.type).toBe(MCPResourceType.CONTEXT);
        });
    });

    describe('Get MCP Resource Tool', () => {
        const createMCPResourceTool = mcpTools.find(t => t.id === 'mcp_create_resource')!;
        const getMCPResourceTool = mcpTools.find(t => t.id === 'mcp_get_resource')!;

        let createdResource: any;

        beforeEach(async () => {
            createdResource = await createMCPResourceTool.fn({
                userId: testUser.id,
                name: 'Test Resource for Get',
                type: MCPResourceType.PROCESS,
                description: 'Test resource'
            });
        });

        it('should get resource successfully', async () => {
            const inputs = {
                userId: testUser.id,
                resourceId: createdResource.id
            };

            const result = await getMCPResourceTool.fn(inputs);

            expect(result.id).toBe(createdResource.id);
            expect(result.name).toBe(createdResource.name);
            expect(result.type).toBe(createdResource.type);
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it('should throw error for non-existent resource', async () => {
            const inputs = {
                userId: testUser.id,
                resourceId: 'non-existent-id'
            };

            await expect(getMCPResourceTool.fn(inputs)).rejects.toThrow('Resource not found');
        });
    });

    describe('Update MCP Resource Tool', () => {
        const createMCPResourceTool = mcpTools.find(t => t.id === 'mcp_create_resource')!;
        const updateMCPResourceTool = mcpTools.find(t => t.id === 'mcp_update_resource')!;

        let createdResource: any;

        beforeEach(async () => {
            createdResource = await createMCPResourceTool.fn({
                userId: testUser.id,
                name: 'Original Name',
                type: MCPResourceType.PROCESS,
                description: 'Original description'
            });
        });

        it('should update resource successfully', async () => {
            const inputs = {
                userId: testUser.id,
                resourceId: createdResource.id,
                name: 'Updated Name',
                description: 'Updated description',
                status: MCPResourceStatus.INACTIVE
            };

            const result = await updateMCPResourceTool.fn(inputs);

            expect(result.name).toBe(inputs.name);
            expect(result.description).toBe(inputs.description);
            expect(result.status).toBe('INACTIVE');
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it('should update partial fields', async () => {
            const inputs = {
                userId: testUser.id,
                resourceId: createdResource.id,
                name: 'Partially Updated Name'
            };

            const result = await updateMCPResourceTool.fn(inputs);

            expect(result.name).toBe(inputs.name);
            expect(result.description).toBe(createdResource.description); // Should remain unchanged
        });
    });

    describe('Delete MCP Resource Tool', () => {
        const createMCPResourceTool = mcpTools.find(t => t.id === 'mcp_create_resource')!;
        const deleteMCPResourceTool = mcpTools.find(t => t.id === 'mcp_delete_resource')!;

        let createdResource: any;

        beforeEach(async () => {
            createdResource = await createMCPResourceTool.fn({
                userId: testUser.id,
                name: 'Resource to Delete',
                type: MCPResourceType.PROCESS
            });
        });

        it('should delete resource successfully', async () => {
            const inputs = {
                userId: testUser.id,
                resourceId: createdResource.id,
                type: 'resource'
            };

            const result = await deleteMCPResourceTool.fn(inputs);

            expect(result.deleted).toBe(true);
            expect(result.resourceId).toBe(createdResource.id);
        });

        it('should throw error for non-existent resource', async () => {
            const inputs = {
                userId: testUser.id,
                resourceId: 'non-existent-id',
                type: 'resource'
            };

            await expect(deleteMCPResourceTool.fn(inputs)).rejects.toThrow('Resource not found');
        });
    });

    describe('Get MCP Operation Tool', () => {
        const executeOperationTool = mcpTools.find(t => t.id === 'mcp_execute_operation')!;
        const getMCPOperationTool = mcpTools.find(t => t.id === 'mcp_get_operation')!;

        let createdOperation: any;

        beforeEach(async () => {
            createdOperation = await executeOperationTool.fn({
                userId: testUser.id,
                operation: 'test_operation',
                data: { test: 'data' }
            });
        });

        it('should get operation successfully', async () => {
            const inputs = {
                userId: testUser.id,
                operationId: createdOperation.id
            };

            const result = await getMCPOperationTool.fn(inputs);

            expect(result.id).toBe(createdOperation.id);
            expect(result.operation).toBe('test_operation');
            expect(result.status).toBe('COMPLETED');
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it('should throw error for non-existent operation', async () => {
            const inputs = {
                userId: testUser.id,
                operationId: 'non-existent-id'
            };

            await expect(getMCPOperationTool.fn(inputs)).rejects.toThrow('Operation not found');
        });
    });

    describe('Process Data Tool', () => {
        const processDataTool = mcpTools.find(t => t.id === 'mcp_process_data')!;

        it('should process data with analyze type', async () => {
            const inputs = {
                userId: testUser.id,
                input: { data: 'sample data for analysis' },
                processType: 'analyze',
                options: { format: 'json' }
            };

            const result = await processDataTool.fn(inputs);

            expect(result).toHaveProperty('operationId');
            expect(result).toHaveProperty('processedData');
            expect(result).toHaveProperty('metadata');
            expect(result.metadata).toHaveProperty('inputSize');
            expect(result.metadata).toHaveProperty('outputSize');
            expect(result.metadata).toHaveProperty('processingTime');
            expect(result.metadata).toHaveProperty('errors');
        });

        it('should process data with transform type', async () => {
            const inputs = {
                userId: testUser.id,
                input: [{ id: 1, name: 'test' }],
                processType: 'transform'
            };

            const result = await processDataTool.fn(inputs);

            expect(result.operationId).toBeDefined();
            expect(result.processedData).toBeDefined();
            expect(result.metadata.inputSize).toBeGreaterThan(0);
        });

        it('should process data with validate type', async () => {
            const inputs = {
                userId: testUser.id,
                input: { schema: 'validation test' },
                processType: 'validate',
                options: { strict: true }
            };

            const result = await processDataTool.fn(inputs);

            expect(result.operationId).toBeDefined();
            expect(result.processedData).toBeDefined();
        });

        it('should process data with aggregate type', async () => {
            const inputs = {
                userId: testUser.id,
                input: [1, 2, 3, 4, 5],
                processType: 'aggregate',
                options: { operation: 'sum' }
            };

            const result = await processDataTool.fn(inputs);

            expect(result.operationId).toBeDefined();
            expect(result.processedData).toBeDefined();
            expect(result.metadata.errors).toHaveLength(0);
        });
    });

    describe('Manage Context Tool', () => {
        const manageContextTool = mcpTools.find(t => t.id === 'mcp_manage_context')!;

        it('should create context successfully', async () => {
            const inputs = {
                userId: testUser.id,
                action: 'create',
                contextName: 'Test Context',
                contextData: { key: 'value', settings: { enabled: true } },
                metadata: { tags: ['test', 'context'], priority: 'medium' }
            };

            const result = await manageContextTool.fn(inputs);

            expect(result.action).toBe('create');
            expect(result.contextId).toBeDefined();
            expect(result.contextData).toBeDefined();
            expect(result.success).toBe(true);
        });

        it('should retrieve existing context', async () => {
            // First create a context
            await manageContextTool.fn({
                userId: testUser.id,
                action: 'create',
                contextName: 'Retrievable Context',
                contextData: { retrieveTest: 'data' }
            });

            // Then retrieve it
            const inputs = {
                userId: testUser.id,
                action: 'retrieve',
                contextName: 'Retrievable Context'
            };

            const result = await manageContextTool.fn(inputs);

            expect(result.action).toBe('retrieve');
            expect(result.contextId).toBeDefined();
            expect(result.contextData).toBeDefined();
            expect(result.success).toBe(true);
        });

        it('should return unsuccessful result for non-existent context', async () => {
            const inputs = {
                userId: testUser.id,
                action: 'retrieve',
                contextName: 'Non-existent Context'
            };

            const result = await manageContextTool.fn(inputs);

            expect(result.action).toBe('retrieve');
            expect(result.contextId).toBeUndefined();
            expect(result.success).toBe(false);
        });

        it('should throw error for unsupported action', async () => {
            const inputs = {
                userId: testUser.id,
                action: 'unsupported_action',
                contextName: 'Test Context'
            };

            await expect(manageContextTool.fn(inputs)).rejects.toThrow(
                'Context action unsupported_action not implemented'
            );
        });
    });

    describe('Tool Schema Validation', () => {
        it('should have proper input schemas for all tools', () => {
            mcpTools.forEach(tool => {
                expect(tool).toHaveProperty('id');
                expect(tool).toHaveProperty('name');
                expect(tool).toHaveProperty('description');
                expect(tool).toHaveProperty('inputSchema');
                expect(tool).toHaveProperty('fn');

                expect(typeof tool.id).toBe('string');
                expect(typeof tool.name).toBe('string');
                expect(typeof tool.description).toBe('string');
                expect(typeof tool.fn).toBe('function');
                expect(tool.inputSchema).toBeDefined();
            });
        });

        it('should have valid output schemas for tools that return data', () => {
            const toolsWithOutputSchemas = mcpTools.filter(tool => tool.outputSchema);

            expect(toolsWithOutputSchemas.length).toBeGreaterThan(0);

            toolsWithOutputSchemas.forEach(tool => {
                expect(tool.outputSchema).toBeDefined();
            });
        });
    });
});

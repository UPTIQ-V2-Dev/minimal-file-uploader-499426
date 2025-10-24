import { MCPResourceStatus, MCPResourceType } from '../generated/prisma/index.js';
import { mcpService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import { z } from 'zod';

// Schema definitions
const mcpResourceSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    description: z.string().nullable(),
    data: z.any(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.number()
});

const mcpOperationSchema = z.object({
    id: z.string(),
    operation: z.string(),
    data: z.any(),
    result: z.any().nullable(),
    status: z.string(),
    error: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    completedAt: z.string().nullable(),
    userId: z.number(),
    resourceId: z.string().nullable()
});

// Execute MCP Operation Tool
const executeOperationTool: MCPTool = {
    id: 'mcp_execute_operation',
    name: 'Execute MCP Operation',
    description: 'Execute a Model Context Protocol operation with specified data',
    inputSchema: z.object({
        userId: z.number().int(),
        operation: z.string().min(1).max(100),
        data: z.any().optional()
    }),
    outputSchema: mcpOperationSchema,
    fn: async (inputs: { userId: number; operation: string; data?: any }) => {
        const result = await mcpService.executeOperation(inputs.userId, inputs.operation, inputs.data);
        return {
            ...result,
            createdAt: result.createdAt.toISOString(),
            updatedAt: result.updatedAt.toISOString(),
            completedAt: result.completedAt?.toISOString() || null
        };
    }
};

// Get MCP Status Tool
const getMCPStatusTool: MCPTool = {
    id: 'mcp_get_status',
    name: 'Get MCP Status',
    description: 'Get MCP system status and resource information',
    inputSchema: z.object({
        userId: z.number().int(),
        type: z.enum(['status', 'resources', 'operations']).optional().default('status'),
        filter: z.string().optional(),
        limit: z.number().int().min(1).max(100).optional().default(10),
        page: z.number().int().min(1).optional().default(1)
    }),
    outputSchema: z.object({
        data: z.array(z.any()),
        status: z.string(),
        pagination: z
            .object({
                page: z.number(),
                limit: z.number(),
                totalPages: z.number(),
                totalResults: z.number()
            })
            .optional()
    }),
    fn: async (inputs: { userId: number; type?: string; filter?: string; limit?: number; page?: number }) => {
        const result = await mcpService.getMCPData(inputs.userId, inputs);
        return result;
    }
};

// Create MCP Resource Tool
const createMCPResourceTool: MCPTool = {
    id: 'mcp_create_resource',
    name: 'Create MCP Resource',
    description: 'Create a new MCP resource for processing and management',
    inputSchema: z.object({
        userId: z.number().int(),
        name: z.string().min(1).max(200),
        type: z.enum([MCPResourceType.PROCESS, MCPResourceType.DATA, MCPResourceType.TOOL, MCPResourceType.CONTEXT]),
        description: z.string().max(500).optional(),
        data: z.any().optional()
    }),
    outputSchema: mcpResourceSchema,
    fn: async (inputs: { userId: number; name: string; type: MCPResourceType; description?: string; data?: any }) => {
        const resource = await mcpService.createMCPResource(inputs.userId, {
            name: inputs.name,
            type: inputs.type,
            description: inputs.description,
            data: inputs.data
        });
        return {
            ...resource,
            createdAt: resource.createdAt.toISOString(),
            updatedAt: resource.updatedAt.toISOString()
        };
    }
};

// Get MCP Resource Tool
const getMCPResourceTool: MCPTool = {
    id: 'mcp_get_resource',
    name: 'Get MCP Resource',
    description: 'Retrieve a specific MCP resource by ID',
    inputSchema: z.object({
        userId: z.number().int(),
        resourceId: z.string()
    }),
    outputSchema: mcpResourceSchema.extend({
        operations: z.array(mcpOperationSchema).optional()
    }),
    fn: async (inputs: { userId: number; resourceId: string }) => {
        const resource = await mcpService.getMCPResourceById(inputs.userId, inputs.resourceId);
        return {
            ...resource,
            createdAt: resource.createdAt.toISOString(),
            updatedAt: resource.updatedAt.toISOString(),
            operations: (resource as any).operations?.map((op: any) => ({
                ...op,
                createdAt: op.createdAt.toISOString(),
                updatedAt: op.updatedAt.toISOString(),
                completedAt: op.completedAt?.toISOString() || null
            }))
        };
    }
};

// Update MCP Resource Tool
const updateMCPResourceTool: MCPTool = {
    id: 'mcp_update_resource',
    name: 'Update MCP Resource',
    description: 'Update an existing MCP resource',
    inputSchema: z.object({
        userId: z.number().int(),
        resourceId: z.string(),
        name: z.string().min(1).max(200).optional(),
        description: z.string().max(500).optional(),
        data: z.any().optional(),
        status: z.enum([MCPResourceStatus.ACTIVE, MCPResourceStatus.INACTIVE, MCPResourceStatus.DELETED]).optional()
    }),
    outputSchema: mcpResourceSchema,
    fn: async (inputs: {
        userId: number;
        resourceId: string;
        name?: string;
        description?: string;
        data?: any;
        status?: MCPResourceStatus;
    }) => {
        const updateData: any = {};
        if (inputs.name) updateData.name = inputs.name;
        if (inputs.description !== undefined) updateData.description = inputs.description;
        if (inputs.data !== undefined) updateData.data = inputs.data;
        if (inputs.status) updateData.status = inputs.status;

        const resource = await mcpService.updateMCPResource(inputs.userId, inputs.resourceId, updateData);
        return {
            ...resource,
            createdAt: resource.createdAt.toISOString(),
            updatedAt: resource.updatedAt.toISOString()
        };
    }
};

// Delete MCP Resource Tool
const deleteMCPResourceTool: MCPTool = {
    id: 'mcp_delete_resource',
    name: 'Delete MCP Resource',
    description: 'Delete MCP resources, operations, or all data',
    inputSchema: z.object({
        userId: z.number().int(),
        resourceId: z.string(),
        type: z.enum(['resource', 'operation', 'all'])
    }),
    outputSchema: z.object({
        deleted: z.boolean(),
        resourceId: z.string()
    }),
    fn: async (inputs: { userId: number; resourceId: string; type: string }) => {
        const result = await mcpService.deleteMCPResource(inputs.userId, inputs.resourceId, inputs.type);
        return result;
    }
};

// Get MCP Operation Tool
const getMCPOperationTool: MCPTool = {
    id: 'mcp_get_operation',
    name: 'Get MCP Operation',
    description: 'Retrieve a specific MCP operation by ID',
    inputSchema: z.object({
        userId: z.number().int(),
        operationId: z.string()
    }),
    outputSchema: mcpOperationSchema.extend({
        resource: z
            .object({
                id: z.string(),
                name: z.string(),
                type: z.string()
            })
            .optional()
    }),
    fn: async (inputs: { userId: number; operationId: string }) => {
        const operation = await mcpService.getMCPOperationById(inputs.userId, inputs.operationId);
        return {
            ...operation,
            createdAt: operation.createdAt.toISOString(),
            updatedAt: operation.updatedAt.toISOString(),
            completedAt: operation.completedAt?.toISOString() || null
        };
    }
};

// Process Data Tool (Meta-tool for data processing)
const processDataTool: MCPTool = {
    id: 'mcp_process_data',
    name: 'Process Data',
    description: 'Process data using MCP operations with built-in transformation capabilities',
    inputSchema: z.object({
        userId: z.number().int(),
        input: z.any(),
        processType: z.enum(['analyze', 'transform', 'validate', 'aggregate']),
        options: z
            .object({
                format: z.string().optional(),
                filters: z.array(z.string()).optional(),
                limit: z.number().optional()
            })
            .optional()
    }),
    outputSchema: z.object({
        operationId: z.string(),
        processedData: z.any(),
        metadata: z.object({
            inputSize: z.number().optional(),
            outputSize: z.number().optional(),
            processingTime: z.number().optional(),
            errors: z.array(z.string()).optional()
        })
    }),
    fn: async (inputs: { userId: number; input: any; processType: string; options?: any }) => {
        // Execute the processing operation
        const operation = await mcpService.executeOperation(inputs.userId, inputs.processType, {
            input: inputs.input,
            options: inputs.options || {}
        });

        // Return processed result with metadata
        return {
            operationId: operation.id,
            processedData: operation.result,
            metadata: {
                inputSize: JSON.stringify(inputs.input).length,
                outputSize: operation.result ? JSON.stringify(operation.result).length : 0,
                processingTime: operation.completedAt
                    ? new Date(operation.completedAt).getTime() - new Date(operation.createdAt).getTime()
                    : 0,
                errors: operation.error ? [operation.error] : []
            }
        };
    }
};

// Context Management Tool
const manageContextTool: MCPTool = {
    id: 'mcp_manage_context',
    name: 'Manage Context',
    description: 'Create and manage context resources for AI agent operations',
    inputSchema: z.object({
        userId: z.number().int(),
        action: z.enum(['create', 'update', 'retrieve', 'delete']),
        contextName: z.string(),
        contextData: z.any().optional(),
        metadata: z
            .object({
                tags: z.array(z.string()).optional(),
                priority: z.enum(['low', 'medium', 'high']).optional(),
                expires: z.string().optional()
            })
            .optional()
    }),
    outputSchema: z.object({
        action: z.string(),
        contextId: z.string().optional(),
        contextData: z.any().optional(),
        success: z.boolean()
    }),
    fn: async (inputs: { userId: number; action: string; contextName: string; contextData?: any; metadata?: any }) => {
        switch (inputs.action) {
            case 'create':
                const resource = await mcpService.createMCPResource(inputs.userId, {
                    name: inputs.contextName,
                    type: MCPResourceType.CONTEXT,
                    description: `Context: ${inputs.contextName}`,
                    data: {
                        context: inputs.contextData,
                        metadata: inputs.metadata || {}
                    }
                });
                return {
                    action: inputs.action,
                    contextId: resource.id,
                    contextData: resource.data,
                    success: true
                };

            case 'retrieve':
                // Find resource by name
                const statusData = await mcpService.getMCPData(inputs.userId, {
                    type: 'resources',
                    filter: inputs.contextName,
                    resourceType: MCPResourceType.CONTEXT
                });
                const foundResource = statusData.data.find((r: any) => r.name === inputs.contextName);
                return {
                    action: inputs.action,
                    contextId: foundResource?.id,
                    contextData: (foundResource as any)?.data,
                    success: !!foundResource
                };

            default:
                throw new Error(`Context action ${inputs.action} not implemented`);
        }
    }
};

export const mcpTools: MCPTool[] = [
    executeOperationTool,
    getMCPStatusTool,
    createMCPResourceTool,
    getMCPResourceTool,
    updateMCPResourceTool,
    deleteMCPResourceTool,
    getMCPOperationTool,
    processDataTool,
    manageContextTool
];

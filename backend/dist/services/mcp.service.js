import prisma from "../client.js";
import logger from "../config/logger.js";
import { MCPOperationStatus, MCPResourceStatus } from '../generated/prisma/index.js';
import ApiError from "../utils/ApiError.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import httpStatus from 'http-status';
import { zodToJsonSchema } from 'zod-to-json-schema';
// Keep existing MCP protocol functionality
export const registerMCPTools = (params) => {
    const { server, tools } = params;
    // Register tools list handler
    server.setRequestHandler(ListToolsRequestSchema, () => {
        return {
            tools: tools.map(tool => ({
                name: tool.id,
                title: tool.name,
                description: tool.description,
                inputSchema: zodToJsonSchema(tool.inputSchema),
                outputSchema: tool.outputSchema ? zodToJsonSchema(tool.outputSchema) : undefined
            }))
        };
    });
    // Register tool execution handler with progress notification support
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        const tool = tools.find(t => t.id === name);
        if (!tool) {
            throw {
                code: -32601,
                message: `Method not found: ${name}`
            };
        }
        try {
            const result = await tool.fn(args);
            return {
                content: [{ type: 'text', text: JSON.stringify(result) }],
                structuredContent: result
            };
        }
        catch (error) {
            logger.error(`Error executing tool ${name}: ${error}`);
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({ error: error?.message || 'Tool execution failed' })
                    }
                ]
            };
        }
    });
};
// REST API functionality for MCP resource management
/**
 * Execute MCP operation
 * @param {number} userId - User ID
 * @param {string} operation - Operation to execute
 * @param {object} data - Operation data
 * @returns {Promise<MCPOperation>}
 */
const executeOperation = async (userId, operation, data) => {
    logger.info(`Executing MCP operation ${operation} for user ${userId}`);
    try {
        // Create operation record
        const mcpOperation = await prisma.mCPOperation.create({
            data: {
                operation,
                data: data || {},
                userId,
                status: MCPOperationStatus.RUNNING
            }
        });
        // Simulate operation execution (replace with actual operation logic)
        let result;
        let status = MCPOperationStatus.COMPLETED;
        let error = null;
        try {
            switch (operation) {
                case 'process':
                    result = { output: `Processed: ${JSON.stringify(data)}`, processedAt: new Date().toISOString() };
                    break;
                case 'analyze':
                    result = { analysis: `Analysis of data: ${JSON.stringify(data)}`, confidence: 0.95 };
                    break;
                case 'transform':
                    result = { transformed: data, transformationType: 'standard' };
                    break;
                default:
                    result = { message: `Operation ${operation} completed`, data };
            }
        }
        catch (operationError) {
            status = MCPOperationStatus.FAILED;
            error = operationError.message;
            result = { error: error };
        }
        // Update operation with result
        const updatedOperation = await prisma.mCPOperation.update({
            where: { id: mcpOperation.id },
            data: {
                result,
                status,
                error,
                completedAt: new Date()
            }
        });
        logger.info(`MCP operation ${operation} completed with status ${status}`);
        return updatedOperation;
    }
    catch (error) {
        logger.error(`Failed to execute MCP operation ${operation}:`, error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to execute MCP operation');
    }
};
/**
 * Get MCP data/status with filtering
 * @param {number} userId - User ID
 * @param {object} options - Query options
 * @returns {Promise<object>}
 */
const getMCPData = async (userId, options) => {
    const { type = 'status', filter, limit = 10, page = 1, resourceType, status } = options;
    try {
        switch (type) {
            case 'status':
                // Return general MCP status
                const [activeResources, pendingOps, completedOps] = await Promise.all([
                    prisma.mCPResource.count({
                        where: { userId, status: MCPResourceStatus.ACTIVE }
                    }),
                    prisma.mCPOperation.count({
                        where: { userId, status: MCPOperationStatus.PENDING }
                    }),
                    prisma.mCPOperation.count({
                        where: { userId, status: MCPOperationStatus.COMPLETED }
                    })
                ]);
                return {
                    data: [
                        {
                            id: 'mcp-status',
                            status: 'active',
                            activeResources,
                            pendingOperations: pendingOps,
                            completedOperations: completedOps,
                            timestamp: new Date().toISOString()
                        }
                    ],
                    status: 'success'
                };
            case 'resources':
                // Return paginated resources
                const resourceFilter = { userId };
                if (resourceType)
                    resourceFilter.type = resourceType;
                if (status)
                    resourceFilter.status = status;
                if (filter) {
                    resourceFilter.OR = [
                        { name: { contains: filter, mode: 'insensitive' } },
                        { description: { contains: filter, mode: 'insensitive' } }
                    ];
                }
                const skip = (page - 1) * limit;
                const [resources, totalResources] = await Promise.all([
                    prisma.mCPResource.findMany({
                        where: resourceFilter,
                        skip,
                        take: limit,
                        orderBy: { createdAt: 'desc' },
                        include: {
                            operations: {
                                take: 5,
                                orderBy: { createdAt: 'desc' }
                            }
                        }
                    }),
                    prisma.mCPResource.count({ where: resourceFilter })
                ]);
                return {
                    data: resources,
                    status: 'success',
                    pagination: {
                        page,
                        limit,
                        totalPages: Math.ceil(totalResources / limit),
                        totalResults: totalResources
                    }
                };
            case 'operations':
                // Return paginated operations
                const operationFilter = { userId };
                if (filter) {
                    operationFilter.operation = { contains: filter, mode: 'insensitive' };
                }
                const opSkip = (page - 1) * limit;
                const [operations, totalOperations] = await Promise.all([
                    prisma.mCPOperation.findMany({
                        where: operationFilter,
                        skip: opSkip,
                        take: limit,
                        orderBy: { createdAt: 'desc' },
                        include: {
                            resource: {
                                select: { id: true, name: true, type: true }
                            }
                        }
                    }),
                    prisma.mCPOperation.count({ where: operationFilter })
                ]);
                return {
                    data: operations,
                    status: 'success',
                    pagination: {
                        page,
                        limit,
                        totalPages: Math.ceil(totalOperations / limit),
                        totalResults: totalOperations
                    }
                };
            default:
                throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid type parameter');
        }
    }
    catch (error) {
        logger.error('Failed to get MCP data:', error);
        if (error instanceof ApiError)
            throw error;
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve MCP data');
    }
};
/**
 * Delete MCP resource/operation
 * @param {number} userId - User ID
 * @param {string} resourceId - Resource ID
 * @param {string} type - Delete type ('resource', 'operation', 'all')
 * @returns {Promise<object>}
 */
const deleteMCPResource = async (userId, resourceId, type) => {
    try {
        switch (type) {
            case 'resource':
                // Verify resource exists and belongs to user
                const resource = await prisma.mCPResource.findFirst({
                    where: { id: resourceId, userId }
                });
                if (!resource) {
                    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
                }
                // Soft delete - mark as deleted
                await prisma.mCPResource.update({
                    where: { id: resourceId },
                    data: { status: MCPResourceStatus.DELETED }
                });
                logger.info(`MCP resource ${resourceId} marked as deleted for user ${userId}`);
                break;
            case 'operation':
                // Delete specific operation
                const operation = await prisma.mCPOperation.findFirst({
                    where: { id: resourceId, userId }
                });
                if (!operation) {
                    throw new ApiError(httpStatus.NOT_FOUND, 'Operation not found');
                }
                await prisma.mCPOperation.delete({
                    where: { id: resourceId }
                });
                logger.info(`MCP operation ${resourceId} deleted for user ${userId}`);
                break;
            case 'all':
                // Delete all resources and operations for user (soft delete for resources)
                await Promise.all([
                    prisma.mCPResource.updateMany({
                        where: { userId },
                        data: { status: MCPResourceStatus.DELETED }
                    }),
                    prisma.mCPOperation.deleteMany({
                        where: { userId }
                    })
                ]);
                logger.info(`All MCP resources and operations deleted for user ${userId}`);
                break;
            default:
                throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid delete type');
        }
        return {
            deleted: true,
            resourceId
        };
    }
    catch (error) {
        logger.error(`Failed to delete MCP resource ${resourceId}:`, error);
        if (error instanceof ApiError)
            throw error;
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete MCP resource');
    }
};
/**
 * Create MCP resource
 * @param {number} userId - User ID
 * @param {object} data - Resource data
 * @returns {Promise<MCPResource>}
 */
const createMCPResource = async (userId, data) => {
    try {
        const resource = await prisma.mCPResource.create({
            data: {
                ...data,
                userId,
                data: data.data || {}
            }
        });
        logger.info(`Created MCP resource ${resource.id} for user ${userId}`);
        return resource;
    }
    catch (error) {
        logger.error('Failed to create MCP resource:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create MCP resource');
    }
};
/**
 * Get MCP resource by ID
 * @param {number} userId - User ID
 * @param {string} resourceId - Resource ID
 * @returns {Promise<MCPResource>}
 */
const getMCPResourceById = async (userId, resourceId) => {
    const resource = await prisma.mCPResource.findFirst({
        where: { id: resourceId, userId },
        include: {
            operations: {
                orderBy: { createdAt: 'desc' },
                take: 10
            }
        }
    });
    if (!resource) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
    }
    return resource;
};
/**
 * Update MCP resource
 * @param {number} userId - User ID
 * @param {string} resourceId - Resource ID
 * @param {object} updateData - Update data
 * @returns {Promise<MCPResource>}
 */
const updateMCPResource = async (userId, resourceId, updateData) => {
    // Verify resource exists and belongs to user
    await getMCPResourceById(userId, resourceId);
    const updatedResource = await prisma.mCPResource.update({
        where: { id: resourceId },
        data: updateData
    });
    logger.info(`Updated MCP resource ${resourceId} for user ${userId}`);
    return updatedResource;
};
/**
 * Get MCP operation by ID
 * @param {number} userId - User ID
 * @param {string} operationId - Operation ID
 * @returns {Promise<MCPOperation>}
 */
const getMCPOperationById = async (userId, operationId) => {
    const operation = await prisma.mCPOperation.findFirst({
        where: { id: operationId, userId },
        include: {
            resource: {
                select: { id: true, name: true, type: true }
            }
        }
    });
    if (!operation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Operation not found');
    }
    return operation;
};
export default {
    // Protocol functions
    registerMCPTools,
    // REST API functions
    executeOperation,
    getMCPData,
    deleteMCPResource,
    createMCPResource,
    getMCPResourceById,
    updateMCPResource,
    getMCPOperationById
};

import mcpService from "../services/mcp.service.js";
import catchAsyncWithAuth from "../utils/catchAsyncWithAuth.js";
import httpStatus from 'http-status';
/**
 * Execute MCP operation
 * POST /mcp
 */
const executeOperation = catchAsyncWithAuth(async (req, res) => {
    const { operation, data } = req.body;
    const userId = req.user.id;
    const result = await mcpService.executeOperation(userId, operation, data);
    res.status(httpStatus.OK).json({
        result: {
            operationId: result.id,
            operation: result.operation,
            status: result.status,
            result: result.result,
            completedAt: result.completedAt
        },
        status: 'success'
    });
});
/**
 * Get MCP data/status
 * GET /mcp
 */
const getMCPData = catchAsyncWithAuth(async (req, res) => {
    const userId = req.user.id;
    const options = req.validatedQuery;
    const data = await mcpService.getMCPData(userId, options);
    res.status(httpStatus.OK).json(data);
});
/**
 * Delete MCP resource
 * DELETE /mcp
 */
const deleteMCPResource = catchAsyncWithAuth(async (req, res) => {
    const { resourceId, type } = req.body;
    const userId = req.user.id;
    const result = await mcpService.deleteMCPResource(userId, resourceId, type);
    res.status(httpStatus.OK).json(result);
});
/**
 * Create MCP resource
 * POST /mcp/resources
 */
const createMCPResource = catchAsyncWithAuth(async (req, res) => {
    const userId = req.user.id;
    const resourceData = req.body;
    const resource = await mcpService.createMCPResource(userId, resourceData);
    res.status(httpStatus.CREATED).json(resource);
});
/**
 * Get MCP resource by ID
 * GET /mcp/resources/:resourceId
 */
const getMCPResourceById = catchAsyncWithAuth(async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.user.id;
    const resource = await mcpService.getMCPResourceById(userId, resourceId);
    res.status(httpStatus.OK).json(resource);
});
/**
 * Update MCP resource
 * PATCH /mcp/resources/:resourceId
 */
const updateMCPResource = catchAsyncWithAuth(async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    const resource = await mcpService.updateMCPResource(userId, resourceId, updateData);
    res.status(httpStatus.OK).json(resource);
});
/**
 * Get MCP operation by ID
 * GET /mcp/operations/:operationId
 */
const getMCPOperationById = catchAsyncWithAuth(async (req, res) => {
    const { operationId } = req.params;
    const userId = req.user.id;
    const operation = await mcpService.getMCPOperationById(userId, operationId);
    res.status(httpStatus.OK).json(operation);
});
export default {
    executeOperation,
    getMCPData,
    deleteMCPResource,
    createMCPResource,
    getMCPResourceById,
    updateMCPResource,
    getMCPOperationById
};

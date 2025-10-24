import { MCPOperationStatus, MCPResourceStatus, MCPResourceType } from '../generated/prisma/index.js';
import Joi from 'joi';
const executeOperation = {
    body: Joi.object().keys({
        operation: Joi.string().required().min(1).max(100),
        data: Joi.object().optional()
    })
};
const getStatus = {
    query: Joi.object().keys({
        type: Joi.string().valid('status', 'operations', 'resources'),
        filter: Joi.string().optional(),
        limit: Joi.number().integer().min(1).max(100).default(10),
        page: Joi.number().integer().min(1).default(1),
        resourceType: Joi.string().valid(...Object.values(MCPResourceType)),
        status: Joi.string().valid(...Object.values(MCPResourceStatus))
    })
};
const deleteResource = {
    body: Joi.object().keys({
        resourceId: Joi.string().required(),
        type: Joi.string().required().valid('resource', 'operation', 'all')
    })
};
const createResource = {
    body: Joi.object().keys({
        name: Joi.string().required().min(1).max(200),
        type: Joi.string()
            .required()
            .valid(...Object.values(MCPResourceType)),
        description: Joi.string().optional().max(500),
        data: Joi.object().optional()
    })
};
const updateResource = {
    params: Joi.object().keys({
        resourceId: Joi.string().required()
    }),
    body: Joi.object()
        .keys({
        name: Joi.string().min(1).max(200),
        description: Joi.string().max(500),
        data: Joi.object(),
        status: Joi.string().valid(...Object.values(MCPResourceStatus))
    })
        .min(1)
};
const getResource = {
    params: Joi.object().keys({
        resourceId: Joi.string().required()
    })
};
const getOperation = {
    params: Joi.object().keys({
        operationId: Joi.string().required()
    })
};
const getOperations = {
    query: Joi.object().keys({
        operation: Joi.string(),
        status: Joi.string().valid(...Object.values(MCPOperationStatus)),
        resourceId: Joi.string(),
        limit: Joi.number().integer().min(1).max(100).default(10),
        page: Joi.number().integer().min(1).default(1),
        sortBy: Joi.string().default('createdAt'),
        sortType: Joi.string().valid('asc', 'desc').default('desc')
    })
};
export default {
    executeOperation,
    getStatus,
    deleteResource,
    createResource,
    updateResource,
    getResource,
    getOperation,
    getOperations
};

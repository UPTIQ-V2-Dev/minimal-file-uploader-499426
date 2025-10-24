import mcpRestController from "../../controllers/mcpRest.controller.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { mcpValidation } from "../../validations/index.js";
import express from 'express';
const router = express.Router();
// Main MCP endpoints according to API specification
router
    .route('/')
    .post(auth('manageMCP'), validate(mcpValidation.executeOperation), mcpRestController.executeOperation)
    .get(auth('getMCP'), validate(mcpValidation.getStatus), mcpRestController.getMCPData)
    .delete(auth('manageMCP'), validate(mcpValidation.deleteResource), mcpRestController.deleteMCPResource);
// Additional resource management endpoints
router
    .route('/resources')
    .post(auth('manageMCP'), validate(mcpValidation.createResource), mcpRestController.createMCPResource);
router
    .route('/resources/:resourceId')
    .get(auth('getMCP'), validate(mcpValidation.getResource), mcpRestController.getMCPResourceById)
    .patch(auth('manageMCP'), validate(mcpValidation.updateResource), mcpRestController.updateMCPResource);
router
    .route('/operations/:operationId')
    .get(auth('getMCP'), validate(mcpValidation.getOperation), mcpRestController.getMCPOperationById);
export default router;
/**
 * @swagger
 * tags:
 *   name: MCP
 *   description: Model Context Protocol operations and resource management
 */
/**
 * @swagger
 * /mcp:
 *   post:
 *     summary: Execute MCP operation
 *     description: Execute MCP operations with authentication
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - operation
 *             properties:
 *               operation:
 *                 type: string
 *                 description: Operation to execute
 *                 example: "process"
 *               data:
 *                 type: object
 *                 description: Operation data
 *                 example: {"input": "test data"}
 *     responses:
 *       "200":
 *         description: Operation executed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                 status:
 *                   type: string
 *                   example: "success"
 *       "400":
 *         description: Invalid operation or data
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "500":
 *         description: Internal server error
 *
 *   get:
 *     summary: Retrieve MCP status or data
 *     description: Get MCP status, resources, or operations data
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [status, resources, operations]
 *         description: Type of data to retrieve
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         default: 10
 *         description: Maximum number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: MCP data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: string
 *                   example: "success"
 *       "400":
 *         description: Invalid query parameters
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "500":
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete MCP resources or data
 *     description: Delete MCP resources, operations, or all data
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resourceId
 *               - type
 *             properties:
 *               resourceId:
 *                 type: string
 *                 description: Resource or operation ID to delete
 *               type:
 *                 type: string
 *                 enum: [resource, operation, all]
 *                 description: Type of deletion
 *     responses:
 *       "200":
 *         description: Resource deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *                   example: true
 *                 resourceId:
 *                   type: string
 *       "400":
 *         description: Invalid resource ID or type
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "404":
 *         description: Resource not found
 *       "500":
 *         description: Internal server error
 *
 * /mcp/resources:
 *   post:
 *     summary: Create MCP resource
 *     description: Create a new MCP resource
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: Resource name
 *               type:
 *                 type: string
 *                 enum: [PROCESS, DATA, TOOL, CONTEXT]
 *                 description: Resource type
 *               description:
 *                 type: string
 *                 description: Resource description
 *               data:
 *                 type: object
 *                 description: Resource data
 *     responses:
 *       "201":
 *         description: Resource created successfully
 *       "400":
 *         description: Invalid input data
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "500":
 *         description: Internal server error
 *
 * /mcp/resources/{resourceId}:
 *   get:
 *     summary: Get MCP resource by ID
 *     description: Retrieve a specific MCP resource
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource ID
 *     responses:
 *       "200":
 *         description: Resource retrieved successfully
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "404":
 *         description: Resource not found
 *       "500":
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update MCP resource
 *     description: Update an existing MCP resource
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               data:
 *                 type: object
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, DELETED]
 *     responses:
 *       "200":
 *         description: Resource updated successfully
 *       "400":
 *         description: Invalid input data
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "404":
 *         description: Resource not found
 *       "500":
 *         description: Internal server error
 *
 * /mcp/operations/{operationId}:
 *   get:
 *     summary: Get MCP operation by ID
 *     description: Retrieve a specific MCP operation
 *     tags: [MCP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: operationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Operation ID
 *     responses:
 *       "200":
 *         description: Operation retrieved successfully
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Insufficient permissions
 *       "404":
 *         description: Operation not found
 *       "500":
 *         description: Internal server error
 */

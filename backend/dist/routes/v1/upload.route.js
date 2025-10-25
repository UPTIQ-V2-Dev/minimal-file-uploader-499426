import { fileUploadController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { fileUploadValidation } from "../../validations/index.js";
import express from 'express';
const router = express.Router();
// File upload routes
router.post('/initiate', auth('uploadFiles'), validate(fileUploadValidation.initiateUpload), fileUploadController.initiateUpload);
router.post('/complete', auth('uploadFiles'), validate(fileUploadValidation.completeUpload), fileUploadController.completeUpload);
// Additional file management routes
router
    .route('/')
    .get(auth('uploadFiles'), validate(fileUploadValidation.queryUploads), fileUploadController.getUploads);
router
    .route('/:uploadId')
    .get(auth('uploadFiles'), validate(fileUploadValidation.getUpload), fileUploadController.getUpload)
    .delete(auth('uploadFiles'), validate(fileUploadValidation.deleteUpload), fileUploadController.deleteUpload);
export default router;
/**
 * @swagger
 * tags:
 *   name: File Upload
 *   description: File upload management
 */
/**
 * @swagger
 * /api/upload/initiate:
 *   post:
 *     summary: Initiate file upload and get signed URL
 *     description: Initialize a file upload process and receive a signed URL for direct upload to cloud storage
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - fileType
 *               - fileSize
 *             properties:
 *               fileName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: Name of the file to upload
 *               fileType:
 *                 type: string
 *                 enum: [image/jpeg, image/png, image/gif, image/webp, application/pdf]
 *                 description: MIME type of the file
 *               fileSize:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5242880
 *                 description: Size of the file in bytes (max 5MB)
 *             example:
 *               fileName: document.pdf
 *               fileType: application/pdf
 *               fileSize: 1048576
 *     responses:
 *       "200":
 *         description: Upload initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uploadId:
 *                   type: string
 *                   format: uuid
 *                   description: Unique identifier for this upload
 *                 signedUrl:
 *                   type: string
 *                   format: uri
 *                   description: Pre-signed URL for uploading the file
 *                 fileUrl:
 *                   type: string
 *                   format: uri
 *                   description: Final URL where the file will be accessible
 *               example:
 *                 uploadId: "123e4567-e89b-12d3-a456-426614174000"
 *                 signedUrl: "https://storage.amazonaws.com/bucket/upload-url"
 *                 fileUrl: "https://storage.amazonaws.com/bucket/files/document.pdf"
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "413":
 *         description: File too large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "415":
 *         description: Unsupported file type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /api/upload/complete:
 *   post:
 *     summary: Complete file upload process
 *     description: Mark a file upload as completed after successful upload to cloud storage
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uploadId
 *             properties:
 *               uploadId:
 *                 type: string
 *                 format: uuid
 *                 description: Upload ID from initiate endpoint
 *             example:
 *               uploadId: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       "200":
 *         description: Upload completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uploadId:
 *                   type: string
 *                   format: uuid
 *                   description: The upload ID
 *                 fileUrl:
 *                   type: string
 *                   format: uri
 *                   description: URL where the file is accessible
 *               example:
 *                 uploadId: "123e4567-e89b-12d3-a456-426614174000"
 *                 fileUrl: "https://storage.amazonaws.com/bucket/files/document.pdf"
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "409":
 *         description: Upload already completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /api/upload:
 *   get:
 *     summary: Get user's file uploads
 *     description: Retrieve a paginated list of file uploads for the authenticated user
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [INITIATED, COMPLETED, FAILED]
 *         description: Filter by upload status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, fileName]
 *         description: Field to sort by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
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
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FileUpload'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalResults:
 *                   type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /api/upload/{uploadId}:
 *   get:
 *     summary: Get file upload details
 *     description: Retrieve details of a specific file upload
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uploadId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Upload ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileUpload'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete file upload record
 *     description: Delete a file upload record (does not delete the actual file from storage)
 *     tags: [File Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uploadId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Upload ID
 *     responses:
 *       "204":
 *         description: Upload record deleted
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     FileUpload:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         uploadId:
 *           type: string
 *           format: uuid
 *         fileName:
 *           type: string
 *         fileType:
 *           type: string
 *         fileSize:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [INITIATED, COMPLETED, FAILED]
 *         signedUrl:
 *           type: string
 *           format: uri
 *         fileUrl:
 *           type: string
 *           format: uri
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         completedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         userId:
 *           type: integer
 *       example:
 *         id: 1
 *         uploadId: "123e4567-e89b-12d3-a456-426614174000"
 *         fileName: "document.pdf"
 *         fileType: "application/pdf"
 *         fileSize: 1048576
 *         status: "COMPLETED"
 *         signedUrl: "https://storage.amazonaws.com/bucket/upload-url"
 *         fileUrl: "https://storage.amazonaws.com/bucket/files/document.pdf"
 *         createdAt: "2025-10-24T10:00:00Z"
 *         updatedAt: "2025-10-24T10:05:00Z"
 *         completedAt: "2025-10-24T10:05:00Z"
 *         userId: 1
 */

import prisma from "../client.js";
import { FileUploadStatus } from '../generated/prisma/index.js';
import ApiError from "../utils/ApiError.js";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
// Initialize S3 client (this can be abstracted for multiple cloud providers)
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});
// File type validation
const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv'
];
// File size limits (in bytes)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'uploads-bucket';
/**
 * Validate file parameters
 * @param {string} fileName
 * @param {string} fileType
 * @param {number} fileSize
 */
const validateFile = (fileName, fileType, fileSize) => {
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        throw new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, 'Unsupported file type');
    }
    if (fileSize > MAX_FILE_SIZE) {
        throw new ApiError(httpStatus.REQUEST_ENTITY_TOO_LARGE, 'File too large');
    }
    if (!fileName || fileName.trim().length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid file name');
    }
};
/**
 * Generate a unique file key for storage
 * @param {string} fileName
 * @param {number} userId
 * @returns {string}
 */
const generateFileKey = (fileName, userId) => {
    const timestamp = Date.now();
    const randomId = uuidv4().split('-')[0];
    const fileExtension = fileName.split('.').pop();
    return `uploads/${userId}/${timestamp}-${randomId}.${fileExtension}`;
};
/**
 * Generate signed URL for file upload
 * @param {string} fileKey
 * @param {string} fileType
 * @returns {Promise<string>}
 */
const generateSignedUrl = async (fileKey, fileType) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: fileType
    });
    try {
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
        return signedUrl;
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to generate signed URL');
    }
};
/**
 * Initiate file upload
 * @param {string} fileName
 * @param {string} fileType
 * @param {number} fileSize
 * @param {number} userId
 * @returns {Promise<FileUpload>}
 */
const initiateUpload = async (fileName, fileType, fileSize, userId) => {
    // Validate file parameters
    validateFile(fileName, fileType, fileSize);
    // Generate unique upload ID and file key
    const uploadId = uuidv4();
    const fileKey = generateFileKey(fileName, userId);
    // Generate signed URL
    const signedUrl = await generateSignedUrl(fileKey, fileType);
    // Create file URL (this would be the final URL after upload)
    const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
    // Create upload record in database
    await prisma.fileUpload.create({
        data: {
            uploadId,
            fileName,
            fileType,
            fileSize,
            signedUrl,
            fileUrl,
            status: FileUploadStatus.INITIATED,
            userId
        }
    });
    return {
        uploadId,
        signedUrl,
        fileUrl
    };
};
/**
 * Complete file upload
 * @param {string} uploadId
 * @param {number} userId
 * @returns {Promise<{uploadId: string, fileUrl: string}>}
 */
const completeUpload = async (uploadId, userId) => {
    // Find the upload record
    const upload = await prisma.fileUpload.findUnique({
        where: { uploadId }
    });
    if (!upload) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
    }
    // Verify the upload belongs to the user
    if (upload.userId !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
    }
    // Check if already completed
    if (upload.status === FileUploadStatus.COMPLETED) {
        throw new ApiError(httpStatus.CONFLICT, 'Upload already completed');
    }
    // Update upload status to completed
    const updatedUpload = await prisma.fileUpload.update({
        where: { uploadId },
        data: {
            status: FileUploadStatus.COMPLETED,
            completedAt: new Date()
        }
    });
    return {
        uploadId: updatedUpload.uploadId,
        fileUrl: updatedUpload.fileUrl
    };
};
/**
 * Get upload by ID
 * @param {string} uploadId
 * @param {number} userId
 * @returns {Promise<FileUpload | null>}
 */
const getUploadById = async (uploadId, userId) => {
    const upload = await prisma.fileUpload.findUnique({
        where: { uploadId }
    });
    if (!upload) {
        return null;
    }
    // Verify the upload belongs to the user (or user is admin)
    if (upload.userId !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
    }
    return upload;
};
/**
 * Query uploads with pagination
 * @param {object} filter
 * @param {object} options
 * @param {number} userId
 * @returns {Promise<{results: FileUpload[], page: number, limit: number, totalPages: number, totalResults: number}>}
 */
const queryUploads = async (filter, options, userId) => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy ?? 'createdAt';
    const sortType = options.sortType ?? 'desc';
    const skip = (page - 1) * limit;
    // Add user filter to ensure users only see their own uploads
    const whereClause = { ...filter, userId };
    const [uploads, totalResults] = await Promise.all([
        prisma.fileUpload.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortType }
        }),
        prisma.fileUpload.count({ where: whereClause })
    ]);
    const totalPages = Math.ceil(totalResults / limit);
    return {
        results: uploads,
        page,
        limit,
        totalPages,
        totalResults
    };
};
/**
 * Delete upload record
 * @param {string} uploadId
 * @param {number} userId
 * @returns {Promise<FileUpload>}
 */
const deleteUpload = async (uploadId, userId) => {
    const upload = await getUploadById(uploadId, userId);
    if (!upload) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
    }
    const deletedUpload = await prisma.fileUpload.delete({
        where: { uploadId }
    });
    return deletedUpload;
};
export default {
    initiateUpload,
    completeUpload,
    getUploadById,
    queryUploads,
    deleteUpload,
    validateFile
};

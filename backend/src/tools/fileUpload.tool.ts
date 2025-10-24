import { FileUploadStatus } from '../generated/prisma/index.js';
import { fileUploadService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const fileUploadSchema = z.object({
    id: z.number(),
    uploadId: z.string(),
    fileName: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    status: z.string(),
    signedUrl: z.string(),
    fileUrl: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    completedAt: z.string().nullable(),
    userId: z.number()
});

const initiateUploadTool: MCPTool = {
    id: 'file_upload_initiate',
    name: 'Initiate File Upload',
    description: 'Initialize a file upload process and get a signed URL for direct upload',
    inputSchema: z.object({
        fileName: z.string().min(1).max(255),
        fileType: z
            .string()
            .refine(
                type =>
                    [
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
                    ].includes(type),
                { message: 'Unsupported file type' }
            ),
        fileSize: z.number().int().min(1).max(10485760), // 10MB max
        userId: z.number().int()
    }),
    outputSchema: z.object({
        uploadId: z.string(),
        signedUrl: z.string(),
        fileUrl: z.string()
    }),
    fn: async (inputs: { fileName: string; fileType: string; fileSize: number; userId: number }) => {
        const result = await fileUploadService.initiateUpload(
            inputs.fileName,
            inputs.fileType,
            inputs.fileSize,
            inputs.userId
        );
        return result;
    }
};

const completeUploadTool: MCPTool = {
    id: 'file_upload_complete',
    name: 'Complete File Upload',
    description: 'Mark a file upload as completed after successful upload to cloud storage',
    inputSchema: z.object({
        uploadId: z.string().uuid(),
        userId: z.number().int()
    }),
    outputSchema: z.object({
        uploadId: z.string(),
        fileUrl: z.string()
    }),
    fn: async (inputs: { uploadId: string; userId: number }) => {
        const result = await fileUploadService.completeUpload(inputs.uploadId, inputs.userId);
        return result;
    }
};

const getUploadTool: MCPTool = {
    id: 'file_upload_get_by_id',
    name: 'Get File Upload By ID',
    description: 'Retrieve details of a specific file upload by upload ID',
    inputSchema: z.object({
        uploadId: z.string().uuid(),
        userId: z.number().int()
    }),
    outputSchema: fileUploadSchema,
    fn: async (inputs: { uploadId: string; userId: number }) => {
        const upload = await fileUploadService.getUploadById(inputs.uploadId, inputs.userId);
        if (!upload) {
            throw new Error('Upload not found');
        }
        return upload;
    }
};

const queryUploadsTool: MCPTool = {
    id: 'file_upload_query',
    name: 'Query File Uploads',
    description: 'Get a paginated list of file uploads with optional filtering',
    inputSchema: z.object({
        status: z.enum([FileUploadStatus.INITIATED, FileUploadStatus.COMPLETED, FileUploadStatus.FAILED]).optional(),
        fileName: z.string().optional(),
        fileType: z.string().optional(),
        sortBy: z.enum(['createdAt', 'updatedAt', 'fileName', 'fileSize', 'status']).optional(),
        sortType: z.enum(['asc', 'desc']).optional(),
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional(),
        userId: z.number().int()
    }),
    outputSchema: z.object({
        results: z.array(fileUploadSchema),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalResults: z.number()
    }),
    fn: async (inputs: {
        status?: FileUploadStatus;
        fileName?: string;
        fileType?: string;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
        limit?: number;
        page?: number;
        userId: number;
    }) => {
        const filter = pick(inputs, ['status', 'fileName', 'fileType']);
        const options = pick(inputs, ['sortBy', 'sortType', 'limit', 'page']);
        const result = await fileUploadService.queryUploads(filter, options, inputs.userId);
        return result;
    }
};

const deleteUploadTool: MCPTool = {
    id: 'file_upload_delete',
    name: 'Delete File Upload',
    description: 'Delete a file upload record (does not delete the actual file from storage)',
    inputSchema: z.object({
        uploadId: z.string().uuid(),
        userId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean(),
        uploadId: z.string()
    }),
    fn: async (inputs: { uploadId: string; userId: number }) => {
        const deletedUpload = await fileUploadService.deleteUpload(inputs.uploadId, inputs.userId);
        return { success: true, uploadId: deletedUpload.uploadId };
    }
};

const validateFileTool: MCPTool = {
    id: 'file_upload_validate',
    name: 'Validate File Parameters',
    description: 'Validate file parameters before upload (size, type, name)',
    inputSchema: z.object({
        fileName: z.string(),
        fileType: z.string(),
        fileSize: z.number().int()
    }),
    outputSchema: z.object({
        valid: z.boolean(),
        message: z.string()
    }),
    fn: (inputs: { fileName: string; fileType: string; fileSize: number }) => {
        try {
            fileUploadService.validateFile(inputs.fileName, inputs.fileType, inputs.fileSize);
            return { valid: true, message: 'File parameters are valid' };
        } catch (error) {
            return { valid: false, message: (error as Error).message };
        }
    }
};

export const fileUploadTools: MCPTool[] = [
    initiateUploadTool,
    completeUploadTool,
    getUploadTool,
    queryUploadsTool,
    deleteUploadTool,
    validateFileTool
];

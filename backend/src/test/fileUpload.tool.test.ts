import prisma from '../client.ts';
import { FileUploadStatus, Role } from '../generated/prisma/index.js';
import userService from '../services/user.service.ts';
import { fileUploadTools } from '../tools/fileUpload.tool.ts';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock AWS SDK
vi.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: vi.fn(async () => await Promise.resolve('https://mock-signed-url.com'))
}));

vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn(() => ({})),
    PutObjectCommand: vi.fn()
}));

describe('FileUpload MCP Tools', () => {
    let testUser: any;
    const [
        initiateUploadTool,
        completeUploadTool,
        getUploadTool,
        queryUploadsTool,
        deleteUploadTool,
        validateFileTool
    ] = fileUploadTools;

    beforeAll(async () => {
        // Clean up any existing test data
        try {
            await prisma.fileUpload.deleteMany({});
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
    });

    beforeEach(async () => {
        // Clean up test data before each test
        try {
            await prisma.fileUpload.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        } catch (error) {
            // Table might not exist yet, ignore the error
        }

        // Create test user
        testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
    });

    afterAll(async () => {
        // Final cleanup
        try {
            await prisma.fileUpload.deleteMany({});
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

    describe('validateFileTool', () => {
        it('should have correct metadata', () => {
            expect(validateFileTool.id).toBe('file_upload_validate');
            expect(validateFileTool.name).toBe('Validate File Parameters');
            expect(validateFileTool.description).toContain('Validate file parameters');
        });

        it('should validate valid file parameters', async () => {
            const validInput = {
                fileName: 'document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024
            };

            const result = await validateFileTool.fn(validInput);

            expect(result).toEqual({
                valid: true,
                message: 'File parameters are valid'
            });
        });

        it('should reject invalid file type', async () => {
            const invalidInput = {
                fileName: 'malware.exe',
                fileType: 'application/exe',
                fileSize: 1024
            };

            const result = await validateFileTool.fn(invalidInput);

            expect(result.valid).toBe(false);
            expect(result.message).toContain('Unsupported file type');
        });

        it('should reject file that is too large', async () => {
            const largeFileInput = {
                fileName: 'large.pdf',
                fileType: 'application/pdf',
                fileSize: 11 * 1024 * 1024 // 11MB
            };

            const result = await validateFileTool.fn(largeFileInput);

            expect(result.valid).toBe(false);
            expect(result.message).toContain('File too large');
        });
    });

    describe('initiateUploadTool', () => {
        it('should have correct metadata', () => {
            expect(initiateUploadTool.id).toBe('file_upload_initiate');
            expect(initiateUploadTool.name).toBe('Initiate File Upload');
            expect(initiateUploadTool.description).toContain('Initialize a file upload');
        });

        it('should initiate upload successfully', async () => {
            const validInput = {
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: testUser.id
            };

            const result = await initiateUploadTool.fn(validInput);

            expect(result).toHaveProperty('uploadId');
            expect(result).toHaveProperty('signedUrl', 'https://mock-signed-url.com');
            expect(result).toHaveProperty('fileUrl');
            expect(typeof result.uploadId).toBe('string');
            expect(result.fileUrl).toContain('.pdf');

            // Verify database record was created
            const uploadRecord = await prisma.fileUpload.findUnique({
                where: { uploadId: result.uploadId }
            });
            expect(uploadRecord).toBeTruthy();
            expect(uploadRecord?.status).toBe(FileUploadStatus.INITIATED);
        });

        it('should reject invalid file parameters', async () => {
            const invalidInput = {
                fileName: 'malware.exe',
                fileType: 'application/exe',
                fileSize: 1024,
                userId: testUser.id
            };

            await expect(initiateUploadTool.fn(invalidInput)).rejects.toThrow();
        });
    });

    describe('completeUploadTool', () => {
        let uploadId: string;

        beforeEach(async () => {
            const result = await initiateUploadTool.fn({
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: testUser.id
            });
            uploadId = result.uploadId;
        });

        it('should have correct metadata', () => {
            expect(completeUploadTool.id).toBe('file_upload_complete');
            expect(completeUploadTool.name).toBe('Complete File Upload');
            expect(completeUploadTool.description).toContain('Mark a file upload as completed');
        });

        it('should complete upload successfully', async () => {
            const input = {
                uploadId,
                userId: testUser.id
            };

            const result = await completeUploadTool.fn(input);

            expect(result).toEqual({
                uploadId,
                fileUrl: expect.any(String)
            });

            // Verify database was updated
            const uploadRecord = await prisma.fileUpload.findUnique({
                where: { uploadId }
            });
            expect(uploadRecord?.status).toBe(FileUploadStatus.COMPLETED);
            expect(uploadRecord?.completedAt).toBeTruthy();
        });

        it('should throw error for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';

            await expect(completeUploadTool.fn({ uploadId: fakeUploadId, userId: testUser.id })).rejects.toThrow(
                'Upload not found'
            );
        });
    });

    describe('getUploadTool', () => {
        let uploadId: string;

        beforeEach(async () => {
            const result = await initiateUploadTool.fn({
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: testUser.id
            });
            uploadId = result.uploadId;
        });

        it('should have correct metadata', () => {
            expect(getUploadTool.id).toBe('file_upload_get_by_id');
            expect(getUploadTool.name).toBe('Get File Upload By ID');
            expect(getUploadTool.description).toContain('Retrieve details of a specific file upload');
        });

        it('should get upload by ID successfully', async () => {
            const input = {
                uploadId,
                userId: testUser.id
            };

            const result = await getUploadTool.fn(input);

            expect(result).toHaveProperty('uploadId', uploadId);
            expect(result).toHaveProperty('fileName', 'test-document.pdf');
            expect(result).toHaveProperty('fileType', 'application/pdf');
            expect(result).toHaveProperty('userId', testUser.id);
            expect(result).toHaveProperty('status', FileUploadStatus.INITIATED);
        });

        it('should throw error for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';

            await expect(getUploadTool.fn({ uploadId: fakeUploadId, userId: testUser.id })).rejects.toThrow(
                'Upload not found'
            );
        });
    });

    describe('queryUploadsTool', () => {
        beforeEach(async () => {
            // Create multiple test uploads
            const uploads = [
                { fileName: 'document1.pdf', fileType: 'application/pdf', fileSize: 1024 * 1024 },
                { fileName: 'image1.jpg', fileType: 'image/jpeg', fileSize: 512 * 1024 },
                { fileName: 'text1.txt', fileType: 'text/plain', fileSize: 2048 }
            ];

            for (const upload of uploads) {
                await initiateUploadTool.fn({
                    ...upload,
                    userId: testUser.id
                });
            }
        });

        it('should have correct metadata', () => {
            expect(queryUploadsTool.id).toBe('file_upload_query');
            expect(queryUploadsTool.name).toBe('Query File Uploads');
            expect(queryUploadsTool.description).toContain('Get a paginated list of file uploads');
        });

        it('should query uploads with pagination', async () => {
            const input = {
                page: 1,
                limit: 2,
                userId: testUser.id
            };

            const result = await queryUploadsTool.fn(input);

            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('page', 1);
            expect(result).toHaveProperty('limit', 2);
            expect(result).toHaveProperty('totalPages', 2);
            expect(result).toHaveProperty('totalResults', 3);
            expect(result.results).toHaveLength(2);
        });

        it('should filter uploads by status', async () => {
            const input = {
                status: FileUploadStatus.INITIATED,
                userId: testUser.id
            };

            const result = await queryUploadsTool.fn(input);

            expect(result.results).toHaveLength(3);
            result.results.forEach((upload: any) => {
                expect(upload.status).toBe(FileUploadStatus.INITIATED);
            });
        });

        it('should filter uploads by file type', async () => {
            const input = {
                fileType: 'image/jpeg',
                userId: testUser.id
            };

            const result = await queryUploadsTool.fn(input);

            expect(result.results).toHaveLength(1);
            expect(result.results[0].fileType).toBe('image/jpeg');
            expect(result.results[0].fileName).toBe('image1.jpg');
        });

        it('should sort uploads by file size ascending', async () => {
            const input = {
                sortBy: 'fileSize',
                sortType: 'asc' as const,
                userId: testUser.id
            };

            const result = await queryUploadsTool.fn(input);

            expect(result.results).toHaveLength(3);
            expect(result.results[0].fileSize).toBeLessThan(result.results[1].fileSize);
            expect(result.results[1].fileSize).toBeLessThan(result.results[2].fileSize);
        });
    });

    describe('deleteUploadTool', () => {
        let uploadId: string;

        beforeEach(async () => {
            const result = await initiateUploadTool.fn({
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: testUser.id
            });
            uploadId = result.uploadId;
        });

        it('should have correct metadata', () => {
            expect(deleteUploadTool.id).toBe('file_upload_delete');
            expect(deleteUploadTool.name).toBe('Delete File Upload');
            expect(deleteUploadTool.description).toContain('Delete a file upload record');
        });

        it('should delete upload successfully', async () => {
            const input = {
                uploadId,
                userId: testUser.id
            };

            const result = await deleteUploadTool.fn(input);

            expect(result).toEqual({
                success: true,
                uploadId
            });

            // Verify upload is deleted from database
            const upload = await prisma.fileUpload.findUnique({
                where: { uploadId }
            });
            expect(upload).toBeNull();
        });

        it('should throw error for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';

            await expect(deleteUploadTool.fn({ uploadId: fakeUploadId, userId: testUser.id })).rejects.toThrow(
                'Upload not found'
            );
        });
    });

    describe('Tool Input/Output Schema Validation', () => {
        it('should validate initiateUploadTool input schema', () => {
            const validInput = {
                fileName: 'test.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: 1
            };

            const parseResult = initiateUploadTool.inputSchema.safeParse(validInput);
            expect(parseResult.success).toBe(true);

            // Test invalid input
            const invalidInput = {
                fileName: '',
                fileType: 'invalid/type',
                fileSize: -1,
                userId: 'not-a-number'
            };

            const invalidParseResult = initiateUploadTool.inputSchema.safeParse(invalidInput);
            expect(invalidParseResult.success).toBe(false);
        });

        it('should validate completeUploadTool input schema', () => {
            const validInput = {
                uploadId: '12345678-1234-1234-1234-123456789012',
                userId: 1
            };

            const parseResult = completeUploadTool.inputSchema.safeParse(validInput);
            expect(parseResult.success).toBe(true);

            // Test invalid UUID
            const invalidInput = {
                uploadId: 'not-a-uuid',
                userId: 1
            };

            const invalidParseResult = completeUploadTool.inputSchema.safeParse(invalidInput);
            expect(invalidParseResult.success).toBe(false);
        });

        it('should validate queryUploadsTool input schema', () => {
            const validInput = {
                status: FileUploadStatus.COMPLETED,
                fileName: 'test.pdf',
                fileType: 'application/pdf',
                sortBy: 'createdAt',
                sortType: 'desc',
                limit: 10,
                page: 1,
                userId: 1
            };

            const parseResult = queryUploadsTool.inputSchema.safeParse(validInput);
            expect(parseResult.success).toBe(true);

            // Test with minimal input
            const minimalInput = {
                userId: 1
            };

            const minimalParseResult = queryUploadsTool.inputSchema.safeParse(minimalInput);
            expect(minimalParseResult.success).toBe(true);
        });
    });

    describe('Tool Error Handling', () => {
        it('should handle user permission errors correctly', async () => {
            const otherUser = await userService.createUser('other@example.com', 'password123', 'Other User');

            const result = await initiateUploadTool.fn({
                fileName: 'test.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: testUser.id
            });

            // Try to access with different user ID
            await expect(
                getUploadTool.fn({
                    uploadId: result.uploadId,
                    userId: otherUser.id
                })
            ).rejects.toThrow('Access denied');
        });

        it('should handle duplicate completion attempts', async () => {
            const result = await initiateUploadTool.fn({
                fileName: 'test.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024,
                userId: testUser.id
            });

            // Complete once
            await completeUploadTool.fn({
                uploadId: result.uploadId,
                userId: testUser.id
            });

            // Try to complete again
            await expect(
                completeUploadTool.fn({
                    uploadId: result.uploadId,
                    userId: testUser.id
                })
            ).rejects.toThrow('Upload already completed');
        });
    });
});

import prisma from "../client.js";
import { FileUploadStatus, Role } from '../generated/prisma/index.js';
import fileUploadService from "../services/fileUpload.service.js";
import userService from "../services/user.service.js";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
// Mock AWS SDK
vi.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: vi.fn(async () => await Promise.resolve('https://mock-signed-url.com'))
}));
vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn(() => ({})),
    PutObjectCommand: vi.fn()
}));
describe('FileUpload Service', () => {
    let testUser;
    beforeAll(async () => {
        // Clean up any existing test data
        try {
            await prisma.fileUpload.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.token.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
    });
    beforeEach(async () => {
        // Clean up test data before each test
        try {
            await prisma.fileUpload.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        // Create test user
        testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
    });
    afterAll(async () => {
        // Final cleanup
        try {
            await prisma.fileUpload.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.token.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        try {
            await prisma.user.deleteMany({});
        }
        catch (error) {
            // Table might not exist yet, ignore the error
        }
        await prisma.$disconnect();
    });
    describe('validateFile', () => {
        it('should accept valid file types', () => {
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'text/csv'];
            validTypes.forEach(fileType => {
                expect(() => fileUploadService.validateFile('test.file', fileType, 1024)).not.toThrow();
            });
        });
        it('should reject invalid file types', () => {
            const invalidTypes = ['application/exe', 'video/mp4', 'audio/mp3', 'text/javascript'];
            invalidTypes.forEach(fileType => {
                expect(() => fileUploadService.validateFile('test.file', fileType, 1024)).toThrow('Unsupported file type');
            });
        });
        it('should reject files that are too large', () => {
            const largeFileSize = 11 * 1024 * 1024; // 11MB
            expect(() => fileUploadService.validateFile('test.pdf', 'application/pdf', largeFileSize)).toThrow('File too large');
        });
        it('should reject empty file names', () => {
            expect(() => fileUploadService.validateFile('', 'application/pdf', 1024)).toThrow('Invalid file name');
            expect(() => fileUploadService.validateFile('   ', 'application/pdf', 1024)).toThrow('Invalid file name');
        });
        it('should accept valid file parameters', () => {
            expect(() => fileUploadService.validateFile('document.pdf', 'application/pdf', 1024 * 1024)).not.toThrow();
        });
    });
    describe('initiateUpload', () => {
        const validUploadData = {
            fileName: 'test-document.pdf',
            fileType: 'application/pdf',
            fileSize: 1024 * 1024 // 1MB
        };
        it('should initiate upload successfully', async () => {
            const result = await fileUploadService.initiateUpload(validUploadData.fileName, validUploadData.fileType, validUploadData.fileSize, testUser.id);
            expect(result).toHaveProperty('uploadId');
            expect(result).toHaveProperty('signedUrl');
            expect(result).toHaveProperty('fileUrl');
            expect(typeof result.uploadId).toBe('string');
            expect(result.signedUrl).toBe('https://mock-signed-url.com');
            expect(result.fileUrl).toContain(validUploadData.fileName.split('.').pop());
            // Verify database record was created
            const uploadRecord = await prisma.fileUpload.findUnique({
                where: { uploadId: result.uploadId }
            });
            expect(uploadRecord).toBeTruthy();
            expect(uploadRecord?.status).toBe(FileUploadStatus.INITIATED);
            expect(uploadRecord?.userId).toBe(testUser.id);
            expect(uploadRecord?.fileName).toBe(validUploadData.fileName);
            expect(uploadRecord?.fileType).toBe(validUploadData.fileType);
            expect(uploadRecord?.fileSize).toBe(validUploadData.fileSize);
        });
        it('should reject invalid file parameters', async () => {
            await expect(fileUploadService.initiateUpload('test.exe', 'application/exe', 1024, testUser.id)).rejects.toThrow('Unsupported file type');
            await expect(fileUploadService.initiateUpload('test.pdf', 'application/pdf', 11 * 1024 * 1024, testUser.id)).rejects.toThrow('File too large');
        });
    });
    describe('completeUpload', () => {
        let uploadId;
        beforeEach(async () => {
            const result = await fileUploadService.initiateUpload('test-document.pdf', 'application/pdf', 1024 * 1024, testUser.id);
            uploadId = result.uploadId;
        });
        it('should complete upload successfully', async () => {
            const result = await fileUploadService.completeUpload(uploadId, testUser.id);
            expect(result).toHaveProperty('uploadId', uploadId);
            expect(result).toHaveProperty('fileUrl');
            // Verify database record was updated
            const uploadRecord = await prisma.fileUpload.findUnique({
                where: { uploadId }
            });
            expect(uploadRecord?.status).toBe(FileUploadStatus.COMPLETED);
            expect(uploadRecord?.completedAt).toBeTruthy();
        });
        it('should throw error for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';
            await expect(fileUploadService.completeUpload(fakeUploadId, testUser.id)).rejects.toThrow('Upload not found');
        });
        it('should throw error if upload belongs to different user', async () => {
            const otherUser = await userService.createUser('other@example.com', 'password123', 'Other User');
            await expect(fileUploadService.completeUpload(uploadId, otherUser.id)).rejects.toThrow('Access denied');
        });
        it('should throw error if upload is already completed', async () => {
            // Complete the upload first
            await fileUploadService.completeUpload(uploadId, testUser.id);
            // Try to complete again
            await expect(fileUploadService.completeUpload(uploadId, testUser.id)).rejects.toThrow('Upload already completed');
        });
    });
    describe('getUploadById', () => {
        let uploadId;
        beforeEach(async () => {
            const result = await fileUploadService.initiateUpload('test-document.pdf', 'application/pdf', 1024 * 1024, testUser.id);
            uploadId = result.uploadId;
        });
        it('should get upload by ID successfully', async () => {
            const upload = await fileUploadService.getUploadById(uploadId, testUser.id);
            expect(upload).toBeTruthy();
            expect(upload?.uploadId).toBe(uploadId);
            expect(upload?.fileName).toBe('test-document.pdf');
            expect(upload?.userId).toBe(testUser.id);
        });
        it('should return null for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';
            const upload = await fileUploadService.getUploadById(fakeUploadId, testUser.id);
            expect(upload).toBeNull();
        });
        it('should throw error if upload belongs to different user', async () => {
            const otherUser = await userService.createUser('other@example.com', 'password123', 'Other User');
            await expect(fileUploadService.getUploadById(uploadId, otherUser.id)).rejects.toThrow('Access denied');
        });
    });
    describe('queryUploads', () => {
        beforeEach(async () => {
            // Create multiple uploads for testing
            const uploads = [
                { fileName: 'document1.pdf', fileType: 'application/pdf', fileSize: 1024 * 1024 },
                { fileName: 'image1.jpg', fileType: 'image/jpeg', fileSize: 512 * 1024 },
                { fileName: 'text1.txt', fileType: 'text/plain', fileSize: 2048 }
            ];
            for (const upload of uploads) {
                const result = await fileUploadService.initiateUpload(upload.fileName, upload.fileType, upload.fileSize, testUser.id);
                // Complete some uploads
                if (upload.fileName === 'document1.pdf') {
                    await fileUploadService.completeUpload(result.uploadId, testUser.id);
                }
            }
        });
        it('should return paginated uploads', async () => {
            const result = await fileUploadService.queryUploads({}, { page: 1, limit: 2 }, testUser.id);
            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('page', 1);
            expect(result).toHaveProperty('limit', 2);
            expect(result).toHaveProperty('totalPages');
            expect(result).toHaveProperty('totalResults');
            expect(result.results).toHaveLength(2);
            expect(result.totalResults).toBe(3);
            expect(result.totalPages).toBe(2);
        });
        it('should filter uploads by status', async () => {
            const result = await fileUploadService.queryUploads({ status: FileUploadStatus.COMPLETED }, { page: 1, limit: 10 }, testUser.id);
            expect(result.results).toHaveLength(1);
            expect(result.results[0].status).toBe(FileUploadStatus.COMPLETED);
            expect(result.results[0].fileName).toBe('document1.pdf');
        });
        it('should filter uploads by file type', async () => {
            const result = await fileUploadService.queryUploads({ fileType: 'image/jpeg' }, { page: 1, limit: 10 }, testUser.id);
            expect(result.results).toHaveLength(1);
            expect(result.results[0].fileType).toBe('image/jpeg');
            expect(result.results[0].fileName).toBe('image1.jpg');
        });
        it('should sort uploads by file size', async () => {
            const result = await fileUploadService.queryUploads({}, { page: 1, limit: 10, sortBy: 'fileSize', sortType: 'asc' }, testUser.id);
            expect(result.results).toHaveLength(3);
            expect(result.results[0].fileSize).toBeLessThan(result.results[1].fileSize);
            expect(result.results[1].fileSize).toBeLessThan(result.results[2].fileSize);
        });
        it('should only return uploads for the specific user', async () => {
            // Create another user with uploads
            const otherUser = await userService.createUser('other@example.com', 'password123', 'Other User');
            await fileUploadService.initiateUpload('other-file.pdf', 'application/pdf', 1024, otherUser.id);
            const result = await fileUploadService.queryUploads({}, { page: 1, limit: 10 }, testUser.id);
            // Should only return uploads for testUser
            expect(result.totalResults).toBe(3);
            result.results.forEach(upload => {
                expect(upload.userId).toBe(testUser.id);
            });
        });
    });
    describe('deleteUpload', () => {
        let uploadId;
        beforeEach(async () => {
            const result = await fileUploadService.initiateUpload('test-document.pdf', 'application/pdf', 1024 * 1024, testUser.id);
            uploadId = result.uploadId;
        });
        it('should delete upload successfully', async () => {
            const deletedUpload = await fileUploadService.deleteUpload(uploadId, testUser.id);
            expect(deletedUpload.uploadId).toBe(uploadId);
            // Verify upload is deleted from database
            const upload = await prisma.fileUpload.findUnique({
                where: { uploadId }
            });
            expect(upload).toBeNull();
        });
        it('should throw error for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';
            await expect(fileUploadService.deleteUpload(fakeUploadId, testUser.id)).rejects.toThrow('Upload not found');
        });
        it('should throw error if upload belongs to different user', async () => {
            const otherUser = await userService.createUser('other@example.com', 'password123', 'Other User');
            await expect(fileUploadService.deleteUpload(uploadId, otherUser.id)).rejects.toThrow('Access denied');
        });
    });
});

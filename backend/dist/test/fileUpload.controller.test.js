import app from "../app.js";
import prisma from "../client.js";
import { FileUploadStatus, Role } from '../generated/prisma/index.js';
import { tokenService, userService } from "../services/index.js";
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
// Mock AWS SDK
vi.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: vi.fn(async () => await Promise.resolve('https://mock-signed-url.com'))
}));
vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn(() => ({})),
    PutObjectCommand: vi.fn()
}));
describe('FileUpload Controller', () => {
    let testUser;
    let adminUser;
    let userAccessToken;
    let adminAccessToken;
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
        // Create test users
        testUser = await userService.createUser('test@example.com', 'password123', 'Test User', Role.USER);
        adminUser = await userService.createUser('admin@example.com', 'password123', 'Admin User', Role.ADMIN);
        // Generate tokens for authentication
        const userTokens = await tokenService.generateAuthTokens(testUser.id);
        const adminTokens = await tokenService.generateAuthTokens(adminUser.id);
        userAccessToken = userTokens.access.token;
        adminAccessToken = adminTokens.access.token;
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
    describe('POST /api/upload/initiate', () => {
        const validUploadData = {
            fileName: 'test-document.pdf',
            fileType: 'application/pdf',
            fileSize: 1024 * 1024
        };
        it('should initiate upload successfully with valid data', async () => {
            const response = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(validUploadData)
                .expect(200);
            expect(response.body).toHaveProperty('uploadId');
            expect(response.body).toHaveProperty('signedUrl');
            expect(response.body).toHaveProperty('fileUrl');
            expect(response.body.signedUrl).toBe('https://mock-signed-url.com');
        });
        it('should require authentication', async () => {
            await request(app).post('/v1/api/upload/initiate').send(validUploadData).expect(401);
        });
        it('should reject invalid file types', async () => {
            const invalidData = {
                ...validUploadData,
                fileType: 'application/exe'
            };
            await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(invalidData)
                .expect(400);
        });
        it('should reject files that are too large', async () => {
            const largeFileData = {
                ...validUploadData,
                fileSize: 11 * 1024 * 1024 // 11MB
            };
            const response = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(largeFileData)
                .expect(400);
            expect(response.body.message).toContain('fileSize');
        });
        it('should reject missing required fields', async () => {
            const incompleteData = {
                fileName: 'test.pdf'
                // Missing fileType and fileSize
            };
            await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(incompleteData)
                .expect(400);
        });
        it('should work for both users and admins', async () => {
            // Test with regular user
            const userResponse = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send(validUploadData)
                .expect(200);
            expect(userResponse.body).toHaveProperty('uploadId');
            // Test with admin
            const adminResponse = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send({
                ...validUploadData,
                fileName: 'admin-document.pdf'
            })
                .expect(200);
            expect(adminResponse.body).toHaveProperty('uploadId');
        });
    });
    describe('POST /api/upload/complete', () => {
        let uploadId;
        beforeEach(async () => {
            // Create an upload to complete
            const response = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024
            });
            uploadId = response.body.uploadId;
        });
        it('should complete upload successfully', async () => {
            const response = await request(app)
                .post('/v1/api/upload/complete')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({ uploadId })
                .expect(200);
            expect(response.body).toHaveProperty('uploadId', uploadId);
            expect(response.body).toHaveProperty('fileUrl');
            // Verify the upload status was updated in database
            const upload = await prisma.fileUpload.findUnique({
                where: { uploadId }
            });
            expect(upload?.status).toBe(FileUploadStatus.COMPLETED);
            expect(upload?.completedAt).toBeTruthy();
        });
        it('should require authentication', async () => {
            await request(app).post('/v1/api/upload/complete').send({ uploadId }).expect(401);
        });
        it('should reject invalid upload ID format', async () => {
            await request(app)
                .post('/v1/api/upload/complete')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({ uploadId: 'invalid-id' })
                .expect(400);
        });
        it('should reject non-existent upload ID', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';
            await request(app)
                .post('/v1/api/upload/complete')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({ uploadId: fakeUploadId })
                .expect(404);
        });
        it('should prevent users from completing other users uploads', async () => {
            // Try to complete upload with admin token (upload belongs to regular user)
            await request(app)
                .post('/v1/api/upload/complete')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send({ uploadId })
                .expect(403);
        });
        it('should prevent double completion', async () => {
            // Complete the upload first time
            await request(app)
                .post('/v1/api/upload/complete')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({ uploadId })
                .expect(200);
            // Try to complete again
            await request(app)
                .post('/v1/api/upload/complete')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({ uploadId })
                .expect(409);
        });
    });
    describe('GET /api/upload', () => {
        beforeEach(async () => {
            // Create test uploads
            const uploads = [
                { fileName: 'document1.pdf', fileType: 'application/pdf', fileSize: 1024 * 1024 },
                { fileName: 'image1.jpg', fileType: 'image/jpeg', fileSize: 512 * 1024 },
                { fileName: 'text1.txt', fileType: 'text/plain', fileSize: 2048 }
            ];
            for (const upload of uploads) {
                await request(app)
                    .post('/v1/api/upload/initiate')
                    .set('Authorization', `Bearer ${userAccessToken}`)
                    .send(upload);
            }
            // Create an upload for admin user too
            await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send({ fileName: 'admin-file.pdf', fileType: 'application/pdf', fileSize: 1024 });
        });
        it('should get user uploads with pagination', async () => {
            const response = await request(app)
                .get('/v1/api/upload?page=1&limit=2')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            expect(response.body).toHaveProperty('results');
            expect(response.body).toHaveProperty('page', 1);
            expect(response.body).toHaveProperty('limit', 2);
            expect(response.body).toHaveProperty('totalPages');
            expect(response.body).toHaveProperty('totalResults', 3);
            expect(response.body.results).toHaveLength(2);
            // Ensure all results belong to the user
            response.body.results.forEach((upload) => {
                expect(upload.userId).toBe(testUser.id);
            });
        });
        it('should filter uploads by status', async () => {
            const response = await request(app)
                .get('/v1/api/upload?status=INITIATED')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            expect(response.body.results).toHaveLength(3);
            response.body.results.forEach((upload) => {
                expect(upload.status).toBe('INITIATED');
            });
        });
        it('should filter uploads by file type', async () => {
            const response = await request(app)
                .get('/v1/api/upload?fileType=image/jpeg')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            expect(response.body.results).toHaveLength(1);
            expect(response.body.results[0].fileType).toBe('image/jpeg');
            expect(response.body.results[0].fileName).toBe('image1.jpg');
        });
        it('should sort uploads by file size', async () => {
            const response = await request(app)
                .get('/v1/api/upload?sortBy=fileSize&sortType=asc')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            const results = response.body.results;
            for (let i = 0; i < results.length - 1; i++) {
                expect(results[i].fileSize).toBeLessThanOrEqual(results[i + 1].fileSize);
            }
        });
        it('should require authentication', async () => {
            await request(app).get('/v1/api/upload').expect(401);
        });
        it('should only show uploads for the authenticated user', async () => {
            // User should only see their 3 uploads
            const userResponse = await request(app)
                .get('/v1/api/upload')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            expect(userResponse.body.totalResults).toBe(3);
            // Admin should only see their 1 upload
            const adminResponse = await request(app)
                .get('/v1/api/upload')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(200);
            expect(adminResponse.body.totalResults).toBe(1);
        });
    });
    describe('GET /api/upload/:uploadId', () => {
        let uploadId;
        beforeEach(async () => {
            const response = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024
            });
            uploadId = response.body.uploadId;
        });
        it('should get upload by ID successfully', async () => {
            const response = await request(app)
                .get(`/v1/api/upload/${uploadId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            expect(response.body).toHaveProperty('uploadId', uploadId);
            expect(response.body).toHaveProperty('fileName', 'test-document.pdf');
            expect(response.body).toHaveProperty('userId', testUser.id);
        });
        it('should require authentication', async () => {
            await request(app).get(`/v1/api/upload/${uploadId}`).expect(401);
        });
        it('should return 404 for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';
            await request(app)
                .get(`/v1/api/upload/${fakeUploadId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(404);
        });
        it('should prevent access to other users uploads', async () => {
            await request(app)
                .get(`/v1/api/upload/${uploadId}`)
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(403);
        });
        it('should reject invalid upload ID format', async () => {
            await request(app)
                .get('/v1/api/upload/invalid-id')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(400);
        });
    });
    describe('DELETE /api/upload/:uploadId', () => {
        let uploadId;
        beforeEach(async () => {
            const response = await request(app)
                .post('/v1/api/upload/initiate')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .send({
                fileName: 'test-document.pdf',
                fileType: 'application/pdf',
                fileSize: 1024 * 1024
            });
            uploadId = response.body.uploadId;
        });
        it('should delete upload successfully', async () => {
            await request(app)
                .delete(`/v1/api/upload/${uploadId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(204);
            // Verify upload is deleted from database
            const upload = await prisma.fileUpload.findUnique({
                where: { uploadId }
            });
            expect(upload).toBeNull();
        });
        it('should require authentication', async () => {
            await request(app).delete(`/v1/api/upload/${uploadId}`).expect(401);
        });
        it('should return 404 for non-existent upload', async () => {
            const fakeUploadId = '12345678-1234-1234-1234-123456789012';
            await request(app)
                .delete(`/v1/api/upload/${fakeUploadId}`)
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(404);
        });
        it('should prevent deletion of other users uploads', async () => {
            await request(app)
                .delete(`/v1/api/upload/${uploadId}`)
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(403);
        });
        it('should reject invalid upload ID format', async () => {
            await request(app)
                .delete('/v1/api/upload/invalid-id')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(400);
        });
    });
});

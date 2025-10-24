import {
    FileUploadStatus,
    MCPOperationStatus,
    MCPResourceStatus,
    MCPResourceType,
    PrismaClient,
    Role
} from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminPassword,
            role: Role.ADMIN,
            isEmailVerified: true
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 12);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'John Doe',
            password: userPassword,
            role: Role.USER,
            isEmailVerified: true
        }
    });

    console.log('✅ Created regular user:', user.email);

    // Create sample file uploads
    const sampleUploads = [
        {
            uploadId: uuidv4(),
            fileName: 'sample-document.pdf',
            fileType: 'application/pdf',
            fileSize: 2048576, // 2MB
            status: FileUploadStatus.COMPLETED,
            signedUrl: 'https://example-bucket.s3.amazonaws.com/upload-url-1',
            fileUrl: 'https://example-bucket.s3.amazonaws.com/uploads/1/sample-document.pdf',
            userId: admin.id,
            completedAt: new Date()
        },
        {
            uploadId: uuidv4(),
            fileName: 'profile-image.jpg',
            fileType: 'image/jpeg',
            fileSize: 512000, // 512KB
            status: FileUploadStatus.COMPLETED,
            signedUrl: 'https://example-bucket.s3.amazonaws.com/upload-url-2',
            fileUrl: 'https://example-bucket.s3.amazonaws.com/uploads/2/profile-image.jpg',
            userId: user.id,
            completedAt: new Date()
        },
        {
            uploadId: uuidv4(),
            fileName: 'pending-upload.txt',
            fileType: 'text/plain',
            fileSize: 1024, // 1KB
            status: FileUploadStatus.INITIATED,
            signedUrl: 'https://example-bucket.s3.amazonaws.com/upload-url-3',
            fileUrl: 'https://example-bucket.s3.amazonaws.com/uploads/2/pending-upload.txt',
            userId: user.id
        }
    ];

    for (const upload of sampleUploads) {
        await prisma.fileUpload.upsert({
            where: { uploadId: upload.uploadId },
            update: {},
            create: upload
        });
    }

    console.log('✅ Created sample file uploads');

    // Create sample MCP resources
    const sampleMCPResources = [
        {
            name: 'Data Processing Pipeline',
            type: MCPResourceType.PROCESS,
            description: 'A pipeline for processing user data',
            data: {
                config: { batchSize: 100, timeout: 30000 },
                version: '1.0.0'
            },
            status: MCPResourceStatus.ACTIVE,
            userId: admin.id
        },
        {
            name: 'User Analytics Context',
            type: MCPResourceType.CONTEXT,
            description: 'Context data for user behavior analysis',
            data: {
                metrics: ['pageViews', 'sessionDuration', 'bounceRate'],
                timeWindow: '30d'
            },
            status: MCPResourceStatus.ACTIVE,
            userId: admin.id
        },
        {
            name: 'Document Parser Tool',
            type: MCPResourceType.TOOL,
            description: 'Tool for parsing PDF documents',
            data: {
                supportedFormats: ['pdf', 'docx', 'txt'],
                maxFileSize: 10485760 // 10MB
            },
            status: MCPResourceStatus.ACTIVE,
            userId: user.id
        },
        {
            name: 'Sample Dataset',
            type: MCPResourceType.DATA,
            description: 'Sample dataset for testing',
            data: {
                records: 1000,
                format: 'json',
                schema: { id: 'string', value: 'number', timestamp: 'datetime' }
            },
            status: MCPResourceStatus.INACTIVE,
            userId: user.id
        }
    ];

    const createdResources = [];
    for (const resource of sampleMCPResources) {
        const createdResource = await prisma.mCPResource.create({
            data: resource
        });
        createdResources.push(createdResource);
    }

    console.log('✅ Created sample MCP resources');

    // Create sample MCP operations
    const sampleOperations = [
        {
            operation: 'process',
            data: { input: 'sample data for processing' },
            result: { output: 'processed sample data', status: 'completed' },
            status: MCPOperationStatus.COMPLETED,
            completedAt: new Date(Date.now() - 3600000), // 1 hour ago
            userId: admin.id,
            resourceId: createdResources[0].id
        },
        {
            operation: 'analyze',
            data: { dataset: 'user_behavior', metrics: ['engagement', 'retention'] },
            result: { insights: { engagement: 0.85, retention: 0.72 }, confidence: 0.95 },
            status: MCPOperationStatus.COMPLETED,
            completedAt: new Date(Date.now() - 1800000), // 30 minutes ago
            userId: admin.id,
            resourceId: createdResources[1].id
        },
        {
            operation: 'parse',
            data: { fileName: 'document.pdf', extractText: true },
            status: MCPOperationStatus.RUNNING,
            userId: user.id,
            resourceId: createdResources[2].id
        },
        {
            operation: 'transform',
            data: { format: 'csv', columns: ['id', 'name', 'email'] },
            status: MCPOperationStatus.PENDING,
            userId: user.id
        }
    ];

    for (const operation of sampleOperations) {
        await prisma.mCPOperation.create({
            data: operation
        });
    }

    console.log('✅ Created sample MCP operations');
}

main()
    .catch(e => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

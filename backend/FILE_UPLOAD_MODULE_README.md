# File Upload Module Implementation

This document describes the complete File Upload module implementation for the backend API following the specifications in `API_SPECIFICATION.md`.

## Implementation Overview

The File Upload module provides a complete file upload system with signed URLs, proper validation, authentication, and MCP tool integration for file management operations.

### Key Features

- **Signed URL Generation**: Secure, time-limited URLs for direct upload to cloud storage
- **File Type Validation**: Support for images, documents, and text files with configurable restrictions
- **Size Limits**: Configurable file size limits (default: 10MB)
- **Upload State Management**: Track upload progress from initiation to completion
- **User-based Access Control**: Users can only manage their own uploads
- **MCP Tool Integration**: Complete set of MCP tools for file management operations
- **Comprehensive Testing**: Full test coverage for all functionality

## API Endpoints Implemented

### POST /api/upload/initiate
- Initializes file upload and returns signed URL
- **Input**: `{ fileName: string, fileType: string, fileSize: number }`
- **Output**: `{ uploadId: string, signedUrl: string, fileUrl: string }`
- **Authentication**: Required (uploadFiles permission)
- **Validation**: File type, size, and name validation

### POST /api/upload/complete
- Marks upload as completed after successful upload
- **Input**: `{ uploadId: string }`
- **Output**: `{ uploadId: string, fileUrl: string }`
- **Authentication**: Required (uploadFiles permission)
- **Validation**: Upload ownership verification

### Additional Management Endpoints
- `GET /api/upload` - List user's uploads with pagination/filtering
- `GET /api/upload/:uploadId` - Get specific upload details
- `DELETE /api/upload/:uploadId` - Delete upload record

## Database Schema

### FileUpload Model
```prisma
model FileUpload {
  id          Int               @id @default(autoincrement())
  uploadId    String            @unique
  fileName    String
  fileType    String
  fileSize    Int
  status      FileUploadStatus  @default(INITIATED)
  signedUrl   String
  fileUrl     String
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  completedAt DateTime?
  user        User              @relation(fields: [userId], references: [id])
  userId      Int
}

enum FileUploadStatus {
  INITIATED
  COMPLETED
  FAILED
}
```

## Files Created/Modified

### Database
- **Modified**: `src/prisma/schema.prisma` - Added FileUpload model and enum
- **Modified**: `src/prisma/seed.ts` - Added sample upload data

### Services
- **Created**: `src/services/fileUpload.service.ts` - Core business logic
- **Modified**: `src/services/index.ts` - Export file upload service

### Controllers
- **Created**: `src/controllers/fileUpload.controller.ts` - HTTP request handlers
- **Modified**: `src/controllers/index.ts` - Export file upload controller

### Validations
- **Created**: `src/validations/fileUpload.validation.ts` - Joi validation schemas
- **Modified**: `src/validations/index.ts` - Export file upload validation

### Routes
- **Created**: `src/routes/v1/upload.route.ts` - Express routes with Swagger docs
- **Modified**: `src/routes/v1/index.ts` - Register upload routes under /api/upload

### MCP Tools
- **Created**: `src/tools/fileUpload.tool.ts` - MCP tools for file management
- **Modified**: `src/controllers/mcp.controller.ts` - Register file upload tools

### Configuration
- **Modified**: `src/config/roles.ts` - Added uploadFiles and manageUploads permissions

### Tests
- **Created**: `src/test/fileUpload.service.test.ts` - Service layer tests
- **Created**: `src/test/fileUpload.controller.test.ts` - API endpoint tests
- **Created**: `src/test/fileUpload.tool.test.ts` - MCP tools tests

## Supported File Types

The module validates and supports the following MIME types:

### Images
- `image/jpeg`
- `image/png`
- `image/gif`
- `image/webp`

### Documents
- `application/pdf`
- `application/msword` (DOC)
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX)
- `application/vnd.ms-excel` (XLS)
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (XLSX)

### Text Files
- `text/plain`
- `text/csv`

## Configuration

### Environment Variables Required
```env
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
```

### File Limits
- **Maximum File Size**: 10MB (configurable in service)
- **Signed URL Expiry**: 1 hour (configurable)

## MCP Tools Available

The module provides 6 MCP tools for comprehensive file management:

1. **file_upload_validate** - Validate file parameters
2. **file_upload_initiate** - Initialize file upload
3. **file_upload_complete** - Complete file upload
4. **file_upload_get_by_id** - Get upload details
5. **file_upload_query** - Query uploads with filters
6. **file_upload_delete** - Delete upload records

## Security Features

- **Authentication Required**: All endpoints require valid JWT tokens
- **User Isolation**: Users can only access their own uploads
- **File Type Restrictions**: Only allow safe file types
- **Size Limits**: Prevent abuse with file size limits
- **Input Validation**: Comprehensive validation using Joi schemas
- **SQL Injection Prevention**: Using Prisma ORM with parameterized queries

## Error Handling

The module provides comprehensive error handling for:

- **400 Bad Request**: Invalid input data, file parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Access to other users' uploads
- **404 Not Found**: Upload not found
- **409 Conflict**: Upload already completed
- **413 Request Entity Too Large**: File too large
- **415 Unsupported Media Type**: Invalid file type
- **500 Internal Server Error**: Server errors

## Testing

The implementation includes comprehensive tests covering:

### Service Layer Tests (22 tests)
- File validation logic
- Upload initiation and completion
- Query and filtering functionality
- Access control and permissions
- Error scenarios

### Controller Tests (28 tests)
- HTTP endpoint functionality
- Authentication and authorization
- Request/response validation
- Error handling
- User isolation

### MCP Tools Tests (26 tests)
- Tool metadata validation
- Input/output schema validation
- Business logic execution
- Error handling
- Permission checks

## Usage Examples

### Initiate Upload
```bash
curl -X POST /api/upload/initiate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "document.pdf",
    "fileType": "application/pdf", 
    "fileSize": 1048576
  }'
```

### Complete Upload
```bash
curl -X POST /api/upload/complete \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "uploadId": "12345678-1234-1234-1234-123456789012"
  }'
```

### List Uploads
```bash
curl -X GET "/api/upload?page=1&limit=10&status=COMPLETED" \
  -H "Authorization: Bearer <token>"
```

## Integration Notes

1. **Database Migration**: Run `pnpm db:migrate` to apply schema changes (not run here per restrictions)
2. **Prisma Generation**: Already run with `pnpm db:generate`
3. **Type Safety**: All code passes TypeScript compilation
4. **Cloud Storage**: Currently configured for AWS S3 (easily adaptable to other providers)
5. **Monitoring**: Logging integrated for upload operations

## Performance Considerations

- **Signed URLs**: Direct upload to cloud storage reduces server load
- **Database Indexing**: uploadId field is unique and indexed
- **Pagination**: Query endpoints support pagination to handle large datasets
- **File Size Limits**: Prevent memory issues with large files

The implementation follows all existing project patterns and conventions, providing a robust, secure, and scalable file upload system.
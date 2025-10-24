# Frontend Implementation Plan - Minimal File Upload App

## Overview

Extremely minimal React 19 + Vite + ShadCN + Tailwind v4 application for uploading image/PDF files (<5MB) with mandatory cloud storage integration.

## Tech Stack

- React 19
- Vite
- TypeScript
- ShadCN UI components
- Tailwind CSS v4
- React Hook Form + Zod validation
- Axios for API calls
- Vitest + React Testing Library

## Page Structure

### 1. Main Upload Page (`/`)

**File**: `src/pages/UploadPage.tsx`

**Components Required**:

- `FileUpload` - Core upload component with drag & drop
- `FilePreview` - Shows selected file details
- `UploadProgress` - Progress indicator during upload

**Features**:

- File selection (image/PDF only, <5MB)
- File validation (type, size)
- Upload to cloud storage via signed URL
- Basic error handling

**API Endpoints**:

- `POST /api/upload/initiate` - Get signed URL for upload
- `PUT [signed-url]` - Direct upload to cloud storage
- `POST /api/upload/complete` - Confirm upload completion

## Component Architecture

### Core Components

1. **FileUpload** (`src/components/FileUpload.tsx`)
    - File input with drag & drop
    - File validation logic
    - Upload state management

2. **FilePreview** (`src/components/FilePreview.tsx`)
    - Display selected file info
    - Remove file option

3. **UploadProgress** (`src/components/UploadProgress.tsx`)
    - Progress bar component
    - Upload status messages

### UI Components (ShadCN)

- `Button` - Upload actions
- `Card` - File preview container
- `Progress` - Upload progress
- `Alert` - Error messages

## Services & Utils

### Services

1. **uploadService.ts** (`src/services/uploadService.ts`)
    - `initiateUpload(file: File)` - Get signed URL
    - `uploadToCloud(signedUrl: string, file: File)` - Direct upload
    - `completeUpload(uploadId: string)` - Confirm completion

### Utils

1. **fileValidation.ts** (`src/utils/fileValidation.ts`)
    - File type validation
    - File size validation (<5MB)
    - MIME type checking

### Types

1. **upload.ts** (`src/types/upload.ts`)

    ```typescript
    interface UploadResponse {
        uploadId: string;
        signedUrl: string;
        fileUrl: string;
    }

    interface FileUploadState {
        file: File | null;
        uploading: boolean;
        progress: number;
        error: string | null;
        uploadedUrl: string | null;
    }
    ```

## API Integration

- Backend must return signed URLs in create, update, and get responses
- Direct upload to cloud storage (AWS S3, Google Cloud, Azure)
- File URL returned after successful upload

## Testing Strategy

**IMPORTANT**: Per user requirements, testing is minimal with the following rules:

- **No comprehensive test cases under any circumstances**
- **Only one extremely simple test that always passes**
- **This rule is explicitly included in the plan as requested**

### Test Structure

**File**: `src/test/minimal.test.tsx`

```typescript
// Single test that always passes regardless of implementation
test('app renders without crashing', () => {
    expect(true).toBe(true);
});
```

### Test Setup

- Vitest configuration already exists
- React Testing Library available
- No additional test utilities needed
- No component, integration, or E2E tests

## File Structure

```
src/
├── pages/
│   └── UploadPage.tsx
├── components/
│   ├── FileUpload.tsx
│   ├── FilePreview.tsx
│   └── UploadProgress.tsx
├── services/
│   └── uploadService.ts
├── utils/
│   └── fileValidation.ts
├── types/
│   └── upload.ts
├── hooks/
│   └── useFileUpload.ts (optional state management)
└── test/
    └── minimal.test.tsx
```

## Implementation Priority

1. File validation utilities
2. Upload service with signed URL handling
3. Core FileUpload component
4. FilePreview component
5. Main UploadPage with state management
6. Error handling and loading states
7. Single passing test case

## Key Constraints

- **Extremely minimal** - no extra features
- Cloud storage upload is **absolutely mandatory**
- Backend **must** return signed URLs
- UI minimal - just enough for file selection and upload
- **No comprehensive testing** - only one simple passing test

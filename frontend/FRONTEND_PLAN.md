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

### 1. Login Page (`/login`)

**File**: `src/pages/LoginPage.tsx`

**Components Required**:

- `LoginForm` - Core login form with email/password fields
- Form validation using React Hook Form + Zod
- Loading states and error handling

**Features**:

- Email and password input fields
- Client-side form validation
- Authentication via existing auth service
- Redirect to main page after successful login
- Error handling for authentication failures

**API Endpoints**:

- `POST /auth/login` - User authentication

### 2. Main Upload Page (`/`)

**File**: `src/pages/UploadPage.tsx` (Protected Route)

**Components Required**:

- `FileUpload` - Core upload component with drag & drop
- `FilePreview` - Shows selected file details
- `UploadProgress` - Progress indicator during upload

**Features**:

- Requires authentication to access
- File selection (image/PDF only, <5MB)
- File validation (type, size)
- Upload to cloud storage via signed URL
- Basic error handling
- Logout functionality

**API Endpoints**:

- `POST /api/upload/initiate` - Get signed URL for upload
- `PUT [signed-url]` - Direct upload to cloud storage
- `POST /api/upload/complete` - Confirm upload completion

## Component Architecture

### Core Components

1. **LoginForm** (`src/components/LoginForm.tsx`)
    - Email and password input fields
    - Form validation and submission
    - Loading and error states

2. **FileUpload** (`src/components/FileUpload.tsx`)
    - File input with drag & drop
    - File validation logic
    - Upload state management

3. **FilePreview** (`src/components/FilePreview.tsx`)
    - Display selected file info
    - Remove file option

4. **UploadProgress** (`src/components/UploadProgress.tsx`)
    - Progress bar component
    - Upload status messages

### UI Components (ShadCN)

- `Button` - Form submissions and upload actions
- `Card` - Login form and file preview container
- `Input` - Email and password fields
- `Form` - Form validation wrapper
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
│   ├── LoginPage.tsx
│   └── UploadPage.tsx (protected)
├── components/
│   ├── LoginForm.tsx
│   ├── FileUpload.tsx
│   ├── FilePreview.tsx
│   └── UploadProgress.tsx
├── services/
│   ├── auth.ts (existing)
│   └── uploadService.ts
├── utils/
│   └── fileValidation.ts
├── types/
│   ├── user.ts (existing)
│   └── upload.ts
├── hooks/
│   ├── useAuth.ts (authentication hook)
│   └── useFileUpload.ts (optional state management)
└── test/
    └── minimal.test.tsx
```

## Implementation Priority

1. Authentication hook (useAuth)
2. Login form component with validation
3. Login page implementation
4. Update App.tsx with routing (Login/Upload pages)
5. File validation utilities
6. Upload service with signed URL handling
7. Core FileUpload component
8. FilePreview component
9. Main UploadPage with state management (protected)
10. Error handling and loading states
11. Single passing test case

## Key Constraints

- **Extremely minimal** - no extra features
- Cloud storage upload is **absolutely mandatory**
- Backend **must** return signed URLs
- UI minimal - just enough for file selection and upload
- **No comprehensive testing** - only one simple passing test

import { type UploadResponse, type CompleteUploadResponse } from '../types/upload';

export const mockUploadResponse: UploadResponse = {
    uploadId: 'mock-upload-123',
    signedUrl: 'https://mock-storage.com/upload-url',
    fileUrl: 'https://mock-storage.com/files/mock-file.pdf'
};

export const mockCompleteUploadResponse: CompleteUploadResponse = {
    uploadId: 'mock-upload-123',
    fileUrl: 'https://mock-storage.com/files/uploaded-file.pdf'
};

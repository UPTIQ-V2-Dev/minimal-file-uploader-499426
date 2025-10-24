import { api } from '../lib/api';
import {
    type InitiateUploadRequest,
    type UploadResponse,
    type CompleteUploadRequest,
    type CompleteUploadResponse
} from '../types/upload';
import { mockUploadResponse, mockCompleteUploadResponse } from '../data/uploadMockData';

export const initiateUpload = async (file: File): Promise<UploadResponse> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockUploadResponse;
    }

    const requestData: InitiateUploadRequest = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
    };

    const response = await api.post<UploadResponse>('/api/upload/initiate', requestData);
    return response.data;
};

export const uploadToCloud = async (signedUrl: string, file: File): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
    }

    await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });
};

export const completeUpload = async (uploadId: string): Promise<CompleteUploadResponse> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCompleteUploadResponse;
    }

    const requestData: CompleteUploadRequest = {
        uploadId
    };

    const response = await api.post<CompleteUploadResponse>('/api/upload/complete', requestData);
    return response.data;
};

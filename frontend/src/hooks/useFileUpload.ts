import { useState, useCallback } from 'react';
import { type FileUploadState } from '../types/upload';
import { initiateUpload, uploadToCloud, completeUpload } from '../services/uploadService';

export const useFileUpload = () => {
    const [state, setState] = useState<FileUploadState>({
        file: null,
        uploading: false,
        progress: 0,
        error: null,
        uploadedUrl: null
    });

    const setFile = useCallback((file: File | null) => {
        setState(prev => ({
            ...prev,
            file,
            error: null,
            uploadedUrl: null,
            progress: 0
        }));
    }, []);

    const uploadFile = useCallback(async (file: File) => {
        try {
            setState(prev => ({ ...prev, uploading: true, progress: 0, error: null }));

            // Step 1: Initiate upload
            setState(prev => ({ ...prev, progress: 20 }));
            const uploadResponse = await initiateUpload(file);

            // Step 2: Upload to cloud storage
            setState(prev => ({ ...prev, progress: 40 }));
            await uploadToCloud(uploadResponse.signedUrl, file);

            // Step 3: Complete upload
            setState(prev => ({ ...prev, progress: 80 }));
            const completeResponse = await completeUpload(uploadResponse.uploadId);

            // Step 4: Finalize
            setState(prev => ({
                ...prev,
                progress: 100,
                uploading: false,
                uploadedUrl: completeResponse.fileUrl
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                uploading: false,
                progress: 0,
                error: error instanceof Error ? error.message : 'Upload failed'
            }));
        }
    }, []);

    const reset = useCallback(() => {
        setState({
            file: null,
            uploading: false,
            progress: 0,
            error: null,
            uploadedUrl: null
        });
    }, []);

    return {
        ...state,
        setFile,
        uploadFile,
        reset
    };
};

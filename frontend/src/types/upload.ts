export interface UploadResponse {
    uploadId: string;
    signedUrl: string;
    fileUrl: string;
}

export interface FileUploadState {
    file: File | null;
    uploading: boolean;
    progress: number;
    error: string | null;
    uploadedUrl: string | null;
}

export interface InitiateUploadRequest {
    fileName: string;
    fileType: string;
    fileSize: number;
}

export interface CompleteUploadRequest {
    uploadId: string;
}

export interface CompleteUploadResponse {
    fileUrl: string;
    uploadId: string;
}

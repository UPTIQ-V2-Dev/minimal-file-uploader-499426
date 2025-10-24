const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
    if (!file) {
        return { isValid: false, error: 'No file selected' };
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: 'Invalid file type. Only images (JPEG, PNG, GIF, WebP) and PDF files are allowed.'
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            isValid: false,
            error: 'File size exceeds 5MB limit.'
        };
    }

    return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (fileType: string): string => {
    if (fileType.startsWith('image/')) {
        return '🖼️';
    }
    if (fileType === 'application/pdf') {
        return '📄';
    }
    return '📁';
};

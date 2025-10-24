import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { validateFile } from '../utils/fileValidation';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onRemoveFile: () => void;
    uploading?: boolean;
}

export const FileUpload = ({ onFileSelect, selectedFile, onRemoveFile, uploading }: FileUploadProps) => {
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileValidation = useCallback((file: File) => {
        const validation = validateFile(file);
        if (!validation.isValid) {
            setError(validation.error || 'Invalid file');
            return false;
        }
        setError(null);
        return true;
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setDragOver(false);

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (handleFileValidation(file)) {
                    onFileSelect(file);
                }
            }
        },
        [onFileSelect, handleFileValidation]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (handleFileValidation(file)) {
                    onFileSelect(file);
                }
            }
        },
        [onFileSelect, handleFileValidation]
    );

    return (
        <div className='w-full max-w-md mx-auto space-y-4'>
            {!selectedFile ? (
                <Card
                    className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                        dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('file-input')?.click()}
                >
                    <Upload className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
                    <p className='text-lg font-medium mb-2'>Drop files here or click to select</p>
                    <p className='text-sm text-muted-foreground'>Images and PDFs only, max 5MB</p>
                    <input
                        id='file-input'
                        type='file'
                        className='hidden'
                        accept='image/*,.pdf'
                        onChange={handleFileInput}
                        disabled={uploading}
                    />
                </Card>
            ) : (
                <Card className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='text-2xl'>{selectedFile.type.startsWith('image/') ? '🖼️' : '📄'}</div>
                        <div className='flex-1'>
                            <p className='font-medium truncate'>{selectedFile.name}</p>
                            <p className='text-sm text-muted-foreground'>
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    {!uploading && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={onRemoveFile}
                            className='text-destructive hover:text-destructive'
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    )}
                </Card>
            )}

            {error && (
                <div className='p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md'>
                    {error}
                </div>
            )}
        </div>
    );
};

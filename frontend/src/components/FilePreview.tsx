import { ExternalLink, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { formatFileSize, getFileIcon } from '../utils/fileValidation';

interface FilePreviewProps {
    file: File;
    uploadedUrl?: string | null;
    uploading?: boolean;
}

export const FilePreview = ({ file, uploadedUrl, uploading }: FilePreviewProps) => {
    return (
        <Card className='p-4 w-full max-w-md mx-auto'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='text-3xl'>{getFileIcon(file.type)}</div>
                <div className='flex-1'>
                    <h3 className='font-medium truncate'>{file.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                        {formatFileSize(file.size)} • {file.type}
                    </p>
                </div>
                {uploadedUrl && <CheckCircle className='h-5 w-5 text-green-500' />}
            </div>

            {file.type.startsWith('image/') && (
                <div className='mb-3'>
                    <img
                        src={URL.createObjectURL(file)}
                        alt='Preview'
                        className='w-full h-32 object-cover rounded-md border'
                    />
                </div>
            )}

            {uploadedUrl && (
                <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => window.open(uploadedUrl, '_blank')}
                >
                    <ExternalLink className='h-4 w-4 mr-2' />
                    View Uploaded File
                </Button>
            )}

            {uploading && <div className='text-center text-sm text-muted-foreground'>Uploading...</div>}
        </Card>
    );
};

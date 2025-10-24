import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadProgressProps {
    progress: number;
    uploading: boolean;
    error?: string | null;
    success?: boolean;
}

export const UploadProgress = ({ progress, uploading, error, success }: UploadProgressProps) => {
    if (!uploading && !error && !success) {
        return null;
    }

    return (
        <Card className='p-4 w-full max-w-md mx-auto'>
            <div className='flex items-center gap-3 mb-3'>
                {uploading && (
                    <>
                        <Loader2 className='h-5 w-5 animate-spin text-primary' />
                        <span className='text-sm font-medium'>Uploading...</span>
                    </>
                )}
                {success && (
                    <>
                        <CheckCircle className='h-5 w-5 text-green-500' />
                        <span className='text-sm font-medium text-green-700'>Upload Complete!</span>
                    </>
                )}
                {error && (
                    <>
                        <AlertCircle className='h-5 w-5 text-destructive' />
                        <span className='text-sm font-medium text-destructive'>Upload Failed</span>
                    </>
                )}
            </div>

            {uploading && (
                <div className='space-y-2'>
                    <Progress
                        value={progress}
                        className='w-full'
                    />
                    <p className='text-xs text-muted-foreground text-center'>{Math.round(progress)}% complete</p>
                </div>
            )}

            {error && <div className='text-sm text-destructive bg-destructive/10 p-2 rounded-md'>{error}</div>}
        </Card>
    );
};

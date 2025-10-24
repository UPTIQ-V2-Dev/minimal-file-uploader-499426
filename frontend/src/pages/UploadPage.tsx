import { FileUpload } from '../components/FileUpload';
import { FilePreview } from '../components/FilePreview';
import { UploadProgress } from '../components/UploadProgress';
import { Button } from '../components/ui/button';
import { useFileUpload } from '../hooks/useFileUpload';

export const UploadPage = () => {
    const { file, uploading, progress, error, uploadedUrl, setFile, uploadFile, reset } = useFileUpload();

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleUpload = () => {
        if (file) {
            uploadFile(file);
        }
    };

    const handleReset = () => {
        reset();
    };

    return (
        <div className='min-h-screen bg-background p-4'>
            <div className='max-w-2xl mx-auto space-y-6'>
                <div className='text-center space-y-2'>
                    <h1 className='text-3xl font-bold'>File Upload</h1>
                    <p className='text-muted-foreground'>Upload your images or PDF files securely to cloud storage</p>
                </div>

                <FileUpload
                    onFileSelect={handleFileSelect}
                    selectedFile={file}
                    onRemoveFile={handleRemoveFile}
                    uploading={uploading}
                />

                {file && !uploading && !uploadedUrl && (
                    <div className='flex justify-center'>
                        <Button
                            onClick={handleUpload}
                            size='lg'
                        >
                            Upload File
                        </Button>
                    </div>
                )}

                <UploadProgress
                    progress={progress}
                    uploading={uploading}
                    error={error}
                    success={!!uploadedUrl}
                />

                {file && uploadedUrl && (
                    <FilePreview
                        file={file}
                        uploadedUrl={uploadedUrl}
                        uploading={uploading}
                    />
                )}

                {uploadedUrl && (
                    <div className='flex justify-center'>
                        <Button
                            onClick={handleReset}
                            variant='outline'
                        >
                            Upload Another File
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

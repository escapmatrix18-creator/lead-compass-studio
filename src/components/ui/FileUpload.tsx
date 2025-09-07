import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { UI_CONSTANTS, ERROR_MESSAGES } from '@/lib/constants';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

interface UploadedFile {
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = UI_CONSTANTS.ACCEPTED_FILE_TYPES,
  maxFileSize = UI_CONSTANTS.MAX_FILE_SIZE,
  multiple = false,
  className,
  disabled = false,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error: { code: string }) => {
          if (error.code === 'file-too-large') {
            console.error(ERROR_MESSAGES.FILE_TOO_LARGE);
          } else if (error.code === 'file-invalid-type') {
            console.error(ERROR_MESSAGES.INVALID_FILE_TYPE);
          }
        });
      });
    }

    // Handle accepted files
    acceptedFiles.forEach((file) => {
      const uploadedFile: UploadedFile = {
        file,
        status: 'uploading',
        progress: 0,
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file && f.status === 'uploading'
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 100);

      // Complete upload after progress reaches 100%
      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, status: 'success', progress: 100 }
              : f
          )
        );
        onFileSelect(file);
      }, 1000);
    });
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    multiple,
    disabled,
  });

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-2">
          <Upload className={cn(
            'w-8 h-8',
            isDragActive ? 'text-primary' : 'text-muted-foreground'
          )} />
          
          {isDragActive ? (
            <p className="text-primary">Drop the files here...</p>
          ) : (
            <div className="space-y-1">
              <p className="font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-muted-foreground">
                {acceptedFileTypes.join(', ')} up to {formatFileSize(maxFileSize)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Files</h4>
          {uploadedFiles.map((uploadedFile, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
            >
              <File className="w-4 h-4 text-muted-foreground" />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(uploadedFile.file.size)}
                </p>
                
                {uploadedFile.status === 'uploading' && (
                  <Progress value={uploadedFile.progress} className="h-1 mt-1" />
                )}
              </div>

              <div className="flex items-center space-x-2">
                {uploadedFile.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-success" />
                )}
                {uploadedFile.status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(uploadedFile.file)}
                  className="w-6 h-6"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
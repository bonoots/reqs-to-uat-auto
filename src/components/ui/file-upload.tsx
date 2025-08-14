import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  accept = { 'text/csv': ['.csv'] },
  maxSize = 5 * 1024 * 1024, // 5MB
  className
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setIsUploaded(true);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
  };

  return (
    <Card className={cn("p-6", className)}>
      {!isUploaded ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
            isDragActive ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
          <p className="text-muted-foreground mb-4">
            {isDragActive
              ? "Drop your CSV file here..."
              : "Drag & drop your requirements CSV file here, or click to select"}
          </p>
          <Button variant="outline" size="sm">
            Choose File
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center text-success mb-4">
            <CheckCircle className="h-12 w-12" />
          </div>
          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-success-foreground">{uploadedFile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {uploadedFile && (uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
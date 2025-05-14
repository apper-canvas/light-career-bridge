import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function ResumeUpload({ onFileSelect, currentFile, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const UploadIcon = getIcon('Upload');
  const AlertCircleIcon = getIcon('AlertCircle');
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };
  
  const validateAndProcessFile = (file) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    // Process valid file
    onFileSelect(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : error 
              ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
              : 'border-surface-300 dark:border-surface-600 hover:border-primary hover:bg-primary/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />
        
        <UploadIcon size={48} className="mx-auto mb-4 text-primary" />
        <p className="mb-2 font-medium">Drag & drop your resume here or click to browse</p>
        <p className="text-sm text-surface-500 dark:text-surface-400">PDF, DOC, or DOCX (Max 5MB)</p>
      </div>
      
      {error && <p className="form-error mt-2 flex items-center gap-1"><AlertCircleIcon size={16} /> {error}</p>}
    </div>
  );
}

export default ResumeUpload;
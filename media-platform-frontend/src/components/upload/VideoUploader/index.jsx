// src/components/upload/VideoUploader/index.jsx
import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Film, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { apiClient } from '../../../api/client';
import toast from 'react-hot-toast';
import { validateVideo } from '../../../utils/validateVideo';
import { generateThumbnail } from '../../../utils/generateThumbnail';
import { MetadataForm } from './MetadataForm';
import { ProgressBar } from './ProgressBar';

export const VideoUploader = ({ onUploadComplete }) => {
  const { user } = useAuth();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    title: '',
    caption: '',
    location: '',
    tags: [],
    people: [],
  });
  const [step, setStep] = useState(1); // 1: upload, 2: metadata, 3: processing

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validation = validateVideo(file);
    
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setVideoFile(file);
    
    // Generate thumbnail
    const thumbnailBlob = await generateThumbnail(file);
    setThumbnail(thumbnailBlob);
    
    setStep(2);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!videoFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnail);
    formData.append('metadata', JSON.stringify(metadata));
    formData.append('userId', user.id);

    try {
      const response = await apiClient.post('/posts/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStep(3);
      toast.success('Video uploaded successfully!');
      
      setTimeout(() => {
        onUploadComplete?.(response.data);
        resetForm();
      }, 2000);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setVideoFile(null);
    setThumbnail(null);
    setMetadata({ title: '', caption: '', location: '', tags: [], people: [] });
    setStep(1);
    setUploadProgress(0);
  };

  return (
    <div className="video-uploader">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="dropzone-container"
          >
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? 'drag-active' : ''}`}
            >
              <input {...getInputProps()} />
              <Upload size={48} />
              <h3>Drag & drop your video here</h3>
              <p>or click to browse</p>
              <div className="requirements">
                <small>MP4, MOV, or AVI • Max 500MB • 1080p recommended</small>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && videoFile && (
          <motion.div
            key="metadata"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="metadata-container"
          >
            <div className="video-preview">
              <video src={URL.createObjectURL(videoFile)} controls />
              {thumbnail && (
                <div className="thumbnail-overlay">
                  <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
                </div>
              )}
            </div>
            
            <MetadataForm metadata={metadata} onChange={setMetadata} />
            
            <div className="action-buttons">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                <X size={18} /> Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleUpload}
                disabled={!metadata.title}
              >
                <Film size={18} /> Upload Video
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="processing-container"
          >
            {isUploading ? (
              <>
                <ProgressBar progress={uploadProgress} />
                <p>Uploading and processing your video...</p>
              </>
            ) : (
              <>
                <CheckCircle size={64} color="#10b981" />
                <h3>Upload Complete!</h3>
                <p>Your video is being processed and will be available soon.</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
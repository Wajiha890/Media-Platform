// src/utils/validateVideo.js
export const validateVideo = (file) => {
  // Check if file exists
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  // Check file type
  const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
  if (!validTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload MP4, MOV, or AVI files.' 
    };
  }

  // Check file size (max 500MB)
  const maxSize = 500 * 1024 * 1024; // 500MB in bytes
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'File too large. Maximum size is 500MB.' 
    };
  }

  // Check minimum size (optional - 1KB)
  const minSize = 1024; // 1KB
  if (file.size < minSize) {
    return { 
      isValid: false, 
      error: 'File too small. Please upload a valid video file.' 
    };
  }

  return { isValid: true, error: null };
};
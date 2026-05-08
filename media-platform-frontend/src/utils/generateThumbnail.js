// src/utils/generateThumbnail.js
export const generateThumbnail = (videoFile) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.addEventListener('loadeddata', () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Seek to 1 second (or first frame if video is shorter)
      const seekTime = Math.min(1, video.duration);
      video.currentTime = seekTime;
    });

    video.addEventListener('seeked', () => {
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        },
        'image/jpeg',
        0.8
      );
    });

    video.addEventListener('error', (error) => {
      reject(error);
    });

    // Load the video file
    video.src = URL.createObjectURL(videoFile);
    video.load();
  });
};
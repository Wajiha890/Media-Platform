const generateThumbnailFromVideo = (videoUrl) => {
  // For now, return a placeholder thumbnail URL
  // In production, you can use ffmpeg or Cloudinary to generate thumbnails
  return videoUrl ? videoUrl.replace('.mp4', '.jpg') : 'https://via.placeholder.com/300';
};

module.exports = { generateThumbnailFromVideo };
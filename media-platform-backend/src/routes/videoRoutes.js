const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { protect, creatorOnly } = require('../middleware/authMiddleware');

// Import controller with error handling
let videoController;
try {
  videoController = require('../controllers/videoController');
  console.log('✅ videoController loaded');
} catch (error) {
  console.log('⚠️ videoController not found, using mock');
  videoController = {
    uploadVideo: (req, res) => res.json({ message: 'Upload endpoint' }),
    getAllVideos: (req, res) => res.json({ videos: [] }),
    getVideoById: (req, res) => res.json({ video: null }),
    getCreatorVideos: (req, res) => res.json({ videos: [] }),
    toggleLike: (req, res) => res.json({ likes: 0 })
  };
}

// Ensure all functions exist
const safeHandler = (handler) => {
  return (req, res, next) => {
    if (typeof handler !== 'function') {
      return res.status(500).json({ error: 'Handler not implemented' });
    }
    return handler(req, res, next);
  };
};

// Routes
router.post('/upload', protect, creatorOnly, upload.single('video'), safeHandler(videoController.uploadVideo));
router.get('/', safeHandler(videoController.getAllVideos));
router.get('/:id', safeHandler(videoController.getVideoById));
router.get('/creator/:creatorId', safeHandler(videoController.getCreatorVideos));
router.post('/:id/like', protect, safeHandler(videoController.toggleLike));

// Test route
router.get('/test/hello', (req, res) => {
  res.json({ message: 'Video routes are working!' });
});

module.exports = router;
const express = require('express');
const { rateVideo, getVideoRating, getUserRating } = require('../controllers/ratingController');
const { protect, consumerOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, consumerOnly, rateVideo);
router.get('/video/:videoId', getVideoRating);
router.get('/video/:videoId/user', protect, getUserRating);

module.exports = router;
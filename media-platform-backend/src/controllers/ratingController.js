const Rating = require('../models/Rating');
const Video = require('../models/Video');

// @desc    Rate a video (1-5 stars)
// @route   POST /api/ratings
// @access  Private (Consumer only)
const rateVideo = async (req, res) => {
  try {
    const { value, videoId } = req.body;

    if (value < 1 || value > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user already rated this video
    let rating = await Rating.findOne({ user: req.user.id, video: videoId });

    if (rating) {
      // Update existing rating
      rating.value = value;
      await rating.save();
    } else {
      // Create new rating
      rating = await Rating.create({
        value,
        user: req.user.id,
        video: videoId,
      });
    }

    // Calculate new average rating
    const ratings = await Rating.find({ video: videoId });
    const average = ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

    video.ratings = {
      average: Number(average.toFixed(1)),
      count: ratings.length,
    };
    await video.save();

    res.json({
      rating: rating.value,
      average: video.ratings.average,
      count: video.ratings.count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get rating for a video
// @route   GET /api/ratings/video/:videoId
// @access  Public
const getVideoRating = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({
      average: video.ratings.average,
      count: video.ratings.count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's rating for a video
// @route   GET /api/ratings/video/:videoId/user
// @access  Private
const getUserRating = async (req, res) => {
  try {
    const rating = await Rating.findOne({ user: req.user.id, video: req.params.videoId });
    res.json({ rating: rating?.value || null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { rateVideo, getVideoRating, getUserRating };
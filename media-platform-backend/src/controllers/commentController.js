const Comment = require('../models/Comment');
const Video = require('../models/Video');

// @desc    Add comment to video
// @route   POST /api/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = await Comment.create({
      text,
      user: req.user.id,
      video: videoId,
    });

    // Update video comments count
    video.commentsCount += 1;
    await video.save();

    const populatedComment = await Comment.findById(comment.id).populate('user', 'username fullName avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for a video
// @route   GET /api/comments/video/:videoId
// @access  Public
const getVideoComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate('user', 'username fullName avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // Update video comments count
    await Video.findByIdAndUpdate(comment.video, { $inc: { commentsCount: -1 } });
    
    await comment.deleteOne();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getVideoComments, deleteComment };
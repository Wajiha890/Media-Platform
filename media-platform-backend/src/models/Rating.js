const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure one rating per user per video
ratingSchema.index({ user: 1, video: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
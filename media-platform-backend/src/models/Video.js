const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 100,
  },
  caption: {
    type: String,
    maxlength: 500,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  people: [{
    type: String,
    trim: true,
  }],
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: '',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Video', videoSchema);
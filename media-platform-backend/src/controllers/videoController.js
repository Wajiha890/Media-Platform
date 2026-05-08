const Video = require('../models/Video');

// Upload video (Creator only)
const uploadVideo = async (req, res) => {
  try {
    console.log('📹 Upload request received');
    console.log('Body:', req.body);
    console.log('File:', req.file ? req.file.filename : 'No file');

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please select a video file to upload' 
      });
    }

    const { title, caption, location, people } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Video title is required' 
      });
    }

    let peopleArray = [];
    if (people) {
      peopleArray = people.split(',').map(p => p.trim()).filter(p => p);
    }

    const video = new Video({
      title: title.trim(),
      caption: caption || '',
      location: location || '',
      people: peopleArray,
      videoUrl: `/uploads/${req.file.filename}`,
      thumbnailUrl: '',
      creator: req.user.id,
    });

    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video uploaded successfully!',
      video: {
        id: video._id,
        title: video.title,
        caption: video.caption,
        videoUrl: video.videoUrl,
        createdAt: video.createdAt
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('creator', 'username fullName')
      .sort({ createdAt: -1 });
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('creator', 'username fullName');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get creator's videos
const getCreatorVideos = async (req, res) => {
  try {
    const videos = await Video.find({ creator: req.params.creatorId })
      .populate('creator', 'username fullName')
      .sort({ createdAt: -1 });
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle like
const toggleLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.likes += 1;
    await video.save();
    res.json({ success: true, likes: video.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getCreatorVideos,
  toggleLike,
};
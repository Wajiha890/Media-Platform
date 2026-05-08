const express = require('express');
const { addComment, getVideoComments, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addComment);
router.get('/video/:videoId', getVideoComments);
router.delete('/:id', protect, deleteComment);

module.exports = router;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../../contexts/AuthContext';
import { apiClient } from '../../../api/client';
import { CommentSection } from '../CommentSection';
import { LikeButton } from '../LikeButton';
import { ImageOptimized } from '../../common/ImageOptimized';
import toast from 'react-hot-toast';

export const FeedPost = ({ post, onLike, onComment }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comments, setComments] = useState(post.comments || []);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleLike = async () => {
    const previousLiked = isLiked;
    setIsLiked(!isLiked);
    setLikesCount(prev => !isLiked ? prev + 1 : prev - 1);

    try {
      await apiClient.post(`/posts/${post.id}/like`);
      onLike?.(post.id, !isLiked);
    } catch (error) {
      setIsLiked(previousLiked);
      setLikesCount(prev => previousLiked ? prev + 1 : prev - 1);
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (commentText) => {
    try {
      const response = await apiClient.post(`/posts/${post.id}/comments`, {
        text: commentText,
      });
      
      const newComment = {
        id: response.data.id,
        text: commentText,
        user: { username: user?.username || 'User', avatar: user?.avatar || '' },
        createdAt: new Date().toISOString(),
      };
      
      setComments([newComment, ...comments]);
      onComment?.(post.id, newComment);
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    try {
      await apiClient.post(`/posts/${post.id}/bookmark`);
      toast.success(isBookmarked ? 'Removed from saved' : 'Saved to collection');
    } catch (error) {
      setIsBookmarked(!isBookmarked);
      toast.error('Failed to save post');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="feed-post"
      style={{
        background: 'white',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #dbdbdb',
        overflow: 'hidden'
      }}
    >
      {/* Post Header */}
      <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={post.author?.avatar || 'https://via.placeholder.com/40'} 
            alt={post.author?.username || 'User'} 
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{post.author?.username || 'Unknown'}</h4>
            <span style={{ fontSize: '12px', color: '#8e8e8e' }}>{post.location || ''}</span>
          </div>
        </div>
        <button className="more-options" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      <div style={{ position: 'relative', width: '100%', background: '#000' }}>
        <ImageOptimized
          src={post.thumbnailUrl || post.imageUrl}
          alt={post.title}
          className="post-image"
        />
        {post.type === 'video' && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '12px' }}>
            <span>Video</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <LikeButton isLiked={isLiked} onClick={handleLike} />
          <button onClick={() => setShowComments(!showComments)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <MessageCircle size={24} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Share2 size={24} />
          </button>
        </div>
        <button onClick={handleBookmark} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Bookmark size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Likes Count */}
      <div style={{ padding: '0 16px', marginBottom: '8px' }}>
        <strong>{likesCount?.toLocaleString() || 0} likes</strong>
      </div>

      {/* Post Caption */}
      <div style={{ padding: '0 16px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
        <strong>{post.author?.username || ''}</strong>
        <span>{post.caption || ''}</span>
      </div>

      {/* Comments Preview */}
      {comments.length > 0 && (
        <button
          onClick={() => setShowComments(!showComments)}
          style={{ background: 'none', border: 'none', color: '#8e8e8e', padding: '0 16px', margin: '4px 0', cursor: 'pointer', fontSize: '14px' }}
        >
          View all {comments.length} comments
        </button>
      )}

      {/* Timestamp */}
      <div style={{ padding: '0 16px 16px', color: '#8e8e8e', fontSize: '10px', textTransform: 'uppercase' }}>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </div>

      {/* Comments Section Modal */}
      {showComments && (
        <CommentSection
          comments={comments}
          onAddComment={handleComment}
          onClose={() => setShowComments(false)}
        />
      )}
    </motion.article>
  );
};
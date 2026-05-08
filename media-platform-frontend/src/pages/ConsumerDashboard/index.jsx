import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import { Heart, MessageCircle, Bookmark, Send, Search, X, Share2, CheckCheck } from 'lucide-react';

const ConsumerDashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [stories, setStories] = useState([]);
  const [showShareToast, setShowShareToast] = useState(false);
  const [sharePostId, setSharePostId] = useState(null);

  // Stories Data
  const storiesData = [
    { id: 1, username: 'your_story', avatar: `https://ui-avatars.com/api/?name=${user?.username || 'You'}&background=0095f6&color=fff`, isViewed: false, isYourStory: true },
    { id: 2, username: 'traveler_123', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isViewed: false },
    { id: 3, username: 'adventurer', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isViewed: false },
    { id: 4, username: 'city_explorer', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', isViewed: true },
    { id: 5, username: 'foodie_adventures', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', isViewed: false },
    { id: 6, username: 'beach_lover', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', isViewed: false },
  ];

  // Posts Data with comments array
  const postsData = [
    {
      id: 1,
      caption: 'Amazing sunset at the beach! 😍✨',
      location: 'Maldives',
      imageUrl: 'https://picsum.photos/600/600?random=1',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      username: 'traveler_123',
      time: '2 HOURS AGO',
      likes: 124,
      commentsCount: 45,
      commentsList: [
        { id: 1, username: 'nature_lover', text: 'Beautiful shot! 😍', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', time: '1 hour ago' },
        { id: 2, username: 'wanderlust', text: 'Adding this to my bucket list! ✨', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', time: '2 hours ago' },
      ],
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      caption: 'Hiking in the beautiful Swiss Alps! 🏔️',
      location: 'Swiss Alps',
      imageUrl: 'https://picsum.photos/600/600?random=2',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      username: 'adventurer',
      time: '5 HOURS AGO',
      likes: 89,
      commentsCount: 23,
      commentsList: [
        { id: 1, username: 'mountain_lover', text: 'Amazing view! ⛰️', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', time: '3 hours ago' },
      ],
      isLiked: true,
      isSaved: false,
    },
    {
      id: 3,
      caption: 'Night view of the amazing city 🏙️',
      location: 'New York',
      imageUrl: 'https://picsum.photos/600/600?random=3',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      username: 'city_explorer',
      time: 'YESTERDAY',
      likes: 567,
      commentsCount: 89,
      commentsList: [
        { id: 1, username: 'night_owl', text: 'Stunning city lights! 🌃', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', time: '5 hours ago' },
        { id: 2, username: 'urban_photographer', text: 'Perfect shot! 📸', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', time: '8 hours ago' },
        { id: 3, username: 'travel_enthusiast', text: 'NYC is magical! 🗽', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', time: '1 day ago' },
      ],
      isLiked: false,
      isSaved: true,
    },
    {
      id: 4,
      caption: 'Delicious street food in Tokyo! 🍜',
      location: 'Tokyo, Japan',
      imageUrl: 'https://picsum.photos/600/600?random=4',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      username: 'foodie_adventures',
      time: '2 DAYS AGO',
      likes: 203,
      commentsCount: 56,
      commentsList: [],
      isLiked: false,
      isSaved: false,
    },
    {
      id: 5,
      caption: 'Perfect day at the beach 🌊☀️',
      location: 'Bali, Indonesia',
      imageUrl: 'https://picsum.photos/600/600?random=5',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      username: 'beach_lover',
      time: '3 DAYS AGO',
      likes: 456,
      commentsCount: 78,
      commentsList: [
        { id: 1, username: 'sun_seeker', text: 'Paradise found! 🏖️', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', time: '2 days ago' },
      ],
      isLiked: true,
      isSaved: true,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(postsData);
      setFilteredPosts(postsData);
      setStories(storiesData);
      setLoading(false);
    }, 500);
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setIsSearching(false);
      setFilteredPosts(posts);
    } else {
      setIsSearching(true);
      const filtered = posts.filter(post =>
        post.caption.toLowerCase().includes(query.toLowerCase()) ||
        post.location.toLowerCase().includes(query.toLowerCase()) ||
        post.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setFilteredPosts(posts);
  };

  const handleLike = (postId) => {
    const updatePosts = (postsList) => 
      postsList.map(post => 
        post.id === postId 
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      );
    
    setFilteredPosts(updatePosts(filteredPosts));
    setPosts(updatePosts(posts));
  };

  const handleSave = (postId) => {
    const updatePosts = (postsList) =>
      postsList.map(post =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      );
    
    setFilteredPosts(updatePosts(filteredPosts));
    setPosts(updatePosts(posts));
  };

  // Working Comment Function
  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      username: user?.username || 'current_user',
      text: commentText,
      avatar: `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0095f6&color=fff`,
      time: 'Just now'
    };
    
    const updatePosts = (postsList) =>
      postsList.map(post =>
        post.id === postId 
          ? { 
              ...post, 
              commentsList: [...post.commentsList, newComment],
              commentsCount: post.commentsCount + 1
            }
          : post
      );
    
    setFilteredPosts(updatePosts(filteredPosts));
    setPosts(updatePosts(posts));
  };

  // Working Share Function
  const handleShare = (postId) => {
    setSharePostId(postId);
    setShowShareToast(true);
    
    // Copy to clipboard
    const shareUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(shareUrl);
    
    setTimeout(() => {
      setShowShareToast(false);
      setSharePostId(null);
    }, 2000);
  };

  // Comment Section Component inside post
  const CommentSection = ({ post, onAddComment }) => {
    const [commentInput, setCommentInput] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    
    const displayComments = showAllComments ? post.commentsList : post.commentsList.slice(0, 2);
    
    return (
      <div>
        {/* Comments List */}
        {post.commentsList.length > 0 && (
          <div style={{ padding: '0 16px', marginBottom: '8px' }}>
            {displayComments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>{comment.username}</span>
                  <span style={{ fontSize: '13px', marginLeft: '8px' }}>{comment.text}</span>
                  <div style={{ fontSize: '10px', color: '#8e8e8e', marginTop: '2px' }}>{comment.time}</div>
                </div>
              </div>
            ))}
            
            {post.commentsList.length > 2 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8e8e8e',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                View all {post.commentsCount} comments
              </button>
            )}
            
            {showAllComments && post.commentsList.length > 2 && (
              <button
                onClick={() => setShowAllComments(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8e8e8e',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Show less
              </button>
            )}
          </div>
        )}
        
        {/* Add Comment Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #efefef',
          padding: '12px 16px',
          marginTop: '8px'
        }}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onAddComment(post.id, commentInput);
                setCommentInput('');
              }
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              background: 'transparent'
            }}
          />
          <button
            onClick={() => {
              onAddComment(post.id, commentInput);
              setCommentInput('');
            }}
            disabled={!commentInput.trim()}
            style={{
              background: 'none',
              border: 'none',
              color: commentInput.trim() ? '#0095f6' : '#b2dffc',
              fontWeight: 600,
              cursor: commentInput.trim() ? 'pointer' : 'not-allowed',
              transition: 'color 0.2s'
            }}
          >
            Post
          </button>
        </div>
      </div>
    );
  };

  const displayPosts = isSearching ? filteredPosts : posts;

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      
      {/* Share Toast Notification */}
      {showShareToast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#262626',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2000,
          animation: 'slideUp 0.3s ease'
        }}>
          <CheckCheck size={18} />
          <span>Link copied to clipboard! 🔗</span>
        </div>
      )}
      
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0' }}>
        
        {/* Search Bar Section */}
        <div style={{
          background: 'white',
          border: '1px solid #dbdbdb',
          borderRadius: '8px',
          margin: '20px 0 0 0',
          padding: '12px 16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search size={20} color="#8e8e8e" />
            <input
              type="text"
              placeholder="Search by caption, location or username..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                background: 'transparent'
              }}
            />
            {searchQuery && (
              <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={16} color="#8e8e8e" />
              </button>
            )}
          </div>
          
          {isSearching && (
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #efefef',
              fontSize: '12px',
              color: '#8e8e8e'
            }}>
              🔍 Found {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Stories Section */}
        {!isSearching && (
          <div style={{
            background: 'white',
            border: '1px solid #dbdbdb',
            borderRadius: '8px',
            marginTop: '20px',
            padding: '16px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '20px'
          }}>
            {stories.map((story) => (
              <div key={story.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                opacity: story.isViewed ? 0.5 : 1
              }}>
                <div style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '50%',
                  background: story.isViewed ? '#dbdbdb' : 'linear-gradient(45deg, #f09433, #d62976, #962fbf)',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={story.avatar}
                      alt={story.username}
                      style={{ width: '58px', height: '58px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#262626' }}>
                  {story.isYourStory ? 'Your story' : story.username.length > 10 ? story.username.slice(0, 10) + '...' : story.username}
                </span>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ width: '100%', height: '400px', background: '#efefef', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
          </div>
        ) : (
          <>
            {isSearching && displayPosts.length === 0 && (
              <div style={{
                background: 'white',
                border: '1px solid #dbdbdb',
                borderRadius: '8px',
                marginTop: '20px',
                padding: '60px 20px',
                textAlign: 'center'
              }}>
                <Search size={48} color="#dbdbdb" />
                <h3 style={{ marginTop: '16px', color: '#262626' }}>No results found</h3>
                <p style={{ color: '#8e8e8e' }}>Try searching for "beach", "mountain", or "food"</p>
                <button onClick={clearSearch} style={{
                  marginTop: '16px',
                  padding: '8px 24px',
                  background: '#0095f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>Clear Search</button>
              </div>
            )}

            {displayPosts.map((post) => (
              <div key={post.id} style={{
                background: 'white',
                border: '1px solid #dbdbdb',
                borderRadius: '8px',
                marginTop: '20px',
                overflow: 'hidden'
              }}>
                {/* Post Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={post.avatar} alt={post.username} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>{post.username}</span>
                      <span style={{ fontSize: '12px', color: '#8e8e8e', marginLeft: '8px' }}>{post.location}</span>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>⋯</button>
                </div>

                {/* Post Image */}
                <img src={post.imageUrl} alt="Post" style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }} />

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 16px'
                }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={() => handleLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Heart size={24} fill={post.isLiked ? '#ed4956' : 'none'} color={post.isLiked ? '#ed4956' : '#262626'} />
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <MessageCircle size={24} />
                    </button>
                    <button onClick={() => handleShare(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Share2 size={24} />
                    </button>
                  </div>
                  <button onClick={() => handleSave(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Bookmark size={24} fill={post.isSaved ? '#262626' : 'none'} />
                  </button>
                </div>

                {/* Likes */}
                <div style={{ padding: '0 16px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{post.likes.toLocaleString()} likes</span>
                </div>

                {/* Caption */}
                <div style={{ padding: '0 16px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{post.username}</span>
                  <span style={{ fontSize: '14px', marginLeft: '8px' }}>{post.caption}</span>
                </div>

                {/* Comment Section Component */}
                <CommentSection post={post} onAddComment={handleAddComment} />

                {/* Time */}
                <div style={{ padding: '0 16px 12px' }}>
                  <span style={{ fontSize: '10px', color: '#8e8e8e', textTransform: 'uppercase' }}>{post.time}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ConsumerDashboard;
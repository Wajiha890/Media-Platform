import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import { Settings, Grid, Bookmark, User, Heart, MessageCircle, Plus, ChevronRight, X, Save, Camera, Image, Link } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showNewHighlight, setShowNewHighlight] = useState(false);
  const [highlights, setHighlights] = useState([
    { id: 1, name: 'Travel', image: 'https://picsum.photos/77/77?random=100', coverImage: 'https://picsum.photos/300/300?random=100' },
    { id: 2, name: 'Food', image: 'https://picsum.photos/77/77?random=101', coverImage: 'https://picsum.photos/300/300?random=101' },
  ]);
  const [newHighlight, setNewHighlight] = useState({
    name: '',
    image: '',
    coverImage: ''
  });
  const [editForm, setEditForm] = useState({
    fullName: '',
    username: '',
    bio: '',
    website: '',
    email: ''
  });

  // User profile data
  const profile = {
    username: user?.username || 'consumer_user',
    fullName: user?.fullName || 'Consumer User',
    bio: 'Exploring the world one post at a time 🌍✨ | Travel & Lifestyle',
    website: 'www.myblog.com',
    email: 'consumer@example.com',
    postsCount: 24,
    followersCount: 1245,
    followingCount: 342,
    avatar: `https://ui-avatars.com/api/?name=${user?.username || 'Consumer'}&background=0095f6&color=fff&size=150`,
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'
  };

  // Initialize edit form with profile data
  useEffect(() => {
    setEditForm({
      fullName: profile.fullName,
      username: profile.username,
      bio: profile.bio,
      website: profile.website,
      email: profile.email
    });
  }, []);

  // User posts data
  const userPosts = [
    { id: 1, image: 'https://picsum.photos/300/300?random=10', likes: 1234, comments: 56, isLiked: false },
    { id: 2, image: 'https://picsum.photos/300/300?random=11', likes: 890, comments: 23, isLiked: true },
    { id: 3, image: 'https://picsum.photos/300/300?random=12', likes: 3456, comments: 89, isLiked: false },
    { id: 4, image: 'https://picsum.photos/300/300?random=13', likes: 567, comments: 12, isLiked: false },
    { id: 5, image: 'https://picsum.photos/300/300?random=14', likes: 7890, comments: 234, isLiked: true },
    { id: 6, image: 'https://picsum.photos/300/300?random=15', likes: 2345, comments: 67, isLiked: false },
    { id: 7, image: 'https://picsum.photos/300/300?random=16', likes: 4567, comments: 123, isLiked: true },
    { id: 8, image: 'https://picsum.photos/300/300?random=17', likes: 123, comments: 8, isLiked: false },
    { id: 9, image: 'https://picsum.photos/300/300?random=18', likes: 9876, comments: 456, isLiked: true },
  ];

  // Saved posts data
  const savedPostsData = [
    { id: 101, image: 'https://picsum.photos/300/300?random=20', likes: 5678, comments: 234 },
    { id: 102, image: 'https://picsum.photos/300/300?random=21', likes: 3456, comments: 123 },
    { id: 103, image: 'https://picsum.photos/300/300?random=22', likes: 7890, comments: 456 },
  ];

  // Archive posts data
  const archivePosts = [
    { id: 201, image: 'https://picsum.photos/300/300?random=30', date: 'Jan 2024' },
    { id: 202, image: 'https://picsum.photos/300/300?random=31', date: 'Dec 2023' },
    { id: 203, image: 'https://picsum.photos/300/300?random=32', date: 'Nov 2023' },
    { id: 204, image: 'https://picsum.photos/300/300?random=33', date: 'Oct 2023' },
    { id: 205, image: 'https://picsum.photos/300/300?random=34', date: 'Sep 2023' },
    { id: 206, image: 'https://picsum.photos/300/300?random=35', date: 'Aug 2023' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(userPosts);
      setSavedPosts(savedPostsData);
      setLoading(false);
    }, 500);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const showStatModal = (type, value) => {
    setSelectedStat({ type, value });
    setShowStats(true);
  };

  // Edit Profile Handlers
  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', editForm);
    setShowEditProfile(false);
    alert('Profile updated successfully! ✅');
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // View Archive Handler
  const handleViewArchive = () => {
    setShowArchive(true);
  };

  // New Highlight Handlers
  const handleNewHighlight = () => {
    setNewHighlight({ name: '', image: '', coverImage: '' });
    setShowNewHighlight(true);
  };

  const handleCreateHighlight = () => {
    if (!newHighlight.name.trim()) {
      alert('Please enter a highlight name!');
      return;
    }
    
    const newHighlightObj = {
      id: highlights.length + 1,
      name: newHighlight.name,
      image: newHighlight.image || `https://picsum.photos/77/77?random=${Date.now()}`,
      coverImage: newHighlight.coverImage || `https://picsum.photos/300/300?random=${Date.now()}`
    };
    
    setHighlights([...highlights, newHighlightObj]);
    setShowNewHighlight(false);
    setNewHighlight({ name: '', image: '', coverImage: '' });
    alert(`✨ "${newHighlight.name}" highlight created successfully!`);
  };

  // Random image generator for highlight
  const generateRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setNewHighlight({
      ...newHighlight,
      image: `https://picsum.photos/77/77?random=${randomId}`,
      coverImage: `https://picsum.photos/300/300?random=${randomId}`
    });
  };

  // Edit Profile Modal
  const EditProfileModal = () => {
    if (!showEditProfile) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={() => setShowEditProfile(false)}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '85vh',
          overflow: 'auto'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Edit Profile</h2>
            <button onClick={() => setShowEditProfile(false)} style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}>×</button>
          </div>
          
          <div style={{ padding: '20px' }}>
            {/* Avatar Change */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#0095f6',
                margin: '0 auto',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden'
              }}>
                <img src={profile.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.6)',
                  padding: '4px',
                  fontSize: '10px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <Camera size={14} />
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#0095f6', cursor: 'pointer', marginTop: '8px' }}>
                Change Profile Photo
              </p>
            </div>
            
            {/* Form Fields */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#8e8e8e', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editForm.fullName}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#8e8e8e', display: 'block', marginBottom: '4px' }}>Username</label>
              <input
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#8e8e8e', display: 'block', marginBottom: '4px' }}>Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#8e8e8e', display: 'block', marginBottom: '4px' }}>Bio</label>
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleEditChange}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#8e8e8e', display: 'block', marginBottom: '4px' }}>Website</label>
              <input
                type="text"
                name="website"
                value={editForm.website}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowEditProfile(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'white',
                  border: '1px solid #dbdbdb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#0095f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <Save size={16} style={{ display: 'inline', marginRight: '6px' }} /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Archive Modal
  const ArchiveModal = () => {
    if (!showArchive) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={() => setShowArchive(false)}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflow: 'auto'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: 'white'
          }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Post Archive</h2>
            <button onClick={() => setShowArchive(false)} style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}>×</button>
          </div>
          
          <div style={{ padding: '20px' }}>
            <div style={{
              background: '#fafafa',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: 0 }}>📦 {archivePosts.length} Archived Posts</h3>
              <p style={{ fontSize: '12px', color: '#8e8e8e', margin: '4px 0 0' }}>
                Posts older than 6 months are automatically archived
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px'
            }}>
              {archivePosts.map((post) => (
                <div key={post.id} style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  backgroundColor: '#efefef',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}>
                  <img src={post.image} alt="Archive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px',
                    fontSize: '10px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    {post.date}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={() => setShowArchive(false)}
                style={{
                  padding: '8px 24px',
                  background: '#0095f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // New Highlight Modal
  const NewHighlightModal = () => {
    if (!showNewHighlight) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={() => setShowNewHighlight(false)}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '450px',
          maxHeight: '80vh',
          overflow: 'auto'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Create New Highlight</h2>
            <button onClick={() => setShowNewHighlight(false)} style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}>×</button>
          </div>
          
          <div style={{ padding: '20px' }}>
            {/* Cover Image Preview */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#efefef',
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {newHighlight.image ? (
                  <img src={newHighlight.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    background: 'linear-gradient(45deg, #f09433, #d62976, #962fbf)'
                  }}>
                    <Image size={40} color="white" />
                  </div>
                )}
              </div>
              <button
                onClick={generateRandomImage}
                style={{
                  marginTop: '12px',
                  padding: '6px 12px',
                  background: '#efefef',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Camera size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Choose Cover
              </button>
            </div>
            
            {/* Highlight Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', color: '#262626', display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                Highlight Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Travel, Food, Friends"
                value={newHighlight.name}
                onChange={(e) => setNewHighlight({ ...newHighlight, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #dbdbdb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                autoFocus
              />
              <p style={{ fontSize: '11px', color: '#8e8e8e', marginTop: '4px' }}>
                Your highlight name will be visible to your followers
              </p>
            </div>
            
            {/* Add Stories Info */}
            <div style={{
              background: '#fafafa',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#8e8e8e' }}>
                <strong>💡 Tip:</strong> You can add stories to this highlight later from your story archive.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowNewHighlight(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'white',
                  border: '1px solid #dbdbdb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateHighlight}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: newHighlight.name.trim() ? '#0095f6' : '#b2dffc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: newHighlight.name.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 600
                }}
                disabled={!newHighlight.name.trim()}
              >
                <Plus size={16} style={{ display: 'inline', marginRight: '6px' }} />
                Create Highlight
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatModal = () => {
    if (!showStats) return null;
    
    const mockUsers = [
      { username: 'traveler_123', name: 'Traveler', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { username: 'adventurer', name: 'Adventurer', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { username: 'city_explorer', name: 'City Explorer', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { username: 'foodie_adventures', name: 'Foodie', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    ];
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={() => setShowStats(false)}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '400px',
          maxHeight: '80vh',
          overflow: 'auto'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0 }}>
              {selectedStat?.type === 'followers' ? 'Followers' : 
               selectedStat?.type === 'following' ? 'Following' : 'Posts'}
            </h3>
            <button onClick={() => setShowStats(false)} style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}>×</button>
          </div>
          <div>
            {mockUsers.map((u, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #efefef'
              }}>
                <img src={u.avatar} alt={u.username} style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  marginRight: '12px'
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{u.username}</p>
                  <p style={{ fontSize: '12px', color: '#8e8e8e', margin: 0 }}>{u.name}</p>
                </div>
                <button style={{
                  padding: '6px 16px',
                  background: '#0095f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600
                }}>Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        <Header />
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      
      {/* Profile Container */}
      <div style={{ maxWidth: '935px', margin: '0 auto', padding: '30px 20px' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '44px' }}>
          
          {/* Avatar */}
          <div style={{ flex: 1, minWidth: '150px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: '#efefef',
              overflow: 'hidden',
              cursor: 'pointer'
            }}>
              <img
                src={profile.avatar}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Profile Info */}
          <div style={{ flex: 2, minWidth: '250px' }}>
            {/* Username and Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 300 }}>
                {profile.username}
              </h2>
              <button 
                onClick={handleEditProfile}
                style={{
                  padding: '7px 16px',
                  background: 'white',
                  border: '1px solid #dbdbdb',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#fafafa'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                Edit Profile
              </button>
              <button 
                onClick={handleViewArchive}
                style={{
                  padding: '7px 16px',
                  background: 'white',
                  border: '1px solid #dbdbdb',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#fafafa'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                View Archive
              </button>
              <Settings size={24} style={{ cursor: 'pointer' }} />
            </div>
            
            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ cursor: 'pointer' }} onClick={() => showStatModal('posts', profile.postsCount)}>
                <strong>{profile.postsCount}</strong> posts
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => showStatModal('followers', profile.followersCount)}>
                <strong>{profile.followersCount.toLocaleString()}</strong> followers
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => showStatModal('following', profile.followingCount)}>
                <strong>{profile.followingCount.toLocaleString()}</strong> following
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{profile.fullName}</p>
              <p style={{ margin: '4px 0' }}>{profile.bio}</p>
              <a href="#" style={{ color: '#00376b', textDecoration: 'none', fontSize: '14px' }}>
                {profile.website}
              </a>
            </div>
          </div>
        </div>
        
        {/* Highlights - With Working New Button */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          {/* New Highlight Button */}
          <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleNewHighlight}>
            <div style={{
              width: '77px',
              height: '77px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #f09433, #d62976, #962fbf)',
              padding: '2px',
              marginBottom: '8px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{
                width: '73px',
                height: '73px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Plus size={30} color="#262626" />
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500 }}>New</span>
          </div>
          
          {/* Existing Highlights */}
          {highlights.map((highlight) => (
            <div key={highlight.id} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{
                width: '77px',
                height: '77px',
                borderRadius: '50%',
                background: '#efefef',
                marginBottom: '8px',
                overflow: 'hidden',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={highlight.image} alt={highlight.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500 }}>{highlight.name}</span>
            </div>
          ))}
        </div>
        
        {/* Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          borderTop: '1px solid #dbdbdb',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('posts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '16px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderTop: activeTab === 'posts' ? '1px solid #262626' : 'none',
              marginTop: '-1px',
              fontSize: '12px'
            }}
          >
            <Grid size={12} /> POSTS
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '16px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderTop: activeTab === 'saved' ? '1px solid #262626' : 'none',
              marginTop: '-1px',
              fontSize: '12px'
            }}
          >
            <Bookmark size={12} /> SAVED
          </button>
          <button
            onClick={() => setActiveTab('tagged')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '16px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderTop: activeTab === 'tagged' ? '1px solid #262626' : 'none',
              marginTop: '-1px',
              fontSize: '12px'
            }}
          >
            <User size={12} /> TAGGED
          </button>
        </div>
        
        {/* Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '4px',
          marginTop: '20px'
        }}>
          {activeTab === 'posts' && posts.map((post) => (
            <div key={post.id} style={{
              position: 'relative',
              cursor: 'pointer',
              aspectRatio: '1/1',
              backgroundColor: '#efefef',
              overflow: 'hidden'
            }}>
              <img
                src={post.image}
                alt="Post"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px',
                opacity: 0,
                transition: 'opacity 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
                  <Heart 
                    size={22} 
                    fill={post.isLiked ? '#ed4956' : 'none'} 
                    color={post.isLiked ? '#ed4956' : 'white'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{post.likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
                  <MessageCircle size={22} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
          
          {activeTab === 'saved' && savedPosts.map((post) => (
            <div key={post.id} style={{
              position: 'relative',
              cursor: 'pointer',
              aspectRatio: '1/1',
              backgroundColor: '#efefef',
              overflow: 'hidden'
            }}>
              <img
                src={post.image}
                alt="Saved"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(0,0,0,0.6)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px'
              }}>
                <Bookmark size={14} fill="white" />
              </div>
            </div>
          ))}
          
          {activeTab === 'tagged' && (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px',
              color: '#8e8e8e'
            }}>
              <User size={48} color="#dbdbdb" />
              <h3>No tagged posts</h3>
              <p>When people tag you in photos, they'll appear here.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <EditProfileModal />
      <ArchiveModal />
      <NewHighlightModal />
      <StatModal />
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 735px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
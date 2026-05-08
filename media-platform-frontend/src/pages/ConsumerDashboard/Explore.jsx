import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { Search, Heart, MessageCircle, X, TrendingUp, Clock, Flame } from 'lucide-react';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('forYou');

  // Categories
  const categories = [
    { id: 'forYou', name: 'For You', icon: '🔥' },
    { id: 'trending', name: 'Trending', icon: '📈' },
    { id: 'recent', name: 'Recent', icon: '🕐' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'food', name: 'Food', icon: '🍜' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'music', name: 'Music', icon: '🎵' },
  ];

  // Explore Posts Data
  const explorePosts = [
    {
      id: 1,
      image: 'https://picsum.photos/400/400?random=101',
      username: 'traveler_123',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      likes: 12400,
      comments: 234,
      location: 'Maldives',
      category: 'travel',
      views: '124K'
    },
    {
      id: 2,
      image: 'https://picsum.photos/400/400?random=102',
      username: 'foodie_adventures',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      likes: 8900,
      comments: 156,
      location: 'Tokyo, Japan',
      category: 'food',
      views: '89K'
    },
    {
      id: 3,
      image: 'https://picsum.photos/400/400?random=103',
      username: 'art_gallery',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      likes: 45600,
      comments: 789,
      location: 'Paris, France',
      category: 'art',
      views: '456K'
    },
    {
      id: 4,
      image: 'https://picsum.photos/400/400?random=104',
      username: 'fashion_icon',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      likes: 23400,
      comments: 345,
      location: 'Milan, Italy',
      category: 'fashion',
      views: '234K'
    },
    {
      id: 5,
      image: 'https://picsum.photos/400/400?random=105',
      username: 'music_daily',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      likes: 67800,
      comments: 1234,
      location: 'Los Angeles, USA',
      category: 'music',
      views: '678K'
    },
    {
      id: 6,
      image: 'https://picsum.photos/400/400?random=106',
      username: 'mountain_hiker',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      likes: 34500,
      comments: 567,
      location: 'Swiss Alps',
      category: 'travel',
      views: '345K'
    },
    {
      id: 7,
      image: 'https://picsum.photos/400/400?random=107',
      username: 'street_food_lover',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      likes: 12300,
      comments: 234,
      location: 'Bangkok, Thailand',
      category: 'food',
      views: '123K'
    },
    {
      id: 8,
      image: 'https://picsum.photos/400/400?random=108',
      username: 'digital_artist',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      likes: 56700,
      comments: 890,
      location: 'Berlin, Germany',
      category: 'art',
      views: '567K'
    },
    {
      id: 9,
      image: 'https://picsum.photos/400/400?random=109',
      username: 'street_style',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      likes: 23400,
      comments: 345,
      location: 'London, UK',
      category: 'fashion',
      views: '234K'
    },
    {
      id: 10,
      image: 'https://picsum.photos/400/400?random=110',
      username: 'rock_band',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      likes: 78900,
      comments: 1234,
      location: 'New York, USA',
      category: 'music',
      views: '789K'
    },
    {
      id: 11,
      image: 'https://picsum.photos/400/400?random=111',
      username: 'beach_lover',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
      likes: 45600,
      comments: 678,
      location: 'Bali, Indonesia',
      category: 'travel',
      views: '456K'
    },
    {
      id: 12,
      image: 'https://picsum.photos/400/400?random=112',
      username: 'sushi_master',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      likes: 23400,
      comments: 345,
      location: 'Osaka, Japan',
      category: 'food',
      views: '234K'
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(explorePosts);
      setFilteredPosts(explorePosts);
      setLoading(false);
    }, 500);
  }, []);

  // Filter by category and search
  useEffect(() => {
    let filtered = [...posts];
    
    // Filter by category
    if (activeCategory !== 'forYou' && activeCategory !== 'trending' && activeCategory !== 'recent') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(post =>
        post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort based on category
    if (activeCategory === 'trending') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeCategory === 'recent') {
      filtered.sort((a, b) => b.id - a.id);
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchTerm, posts]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Featured Stories
  const featuredStories = [
    { id: 1, username: 'travel_guide', image: 'https://picsum.photos/200/200?random=200', title: 'Top 10 Destinations' },
    { id: 2, username: 'food_network', image: 'https://picsum.photos/200/200?random=201', title: 'Street Food Guide' },
    { id: 3, username: 'art_hub', image: 'https://picsum.photos/200/200?random=202', title: 'Digital Art Trends' },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        <Header />
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading explore...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {/* Search Bar */}
        <div style={{
          background: 'white',
          border: '1px solid #dbdbdb',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={20} color="#8e8e8e" />
          <input
            type="text"
            placeholder="Search by username or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              background: 'transparent'
            }}
          />
          {searchTerm && (
            <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={16} color="#8e8e8e" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '8px 16px',
                background: activeCategory === cat.id ? '#0095f6' : 'white',
                color: activeCategory === cat.id ? 'white' : '#262626',
                border: activeCategory === cat.id ? 'none' : '1px solid #dbdbdb',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div style={{
            marginBottom: '20px',
            padding: '12px',
            background: '#efefef',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#8e8e8e'
          }}>
            Found {filteredPosts.length} results for "{searchTerm}"
          </div>
        )}

        {/* Featured Stories Section */}
        {!searchTerm && activeCategory === 'forYou' && (
          <div style={{
            background: 'white',
            border: '1px solid #dbdbdb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Featured Stories</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {featuredStories.map((story) => (
                <div key={story.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '12px',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}>
                  <img src={story.image} alt={story.username} style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }} />
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>{story.username}</p>
                    <p style={{ fontSize: '12px', color: '#8e8e8e', margin: 0 }}>{story.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        {!searchTerm && activeCategory === 'trending' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #dbdbdb' }}>
              <TrendingUp size={32} color="#ed4956" />
              <h3 style={{ margin: '8px 0 0' }}>1.2M</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#8e8e8e' }}>Total Views Today</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #dbdbdb' }}>
              <Heart size={32} color="#ed4956" />
              <h3 style={{ margin: '8px 0 0' }}>89.4K</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#8e8e8e' }}>Total Likes Today</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #dbdbdb' }}>
              <Clock size={32} color="#0095f6" />
              <h3 style={{ margin: '8px 0 0' }}>2.3K</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#8e8e8e' }}>Posts Today</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #dbdbdb'
          }}>
            <Search size={48} color="#dbdbdb" />
            <h3 style={{ marginTop: '16px' }}>No posts found</h3>
            <p style={{ color: '#8e8e8e' }}>Try searching for something else</p>
          </div>
        )}

        {/* Explore Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px'
        }}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                position: 'relative',
                cursor: 'pointer',
                aspectRatio: '1/1',
                backgroundColor: '#efefef',
                overflow: 'hidden'
              }}
            >
              <img
                src={post.image}
                alt={post.username}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              
              {/* Overlay on Hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                opacity: 0,
                transition: 'opacity 0.3s',
                color: 'white'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                
                {/* Stats */}
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Heart size={20} fill="white" />
                    <span style={{ fontWeight: 600 }}>{post.likes.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={20} />
                    <span style={{ fontWeight: 600 }}>{post.comments}</span>
                  </div>
                </div>
                
                {/* Username */}
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>@{post.username}</p>
                  <p style={{ fontSize: '12px', margin: '4px 0 0' }}>{post.location}</p>
                </div>
                
                {/* Views */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  👁️ {post.views} views
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import { TrendingUp, Eye, Heart, MessageCircle, UserPlus, Share2, Clock, Calendar, ChevronRight, Download } from 'lucide-react';

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    newFollowers: 0,
    engagementRate: 0,
    postsCount: 0
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock analytics data
  const mockAnalytics = {
    totalViews: 45678,
    totalLikes: 3245,
    totalComments: 567,
    totalShares: 234,
    newFollowers: 123,
    engagementRate: 4.8,
    postsCount: 12
  };

  const mockPosts = [
    { id: 1, title: 'Amazing Sunset', thumbnail: 'https://picsum.photos/80/80?random=1', views: 12400, likes: 2345, comments: 456, shares: 89, date: '2 days ago' },
    { id: 2, title: 'Mountain Adventure', thumbnail: 'https://picsum.photos/80/80?random=2', views: 8900, likes: 1234, comments: 234, shares: 56, date: '5 days ago' },
    { id: 3, title: 'City Lights', thumbnail: 'https://picsum.photos/80/80?random=3', views: 45600, likes: 5678, comments: 789, shares: 123, date: '1 week ago' },
    { id: 4, title: 'Food Paradise', thumbnail: 'https://picsum.photos/80/80?random=4', views: 23400, likes: 3456, comments: 456, shares: 78, date: '2 weeks ago' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, []);

  const statsCards = [
    { icon: Eye, label: 'Total Views', value: analytics.totalViews.toLocaleString(), color: '#0095f6', bg: '#e0f2fe' },
    { icon: Heart, label: 'Total Likes', value: analytics.totalLikes.toLocaleString(), color: '#ed4956', bg: '#fee2e2' },
    { icon: MessageCircle, label: 'Comments', value: analytics.totalComments.toLocaleString(), color: '#10b981', bg: '#d1fae5' },
    { icon: Share2, label: 'Shares', value: analytics.totalShares.toLocaleString(), color: '#f59e0b', bg: '#fed7aa' },
    { icon: UserPlus, label: 'New Followers', value: analytics.newFollowers.toLocaleString(), color: '#8b5cf6', bg: '#ede9fe' },
    { icon: TrendingUp, label: 'Engagement', value: `${analytics.engagementRate}%`, color: '#06b6d4', bg: '#cffafe' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '600' }}>Analytics</h1>
            <p style={{ margin: '4px 0 0', color: '#8e8e8e' }}>Track your content performance</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Time Range Selector */}
            <div style={{ display: 'flex', background: 'white', borderRadius: '8px', border: '1px solid #dbdbdb', overflow: 'hidden' }}>
              {['day', 'week', 'month'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  style={{
                    padding: '8px 20px',
                    background: timeRange === range ? '#0095f6' : 'white',
                    color: timeRange === range ? 'white' : '#262626',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {range === 'day' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
            
            {/* Export Button */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '30px'
        }}>
          {statsCards.map((stat, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #dbdbdb',
              transition: 'transform 0.2s'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <stat.icon size={22} color={stat.color} />
                </div>
                <ChevronRight size={18} color="#dbdbdb" />
              </div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>{stat.value}</h3>
              <p style={{ margin: '4px 0 0', color: '#8e8e8e', fontSize: '13px' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #dbdbdb',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Performance Overview</h3>
            <select style={{
              padding: '8px 12px',
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              background: 'white'
            }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          {/* Simple Chart Visualization */}
          <div style={{ height: '200px', position: 'relative', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '100%' }}>
              {[65, 45, 78, 55, 82, 70, 90].map((height, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: `${height}%`,
                    background: `linear-gradient(to top, #0095f6, ${height > 70 ? '#ed4956' : '#f59e0b'})`,
                    borderRadius: '6px',
                    transition: 'height 0.3s',
                    marginBottom: '8px'
                  }}></div>
                  <span style={{ fontSize: '11px', color: '#8e8e8e' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Posts Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #dbdbdb',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #dbdbdb' }}>
            <h3 style={{ margin: 0 }}>Top Performing Posts</h3>
          </div>
          
          <div>
            {posts.map((post, index) => (
              <div key={post.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: index !== posts.length - 1 ? '1px solid #efefef' : 'none'
              }}>
                {/* Rank */}
                <div style={{
                  width: '40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: index === 0 ? '#f59e0b' : index === 1 ? '#9ca3af' : index === 2 ? '#cd7f32' : '#8e8e8e'
                }}>
                  #{index + 1}
                </div>
                
                {/* Thumbnail */}
                <img src={post.thumbnail} alt={post.title} style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginRight: '16px'
                }} />
                
                {/* Details */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '14px' }}>{post.title}</h4>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#8e8e8e' }}>📊 {post.views.toLocaleString()} views</span>
                    <span style={{ fontSize: '12px', color: '#8e8e8e' }}>❤️ {post.likes.toLocaleString()}</span>
                    <span style={{ fontSize: '12px', color: '#8e8e8e' }}>💬 {post.comments}</span>
                  </div>
                </div>
                
                {/* Date */}
                <div style={{ fontSize: '12px', color: '#8e8e8e' }}>
                  <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {post.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Audience Insight */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #dbdbdb', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Audience Demographics</h3>
            <div>
              {[
                { label: '18-24', percent: 25, color: '#0095f6' },
                { label: '25-34', percent: 45, color: '#ed4956' },
                { label: '35-44', percent: 20, color: '#f59e0b' },
                { label: '45+', percent: 10, color: '#10b981' }
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px' }}>{item.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.percent}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#efefef', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '3px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #dbdbdb', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Top Locations</h3>
            {[
              { country: 'United States', percent: 35 },
              { country: 'India', percent: 25 },
              { country: 'United Kingdom', percent: 15 },
              { country: 'Canada', percent: 10 }
            ].map((item) => (
              <div key={item.country} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px' }}>{item.country}</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.percent}%</span>
                </div>
                <div style={{ height: '6px', background: '#efefef', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: '#8b5cf6', borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
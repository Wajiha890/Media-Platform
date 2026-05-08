import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Analytics from './Analytics';
import { videoService } from '../../api/videoService';
import { Film, Image, Users, TrendingUp, MapPin, User, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CreatorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [people, setPeople] = useState('');

  // Load videos on mount
  React.useEffect(() => {
    if (user?.id) {
      loadUserVideos();
    }
  }, [user]);

  const loadUserVideos = async () => {
    setLoading(true);
    try {
      const response = await videoService.getCreatorVideos(user.id);
      setUploadedVideos(response.videos || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Film, label: 'Total Videos', value: uploadedVideos.length, color: '#0095f6' },
    { icon: Users, label: 'Followers', value: '1,234', color: '#10b981' },
    { icon: TrendingUp, label: 'Total Views', value: uploadedVideos.reduce((sum, v) => sum + (v.views || 0), 0).toLocaleString(), color: '#ed4956' },
    { icon: Image, label: 'Posts', value: uploadedVideos.length, color: '#f59e0b' }
  ];

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const clearForm = () => {
    setVideoFile(null);
    setVideoPreview('');
    setTitle('');
    setCaption('');
    setLocation('');
    setPeople('');
  };

  const handleUpload = async () => {
    if (!videoFile) {
      toast.error('Please select a video first');
      return;
    }
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('people', JSON.stringify(people.split(',').map(p => p.trim()).filter(p => p)));

    try {
      const response = await videoService.uploadVideo(formData);
      toast.success('Video uploaded successfully!');
      clearForm();
      await loadUserVideos();
      setActiveTab('my-posts');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #dbdbdb', textAlign: 'center' }}>
              <stat.icon size={32} color={stat.color} style={{ marginBottom: '12px' }} />
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>{stat.value}</h3>
              <p style={{ margin: '8px 0 0', color: '#8e8e8e', fontSize: '14px' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #dbdbdb', marginBottom: '24px', background: 'white', padding: '0 20px', borderRadius: '12px 12px 0 0' }}>
          <button onClick={() => setActiveTab('upload')} style={{ padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === 'upload' ? '600' : '400', color: activeTab === 'upload' ? '#0095f6' : '#8e8e8e', borderBottom: activeTab === 'upload' ? '2px solid #0095f6' : 'none' }}>📤 Upload Video</button>
          <button onClick={() => setActiveTab('my-posts')} style={{ padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === 'my-posts' ? '600' : '400', color: activeTab === 'my-posts' ? '#0095f6' : '#8e8e8e', borderBottom: activeTab === 'my-posts' ? '2px solid #0095f6' : 'none' }}>📷 My Posts</button>
          <button onClick={() => setActiveTab('analytics')} style={{ padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === 'analytics' ? '600' : '400', color: activeTab === 'analytics' ? '#0095f6' : '#8e8e8e', borderBottom: activeTab === 'analytics' ? '2px solid #0095f6' : 'none' }}>📊 Analytics</button>
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #dbdbdb', padding: '30px' }}>
          
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Upload New Video</h2>
              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ border: '2px dashed #dbdbdb', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fafafa', marginBottom: '20px' }} onClick={() => document.getElementById('videoInput').click()}>
                    <Upload size={48} color="#8e8e8e" />
                    <p style={{ marginTop: '12px', color: '#8e8e8e' }}>Click to browse or drag & drop</p>
                    <input id="videoInput" type="file" accept="video/*" onChange={handleVideoChange} style={{ display: 'none' }} />
                  </div>
                  {videoPreview && <video controls style={{ width: '100%', maxHeight: '300px', borderRadius: '12px', backgroundColor: '#000' }}><source src={videoPreview} type={videoFile?.type} /></video>}
                </div>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Title <span style={{ color: '#ed4956' }}>*</span></label>
                    <input type="text" placeholder="Enter video title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #dbdbdb', borderRadius: '8px' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Caption</label>
                    <textarea placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} rows="3" style={{ width: '100%', padding: '12px', border: '1px solid #dbdbdb', borderRadius: '8px', resize: 'vertical' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Location</label>
                    <input type="text" placeholder="Add location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #dbdbdb', borderRadius: '8px' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}><User size={14} style={{ display: 'inline', marginRight: '4px' }} /> People</label>
                    <input type="text" placeholder="e.g., @john, @jane" value={people} onChange={(e) => setPeople(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #dbdbdb', borderRadius: '8px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={clearForm} style={{ flex: 1, padding: '12px', background: 'white', border: '1px solid #dbdbdb', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}><X size={18} /> Cancel</button>
                    <button onClick={handleUpload} disabled={uploading || !videoFile || !title.trim()} style={{ flex: 1, padding: '12px', background: (uploading || !videoFile || !title.trim()) ? '#b2dffc' : '#0095f6', color: 'white', border: 'none', borderRadius: '8px', cursor: (uploading || !videoFile || !title.trim()) ? 'not-allowed' : 'pointer', fontWeight: 600 }}><Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Video'}</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* My Posts Tab */}
          {activeTab === 'my-posts' && (
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>
              ) : uploadedVideos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <Film size={64} color="#dbdbdb" />
                  <h3 style={{ marginTop: '16px' }}>No posts yet</h3>
                  <p style={{ color: '#8e8e8e' }}>Upload your first video!</p>
                </div>
              ) : (
                uploadedVideos.map((video) => (
                  <div key={video._id} style={{ marginBottom: '30px', border: '1px solid #dbdbdb', borderRadius: '12px', overflow: 'hidden' }}>
                    <video controls style={{ width: '100%', maxHeight: '500px', background: '#000' }}>
                      <source src={video.videoUrl} type="video/mp4" />
                    </video>
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ margin: '0 0 8px 0' }}>{video.title}</h3>
                      <p style={{ color: '#8e8e8e', marginBottom: '8px' }}>{video.caption}</p>
                      {video.location && <p style={{ fontSize: '12px', color: '#8e8e8e' }}>📍 {video.location}</p>}
                      <p style={{ fontSize: '12px', color: '#8e8e8e' }}>❤️ {video.likes || 0} likes • 👁️ {video.views || 0} views</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
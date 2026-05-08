
import { apiClient } from './client';

export const videoService = {
  // Upload video
  uploadVideo: async (formData) => {
    const response = await apiClient.post('/videos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get all videos
  getAllVideos: async (page = 1, search = '') => {
    const response = await apiClient.get(`/videos?page=${page}&search=${search}`);
    return response.data;
  },

  // Get video by ID
  getVideoById: async (id) => {
    const response = await apiClient.get(`/videos/${id}`);
    return response.data;
  },

  // Get creator's videos
  getCreatorVideos: async (creatorId) => {
    const response = await apiClient.get(`/videos/creator/${creatorId}`);
    return response.data;
  },

  // Like video
  likeVideo: async (id) => {
    const response = await apiClient.post(`/videos/${id}/like`);
    return response.data;
  },

  // Add comment
  addComment: async (videoId, text) => {
    const response = await apiClient.post('/comments', { videoId, text });
    return response.data;
  },

  // Get comments
  getComments: async (videoId) => {
    const response = await apiClient.get(`/comments/video/${videoId}`);
    return response.data;
  },

  // Rate video
  rateVideo: async (videoId, value) => {
    const response = await apiClient.post('/ratings', { videoId, value });
    return response.data;
  },
};
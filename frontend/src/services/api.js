import apiClient from './apiClient.js';

export const authService = {
  register: (email, password, name) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

export const trendService = {
  getTrends: () => apiClient.get('/trends'),
  getTrendById: (id) => apiClient.get(`/trends/${id}`),
  analyzeTrend: (topic) => apiClient.post('/trends/analyze', { topic }),
};

export const scriptService = {
  getScripts: () => apiClient.get('/scripts'),
  generateScript: (topic, duration, style) =>
    apiClient.post('/scripts/generate', { topic, duration, style }),
};

export const videoService = {
  getVideos: () => apiClient.get('/videos'),
  createVideo: (scriptId, assets) =>
    apiClient.post('/videos/create', { scriptId, assets }),
};

export const projectService = {
  getProjects: () => apiClient.get('/projects'),
  createProject: (name, description) =>
    apiClient.post('/projects', { name, description }),
};

export const analyticsService = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
};

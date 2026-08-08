import axios from 'axios';
import { logger } from '../config/logger.js';

class YouTubeService {
  constructor() {
    this.clientId = process.env.YOUTUBE_CLIENT_ID;
    this.clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
    this.redirectUrl = process.env.YOUTUBE_REDIRECT_URL;
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
    ];

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      response_type: 'code',
      scope: scopes.join(' '),
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      logger.info('[YouTubeService] Exchanging authorization code for token');

      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUrl,
      });

      return response.data;
    } catch (error) {
      logger.error('[YouTubeService] Error exchanging code:', error);
      throw error;
    }
  }

  async uploadVideo(accessToken, videoFile, metadata) {
    try {
      logger.info('[YouTubeService] Uploading video to YouTube');

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `${this.baseUrl}/videos?part=snippet,status,processingDetails`,
        {
          snippet: {
            title: metadata.title,
            description: metadata.description,
            tags: metadata.hashtags,
            categoryId: '24',
            defaultLanguage: 'en',
          },
          status: {
            privacyStatus: metadata.privacyStatus || 'private',
          },
          processingDetails: {
            processingStatus: 'processing',
          },
        },
        { headers }
      );

      logger.info(`[YouTubeService] Video uploaded successfully: ${response.data.id}`);
      return response.data;
    } catch (error) {
      logger.error('[YouTubeService] Error uploading video:', error);
      throw error;
    }
  }

  async publishVideo(accessToken, videoId, privacyStatus = 'public') {
    try {
      logger.info(`[YouTubeService] Publishing video: ${videoId}`);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.put(
        `${this.baseUrl}/videos?part=status`,
        {
          id: videoId,
          status: {
            privacyStatus,
          },
        },
        { headers }
      );

      return response.data;
    } catch (error) {
      logger.error('[YouTubeService] Error publishing video:', error);
      throw error;
    }
  }

  async getVideoStats(accessToken, videoId) {
    try {
      logger.info(`[YouTubeService] Fetching stats for video: ${videoId}`);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(
        `${this.baseUrl}/videos?part=statistics,snippet&id=${videoId}`,
        { headers }
      );

      return response.data.items?.[0] || null;
    } catch (error) {
      logger.error('[YouTubeService] Error fetching video stats:', error);
      throw error;
    }
  }

  async createPlaylist(accessToken, title, description) {
    try {
      logger.info('[YouTubeService] Creating playlist');

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `${this.baseUrl}/playlists?part=snippet,status`,
        {
          snippet: {
            title,
            description,
          },
          status: {
            privacyStatus: 'private',
          },
        },
        { headers }
      );

      return response.data;
    } catch (error) {
      logger.error('[YouTubeService] Error creating playlist:', error);
      throw error;
    }
  }
}

export default YouTubeService;

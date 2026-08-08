import axios from 'axios';
import { logger } from '../config/logger.js';

class InstagramService {
  constructor() {
    this.appId = process.env.INSTAGRAM_APP_ID;
    this.appSecret = process.env.INSTAGRAM_APP_SECRET;
    this.redirectUrl = process.env.INSTAGRAM_REDIRECT_URL;
    this.apiVersion = process.env.INSTAGRAM_API_VERSION || 'v18.0';
    this.baseUrl = `https://graph.instagram.com/${this.apiVersion}`;
  }

  getAuthUrl() {
    const scopes = [
      'user_profile',
      'user_media',
      'instagram_basic',
      'instagram_graph_user_media',
      'pages_read_engagement',
    ];

    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: this.redirectUrl,
      scope: scopes.join(','),
      response_type: 'code',
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      logger.info('[InstagramService] Exchanging authorization code for token');

      const response = await axios.post(`${this.baseUrl}/access_token`, {
        client_id: this.appId,
        client_secret: this.appSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUrl,
        code,
      });

      return response.data;
    } catch (error) {
      logger.error('[InstagramService] Error exchanging code:', error);
      throw error;
    }
  }

  async uploadReelContainer(accessToken, videoUrl, metadata) {
    try {
      logger.info('[InstagramService] Creating reel container');

      const response = await axios.post(
        `${this.baseUrl}/me/media`,
        {
          media_type: 'REELS',
          video_url: videoUrl,
          caption: metadata.caption || metadata.description,
          thumb_offset: 0,
        },
        {
          params: { access_token: accessToken },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[InstagramService] Error uploading reel:', error);
      throw error;
    }
  }

  async publishReel(accessToken, containerId) {
    try {
      logger.info(`[InstagramService] Publishing reel: ${containerId}`);

      const response = await axios.post(
        `${this.baseUrl}/${containerId}/publish`,
        {},
        {
          params: { access_token: accessToken },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[InstagramService] Error publishing reel:', error);
      throw error;
    }
  }

  async getMediaInsights(accessToken, mediaId) {
    try {
      logger.info(`[InstagramService] Fetching insights for media: ${mediaId}`);

      const response = await axios.get(
        `${this.baseUrl}/${mediaId}/insights`,
        {
          params: {
            metric: 'engagement,impressions,reach,saved',
            access_token: accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[InstagramService] Error fetching insights:', error);
      throw error;
    }
  }

  async getUserProfile(accessToken) {
    try {
      logger.info('[InstagramService] Fetching user profile');

      const response = await axios.get(
        `${this.baseUrl}/me`,
        {
          params: {
            fields: 'id,username,name,biography,website,profile_picture_url',
            access_token: accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[InstagramService] Error fetching profile:', error);
      throw error;
    }
  }
}

export default InstagramService;

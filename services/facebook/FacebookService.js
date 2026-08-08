import axios from 'axios';
import { logger } from '../config/logger.js';

class FacebookService {
  constructor() {
    this.appId = process.env.FACEBOOK_APP_ID;
    this.appSecret = process.env.FACEBOOK_APP_SECRET;
    this.redirectUrl = process.env.FACEBOOK_REDIRECT_URL;
    this.apiVersion = process.env.FACEBOOK_API_VERSION || 'v18.0';
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  getAuthUrl() {
    const scopes = [
      'pages_read_engagement',
      'pages_read_user_content',
      'pages_manage_posts',
      'pages_manage_metadata',
      'video_upload',
    ];

    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: this.redirectUrl,
      scope: scopes.join(','),
      response_type: 'code',
    });

    return `https://www.facebook.com/${this.apiVersion}/dialog/oauth?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      logger.info('[FacebookService] Exchanging authorization code for token');

      const response = await axios.get(`${this.baseUrl}/oauth/access_token`, {
        params: {
          client_id: this.appId,
          client_secret: this.appSecret,
          redirect_uri: this.redirectUrl,
          code,
        },
      });

      return response.data;
    } catch (error) {
      logger.error('[FacebookService] Error exchanging code:', error);
      throw error;
    }
  }

  async uploadVideo(accessToken, pageId, videoFile, metadata) {
    try {
      logger.info(`[FacebookService] Uploading video to page: ${pageId}`);

      const formData = new FormData();
      formData.append('source', videoFile);
      formData.append('title', metadata.title);
      formData.append('description', metadata.description);
      formData.append('access_token', accessToken);

      const response = await axios.post(
        `${this.baseUrl}/${pageId}/videos`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[FacebookService] Error uploading video:', error);
      throw error;
    }
  }

  async publishPost(accessToken, pageId, metadata) {
    try {
      logger.info(`[FacebookService] Publishing post to page: ${pageId}`);

      const response = await axios.post(
        `${this.baseUrl}/${pageId}/feed`,
        {
          message: metadata.caption || metadata.description,
          link: metadata.videoUrl,
          access_token: accessToken,
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[FacebookService] Error publishing post:', error);
      throw error;
    }
  }

  async getPageInsights(accessToken, pageId) {
    try {
      logger.info(`[FacebookService] Fetching insights for page: ${pageId}`);

      const response = await axios.get(
        `${this.baseUrl}/${pageId}/insights`,
        {
          params: {
            metric: 'page_fans,page_engaged_users,page_video_views',
            access_token: accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[FacebookService] Error fetching insights:', error);
      throw error;
    }
  }

  async getPageInfo(accessToken, pageId) {
    try {
      logger.info(`[FacebookService] Fetching page info: ${pageId}`);

      const response = await axios.get(
        `${this.baseUrl}/${pageId}`,
        {
          params: {
            fields: 'id,name,about,picture,fan_count,access_token',
            access_token: accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('[FacebookService] Error fetching page info:', error);
      throw error;
    }
  }
}

export default FacebookService;

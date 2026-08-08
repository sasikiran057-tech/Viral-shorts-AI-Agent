import { logger } from '../config/logger.js';
import { Configuration, OpenAIApi } from 'openai';

class ScriptWriterAgent {
  constructor() {
    this.name = 'ScriptWriterAgent';
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateScript(topic, duration = 30, style = 'engaging') {
    try {
      logger.info(`[${this.name}] Generating script for: ${topic} (${duration}s)`);

      const prompt = `Write a ${duration}-second short video script about "${topic}" in a ${style} style. Include:
      - Hook (first 3 seconds)
      - Main content
      - Call to action
      - Suggested captions
      - Hashtags`;

      const script = {
        id: Math.random().toString(36).substr(2, 9),
        topic,
        duration,
        style,
        content: 'Generated script content',
        hook: 'Engaging hook for first 3 seconds',
        mainContent: 'Main content of the video',
        callToAction: 'Subscribe and like for more content',
        suggestedCaptions: ['#viral', '#shorts', '#trending'],
        scenes: [
          {
            time: '0-3s',
            description: 'Hook scene',
            voiceOver: 'Hook text',
          },
          {
            time: '3-27s',
            description: 'Main content',
            voiceOver: 'Main content voiceover',
          },
          {
            time: '27-30s',
            description: 'CTA scene',
            voiceOver: 'Call to action text',
          },
        ],
      };

      logger.info(`[${this.name}] Script generated with ${script.scenes.length} scenes`);
      return script;
    } catch (error) {
      logger.error(`[${this.name}] Error generating script:`, error);
      throw error;
    }
  }

  async optimizeForPlatform(script, platform) {
    try {
      logger.info(`[${this.name}] Optimizing script for ${platform}`);

      const platformConfigs = {
        youtube: { maxDuration: 60, aspectRatio: '9:16' },
        instagram: { maxDuration: 60, aspectRatio: '9:16' },
        facebook: { maxDuration: 120, aspectRatio: '9:16' },
      };

      const config = platformConfigs[platform] || platformConfigs.youtube;
      return { ...script, platform, ...config };
    } catch (error) {
      logger.error(`[${this.name}] Error optimizing script:`, error);
      throw error;
    }
  }
}

export default ScriptWriterAgent;

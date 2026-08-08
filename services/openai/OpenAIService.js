import { logger } from '../config/logger.js';

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
    this.maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS) || 2000;
    this.temperature = parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7;
  }

  async generateContent(prompt, options = {}) {
    try {
      logger.info('[OpenAIService] Generating content with GPT-4');

      const response = {
        id: `chatcmpl-${Math.random().toString(36).substr(2, 9)}`,
        object: 'text_completion',
        created: Math.floor(Date.now() / 1000),
        model: this.model,
        choices: [
          {
            text: 'Generated content based on prompt',
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: prompt.split(' ').length,
          completion_tokens: 100,
          total_tokens: prompt.split(' ').length + 100,
        },
      };

      return response;
    } catch (error) {
      logger.error('[OpenAIService] Error generating content:', error);
      throw error;
    }
  }

  async generateScriptFromTopic(topic, duration = 30) {
    try {
      logger.info(`[OpenAIService] Generating script for topic: ${topic}`);

      const prompt = `Write a viral ${duration}-second short video script for the topic "${topic}". 
      Include: hook, main content, call-to-action, and hashtags.`;

      const response = await this.generateContent(prompt);
      return response;
    } catch (error) {
      logger.error('[OpenAIService] Error generating script:', error);
      throw error;
    }
  }

  async generateTitles(topic, count = 5) {
    try {
      logger.info(`[OpenAIService] Generating ${count} titles for: ${topic}`);

      const titles = [
        `${topic} - This Will Blow Your Mind 🤯`,
        `You Won't Believe What Happens - ${topic}`,
        `${topic}: The Ultimate Guide`,
        `${topic} Revealed: Everyone is Talking`,
        `Why ${topic} is Trending Now 🚀`,
      ];

      return titles.slice(0, count);
    } catch (error) {
      logger.error('[OpenAIService] Error generating titles:', error);
      throw error;
    }
  }

  async generateDescriptions(topic, count = 3) {
    try {
      logger.info(`[OpenAIService] Generating ${count} descriptions for: ${topic}`);

      const descriptions = [
        `Discover the latest viral trends about ${topic}. Subscribe for more! 🚀`,
        `${topic} explained in 60 seconds. Like and share if you learned something new! 💡`,
        `Mind-blowing facts about ${topic} that everyone needs to know! 🔥`,
      ];

      return descriptions.slice(0, count);
    } catch (error) {
      logger.error('[OpenAIService] Error generating descriptions:', error);
      throw error;
    }
  }

  async generateHashtags(topic, count = 15) {
    try {
      logger.info(`[OpenAIService] Generating ${count} hashtags for: ${topic}`);

      const hashtags = [
        `#${topic.replace(/\s+/g, '')}`,
        '#viral',
        '#trending',
        '#shorts',
        '#viralshorts',
        '#fyp',
        '#foryoupage',
        '#explore',
        '#tiktok',
        '#instagram',
        '#reels',
        '#youtube',
        '#content',
        '#creator',
        '#entertainment',
      ];

      return hashtags.slice(0, count);
    } catch (error) {
      logger.error('[OpenAIService] Error generating hashtags:', error);
      throw error;
    }
  }
}

export default OpenAIService;

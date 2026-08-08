import { logger } from '../config/logger.js';

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVEN_LABS_API_KEY;
    this.voiceId = process.env.ELEVEN_LABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
    this.modelId = process.env.ELEVEN_LABS_MODEL_ID || 'eleven_monolingual_v1';
    this.baseUrl = 'https://api.elevenlabs.io/v1';
  }

  async generateVoiceover(text, voice = this.voiceId, options = {}) {
    try {
      logger.info(`[ElevenLabsService] Generating voiceover (${voice})`);

      const voiceover = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        voice_id: voice,
        model_id: this.modelId,
        url: `https://example.com/voiceover-${Math.random().toString(36).substr(2, 9)}.mp3`,
        duration: (text.split(' ').length * 0.5).toFixed(2),
        format: 'mp3',
        bitrate: '128k',
        created_at: new Date().toISOString(),
      };

      logger.info(`[ElevenLabsService] Voiceover generated (${voiceover.duration}s)`);
      return voiceover;
    } catch (error) {
      logger.error('[ElevenLabsService] Error generating voiceover:', error);
      throw error;
    }
  }

  async getAvailableVoices() {
    try {
      logger.info('[ElevenLabsService] Fetching available voices');

      const voices = [
        {
          voice_id: '21m00Tcm4TlvDq8ikWAM',
          name: 'Rachel',
          category: 'premade',
          language: 'en',
        },
        {
          voice_id: 'EXAVITQu4vr4xnSDxMaL',
          name: 'Sam',
          category: 'premade',
          language: 'en',
        },
        {
          voice_id: 'TxGEqnHWrfWFTfGW9XjX',
          name: 'Bella',
          category: 'premade',
          language: 'en',
        },
      ];

      return voices;
    } catch (error) {
      logger.error('[ElevenLabsService] Error fetching voices:', error);
      throw error;
    }
  }

  async synthesizeSpeech(text, voiceId) {
    try {
      logger.info(`[ElevenLabsService] Synthesizing speech with voice: ${voiceId}`);

      return {
        audio_url: `https://example.com/synthesis-${Math.random().toString(36).substr(2, 9)}.mp3`,
        duration: (text.split(' ').length * 0.5).toFixed(2),
        format: 'mp3',
      };
    } catch (error) {
      logger.error('[ElevenLabsService] Error synthesizing speech:', error);
      throw error;
    }
  }
}

export default ElevenLabsService;

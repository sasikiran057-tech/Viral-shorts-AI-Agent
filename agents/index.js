import TrendResearchAgent from './TrendResearchAgent.js';
import TrendAnalyzerAgent from './TrendAnalyzerAgent.js';
import ScriptWriterAgent from './ScriptWriterAgent.js';
import VideoPlannerAgent from './VideoPlannerAgent.js';
import AssetGeneratorAgent from './AssetGeneratorAgent.js';
import VoiceoverAgent from './VoiceoverAgent.js';
import VideoEditorAgent from './VideoEditorAgent.js';
import SEOAgent from './SEOAgent.js';
import PublishingAgent from './PublishingAgent.js';
import AnalyticsAgent from './AnalyticsAgent.js';

export class AgentOrchestrator {
  constructor() {
    this.agents = {
      trendResearch: new TrendResearchAgent(),
      trendAnalyzer: new TrendAnalyzerAgent(),
      scriptWriter: new ScriptWriterAgent(),
      videoPlan: new VideoPlannerAgent(),
      assetGenerator: new AssetGeneratorAgent(),
      voiceover: new VoiceoverAgent(),
      videoEditor: new VideoEditorAgent(),
      seo: new SEOAgent(),
      publishing: new PublishingAgent(),
      analytics: new AnalyticsAgent(),
    };
  }

  async executeContentPipeline(topic, options = {}) {
    const {
      duration = 30,
      style = 'engaging',
      platforms = ['youtube', 'instagram', 'facebook'],
    } = options;

    try {
      console.log('=== Starting Content Pipeline ===' );

      const trends = await this.agents.trendResearch.discoverTrends(topic);
      const trend = trends[0];
      const viralScore = this.agents.trendAnalyzer.calculateViralScore(trend);

      console.log(`Viral Score: ${viralScore.viralScore}`);

      const script = await this.agents.scriptWriter.generateScript(topic, duration, style);

      const videoPlan = await this.agents.videoPlan.planVideoStructure(script);

      const voiceoverAudio = await this.agents.voiceover.generateVoiceover(
        script.callToAction
      );

      const metadata = this.agents.seo.optimizeMeta({ topic, id: Math.random() }, platforms[0]);

      return {
        success: true,
        data: {
          trend,
          viralScore,
          script,
          videoPlan,
          voiceover: voiceoverAudio,
          metadata,
        },
      };
    } catch (error) {
      console.error('Pipeline error:', error);
      return { success: false, error: error.message };
    }
  }
}

export {
  TrendResearchAgent,
  TrendAnalyzerAgent,
  ScriptWriterAgent,
  VideoPlannerAgent,
  AssetGeneratorAgent,
  VoiceoverAgent,
  VideoEditorAgent,
  SEOAgent,
  PublishingAgent,
  AnalyticsAgent,
};

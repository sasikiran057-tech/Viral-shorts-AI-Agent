# Usage Examples

## Basic Setup

```javascript
import { AgentOrchestrator } from './agents/index.js';

const orchestrator = new AgentOrchestrator();
```

## Example 1: Generate Complete Video

```javascript
// Generate a complete viral video from a topic
const result = await orchestrator.executeContentPipeline('AI Trends 2024', {
  duration: 30,
  style: 'engaging',
  platforms: ['youtube', 'instagram', 'facebook']
});

console.log('Video Generated!');
console.log('Viral Score:', result.data.viralScore.viralScore);
console.log('Script:', result.data.script.content);
```

## Example 2: Analyze Trends

```javascript
import TrendResearchAgent from './agents/TrendResearchAgent.js';

const trendAgent = new TrendResearchAgent();

// Find trending topics
const trends = await trendAgent.discoverTrends('machine learning', 10);

trends.forEach(trend => {
  console.log(`${trend.topic}: ${trend.views} views`);
});
```

## Example 3: Generate Scripts Only

```javascript
import ScriptWriterAgent from './agents/ScriptWriterAgent.js';

const scriptAgent = new ScriptWriterAgent();

// Generate script without full pipeline
const script = await scriptAgent.generateScript(
  'Viral TikTok Dance',
  15,  // 15 second video
  'fun'  // style
);

console.log('Hook:', script.hook);
console.log('Main Content:', script.mainContent);
console.log('CTA:', script.callToAction);
```

## Example 4: Publish to Multiple Platforms

```javascript
import PublishingAgent from './agents/PublishingAgent.js';
import YouTubeService from './services/youtube/YouTubeService.js';
import InstagramService from './services/instagram/InstagramService.js';

const publishAgent = new PublishingAgent();
const youtubeService = new YouTubeService();
const instagramService = new InstagramService();

const video = { id: 'video-123', title: 'Viral Video' };
const metadata = {
  title: 'Amazing AI Discovery!',
  description: 'Mind-blowing AI facts',
  hashtags: ['#viral', '#ai', '#trending']
};

// Publish to YouTube
const ytResult = await publishAgent.publishToYouTube(video, metadata);
console.log('YouTube URL:', ytResult.url);

// Publish to Instagram
const igResult = await publishAgent.publishToInstagram(video, metadata);
console.log('Instagram URL:', igResult.url);

// Schedule publish
const scheduledTime = new Date();
scheduledTime.setHours(scheduledTime.getHours() + 2);

await publishAgent.schedulePublish(
  video,
  ['youtube', 'instagram'],
  scheduledTime
);
```

## Example 5: Track Analytics

```javascript
import AnalyticsAgent from './agents/AnalyticsAgent.js';

const analyticsAgent = new AnalyticsAgent();

// Track performance
const performance = await analyticsAgent.trackVideoPerformance(
  'video-123',
  'youtube'
);

console.log('Views:', performance.views);
console.log('Engagement Rate:', performance.engagement + '%');

// Predict viral potential
const prediction = await analyticsAgent.predictViralPotential(video);
console.log('Viral Score:', prediction.viralScore);
console.log('Estimated Reach:', prediction.estimatedReach);
```

## Example 6: Generate Voiceover

```javascript
import VoiceoverAgent from './agents/VoiceoverAgent.js';

const voiceAgent = new VoiceoverAgent();

// Select voice
const voice = await voiceAgent.selectVoice('professional');

// Generate voiceover
const voiceover = await voiceAgent.generateVoiceover(
  'Welcome to our viral video channel!',
  voice.id
);

console.log('Voiceover Duration:', voiceover.duration + 's');
console.log('Download URL:', voiceover.url);

// Add audio effects
const withEffects = await voiceAgent.addAudioEffects(
  voiceover.id,
  ['reverb', 'normalize']
);
```

## Example 7: SEO Optimization

```javascript
import SEOAgent from './agents/SEOAgent.js';

const seoAgent = new SEOAgent();

const video = { id: 'video-123', topic: 'AI in Healthcare' };

// Generate multiple title options
const titles = await seoAgent.generateTitle(video.topic, 'youtube');
console.log('Suggested Titles:');
console.log(titles);

// Generate description
const description = seoAgent.generateDescription(video.topic, video.id);
console.log('Description:', description);

// Generate hashtags
const hashtags = seoAgent.generateHashtags(video.topic, 20);
console.log('Hashtags:', hashtags.join(' '));

// Optimize all metadata
const optimized = seoAgent.optimizeMeta(video, 'instagram');
console.log('Optimized Metadata:', optimized);
```

## Example 8: Video Planning and Storyboarding

```javascript
import VideoPlannerAgent from './agents/VideoPlannerAgent.js';

const plannerAgent = new VideoPlannerAgent();

const script = {
  id: 'script-123',
  topic: 'Web Development Tips',
  duration: 30,
  scenes: [
    { id: 1, time: '0-3s', description: 'Hook' },
    { id: 2, time: '3-25s', description: 'Main Content' },
    { id: 3, time: '25-30s', description: 'CTA' }
  ]
};

// Plan video structure
const videoPlan = await plannerAgent.planVideoStructure(script);
console.log('Scenes:', videoPlan.scenes.length);
console.log('Audio Tracks:', videoPlan.audioTracks);
console.log('Subtitles:', videoPlan.subtitles);

// Generate storyboard
const storyboard = await plannerAgent.generateStoryboard(videoPlan);
console.log('Frames:', storyboard.frames.length);
```

## Example 9: Asset Generation

```javascript
import AssetGeneratorAgent from './agents/AssetGeneratorAgent.js';

const assetAgent = new AssetGeneratorAgent();

const scene = {
  id: 'scene-1',
  description: 'Futuristic AI robot',
  time: '0-3s'
};

// Generate images for scene
const images = await assetAgent.generateImages(scene, 3);
console.log('Generated Images:', images.length);
images.forEach(img => console.log(img.url));

// Find stock media
const stockMedia = await assetAgent.findStockMedia([
  'technology',
  'innovation',
  'future'
]);
console.log('Stock Videos Found:', stockMedia.length);

// Generate transitions
const transitions = await assetAgent.generateTransitions(3);
console.log('Transitions:', transitions);
```

## Example 10: Complete REST API Usage

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN'
  }
});

// Register user
const registerResponse = await api.post('/auth/register', {
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe'
});

const token = registerResponse.data.token;

// Create project
const projectResponse = await api.post('/projects', {
  name: 'Viral Videos 2024',
  description: 'My viral video project'
});

const projectId = projectResponse.data.id;

// Get trends
const trendsResponse = await api.get('/trends?limit=10');
console.log('Trends:', trendsResponse.data.trends);

// Generate script
const scriptResponse = await api.post('/scripts/generate', {
  topic: trendsResponse.data.trends[0].topic,
  duration: 30,
  style: 'engaging'
});

const scriptId = scriptResponse.data.id;

// Create video
const videoResponse = await api.post('/videos/create', {
  scriptId,
  assets: []
});

const videoId = videoResponse.data.id;

// Publish video
const publishResponse = await api.post(`/videos/${videoId}/publish`, {
  platforms: ['youtube', 'instagram', 'facebook'],
  metadata: {
    title: scriptResponse.data.topic,
    description: 'Check out this viral video!',
    hashtags: ['#viral', '#trending']
  }
});

console.log('Published URLs:');
publishResponse.data.publishedVideos.forEach(pv => {
  console.log(`${pv.platform}: ${pv.url}`);
});

// Get analytics
const analyticsResponse = await api.get(`/analytics/videos/${videoId}`);
console.log('Analytics:', analyticsResponse.data);
```

## Example 11: Error Handling

```javascript
try {
  const result = await orchestrator.executeContentPipeline('Topic');
  
  if (!result.success) {
    console.error('Pipeline failed:', result.error);
    // Handle error
  } else {
    console.log('Success!', result.data);
  }
} catch (error) {
  console.error('Unexpected error:', error.message);
  
  // Specific error handling
  if (error.code === 'API_RATE_LIMIT') {
    console.log('Rate limited. Waiting...');
    await sleep(60000);
  } else if (error.code === 'INVALID_API_KEY') {
    console.log('Invalid API key. Update environment variables.');
  } else {
    console.log('General error:', error);
  }
}
```

## Example 12: Batch Processing

```javascript
import Queue from 'bull';

const videoQueue = new Queue('video-generation', {
  redis: { host: 'localhost', port: 6379 }
});

// Add multiple jobs to queue
const topics = [
  'AI Trends',
  'Web Development',
  'Machine Learning',
  'Cloud Computing'
];

for (const topic of topics) {
  await videoQueue.add(
    { topic, duration: 30, style: 'engaging' },
    { attempts: 3, backoff: 'exponential' }
  );
}

// Process queue
videoQueue.process(async (job) => {
  const { topic, duration, style } = job.data;
  
  job.progress(10);
  const result = await orchestrator.executeContentPipeline(
    topic,
    { duration, style }
  );
  
  job.progress(100);
  return result;
});

// Track completion
videoQueue.on('completed', (job) => {
  console.log(`Video for "${job.data.topic}" completed!`);
});

videoQueue.on('failed', (job, error) => {
  console.error(`Video for "${job.data.topic}" failed:`, error.message);
});
```

These examples demonstrate the main features of the Viral Shorts AI Agent system. Adapt them to your specific use case!

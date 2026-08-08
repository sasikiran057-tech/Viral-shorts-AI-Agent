# AI Agents Documentation

## Overview

The Viral Shorts AI Agent uses a modular architecture with specialized agents handling different aspects of content creation:

```
TrendResearchAgent → TrendAnalyzerAgent → ScriptWriterAgent → VideoPlannerAgent 
→ AssetGeneratorAgent → VoiceoverAgent → VideoEditorAgent → SEOAgent → PublishingAgent → AnalyticsAgent
```

## Individual Agents

### 1. TrendResearchAgent

Discoveries viral trends across multiple platforms.

**Key Methods:**
- `discoverTrends(query, limit)` - Find trending topics
- `analyzeKeywords(topic)` - Analyze keyword data

**Usage:**
```javascript
const agent = new TrendResearchAgent();
const trends = await agent.discoverTrends('AI');
```

### 2. TrendAnalyzerAgent

Analyzes viral potential and trend momentum.

**Key Methods:**
- `calculateViralScore(trend)` - Calculate viral potential (0-10)
- `analyzeTrendMomentum(trend)` - Predict trend growth
- `getOptimalPublishTime(trend)` - Best time to publish

**Viral Score Components:**
- Views Score (40%): Based on current view count
- Engagement Score (40%): Based on likes, comments, shares
- Growth Score (20%): Trend momentum

### 3. ScriptWriterAgent

Generates engaging video scripts using AI.

**Key Methods:**
- `generateScript(topic, duration, style)` - Create video script
- `optimizeForPlatform(script, platform)` - Platform-specific optimization

**Script Structure:**
```javascript
{
  hook: "First 3 seconds (attention-grabber)",
  mainContent: "Core message (20-25 seconds)",
  callToAction: "Final message (3-5 seconds)",
  scenes: [
    {
      time: "0-3s",
      description: "Scene description",
      voiceOver: "Spoken text"
    }
  ]
}
```

### 4. VideoPlannerAgent

Plans the video structure and asset requirements.

**Key Methods:**
- `planVideoStructure(script)` - Create detailed video plan
- `suggestAssets(scene)` - Recommend assets for each scene
- `generateStoryboard(videoPlan)` - Create visual storyboard

### 5. AssetGeneratorAgent

Sources and generates visual assets.

**Key Methods:**
- `generateImages(scene, count)` - Generate images for scenes
- `findStockMedia(keywords)` - Find stock videos/images
- `generateTransitions(sceneCount)` - Create smooth transitions

**Supported Asset Types:**
- Generated images (via AI image generation)
- Stock media (from free/paid sources)
- Text overlays
- Transitions (fade, slide, zoom, wipe, dissolve)

### 6. VoiceoverAgent

Generates high-quality voiceovers.

**Key Methods:**
- `generateVoiceover(text, voice)` - Create audio voiceover
- `selectVoice(voiceType)` - Choose voice characteristics
- `addAudioEffects(voiceover, effects)` - Add audio processing

**Voice Types:**
- Professional (male)
- Friendly (female)
- Energetic

### 7. VideoEditorAgent

Assembles the final video.

**Key Methods:**
- `assembleVideo(videoPlan, assets, voiceover)` - Combine all elements
- `addSubtitles(videoId, subtitles)` - Add captions
- `addWatermark(videoId, watermarkUrl)` - Add branding

**Video Specifications:**
- Resolution: 1080x1920 (9:16 aspect ratio)
- Frame Rate: 30 FPS
- Bitrate: 5000k
- Format: MP4

### 8. SEOAgent

Optimizes metadata for discoverability.

**Key Methods:**
- `generateTitle(topic, platform)` - Create engaging title
- `generateDescription(topic)` - Write video description
- `generateHashtags(topic, count)` - Generate relevant hashtags
- `optimizeMeta(video, platform)` - Full metadata optimization

**SEO Factors:**
- Keyword inclusion in title/description
- Optimal hashtag count per platform
- Hook effectiveness
- Call-to-action clarity

### 9. PublishingAgent

Handles multi-platform publishing.

**Key Methods:**
- `publishToYouTube(video, metadata)` - Publish YouTube Shorts
- `publishToInstagram(video, metadata)` - Publish Instagram Reels
- `publishToFacebook(video, metadata)` - Publish Facebook Reels
- `schedulePublish(video, platforms, time)` - Schedule publication

**Platform Requirements:**
- YouTube: OAuth token, video file
- Instagram: OAuth token, aspect ratio 9:16
- Facebook: OAuth token, page access

### 10. AnalyticsAgent

Tracks performance and predicts viral potential.

**Key Methods:**
- `trackVideoPerformance(videoId, platform)` - Get real-time stats
- `generateAnalyticsReport(videoId)` - Comprehensive report
- `predictViralPotential(video)` - ML-based prediction

**Tracked Metrics:**
- Views, Likes, Comments, Shares
- Engagement Rate
- Audience Demographics
- Watch Time
- Traffic Sources

## Agent Orchestrator

The `AgentOrchestrator` coordinates all agents in a pipeline:

```javascript
const orchestrator = new AgentOrchestrator();

const result = await orchestrator.executeContentPipeline('AI Trends', {
  duration: 30,
  style: 'engaging',
  platforms: ['youtube', 'instagram', 'facebook']
});
```

**Pipeline Flow:**
1. Discover and analyze trends
2. Calculate viral potential
3. Generate script
4. Plan video structure
5. Generate/source assets
6. Create voiceover
7. Assemble final video
8. Optimize metadata
9. Publish to platforms
10. Track analytics

## Error Handling

All agents include comprehensive error handling:

```javascript
try {
  const result = await agent.generateScript(topic);
} catch (error) {
  logger.error('Script generation failed:', error);
  // Handle error appropriately
}
```

## Configuration

Agents use environment variables for configuration:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview
ELEVEN_LABS_API_KEY=...
YOUTUBE_CLIENT_ID=...
INSTAGRAM_APP_ID=...
FACEBOOK_APP_ID=...
```

## Performance Considerations

- **Caching**: Trends are cached for 1 hour
- **Queue**: Heavy processing uses Redis queue
- **Rate Limiting**: API rate limits respected
- **Async Operations**: All I/O operations are async
- **Resource Management**: Proper cleanup and timeouts

## Future Enhancements

- [ ] ML-based script optimization
- [ ] Real-time trend prediction
- [ ] Custom voice training
- [ ] A/B testing framework
- [ ] Performance prediction accuracy improvement
- [ ] Multi-language support

# Frequently Asked Questions

## Installation & Setup

### Q: What are the minimum system requirements?

A: 
- Node.js 18+
- 4GB RAM (2GB minimum)
- 5GB disk space (for videos)
- PostgreSQL 12+ or MongoDB 4.4+
- Redis 6+
- FFmpeg 4.2+

### Q: Can I use MongoDB instead of PostgreSQL?

A: Yes! Set `DATABASE_TYPE=mongodb` in your `.env` file.

### Q: How do I get API keys?

A: See [SETUP.md](./SETUP.md) - "Getting API Keys" section.

### Q: What if I don't have FFmpeg installed?

A: Install it using:
- macOS: `brew install ffmpeg`
- Ubuntu: `sudo apt-get install ffmpeg`
- Windows: Download from https://ffmpeg.org/download.html

## Features & Functionality

### Q: Can I use this with my own AI model?

A: Yes! Replace the OpenAI service with your own implementation in `services/openai/OpenAIService.js`.

### Q: What video formats are supported?

A: Output is MP4 (H.264 codec). Input supports most formats via FFmpeg.

### Q: Can I publish to TikTok?

A: Not yet, but the architecture supports it. Create a new service in `services/tiktok/`.

### Q: How long does video generation take?

A: 30-60 seconds depending on duration and system performance.

### Q: Can I generate videos in other languages?

A: Yes! Update the prompts in `ScriptWriterAgent.js` and use a multilingual voice in `VoiceoverAgent.js`.

## Deployment

### Q: How do I deploy to production?

A: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions for Heroku, AWS, DigitalOcean, etc.

### Q: Is Docker required?

A: No, but it's recommended for consistency.

### Q: How do I scale the application?

A: See [DEPLOYMENT.md](./DEPLOYMENT.md) - "Scaling" section.

## Troubleshooting

### Q: I get "Database connection refused"

A: 
1. Check PostgreSQL is running: `pg_isready`
2. Verify `DATABASE_URL` is correct
3. Check credentials and database exists

### Q: "Redis connection timeout"

A:
1. Check Redis is running: `redis-cli ping`
2. Verify `REDIS_URL` is correct
3. Check firewall rules

### Q: Videos are low quality

A: Check `VIDEO_BITRATE` and `VIDEO_RESOLUTION` in `.env`. Increase bitrate for better quality.

### Q: Script generation is slow

A: OpenAI API calls take time. Use faster models or implement caching.

## Performance

### Q: How many users can the system handle?

A: Depends on infrastructure. With proper scaling:
- 1 server: ~100-500 concurrent users
- Multiple servers: scales linearly

### Q: What's the maximum video duration?

A: Technically unlimited, but YouTube Shorts limit is 60 seconds.

### Q: Can I batch process videos?

A: Yes! Submit multiple jobs to Redis queue. See `workers/` directory.

## Billing

### Q: What are the main costs?

A:
- OpenAI API: Based on tokens used ($0.01-0.03 per 1K tokens)
- ElevenLabs: Based on characters synthesized
- Cloud hosting: Varies by provider
- Database/Redis: Varies by provider
- Storage: For uploaded videos

### Q: How can I reduce costs?

A:
1. Use cheaper AI models (GPT-3.5 instead of GPT-4)
2. Implement aggressive caching
3. Batch API calls
4. Use free tier of ElevenLabs
5. Implement your own video generation

## Development

### Q: How do I add a new agent?

A:
1. Create `agents/NewAgent.js`
2. Implement required methods
3. Add to `agents/index.js`
4. Update `AgentOrchestrator`

### Q: Can I customize the video generation?

A: Yes! Modify `VideoEditorAgent.js` and `FFmpegService.js`.

### Q: How do I test agents?

A: Write tests in `tests/` and run:
```bash
npm test
```

## API

### Q: Is the API rate limited?

A: Yes, 100 requests per 15 minutes by default. Configure in `middleware/rateLimit.js`.

### Q: Can I use the API programmatically?

A: Yes! See [API.md](./API.md) for endpoints and examples.

## Support

If your question isn't answered here:
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Search [GitHub Issues](https://github.com/yourusername/viral-shorts-ai-agent/issues)
3. Open a new issue with details
4. Read the source code comments

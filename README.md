# Viral Shorts AI Agent

🚀 **AI-Powered Viral Shorts Generator** for YouTube, Instagram, and Facebook

Automatic viral content creation using AI - from trend discovery to multi-platform publishing.

## Features

✨ **AI-Powered Content**
- Trend discovery and analysis
- AI script generation using GPT-4
- Automatic video editing and assembly
- High-quality voiceovers with ElevenLabs
- SEO optimization for maximum reach

🎬 **Video Generation**
- 30-60 second short-form video creation
- 9:16 vertical aspect ratio (mobile optimized)
- 1080x1920 resolution
- Professional transitions and effects
- Auto-generated subtitles
- Custom watermarks

📱 **Multi-Platform Publishing**
- YouTube Shorts
- Instagram Reels
- Facebook Reels
- Scheduled posting
- Cross-platform analytics

📊 **Analytics & Intelligence**
- Real-time performance tracking
- Viral score prediction
- Audience demographics
- Platform-specific insights
- Historical trend analysis

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Redis 6+
- FFmpeg 4.2+

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/viral-shorts-ai-agent.git
cd viral-shorts-ai-agent

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Configure database
npm run db:setup

# Start development
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2 (in frontend/)
```

### Access Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/api/v1
- **API Docs**: http://localhost:3000/api/v1/docs

## Architecture

### AI Agents

1. **TrendResearchAgent** - Discovers viral trends
2. **TrendAnalyzerAgent** - Calculates viral potential
3. **ScriptWriterAgent** - Generates engaging scripts
4. **VideoPlannerAgent** - Plans video structure
5. **AssetGeneratorAgent** - Sources/generates assets
6. **VoiceoverAgent** - Creates audio narration
7. **VideoEditorAgent** - Assembles final video
8. **SEOAgent** - Optimizes metadata
9. **PublishingAgent** - Publishes to platforms
10. **AnalyticsAgent** - Tracks performance

### External Services

- **OpenAI** (GPT-4) - Content generation
- **ElevenLabs** - Voiceover synthesis
- **YouTube API** - Video publishing
- **Instagram Graph API** - Reels publishing
- **Facebook Graph API** - Video posting
- **FFmpeg** - Video processing

## Configuration

See [docs/SETUP.md](docs/SETUP.md) for:
- Getting API keys
- Database setup
- Environment configuration
- Docker deployment

## API Documentation

Complete API reference: [docs/API.md](docs/API.md)

Key endpoints:
- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `GET /trends` - Get trending topics
- `POST /scripts/generate` - Generate script
- `POST /videos/create` - Create video
- `POST /videos/:id/publish` - Publish video
- `GET /analytics/dashboard` - Get dashboard stats

## AI Agent Details

Detailed documentation: [docs/AGENTS.md](docs/AGENTS.md)

### Viral Score Calculation

```
ViralScore = (Views × 0.4) + (Engagement × 0.4) + (Growth × 0.2)

Score Range: 0-10
- 0-3: Low viral potential
- 3-6: Medium viral potential
- 6-8: High viral potential
- 8-10: Very high viral potential
```

## Database Schema

See [docs/DATABASE.md](docs/DATABASE.md) and [database/schema.sql](database/schema.sql)

Key tables:
- `users` - User accounts
- `projects` - Content projects
- `trends` - Discovered trends
- `scripts` - Generated scripts
- `videos` - Created videos
- `published_videos` - Cross-platform publishing
- `analytics` - Performance metrics
- `social_connections` - OAuth tokens

## Deployment

### Docker

```bash
docker-compose up -d
```

### Heroku

```bash
heroku create your-app-name
git push heroku main
heroku run npm run db:migrate
```

### AWS / Cloud Platforms

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## Development

### Project Structure

```
.
├── frontend/              # React Vite frontend
├── src/                   # Backend source
│   ├── server.js         # Express server
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── config/           # Configuration
├── agents/               # AI agents
├── services/             # External services
├── database/             # Database schema
├── docs/                 # Documentation
└── tests/                # Test suites
```

### Testing

```bash
npm test
npm run test:watch
```

### Linting

```bash
npm run lint
npm run lint:fix
npm run format
```

## Troubleshooting

Common issues and solutions: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## FAQ

Frequently asked questions: [docs/FAQ.md](docs/FAQ.md)

## Examples

Code examples: [docs/EXAMPLES.md](docs/EXAMPLES.md)

## Performance

- Video generation: 30-60 seconds
- Script writing: 5-10 seconds
- Publishing: 2-5 seconds
- Analytics sync: Real-time

### Scaling

- Horizontal scaling: Load balancer + multiple instances
- Database: PostgreSQL with read replicas
- Cache: Redis for trends (1-hour TTL)
- Queue: Bull for async job processing

## Security

- JWT authentication
- OAuth 2.0 for social platforms
- Environment variable encryption
- Rate limiting (100 requests/15 minutes)
- CORS enabled
- Helmet security headers
- SQL injection protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/yourusername/viral-shorts-ai-agent/issues)
- 💬 [Discussions](https://github.com/yourusername/viral-shorts-ai-agent/discussions)
- 📧 [Email Support](mailto:support@example.com)

## Credits

Built with:
- [OpenAI](https://openai.com) - AI models
- [ElevenLabs](https://elevenlabs.io) - Voice synthesis
- [FFmpeg](https://ffmpeg.org) - Video processing
- [Express.js](https://expressjs.com) - Backend framework
- [React](https://react.dev) - Frontend framework
- [PostgreSQL](https://www.postgresql.org) - Database

## Roadmap

- [ ] TikTok publishing support
- [ ] Multi-language generation
- [ ] Real-time trend API integration
- [ ] Advanced A/B testing
- [ ] Custom AI model training
- [ ] Mobile app (iOS/Android)
- [ ] White-label solution
- [ ] Enterprise API

## Updates

Stay updated:
- ⭐ Star the repository
- 👀 Watch for releases
- 🔔 Subscribe to discussions

---

**Made with ❤️ by the Viral Shorts Team**

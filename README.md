# Viral Shorts AI Agent

A production-ready AI agent that discovers trending topics, generates viral short-form video ideas, creates scripts, produces videos, and publishes to YouTube Shorts, Instagram Reels, and Facebook Reels.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Keys Setup](#api-keys-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Features

### 🎯 Core Features

- **Viral Trend Discovery**: Real-time trend analysis using multiple data sources
- **AI Script Generation**: Creates engaging 15-60 second scripts with hooks and CTAs
- **Video Generation**: Creates original videos from text, images, and stock media
- **Multi-Platform Publishing**: YouTube Shorts, Instagram Reels, Facebook Reels
- **Analytics Dashboard**: Track video performance across platforms
- **AI Agent Architecture**: Modular agents for trend research, script writing, video creation
- **Background Job Processing**: Handles long-running tasks asynchronously
- **Low-RAM Optimization**: Works on 4GB RAM machines
- **Security First**: JWT auth, OAuth, encrypted credentials, rate limiting

### 📊 Dashboard Features

- Viral score for each idea
- Content generation history
- Video processing status
- Real-time analytics
- Scheduled posts management
- Published videos tracking

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+ or MongoDB 4.4+
- FFmpeg 4.2+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/viral-shorts-ai-agent.git
cd viral-shorts-ai-agent

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your API keys (see Configuration section)
# Edit .env with your credentials

# Setup database
npm run db:setup

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Project Structure

```
viral-shorts-ai-agent/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── pages/           # Dashboard, Trending, Create, etc.
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API client services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # State management (Zustand/Redux)
│   │   ├── utils/           # Helper functions
│   │   ├── styles/          # Tailwind CSS
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js Express server
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, logging, validation
│   │   ├── models/          # Database schemas
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Utility functions
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── agents/                   # AI Agent modules
│   ├── TrendResearchAgent.js
│   ├── TrendAnalyzerAgent.js
│   ├── ScriptWriterAgent.js
│   ├── VideoPlannerAgent.js
│   ├── AssetGeneratorAgent.js
│   ├── VoiceoverAgent.js
│   ├── VideoEditorAgent.js
│   ├── SEOAgent.js
│   ├── PublishingAgent.js
│   └── AnalyticsAgent.js
├── services/                 # External service integrations
│   ├── youtube/
│   ├── instagram/
│   ├── facebook/
│   ├── openai/
│   ├── elevenLabs/
│   └── firebase/
├── workers/                  # Background job processors
│   ├── videoProcessor.js
│   ├── scriptGenerator.js
│   ├── assetGenerator.js
│   └── publisher.js
├── database/                 # Database migrations and seeds
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
├── uploads/                  # User uploads (gitignored)
├── videos/                   # Generated videos (gitignored)
├── config/                   # Configuration files
│   ├── database.js
│   ├── jwt.js
│   ├── redis.js
│   └── logger.js
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                     # Documentation
│   ├── API.md
│   ├── AGENTS.md
│   ├── SETUP.md
│   └── DATABASE.md
├── docker-compose.yml        # Docker configuration
├── Dockerfile               # Container image
├── package.json             # Root package.json
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Installation

### Step 1: Clone and Install

```bash
git clone https://github.com/yourusername/viral-shorts-ai-agent.git
cd viral-shorts-ai-agent
npm install
```

### Step 2: Install FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

### Step 3: Setup Database

**PostgreSQL:**
```bash
createpg viral_shorts_db
npm run db:migrate
npm run db:seed
```

**MongoDB:**
```bash
# MongoDB runs automatically via docker-compose
npm run db:setup:mongo
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### Core Configuration

```env
# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/viral_shorts_db
# OR for MongoDB:
# DATABASE_URL=mongodb://localhost:27017/viral_shorts_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRY=7d

# Redis (for job queue)
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=debug
LOG_DIR=./logs
```

## API Keys Setup

### OpenAI (Required for Script Generation)

1. Go to https://platform.openai.com/account/api-keys
2. Create a new API key
3. Add to `.env`:
```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview
```

### YouTube Data API (For Publishing)

1. Go to https://console.developers.google.com/
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials (Desktop application)
5. Add to `.env`:
```env
YOUTUBE_CLIENT_ID=your-client-id.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=your-client-secret
YOUTUBE_REDIRECT_URL=http://localhost:3000/api/auth/youtube/callback
```

### Instagram/Meta Graph API (For Publishing)

1. Go to https://developers.facebook.com/
2. Create a new app (type: Consumer)
3. Add Instagram Basic Display product
4. Add to `.env`:
```env
INSTAGRAM_APP_ID=your-app-id
INSTAGRAM_APP_SECRET=your-app-secret
INSTAGRAM_REDIRECT_URL=http://localhost:3000/api/auth/instagram/callback
```

### ElevenLabs (For Voice-over Generation)

1. Go to https://elevenlabs.io/
2. Create an account and get API key
3. Add to `.env`:
```env
ELEVEN_LABS_API_KEY=your-api-key
ELEVEN_LABS_VOICE_ID=default-voice-id
```

### TrendAPI Integration

1. Sign up at https://trendapi.com/ or use free alternatives
2. Add to `.env`:
```env
TREND_API_KEY=your-api-key
TREND_API_URL=https://api.trendapi.com
```

## Development

### Start Development Servers

```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run dev:backend
npm run dev:frontend

# Start background workers
npm run workers:dev
```

### Available Scripts

```bash
npm run dev              # Start all services
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run workers:dev      # Start job workers
npm run db:setup        # Initialize database
npm run db:migrate      # Run migrations
npm run db:seed         # Seed sample data
npm run test            # Run all tests
npm run test:unit       # Unit tests
npm run test:integration # Integration tests
npm run lint            # Run ESLint
npm run build           # Build for production
```

## Architecture

### AI Agent System

The application uses a modular agent architecture:

- **TrendResearchAgent**: Discovers trending topics
- **TrendAnalyzerAgent**: Analyzes viral potential
- **ScriptWriterAgent**: Generates video scripts
- **VideoPlannerAgent**: Plans video structure
- **AssetGeneratorAgent**: Creates/sources images and media
- **VoiceoverAgent**: Generates voice-over audio
- **VideoEditorAgent**: Assembles final video with FFmpeg
- **SEOAgent**: Optimizes titles, descriptions, hashtags
- **PublishingAgent**: Handles multi-platform publishing
- **AnalyticsAgent**: Tracks and analyzes video performance

### Content Pipeline

```
Trend Discovery → Analysis → Idea Generation → Script Writing → 
Asset Generation → Voice-over → Video Assembly → SEO Optimization → 
User Review → Publishing → Analytics
```

### Technology Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Zustand (state management)
- React Query (data fetching)

**Backend:**
- Node.js
- Express.js
- PostgreSQL/MongoDB
- Bull (job queue)
- JWT authentication
- Winston (logging)

**Video Processing:**
- FFmpeg
- ImageMagick

**External APIs:**
- OpenAI GPT-4
- YouTube Data API
- Instagram Graph API
- Facebook Graph API
- ElevenLabs (voice-over)

## Deployment

### Docker

```bash
# Build and run with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Cloud Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for:
- Heroku deployment
- AWS deployment
- DigitalOcean deployment
- Railway deployment

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT License - see [LICENSE](LICENSE)

## Support

For issues and questions:
- Open an issue on GitHub
- Check [FAQ.md](docs/FAQ.md)
- Read [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

---

**Built with ❤️ using AI-powered development**

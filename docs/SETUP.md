# Setup Guide

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 12+
- Redis 6+
- FFmpeg 4.2+
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/viral-shorts-ai-agent.git
cd viral-shorts-ai-agent
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for the root project, backend, and frontend.

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/viral_shorts_db

# JWT
JWT_SECRET=your-32-character-secret-key-here

# API Keys
OPENAI_API_KEY=sk-...
YOUTUBE_CLIENT_ID=...
INSTAGRAM_APP_ID=...
ELEVEN_LABS_API_KEY=...
```

### 4. Setup Database

```bash
# Create database
createpg viral_shorts_db

# Run migrations
npm run db:setup

# Seed sample data
npm run db:seed
```

### 5. Start Services

**Using Docker (Recommended):**

```bash
docker-compose up -d
```

**Manual Start:**

```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend

# Terminal 3: Workers
npm run workers:dev
```

### 6. Verify Installation

Check health status:

```bash
curl http://localhost:3000/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 42.123
}
```

## Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1
- **API Docs**: http://localhost:3000/api/v1/docs (Swagger UI)

## Getting API Keys

### OpenAI

1. Visit https://platform.openai.com/account/api-keys
2. Create new API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

### YouTube

1. Go to https://console.developers.google.com/
2. Create new project
3. Enable "YouTube Data API v3"
4. Create OAuth credentials (Desktop app)
5. Download JSON and extract:
   - `YOUTUBE_CLIENT_ID`
   - `YOUTUBE_CLIENT_SECRET`

### Instagram/Meta

1. Visit https://developers.facebook.com/
2. Create new app (Consumer type)
3. Add "Instagram Basic Display" product
4. Get app credentials:
   - `INSTAGRAM_APP_ID`
   - `INSTAGRAM_APP_SECRET`

### ElevenLabs

1. Sign up at https://elevenlabs.io/
2. Go to API settings
3. Copy API key: `ELEVEN_LABS_API_KEY=...`
4. Get voice ID: `ELEVEN_LABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM`

## Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Verify connection string
echo $DATABASE_URL
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping

# Expected: PONG
```

### FFmpeg Not Found

```bash
# Install FFmpeg
# macOS
brew install ffmpeg

# Ubuntu
sudo apt-get install ffmpeg

# Verify installation
ffmpeg -version
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev:backend
```

## Next Steps

1. Read [API Documentation](./API.md)
2. Review [Agent Architecture](./AGENTS.md)
3. Check [Database Schema](../database/schema.sql)
4. Explore [Example Usage](./EXAMPLES.md)

## Support

For issues:
- Check [FAQ.md](./FAQ.md)
- Read [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Open GitHub issue

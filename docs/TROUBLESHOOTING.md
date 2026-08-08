# Troubleshooting Guide

## Common Issues and Solutions

## Installation Issues

### npm install fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
```

### Node version incompatibility

**Error**: `The engine "node" is incompatible with this package`

**Solution**:
```bash
# Install Node.js 18+
# Using nvm:
nvm install 18
nvm use 18

# Or download from https://nodejs.org/
```

### Missing build tools

**Error**: `node-gyp ERR!`

**Solution**:
```bash
# macOS
xcode-select --install

# Ubuntu
sudo apt-get install build-essential python3

# Windows
npm install --global --production windows-build-tools
```

## Database Issues

### PostgreSQL connection refused

**Error**: `connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Start PostgreSQL
# macOS (Homebrew)
brew services start postgresql

# Ubuntu
sudo systemctl start postgresql

# Windows
sc start postgresql-x64-14

# Verify connection
psql -U postgres -d postgres
```

### Database does not exist

**Error**: `database "viral_shorts_db" does not exist`

**Solution**:
```bash
# Create database
createpg viral_shorts_db

# Or manually
psql -U postgres -c "CREATE DATABASE viral_shorts_db;"

# Run schema
npm run db:setup
```

### Wrong password

**Error**: `password authentication failed for user "postgres"`

**Solution**:
```bash
# Update .env with correct password
# DATABASE_URL=postgresql://postgres:CORRECT_PASSWORD@localhost:5432/viral_shorts_db

# Reset PostgreSQL password
sudo -u postgres psql
alter user postgres password 'newpassword';
\q
```

### Migrations failed

**Error**: `migration "xxx" has already been applied`

**Solution**:
```bash
# Reset migrations (WARNING: deletes all data)
npm run db:reset

# Or manually clear migration history
psql viral_shorts_db
DELETE FROM schema_migrations;
\q

# Then rerun
npm run db:migrate
```

## Redis Issues

### Redis connection timeout

**Error**: `Error: connect ETIMEDOUT 127.0.0.1:6379`

**Solution**:
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
# macOS
brew services start redis

# Ubuntu
sudo systemctl start redis-server

# Docker
docker run -d -p 6379:6379 redis:latest
```

### Redis password issues

**Error**: `ERR invalid password`

**Solution**:
```bash
# Update .env
# REDIS_URL=redis://:password@localhost:6379

# Or test connection
redis-cli -a password ping
```

## API Issues

### Port already in use

**Error**: `listen EADDRINUSE :::3000`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev:backend
```

### CORS errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
```bash
# Update .env
FRONTEND_URL=http://localhost:5173

# Or in src/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Authentication token expired

**Error**: `401 Unauthorized`

**Solution**:
```bash
# Token expired - user needs to login again
# Check JWT_SECRET is consistent
echo $JWT_SECRET

# Verify token in browser console
const token = localStorage.getItem('auth_token');
console.log(token);
```

### Rate limiting errors

**Error**: `429 Too Many Requests`

**Solution**:
```bash
# Wait 15 minutes or
# Increase rate limit in src/middleware/rateLimit.js

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000 // Increase from 100
});
```

## AI/ML Issues

### OpenAI API key invalid

**Error**: `401 Invalid API Key`

**Solution**:
```bash
# Verify API key
echo $OPENAI_API_KEY

# Get new key from https://platform.openai.com/account/api-keys
# Update .env
OPENAI_API_KEY=sk-new_key
```

### OpenAI rate limit exceeded

**Error**: `429 Rate limit exceeded`

**Solution**:
```bash
# Wait a moment and retry
# Or upgrade OpenAI plan
# Or reduce max_tokens in OpenAIService.js
```

### Script generation timeout

**Error**: `Script generation took too long`

**Solution**:
```bash
# Increase timeout in ScriptWriterAgent.js
const timeout = 30000; // 30 seconds

# Or use faster model
OPENAI_MODEL=gpt-3.5-turbo
```

## Video Generation Issues

### FFmpeg not found

**Error**: `ffmpeg: command not found`

**Solution**:
```bash
# Install FFmpeg
brew install ffmpeg  # macOS
sudo apt install ffmpeg  # Ubuntu
choco install ffmpeg  # Windows (Chocolatey)

# Verify installation
ffmpeg -version

# Update .env if custom path
FFMPEG_PATH=/usr/local/bin/ffmpeg
```

### Insufficient disk space

**Error**: `No space left on device`

**Solution**:
```bash
# Check disk usage
df -h

# Clean up temp files
rm -rf /tmp/viral_shorts_*

# Or increase storage
# Move temp directory
TEMP_DIR=/path/with/more/space
```

### Video codec errors

**Error**: `Unknown encoder 'h264'`

**Solution**:
```bash
# FFmpeg needs to be compiled with libx264
# Reinstall FFmpeg
brew reinstall ffmpeg --with-libx264

# Or use different codec
VIDEO_CODEC=libvpx-vp9
```

## Frontend Issues

### Vite build fails

**Error**: `error when starting dev server`

**Solution**:
```bash
# Clear node_modules
rm -rf frontend/node_modules
npm install --prefix frontend

# Or
npm run clean:frontend
npm run dev:frontend
```

### Frontend can't connect to API

**Error**: `Failed to fetch from http://localhost:3000`

**Solution**:
```bash
# Verify backend is running
curl http://localhost:3000/api/v1/health

# Check VITE_API_URL in frontend/.env
VITE_API_URL=http://localhost:3000/api/v1

# Restart frontend dev server
npm run dev:frontend
```

### CSS not loading

**Error**: `Tailwind styles not applied`

**Solution**:
```bash
# Rebuild Tailwind
npm run build:frontend

# Or clear cache
rm -rf frontend/.turbo frontend/dist
npm run dev:frontend
```

## Docker Issues

### Container fails to start

**Error**: `docker-compose up failed`

**Solution**:
```bash
# Check logs
docker-compose logs backend

# Rebuild images
docker-compose build --no-cache

# Or start fresh
docker-compose down -v
docker-compose up
```

### Port already in use

**Error**: `Bind for 0.0.0.0:3000 failed`

**Solution**:
```bash
# Use different port in docker-compose.yml
ports:
  - "3001:3000"

# Or stop conflicting container
docker ps
docker stop <container_id>
```

### Volume permission denied

**Error**: `permission denied: /app/node_modules`

**Solution**:
```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or use sudo
sudo docker-compose up
```

## Performance Issues

### High CPU usage

**Solution**:
```bash
# Check which process
top
# Or
htop

# Optimize slow queries
ANALYZE;
VACUUM ANALYZE;

# Check database indexes
SELECT * FROM pg_stat_user_indexes;
```

### High memory usage

**Solution**:
```bash
# Increase Node.js heap
NODE_OPTIONS=--max-old-space-size=4096 npm run dev:backend

# Or implement streaming for large files
# Check for memory leaks
node --inspect src/server.js
```

### Slow video processing

**Solution**:
```bash
# Reduce video resolution
VIDEO_RESOLUTION=720x1280

# Reduce bitrate
VIDEO_BITRATE=2500k

# Use worker queue
npm run workers:dev
```

## Debugging

### Enable debug logs

```bash
# Development
DEBUG=* npm run dev:backend

# Production
LOG_LEVEL=debug npm start
```

### Debug with Node Inspector

```bash
# Start with inspector
node --inspect src/server.js

# Open chrome://inspect in Chrome
# Set breakpoints and debug
```

### Database debugging

```bash
# Connect to database
psql viral_shorts_db

# Common queries
\dt                    # List tables
\d users               # Describe table
SELECT COUNT(*) FROM videos;  # Count records
```

## Getting Help

1. **Check logs**: `npm run logs`
2. **Search issues**: https://github.com/yourusername/viral-shorts-ai-agent/issues
3. **Read docs**: See [docs/](../docs/)
4. **Stack Overflow**: Tag with `viral-shorts-ai`
5. **GitHub Discussions**: Use Discussions tab

## Report a Bug

When reporting issues, include:
- OS and Node.js version
- Full error message
- Steps to reproduce
- `npm list` output
- Environment variables (sanitized)

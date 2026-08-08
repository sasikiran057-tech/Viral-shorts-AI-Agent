# Deployment Guide

## Local Development

See [SETUP.md](./SETUP.md)

## Docker Deployment

### Build and Run

```bash
docker-compose up -d
```

### View Logs

```bash
docker-compose logs -f backend
```

### Stop Services

```bash
docker-compose down
```

## Production Deployment

### Environment Configuration

Create `.env.production`:

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourdomain.com
DATABASE_URL=postgresql://user:password@prod-db:5432/viral_shorts_db
REDIS_URL=redis://prod-redis:6379
JWT_SECRET=generate-a-strong-32-char-key
```

### Heroku Deployment

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set OPENAI_API_KEY=sk-...

# Add PostgreSQL
heroku addons:create heroku-postgresql:standard-0

# Add Redis
heroku addons:create heroku-redis:premium-0

# Deploy
git push heroku main

# Run migrations
heroku run npm run db:migrate
```

### AWS Deployment

#### ECS (Recommended)

```bash
# Create ECR repository
aws ecr create-repository --repository-name viral-shorts

# Build and push image
docker build -t viral-shorts:latest .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker tag viral-shorts:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/viral-shorts:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/viral-shorts:latest

# Create ECS task definition
# Create ECS service
# Setup ALB (Application Load Balancer)
```

#### RDS Setup

```bash
# Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier viral-shorts-db \
  --engine postgres \
  --db-instance-class db.t3.micro \
  --allocated-storage 20
```

#### ElastiCache Setup

```bash
# Create Redis cluster
aws elasticache create-cache-cluster \
  --cache-cluster-id viral-shorts-redis \
  --engine redis \
  --cache-node-type cache.t3.micro
```

### DigitalOcean Deployment

```bash
# Create app
doctl apps create --spec app.yaml

# Where app.yaml contains:
```

```yaml
name: viral-shorts
services:
  - name: api
    github:
      repo: your-username/viral-shorts-ai-agent
      branch: main
    build_command: npm install && npm run build
    run_command: npm start
    http_port: 3000
    envs:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        value: ${db.connection_string}
  - name: frontend
    build_command: npm install && npm run build
    source_dir: frontend
    github:
      repo: your-username/viral-shorts-ai-agent
      branch: main
databases:
  - name: db
    engine: PG
    version: "12"
```

### Railway Deployment

```bash
# Login
railway login

# Create project
railway init

# Add plugins
railway add --plugin postgres
railway add --plugin redis

# Deploy
railway up
```

## SSL/HTTPS Setup

### Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## Monitoring

### PM2 (Process Manager)

```bash
# Install
npm install -g pm2

# Start
pm2 start src/server.js --name "viral-shorts-api"
pm2 start src/workers/index.js --name "viral-shorts-workers"

# Monitor
pm2 monit

# Logs
pm2 logs

# Restart on reboot
pm2 startup
pm2 save
```

### Sentry (Error Tracking)

```bash
# Install
npm install @sentry/node

# Configure in src/server.js
```

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Scaling

### Horizontal Scaling

- Use load balancer (nginx, AWS ALB)
- Separate API and worker instances
- Use shared database and Redis
- Implement connection pooling

### Vertical Scaling

- Increase instance size
- Optimize queries with proper indexing
- Implement caching (Redis)
- Use CDN for static assets

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] JWT secret strong (32+ chars)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection (parameterized queries)
- [ ] XSS protection headers
- [ ] Regular security updates
- [ ] Database backups automated
- [ ] Error logging without sensitive data
- [ ] API keys rotated regularly

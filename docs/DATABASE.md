# Database Documentation

## Schema Overview

### Users Table

Stores user account information.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  profile_picture_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

**Indexes:**
- `email` - For login lookups

### Projects Table

User content projects.

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

**Indexes:**
- `user_id` - For user project queries

### Trends Table

Cached trending topics.

```sql
CREATE TABLE trends (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  viral_score DECIMAL(5, 2),
  views BIGINT,
  engagement DECIMAL(5, 2),
  keywords TEXT[],
  source VARCHAR(100),
  discovered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `topic` - For trend searches

### Scripts Table

Generated video scripts.

```sql
CREATE TABLE scripts (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  topic VARCHAR(255) NOT NULL,
  duration INTEGER,
  style VARCHAR(100),
  content TEXT,
  hook TEXT,
  main_content TEXT,
  call_to_action TEXT,
  scenes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

**Indexes:**
- `project_id` - For project script queries

### Videos Table

Generated and published videos.

```sql
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  script_id INTEGER REFERENCES scripts(id),
  title VARCHAR(255),
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  resolution VARCHAR(50),
  status VARCHAR(50),
  viral_score DECIMAL(5, 2),
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

**Indexes:**
- `project_id` - For project video queries
- `script_id` - For script video queries

**Video Status Values:**
- `draft` - Not yet processed
- `processing` - Currently being generated
- `ready` - Ready to publish
- `published` - Published to platforms
- `archived` - Archived by user

### Published Videos Table

Tracks publishing across platforms.

```sql
CREATE TABLE published_videos (
  id SERIAL PRIMARY KEY,
  video_id INTEGER REFERENCES videos(id),
  platform VARCHAR(100),
  platform_video_id VARCHAR(255),
  platform_url TEXT,
  status VARCHAR(50),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `video_id` - For video platform lookups
- `platform` - For platform-specific queries

**Supported Platforms:**
- `youtube`
- `instagram`
- `facebook`
- `tiktok` (future)

### Analytics Table

Performance metrics per video/platform.

```sql
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  video_id INTEGER REFERENCES videos(id),
  platform VARCHAR(100),
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  engagement DECIMAL(5, 2),
  reach BIGINT,
  impressions BIGINT,
  tracked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `video_id` - For video analytics queries

### Social Connections Table

OAuth tokens for connected accounts.

```sql
CREATE TABLE social_connections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  platform VARCHAR(100),
  platform_user_id VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  disconnected_at TIMESTAMP
);
```

**Indexes:**
- `user_id` - For user social accounts

## Queries

### Get User's Latest Projects

```sql
SELECT * FROM projects
WHERE user_id = $1 AND deleted_at IS NULL
ORDER BY created_at DESC
LIMIT 10;
```

### Get Video Performance

```sql
SELECT 
  v.id, v.title, v.viral_score,
  SUM(a.views) as total_views,
  SUM(a.likes) as total_likes,
  SUM(a.comments) as total_comments,
  SUM(a.shares) as total_shares
FROM videos v
LEFT JOIN analytics a ON v.id = a.video_id
WHERE v.project_id = $1
GROUP BY v.id
ORDER BY total_views DESC;
```

### Get Trending Topics

```sql
SELECT * FROM trends
WHERE discovered_at > NOW() - INTERVAL '7 days'
ORDER BY viral_score DESC
LIMIT 20;
```

### Get Platform Performance

```sql
SELECT 
  pv.platform,
  COUNT(*) as total_videos,
  SUM(a.views) as total_views,
  AVG(a.engagement) as avg_engagement
FROM published_videos pv
LEFT JOIN analytics a ON pv.video_id = a.video_id
WHERE pv.platform = a.platform
GROUP BY pv.platform;
```

## Maintenance

### Vacuum Database

```bash
npm run db:vacuum
```

### Backup Database

```bash
pg_dump viral_shorts_db > backup.sql
```

### Restore from Backup

```bash
psql viral_shorts_db < backup.sql
```

## Performance Tips

1. **Indexes**: All foreign keys and frequently queried fields are indexed
2. **Partitioning**: Consider partitioning `analytics` table by date for large datasets
3. **Caching**: Use Redis for trend caching (1-hour TTL)
4. **Connection Pooling**: Backend uses connection pool (max 10 connections)
5. **Query Optimization**: Use EXPLAIN ANALYZE for slow queries

## Data Retention

- **Soft Deletes**: Records use `deleted_at` for retention
- **Analytics**: Kept indefinitely for historical analysis
- **Tokens**: Refreshed and old tokens removed
- **Cache**: Trends cached for 1 hour

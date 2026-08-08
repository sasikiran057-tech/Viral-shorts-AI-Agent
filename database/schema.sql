-- Users Table
CREATE TABLE IF NOT EXISTS users (
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

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Trends Table
CREATE TABLE IF NOT EXISTS trends (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  viral_score DECIMAL(5, 2),
  views BIGINT,
  engagement DECIMAL(5, 2),
  keywords TEXT[],
  source VARCHAR(100),
  discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scripts Table
CREATE TABLE IF NOT EXISTS scripts (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
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

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  script_id INTEGER REFERENCES scripts(id) ON DELETE SET NULL,
  title VARCHAR(255),
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  resolution VARCHAR(50),
  status VARCHAR(50) DEFAULT 'draft',
  viral_score DECIMAL(5, 2),
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Published Videos Table (for tracking across platforms)
CREATE TABLE IF NOT EXISTS published_videos (
  id SERIAL PRIMARY KEY,
  video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  platform VARCHAR(100) NOT NULL,
  platform_video_id VARCHAR(255),
  platform_url TEXT,
  status VARCHAR(50),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
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

-- Social Connections Table (for OAuth tokens)
CREATE TABLE IF NOT EXISTS social_connections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR(100) NOT NULL,
  platform_user_id VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  disconnected_at TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_scripts_project_id ON scripts(project_id);
CREATE INDEX idx_videos_project_id ON videos(project_id);
CREATE INDEX idx_videos_script_id ON videos(script_id);
CREATE INDEX idx_published_videos_video_id ON published_videos(video_id);
CREATE INDEX idx_published_videos_platform ON published_videos(platform);
CREATE INDEX idx_analytics_video_id ON analytics(video_id);
CREATE INDEX idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX idx_trends_topic ON trends(topic);

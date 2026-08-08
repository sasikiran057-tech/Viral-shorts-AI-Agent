# API Documentation

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

### Register

**POST** `/api/v1/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Login

**POST** `/api/v1/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

## Trends API

### Get All Trends

**GET** `/api/v1/trends`

Query parameters:
- `limit` (optional): Number of results (default: 10)
- `offset` (optional): Pagination offset (default: 0)
- `sort` (optional): Sort field (default: viral_score)

Response:
```json
{
  "trends": [
    {
      "id": "1",
      "topic": "AI in Content Creation",
      "viralScore": 8.5,
      "views": 2500000,
      "engagement": 15.2,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 42
}
```

### Get Trend by ID

**GET** `/api/v1/trends/:id`

### Analyze Trend

**POST** `/api/v1/trends/analyze`

Request body:
```json
{
  "topic": "AI in Content Creation"
}
```

## Scripts API

### Get All Scripts

**GET** `/api/v1/scripts`

Query parameters:
- `projectId` (optional): Filter by project
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

### Generate Script

**POST** `/api/v1/scripts/generate`

Request body:
```json
{
  "topic": "AI Trends",
  "duration": 30,
  "style": "engaging"
}
```

Response:
```json
{
  "id": "script-123",
  "topic": "AI Trends",
  "duration": 30,
  "content": "Generated script...",
  "hook": "Engaging hook...",
  "scenes": [
    {
      "time": "0-3s",
      "description": "Hook scene",
      "voiceOver": "Hook text"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Videos API

### Get All Videos

**GET** `/api/v1/videos`

Query parameters:
- `projectId` (optional): Filter by project
- `status` (optional): Filter by status (draft, processing, published)
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

### Create Video

**POST** `/api/v1/videos/create`

Request body:
```json
{
  "scriptId": "script-123",
  "assets": [
    {
      "type": "image",
      "url": "https://example.com/image.jpg"
    }
  ]
}
```

### Get Video Status

**GET** `/api/v1/videos/:id`

### Publish Video

**POST** `/api/v1/videos/:id/publish`

Request body:
```json
{
  "platforms": ["youtube", "instagram", "facebook"],
  "metadata": {
    "title": "Video Title",
    "description": "Video Description",
    "hashtags": ["#viral", "#trending"]
  }
}
```

## Projects API

### Get All Projects

**GET** `/api/v1/projects`

### Create Project

**POST** `/api/v1/projects`

Request body:
```json
{
  "name": "My Project",
  "description": "Project description"
}
```

### Get Project

**GET** `/api/v1/projects/:id`

### Update Project

**PUT** `/api/v1/projects/:id`

### Delete Project

**DELETE** `/api/v1/projects/:id`

## Analytics API

### Get Dashboard Analytics

**GET** `/api/v1/analytics/dashboard`

Response:
```json
{
  "totalVideos": 42,
  "totalViews": 5000000,
  "totalEngagement": 275000,
  "averageViralScore": 7.8,
  "platformBreakdown": {
    "youtube": {
      "videos": 15,
      "views": 2000000,
      "engagement": 120000
    },
    "instagram": {
      "videos": 15,
      "views": 2000000,
      "engagement": 100000
    },
    "facebook": {
      "videos": 12,
      "views": 1000000,
      "engagement": 55000
    }
  }
}
```

### Get Video Analytics

**GET** `/api/v1/analytics/videos/:id`

### Get Platform Analytics

**GET** `/api/v1/analytics/platforms/:platform`

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

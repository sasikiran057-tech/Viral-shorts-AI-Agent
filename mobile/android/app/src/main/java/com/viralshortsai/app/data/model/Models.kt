package com.viralshortsai.app.data.model

import com.google.gson.annotations.SerializedName

// Auth Models
data class RegisterRequest(
    val email: String,
    val password: String,
    val name: String
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class AuthResponse(
    val token: String,
    val user: User
)

data class User(
    val id: String,
    val email: String,
    val name: String,
    @SerializedName("profile_picture_url")
    val profilePictureUrl: String? = null,
    val bio: String? = null
)

// Trend Models
data class Trend(
    val id: String,
    val topic: String,
    @SerializedName("viral_score")
    val viralScore: Double,
    val views: Long,
    val engagement: Double,
    val keywords: List<String>,
    val source: String,
    @SerializedName("discovered_at")
    val discoveredAt: String
)

data class TrendsResponse(
    val trends: List<Trend>,
    val total: Int
)

data class TrendAnalyzeRequest(
    val topic: String
)

data class AnalyzeResponse(
    @SerializedName("viral_score")
    val viralScore: Double,
    val keywords: List<String>,
    val trend_momentum: Double
)

// Script Models
data class GenerateScriptRequest(
    val topic: String,
    val duration: Int,
    val style: String
)

data class ScriptResponse(
    val id: String,
    val topic: String,
    val duration: Int,
    val content: String,
    val hook: String,
    @SerializedName("main_content")
    val mainContent: String,
    @SerializedName("call_to_action")
    val callToAction: String,
    val scenes: List<Scene>
)

data class Scene(
    val id: String,
    val time: String,
    val description: String,
    val voiceOver: String? = null
)

data class Script(
    val id: String,
    val topic: String,
    val duration: Int,
    val content: String,
    @SerializedName("created_at")
    val createdAt: String
)

// Video Models
data class CreateVideoRequest(
    val scriptId: String,
    val assets: List<Asset>
)

data class Asset(
    val type: String,
    val url: String
)

data class VideoResponse(
    val id: String,
    val title: String,
    val status: String
)

data class Video(
    val id: String,
    val title: String,
    val description: String? = null,
    @SerializedName("video_url")
    val videoUrl: String? = null,
    @SerializedName("thumbnail_url")
    val thumbnailUrl: String? = null,
    val duration: Int,
    val resolution: String,
    val status: String,
    @SerializedName("viral_score")
    val viralScore: Double,
    val views: Long = 0,
    val likes: Long = 0,
    val comments: Long = 0,
    val shares: Long = 0,
    @SerializedName("created_at")
    val createdAt: String
)

// Publishing Models
data class PublishRequest(
    val platforms: List<String>,
    val metadata: PublishMetadata
)

data class PublishMetadata(
    val title: String,
    val description: String,
    val hashtags: List<String>
)

data class PublishResponse(
    @SerializedName("published_videos")
    val publishedVideos: List<PublishedVideo>
)

data class PublishedVideo(
    val platform: String,
    val url: String,
    val status: String
)

// Analytics Models
data class DashboardAnalytics(
    @SerializedName("total_videos")
    val totalVideos: Int,
    @SerializedName("total_views")
    val totalViews: Long,
    @SerializedName("total_engagement")
    val totalEngagement: Long,
    @SerializedName("average_viral_score")
    val averageViralScore: Double,
    @SerializedName("platform_breakdown")
    val platformBreakdown: Map<String, PlatformStats>
)

data class PlatformStats(
    val videos: Int,
    val views: Long,
    val engagement: Long
)

data class VideoAnalytics(
    val id: String,
    val title: String,
    val views: Long,
    val likes: Long,
    val comments: Long,
    val shares: Long,
    val engagement: Double,
    val reach: Long
)

data class PlatformAnalytics(
    val platform: String,
    @SerializedName("total_videos")
    val totalVideos: Int,
    @SerializedName("total_views")
    val totalViews: Long,
    @SerializedName("avg_engagement")
    val avgEngagement: Double
)

// Project Models
data class CreateProjectRequest(
    val name: String,
    val description: String? = null
)

data class Project(
    val id: String,
    val name: String,
    val description: String? = null,
    @SerializedName("thumbnail_url")
    val thumbnailUrl: String? = null,
    @SerializedName("created_at")
    val createdAt: String
)

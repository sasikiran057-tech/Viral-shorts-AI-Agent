package com.viralshortsai.app.data.api

import com.viralshortsai.app.data.model.*
import retrofit2.http.*

interface ApiService {

    // Auth Endpoints
    @POST("/auth/register")
    suspend fun register(@Body request: RegisterRequest): AuthResponse

    @POST("/auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse

    // Trends Endpoints
    @GET("/trends")
    suspend fun getTrends(
        @Query("limit") limit: Int = 10,
        @Query("offset") offset: Int = 0
    ): TrendsResponse

    @GET("/trends/{id}")
    suspend fun getTrendDetails(@Path("id") trendId: String): Trend

    @POST("/trends/analyze")
    suspend fun analyzeTrend(@Body request: TrendAnalyzeRequest): AnalyzeResponse

    // Scripts Endpoints
    @POST("/scripts/generate")
    suspend fun generateScript(@Body request: GenerateScriptRequest): ScriptResponse

    @GET("/scripts")
    suspend fun getScripts(
        @Query("projectId") projectId: String? = null,
        @Query("limit") limit: Int = 10
    ): List<Script>

    // Videos Endpoints
    @GET("/videos")
    suspend fun getVideos(
        @Query("projectId") projectId: String? = null,
        @Query("status") status: String? = null,
        @Query("limit") limit: Int = 10
    ): List<Video>

    @GET("/videos/{id}")
    suspend fun getVideoDetails(@Path("id") videoId: String): Video

    @POST("/videos/create")
    suspend fun createVideo(@Body request: CreateVideoRequest): VideoResponse

    @POST("/videos/{id}/publish")
    suspend fun publishVideo(
        @Path("id") videoId: String,
        @Body request: PublishRequest
    ): PublishResponse

    // Analytics Endpoints
    @GET("/analytics/dashboard")
    suspend fun getDashboardAnalytics(): DashboardAnalytics

    @GET("/analytics/videos/{id}")
    suspend fun getVideoAnalytics(@Path("id") videoId: String): VideoAnalytics

    @GET("/analytics/platforms/{platform}")
    suspend fun getPlatformAnalytics(@Path("platform") platform: String): PlatformAnalytics

    // Projects Endpoints
    @GET("/projects")
    suspend fun getProjects(): List<Project>

    @POST("/projects")
    suspend fun createProject(@Body request: CreateProjectRequest): Project

    @GET("/projects/{id}")
    suspend fun getProjectDetails(@Path("id") projectId: String): Project
}

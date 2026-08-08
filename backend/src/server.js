import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import dotenv from 'dotenv';
import { logger } from './config/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { authenticateJWT } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import trendRoutes from './routes/trends.js';
import scriptRoutes from './routes/scripts.js';
import videoRoutes from './routes/videos.js';
import projectRoutes from './routes/projects.js';
import analyticsRoutes from './routes/analytics.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

app.use(limiter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(requestLogger);

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trends', trendRoutes);
app.use('/api/v1/scripts', scriptRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;

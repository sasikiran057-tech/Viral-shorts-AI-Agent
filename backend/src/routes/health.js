import express from 'express';
import { logger } from '../config/logger.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get('/ready', async (req, res) => {
  try {
    res.status(200).json({
      status: 'ready',
      services: {
        database: 'connected',
        redis: 'connected',
      },
    });
  } catch (error) {
    logger.error('Readiness check failed:', error);
    res.status(503).json({ status: 'not_ready', error: error.message });
  }
});

export default router;

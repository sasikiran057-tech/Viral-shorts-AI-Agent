import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { logger } from '../config/logger.js';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const videos = [];
    res.status(200).json(videos);
  } catch (error) {
    logger.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

router.post('/create', authenticateJWT, async (req, res) => {
  try {
    const { scriptId, assets } = req.body;

    const video = {
      id: Math.random().toString(36).substr(2, 9),
      scriptId,
      assets,
      status: 'processing',
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(video);
  } catch (error) {
    logger.error('Error creating video:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

export default router;

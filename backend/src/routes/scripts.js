import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { logger } from '../config/logger.js';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const scripts = [];
    res.status(200).json(scripts);
  } catch (error) {
    logger.error('Error fetching scripts:', error);
    res.status(500).json({ error: 'Failed to fetch scripts' });
  }
});

router.post('/generate', authenticateJWT, async (req, res) => {
  try {
    const { topic, duration, style } = req.body;

    const script = {
      id: Math.random().toString(36).substr(2, 9),
      topic,
      duration,
      style,
      content: 'Generated script content...',
      hook: 'Engaging hook here',
      callToAction: 'Subscribe for more',
      scenes: [],
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(script);
  } catch (error) {
    logger.error('Error generating script:', error);
    res.status(500).json({ error: 'Failed to generate script' });
  }
});

export default router;

import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { logger } from '../config/logger.js';

const router = express.Router();

router.get('/dashboard', authenticateJWT, async (req, res) => {
  try {
    const analytics = {
      totalVideos: 0,
      totalViews: 0,
      totalEngagement: 0,
      averageViralScore: 0,
      platformBreakdown: {
        youtube: 0,
        instagram: 0,
        facebook: 0,
      },
    };

    res.status(200).json(analytics);
  } catch (error) {
    logger.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;

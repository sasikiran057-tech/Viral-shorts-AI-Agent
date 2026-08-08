import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { logger } from '../config/logger.js';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const trends = [
      {
        id: '1',
        topic: 'AI in Content Creation',
        viralScore: 8.5,
        views: 2500000,
        engagement: 15.2,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        topic: 'Digital Marketing Trends',
        viralScore: 7.8,
        views: 1800000,
        engagement: 12.5,
        createdAt: new Date().toISOString(),
      },
    ];

    res.status(200).json({
      trends,
      total: trends.length,
    });
  } catch (error) {
    logger.error('Error fetching trends:', error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const trend = {
      id,
      topic: 'Sample Trend',
      viralScore: 8.5,
      views: 2500000,
      engagement: 15.2,
      keywords: ['ai', 'content', 'creation'],
      relatedTopics: [],
      createdAt: new Date().toISOString(),
    };

    res.status(200).json(trend);
  } catch (error) {
    logger.error('Error fetching trend:', error);
    res.status(500).json({ error: 'Failed to fetch trend' });
  }
});

router.post('/analyze', authenticateJWT, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const analysis = {
      topic,
      viralScore: Math.random() * 10,
      analysis: {
        viralPotential: 'high',
        keywords: ['sample', 'keywords'],
        trends: [],
      },
    };

    res.status(200).json(analysis);
  } catch (error) {
    logger.error('Error analyzing trend:', error);
    res.status(500).json({ error: 'Failed to analyze trend' });
  }
});

export default router;

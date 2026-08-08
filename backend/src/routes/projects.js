import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { logger } from '../config/logger.js';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const projects = [];
    res.status(200).json(projects);
  } catch (error) {
    logger.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      userId: req.user.userId,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(project);
  } catch (error) {
    logger.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

export default router;

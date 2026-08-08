import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt.js';
import { logger } from '../config/logger.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const token = generateToken({
        userId: Math.random().toString(36).substr(2, 9),
        email,
        name,
      });

      logger.info(`User registered: ${email}`);

      res.status(201).json({
        token,
        user: { email, name },
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const token = generateToken({
        userId: Math.random().toString(36).substr(2, 9),
        email,
      });

      logger.info(`User logged in: ${email}`);

      res.status(200).json({
        token,
        user: { email },
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

export default router;

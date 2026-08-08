import pg from 'pg';
import mongoose from 'mongoose';
import { logger } from './logger.js';

const { Pool } = pg;

let pgPool = null;
let mongoConnection = null;

const DATABASE_TYPE = process.env.DATABASE_TYPE || 'postgresql';

export async function initializeDatabase() {
  try {
    if (DATABASE_TYPE === 'postgresql') {
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });

      await pgPool.query('SELECT 1');
      logger.info('PostgreSQL connected successfully');
    } else if (DATABASE_TYPE === 'mongodb') {
      mongoConnection = await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info('MongoDB connected successfully');
    }
  } catch (error) {
    logger.error('Database connection error:', error);
    throw error;
  }
}

export async function closeDatabase() {
  try {
    if (pgPool) {
      await pgPool.end();
      logger.info('PostgreSQL pool closed');
    }
    if (mongoConnection) {
      await mongoose.disconnect();
      logger.info('MongoDB disconnected');
    }
  } catch (error) {
    logger.error('Error closing database:', error);
  }
}

export function getPool() {
  return pgPool;
}

export function getMongoConnection() {
  return mongoConnection;
}

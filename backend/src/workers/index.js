import { logger } from '../config/logger.js';

logger.info('Worker process starting...');

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

logger.info('Workers ready and listening for jobs');

import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorlogger, logger } from './share/logger';

let server: Server;

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Connected to database 🚀');
    server = app.listen(config.port, () => {
      logger.info(`Server launched 🚀 at port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Error connecting to database: ', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received. Shutting down gracefully');
//   if (server) {
//     server.close();
//   }
// });

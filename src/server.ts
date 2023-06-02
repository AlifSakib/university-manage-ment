import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './share/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database 🚀')
    app.listen(config.port, () => {
      logger.info(`Server launched 🚀 at port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Error connecting to database: ', error)
  }
}

bootstrap()

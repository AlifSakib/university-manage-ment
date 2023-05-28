import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Connected to database 🚀')
    app.listen(config.port, () => {
      console.log(`Server launched 🚀 at port ${config.port}`)
    })
  } catch (error) {
    console.log('Error connecting to database: ', error)
  }
}

bootstrap()

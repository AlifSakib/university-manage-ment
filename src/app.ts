import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRouter from './app/modules/users/user.router'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Application is running 🚀')
})

export default app

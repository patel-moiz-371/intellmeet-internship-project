import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import { rateLimit } from 'express-rate-limit'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './modules/auth/auth.routes'
import 'dotenv/config'

const app = express()

app.use(helmet())
app.use(mongoSanitize())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
})
app.use('/api', limiter)

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/health', (_, res) => {
  res.json({ status: 'OK', app: 'IntellMeet API', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)

// Global error handler — must always be last
app.use(errorHandler)

export default app
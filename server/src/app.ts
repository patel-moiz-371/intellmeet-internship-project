import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './modules/auth/auth.routes'
import googleRoutes from './modules/auth/google.routes'
import passport from './config/passport'
import taskRoutes from './modules/tasks/task.routes'
import userRoutes from './modules/users/user.routes'
import meetingRoutes from './modules/meetings/meeting.routes'
const app = express()

// Security headers
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
})
app.use('/api', limiter)

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))

// Body parsers
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Passport
app.use(passport.initialize())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'OK', app: 'IntellMeet API', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/auth', googleRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/meetings', meetingRoutes)

// Global error handler
app.use(errorHandler)

export default app
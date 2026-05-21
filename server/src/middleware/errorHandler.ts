import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  if ((err as any).code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'This email is already registered.',
    })
  }

  console.error('Unexpected error:', err)
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
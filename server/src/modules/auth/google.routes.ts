import { Router, Request, Response } from 'express'
import passport from '../../config/passport'
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/tokenUtils'
import { User } from '../users/user.model'

const router = Router()

// Step 1 — Redirect to Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
)

// Step 2 — Google calls this after login
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'http://localhost:3000/login?error=google_failed',
  }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as any

      // Generate tokens
      const accessToken = generateAccessToken({
        userId: user._id.toString(),
        role: user.role,
      })
      const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
        role: user.role,
      })

      // Save refresh token
      await User.findByIdAndUpdate(user._id, { refreshToken })

      // Send refresh token as cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      // Redirect to frontend with access token
      res.redirect(
        `http://localhost:3000/auth/callback?token=${accessToken}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=${user.role}&id=${user._id}`
      )
    } catch (error) {
      res.redirect('http://localhost:3000/login?error=google_failed')
    }
  }
)

export default router
import { Router, Request, Response } from 'express'
import passport from '../../config/passport'
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/tokenUtils'
import { User } from '../users/user.model'

const router = Router()

const CLIENT_URL =
  process.env.CLIENT_URL || 'http://localhost:3000'

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
    failureRedirect: `${CLIENT_URL}/login?error=google_failed`,
  }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as any

      const accessToken = generateAccessToken({
        userId: user._id.toString(),
        role: user.role,
      })

      const refreshToken = generateRefreshToken({
        userId: user._id.toString(),
        role: user.role,
      })

      await User.findByIdAndUpdate(user._id, { refreshToken })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
          process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      const callbackUrl = new URL('/auth/callback', CLIENT_URL)

      callbackUrl.searchParams.set('token', accessToken)
      callbackUrl.searchParams.set('name', user.name)
      callbackUrl.searchParams.set('email', user.email)
      callbackUrl.searchParams.set('role', user.role)
      callbackUrl.searchParams.set('id', user._id.toString())

      res.redirect(callbackUrl.toString())
    } catch {
      res.redirect(`${CLIENT_URL}/login?error=google_failed`)
    }
  }
)

export default router
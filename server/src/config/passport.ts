import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../modules/users/user.model'

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = process.env.GOOGLE_CALLBACK_URL

if (!clientID || !clientSecret || !callbackURL) {
  throw new Error('Missing Google OAuth credentials in .env file')
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value })

        if (user) {
          return done(null, user)
        }

        user = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          password: `google_${profile.id}`,
          avatar: profile.photos?.[0].value,
          role: 'member',
        })

        return done(null, user)
      } catch (error) {
        return done(error, undefined)
      }
    }
  )
)

export default passport
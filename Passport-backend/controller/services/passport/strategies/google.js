import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let result = profile?._json;
        let data = {
          googleId: profile.id,
          userName: result.name,
          ...(result?.email && { email: result?.email }),
          ...(result?.picture && { profilePic: result?.picture }),
        };

        return done(null, data);
      } catch (err) {
        return done(err);
      }
    }
  )
);

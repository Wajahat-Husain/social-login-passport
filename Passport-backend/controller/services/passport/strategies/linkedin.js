import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
      scope: ["openid", "profile", "email"],
      state: true,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let data = {
          linkedinId: profile.id,
          userName: profile.displayName,
          ...(profile?.email && { email: profile?.email }),
          ...(profile?.picture && { profilePic: profile?.picture }),
        };

        return done(null, data);
      } catch (err) {
        return done(err);
      }
    }
  )
);

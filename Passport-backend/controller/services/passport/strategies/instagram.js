import passport from "passport";
import { Strategy as InstagramStrategy } from "passport-instagram";

passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "/auth/instagram/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let data = {
          instagramId: profile.id,
          userName: profile.displayName,
          ...(profile?.emails && { email: profile?.emails[0]?.value }),
          ...(profile?.photos && { profilePic: profile?.photos[0]?.value }),
        };

        return done(null, data);
      } catch (err) {
        return done(err);
      }
    }
  )
);

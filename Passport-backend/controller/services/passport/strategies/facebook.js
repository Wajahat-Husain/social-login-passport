import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "picture", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let result = profile?._json;
        let data = {
          facebookId: profile.id,
          userName: result.name,
          ...(result?.email && { email: result?.email }),
          ...(result?.picture?.data && {
            profilePic: result?.picture?.data?.url,
          }),
        };

        return done(null, data);
      } catch (err) {
        return done(err);
      }
    }
  )
);

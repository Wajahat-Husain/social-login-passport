import passport from "passport";
import { Strategy as TwitterStrategy } from "@superfaceai/passport-twitter-oauth2";

passport.use(
  new TwitterStrategy(
    {
      clientType: "confidential",
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: '/auth/twiter/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let data = {
          twitterId: profile.id,
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

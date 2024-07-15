import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let data = {
          discordId: profile.id,
          userName: profile.global_name,
          ...(profile?.email && { email: profile?.email }),
          ...(profile?.avatar && {
            profilePic: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          }),
        };

        return done(null, data);
      } catch (err) {
        return done(err);
      }
    }
  )
);

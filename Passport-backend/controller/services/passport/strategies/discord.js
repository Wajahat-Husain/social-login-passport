import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

// Configure Discord OAuth strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID, // Discord App ID
      clientSecret: process.env.DISCORD_CLIENT_SECRET, // Discord App Secret
      callbackURL: "/auth/discord/callback", // Callback URL after authentication
      scope: ["identify", "email"], // Discord API scopes to request
      passReqToCallback: true, // Allows passing the request to the callback function
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Prepare data object with profile information
        let data = {
          discordId: profile.id, // Discord user ID
          userName: profile.global_name, // Discord username
          ...(profile?.email && { email: profile?.email }), // Include email if available
          ...(profile?.avatar && {
            profilePic: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`, // Construct avatar URL
          }),
          accessToken, // Store access token
        };

        // Custom logic can be added here to process profile data as needed

        // Return data to passport for authentication process completion
        return done(null, data);
      } catch (err) {
        // Handle any errors that occur during profile processing
        return done(err);
      }
    }
  )
);
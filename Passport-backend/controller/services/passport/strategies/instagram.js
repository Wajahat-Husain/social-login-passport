import passport from "passport";
import { Strategy as InstagramStrategy } from "passport-instagram";

// Configure Instagram OAuth strategy
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID, // Instagram Client ID
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET, // Instagram Client Secret
      callbackURL: "/auth/instagram/callback", // Callback URL after authentication
      passReqToCallback: true, // Allows passing the request to the callback function
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Prepare data object with profile information
        let data = {
          instagramId: profile.id, // Instagram user ID
          userName: profile.displayName, // User's display name
          ...(profile?.emails && { email: profile?.emails[0]?.value }), // Include email if available
          ...(profile?.photos && { profilePic: profile?.photos[0]?.value }), // Include profile picture if available
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

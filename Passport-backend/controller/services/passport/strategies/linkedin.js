import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

// Configure LinkedIn OAuth strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID, // LinkedIn Client ID
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET, // LinkedIn Client Secret
      callbackURL: "/auth/linkedin/callback", // Callback URL after authentication
      scope: ["openid", "profile", "email"], // LinkedIn API scopes to request
      state: true, // Enables state parameter for CSRF protection
      passReqToCallback: true, // Allows passing the request to the callback function
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Prepare data object with profile information
        let data = {
          linkedinId: profile.id, // LinkedIn user ID
          userName: profile.displayName, // User's display name
          ...(profile?.email && { email: profile?.email }), // Include email if available
          ...(profile?.picture && { profilePic: profile?.picture }), // Include profile picture if available
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
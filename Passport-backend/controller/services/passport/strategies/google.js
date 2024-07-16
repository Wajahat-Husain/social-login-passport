import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret
      callbackURL: "/auth/google/callback", // Callback URL after authentication
      passReqToCallback: true, // Allows passing the request to the callback function
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let result = profile?._json; // Extract JSON data from profile

        // Prepare data object with extracted profile information
        let data = {
          googleId: profile.id, // Google user ID
          userName: result.name, // User's name
          ...(result?.email && { email: result?.email }), // Include email if available
          ...(result?.picture && { profilePic: result?.picture }), // Include profile picture if available
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
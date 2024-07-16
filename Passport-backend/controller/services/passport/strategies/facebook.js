import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

// Configure Facebook OAuth strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID, // Facebook App ID
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // Facebook App Secret
      callbackURL: "/auth/facebook/callback", // Callback URL after authentication
      profileFields: ["id", "displayName", "picture", "email"], // Fields to retrieve from user profile
      passReqToCallback: true, // Allows passing the request to the callback function
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let result = profile?._json; // Extract JSON data from profile

        // Prepare data object with extracted profile information
        let data = {
          facebookId: profile.id,
          userName: result.name,
          ...(result?.email && { email: result?.email }), // Include email if available
          ...(result?.picture?.data && {
            profilePic: result?.picture?.data?.url, // Include profile picture URL if available
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
import passport from "passport";

// Import OAuth strategies
import "./strategies/google.js";
import "./strategies/facebook.js";
import "./strategies/instagram.js";
import "./strategies/twitter.js";
import "./strategies/linkedin.js";
import "./strategies/discord.js";

// Serialize user instance to the session
passport.serializeUser((user, done) => {
  // If using a database, serialize user ID instead of the entire user object
  done(null, user);
});

// Deserialize user instance from the session
passport.deserializeUser((obj, done) => {
  try {
    // If using a database, retrieve the user from the database using the serialized user ID
    done(null, obj);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

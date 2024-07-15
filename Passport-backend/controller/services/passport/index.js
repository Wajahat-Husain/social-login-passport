import passport from "passport";

// Import strategies
import "./strategies/google.js";
import "./strategies/facebook.js";
import "./strategies/instagram.js";
import "./strategies/twitter.js";
import "./strategies/linkedin.js";
import "./strategies/discord.js";

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  try {
    done(null, obj);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

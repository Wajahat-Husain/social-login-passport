import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./controller/services/passport/index.js"; // Assuming your Passport configuration is exported from this path
import requestLogger from "./controller/middlewares/requestLogger.js";
import errorLogger from "./controller/middlewares/errorLogger.js";
import errorHandler from "./controller/middlewares/errorHandler.js";
import { authEndpoints } from "./routes/authEndpoints.js"; // Assuming you have defined your authentication endpoints in this file
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "5mb" })); // JSON body parser with a limit
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
); // URL-encoded body parser with a limit
app.use(
  session({
    secret: "keyboard cat", // Session secret (replace with a more secure secret)
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);
app.use(requestLogger); // Custom middleware for logging requests

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Register Authentication Routes
authEndpoints.forEach(({ path, method, handler, postAuth }) => {
  app[method]( // Register each endpoint with its method and handler
    path,
    handler,
    postAuth ? postAuth : (req, res) => res.json({ user: req.user }) // Default handler to respond with user info after authentication
  );
});

// Error handling middleware
app.use(errorLogger); // Custom middleware for logging errors
app.use(errorHandler); // Global error handler middleware

const PORT = process.env.PORT || 9900; // Default port or from environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

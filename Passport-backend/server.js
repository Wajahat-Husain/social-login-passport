import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./controller/services/passport/index.js";
import requestLogger from "./controller/middlewares/requestLogger.js";
import errorLogger from "./controller/middlewares/errorLogger.js";
import errorHandler from "./controller/middlewares/errorHandler.js";
import { authEndpoints } from "./routes/authEndpoints.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);
app.use(requestLogger);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Register Authentication Routes
authEndpoints.forEach(({ path, method, handler, postAuth }) => {
  app[method](
    path,
    handler,
    postAuth ? postAuth : (req, res) => res.json({ user: req.user })
  );
});

// Error handling
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 9900;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

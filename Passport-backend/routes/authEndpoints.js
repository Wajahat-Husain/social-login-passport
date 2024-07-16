import passport from '../controller/services/passport/index.js'; // Assuming Passport configuration is exported from this path
import { handlePostAuthRedirect } from '../controller/services/handlePostAuthRedirect.js'; // Assuming a function to handle post-authentication redirection

// Helper function for creating authentication endpoints
const createAuthEndpoint = (provider, scope = []) => ({
    path: `/auth/${provider}`, // Path for authentication endpoint
    method: 'get', // HTTP method (GET for authentication flow)
    handler: (req, res, next) => {
        passport.authenticate(provider, { scope, passReqToCallback: true })(req, res, next); // Initiate authentication flow using Passport
    },
});

// Helper function for creating callback endpoints
const createCallbackEndpoint = provider => ({
    path: `/auth/${provider}/callback`, // Callback URL for the provider
    method: 'get', // HTTP method (GET for callback handling)
    handler: passport.authenticate(provider, { failureRedirect: process.env.FAILURE_REDIRECT_URL }), // Passport middleware to handle authentication callback
    postAuth: handlePostAuthRedirect, // Function to handle post-authentication redirection
});

// Register Passport.js authentication routes
const authEndpoints = [
    // Facebook authentication endpoints
    createAuthEndpoint('facebook', ['email']),
    createCallbackEndpoint('facebook'),

    // Google authentication endpoints
    createAuthEndpoint('google', ['profile', 'email']),
    createCallbackEndpoint('google'),

    // LinkedIn authentication endpoints
    createAuthEndpoint('linkedin', ['openid', 'profile', 'email']),
    createCallbackEndpoint('linkedin'),

    // Discord authentication endpoints
    createAuthEndpoint('discord', ['identify', 'email']),
    createCallbackEndpoint('discord'),

    // Twitter authentication endpoints
    createAuthEndpoint('twitter', ['tweet.read', 'users.read', 'offline.access']),
    createCallbackEndpoint('twitter'),

    // Instagram authentication endpoints
    createAuthEndpoint('instagram'),
    createCallbackEndpoint('instagram'),

    // Telegram authentication endpoints
    createAuthEndpoint('telegram'),
    createCallbackEndpoint('telegram'),
];

export { authEndpoints };
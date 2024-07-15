import passport from '../controller/services/passport/index.js';
import { handlePostAuthRedirect } from '../controller/services/handlePostAuthRedirect.js';

// Helper function for creating auth endpoints
const createAuthEndpoint = (provider, scope = []) => ({
    path: `/auth/${provider}`,
    method: 'get',
    handler: (req, res, next) => {
        req.session.token = req.query.token || null;
        req.session.state = req.query.state || null;
        passport.authenticate(provider, { scope, passReqToCallback: true })(req, res, next);
    },
});

const createCallbackEndpoint = provider => ({
    path: `/auth/${provider}/callback`,
    method: 'get',
    handler: passport.authenticate(provider, { failureRedirect: process.env.FAILURE_REDIRECT_URL }),
    postAuth: handlePostAuthRedirect,
});

// Register Passport.js authentication routes
const authEndpoints = [
    createAuthEndpoint('facebook', ['email']),
    createCallbackEndpoint('facebook'),

    createAuthEndpoint('google', ['profile', 'email']),
    createCallbackEndpoint('google'),

    createAuthEndpoint('linkedin', ['openid', 'profile', 'email']),
    createCallbackEndpoint('linkedin'),

    createAuthEndpoint('discord', ['identify', 'email']),
    createCallbackEndpoint('discord'),

    createAuthEndpoint('twitter', ['tweet.read', 'users.read', 'offline.access']),
    createCallbackEndpoint('twitter'),

    createAuthEndpoint('instagram'),
    createCallbackEndpoint('instagram'),

    createAuthEndpoint('telegram'),
    createCallbackEndpoint('telegram'),
];

export { authEndpoints };

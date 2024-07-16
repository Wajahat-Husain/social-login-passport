# Social Login with Passport.js

## Read More
For a detailed guide on setting up social login with Passport.js, check out my article on Medium by clicking:

[![Social Login with Passport.js](https://miro.medium.com/v2/resize:fit:786/format:webp/1*y3cku4be4K1hXdlHdf_WLg.jpeg)](https://medium.com/@Wajahat_Hussain_/streamlining-social-authentication-in-node-js-with-passport-js-6f3bcb6659be)


## Overview
This repository provides a comprehensive implementation of social login using Passport.js for various platforms, including Facebook, Instagram, Google, Twitter, Discord, and LinkedIn. It is designed for Node.js applications to ensure a smooth authentication process across multiple social platforms.

## Features
- OAuth integration with Facebook, Instagram, Google, Twitter, Discord, and LinkedIn
- Easy-to-follow setup and configuration
- Seamless user authentication flow
- Customizable endpoints and redirection after authentication

## Prerequisites
- Node.js
- npm or yarn

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Wajahat-Husain/social-login-passport.git
    cd social-login-passport
    ```

2. Install dependencies

   backend:
    ```bash
    cd Passport-backend
    npm i
    ```

    frontend:
    ```bash
    cd Passport-frontend
    npm i
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your OAuth provider credentials

    backend:
    ```plaintext
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    FACEBOOK_CLIENT_ID=your-facebook-client-id
    FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
    TWITTER_CLIENT_ID=your-twitter-client-id
    TWITTER_CLIENT_SECRET=your-twitter-client-secret
    DISCORD_CLIENT_ID=your-discord-client-id
    DISCORD_CLIENT_SECRET=your-discord-client-secret
    LINKEDIN_CLIENT_ID=your-linkedin-client-id
    LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
    INSTAGRAM_CLIENT_ID=your-instagram-client-id
    INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
    CLIENT_URL=your-success-redirect-url
    FAILURE_REDIRECT_URL=your-fail-redirect-url
    ENCRYPTION_KEY=your-encryption-key
    PORT=9900
    ```

    frontend:
    ```plaintext
    VITE_ENCRYPTION_KEY=your-encryption-key
    ```

4. Start the server

    backend:
    ```bash
    npm start
    ```
    or
    ```bash
    npm run dev 
    ```

    frontend:
    ```bash
    npm run dev 
    ```

## Usage
### Authentication Routes
- **Facebook**: `/auth/facebook`
- **Google**: `/auth/google`
- **Twitter**: `/auth/twitter`
- **Instagram**: `/auth/instagram`
- **Discord**: `/auth/discord`
- **LinkedIn**: `/auth/linkedin`

Each route will redirect to the corresponding OAuth provider's login page. After successful authentication, users will be redirected back to the specified callback URL.

### Contributing
Feel free to submit issues or pull requests. We welcome contributions from the community!

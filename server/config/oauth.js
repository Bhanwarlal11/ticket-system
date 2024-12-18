// config/oauth.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Assuming the User model is in the models folder
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Google OAuth configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // Define a callback URL in .env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create a new user if not found
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });

          await user.save();
        }

        // Return the user to be serialized
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user to save in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

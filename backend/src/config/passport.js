// backend/config/passport.js
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Debugging environment variables
console.log('🔧 GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '[OK]' : '[MISSING]');
console.log('🔧 GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '[OK]' : '[MISSING]');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('🌐 Google profile received:', profile);

        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          console.log('👤 Creating new user from Google profile...');
          user = new User({
            username: profile.emails[0].value.split('@')[0],
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id,
            role: 'owner', // Default role; 
            phone: '',
          });
          await user.save();
          console.log('✅ New user saved:', user);
        } else {
          console.log('✅ Existing user found:', user);
        }

        done(null, user);
      } catch (error) {
        console.error('❌ Error during Google OAuth strategy:', error);
        done(error, null);
      }
    }
  )
);

module.exports = passport;
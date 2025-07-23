// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ 
    userId: user._id, 
    id: user._id,  // Add this for consistency
    role: user.role 
  }, JWT_SECRET, { expiresIn: '1h' });
};

// Registration route
router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role')
      .isIn(['owner', 'builder', 'supplier'])
      .withMessage('Invalid role')
      .customSanitizer((value) => value.toLowerCase()),
  ],
  async (req, res) => {
    console.log('POST /api/auth/register hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, role, phone } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        name,
        role: role.toLowerCase(),
        phone: phone || '',
      });

      await newUser.save();

      const token = generateToken(newUser);

      res.status(201).json({
        message: 'User registered successfully',
        user: { 
          id: newUser._id, 
          username: newUser.username, 
          email: newUser.email, 
          name: newUser.name,
          role: newUser.role 
        },
        token,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    console.log('POST /api/auth/login hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.status(200).json({
        message: 'Login successful',
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email, 
          name: user.name,
          role: user.role 
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: 'http://localhost:5173/login?error=auth_failed' 
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      const user = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
      };
      
      // Redirect to frontend with token and user data
      const userData = encodeURIComponent(JSON.stringify(user));
      res.redirect(`http://localhost:5173/auth/callback?token=${token}&user=${userData}`);
    } catch (err) {
      console.error('Error in Google callback:', err);
      res.redirect('http://localhost:5173/login?error=auth_failed');
    }
  }
);

module.exports = router;
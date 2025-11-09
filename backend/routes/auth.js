import express from 'express';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, geminiApiKey } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email and password' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      geminiApiKey: geminiApiKey || ''
    });

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          geminiApiKey: user.geminiApiKey,
          openaiApiKey: user.openaiApiKey,
          perplexityApiKey: user.perplexityApiKey,
          claudeApiKey: user.claudeApiKey
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check for user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        geminiApiKey: user.geminiApiKey,
        openaiApiKey: user.openaiApiKey,
        perplexityApiKey: user.perplexityApiKey,
        claudeApiKey: user.claudeApiKey
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        geminiApiKey: req.user.geminiApiKey,
        openaiApiKey: req.user.openaiApiKey,
        perplexityApiKey: req.user.perplexityApiKey,
        claudeApiKey: req.user.claudeApiKey
      }
    });
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/auth/update-api-keys
// @desc    Update user's API keys for all providers
// @access  Private
router.put('/update-api-keys', protect, async (req, res) => {
  try {
    const { geminiApiKey, openaiApiKey, perplexityApiKey, claudeApiKey } = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (geminiApiKey !== undefined) user.geminiApiKey = geminiApiKey;
    if (openaiApiKey !== undefined) user.openaiApiKey = openaiApiKey;
    if (perplexityApiKey !== undefined) user.perplexityApiKey = perplexityApiKey;
    if (claudeApiKey !== undefined) user.claudeApiKey = claudeApiKey;
    
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        geminiApiKey: user.geminiApiKey,
        openaiApiKey: user.openaiApiKey,
        perplexityApiKey: user.perplexityApiKey,
        claudeApiKey: user.claudeApiKey
      }
    });
  } catch (error) {
    console.error('Update API keys error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;

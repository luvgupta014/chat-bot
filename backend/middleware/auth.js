import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      console.log(token);

      // Verify token - get secret at runtime, not import time
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        console.error('❌ JWT_SECRET is not set in environment variables');
        return res.status(401).json({ error: 'Server configuration error' });
      }
      const decoded = jwt.verify(token, JWT_SECRET);

      console.log(decoded);
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// Generate JWT Token
export const generateToken = (id) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET is not set in environment variables');
    throw new Error('JWT_SECRET must be set in .env file');
  }
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

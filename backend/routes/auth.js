const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

// Test database connection
router.get('/test-db', async (req, res) => {
  try {
    // This will throw an error if the database connection fails
    await mongoose.connection.db.admin().ping();
    res.json({ success: true, message: 'Database connection successful!' });
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

module.exports = router;
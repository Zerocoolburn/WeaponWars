// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
require('dotenv').config();

// Register new user
exports.register = [
  // Input validation and sanitization
  body('username').isAlphanumeric().trim().escape(),
  body('password').isLength({ min: 6 }).trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const [result] = await pool.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'Username already exists' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
    }
  },
];

// Login user
exports.login = [
  // Input validation and sanitization
  body('username').isAlphanumeric().trim().escape(),
  body('password').isLength({ min: 6 }).trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { username, password } = req.body;

    try {
      const [users] = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      const user = users[0];

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Create JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(200).json({ token, username: user.username });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
];

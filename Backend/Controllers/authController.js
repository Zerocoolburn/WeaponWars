const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const supabase = require('../db');
require('dotenv').config();

// Register new user
exports.register = [
  body('username').isAlphanumeric().trim().escape(),
  body('password').isLength({ min: 6 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, email, password: hashedPassword }]);

      if (error) throw error;

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Username or Email already exists' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  }
];

// Login user
exports.login = [
  body('username').isAlphanumeric().trim().escape(),
  body('password').isLength({ min: 6 }).trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username);

      if (error) throw error;

      const user = users[0];

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(200).json({ token, username: user.username });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
];

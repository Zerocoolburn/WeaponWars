// backend/models/User.js
const pool = require('../db');

class User {
  static async create(username, hashedPassword) {
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return users[0];
  }
}

module.exports = User;

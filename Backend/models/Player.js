// backend/models/Player.js
const pool = require('../db');

class Player {
  static async create(userId, username) {
    await pool.execute(
      'INSERT INTO players (userId, username, cash, currentCity, day) VALUES (?, ?, ?, ?, ?)',
      [userId, username, 10000, 'New York', 1]
    );
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM players WHERE userId = ?',
      [userId]
    );
    return rows[0];
  }

  static async update(player) {
    await pool.execute(
      'UPDATE players SET cash = ?, currentCity = ?, day = ? WHERE userId = ?',
      [player.cash, player.currentCity, player.day, player.userId]
    );
  }

  static async getLeaderboard() {
    const [rows] = await pool.execute(
      'SELECT username, cash FROM players ORDER BY cash DESC LIMIT 10'
    );
    return rows;
  }
}

module.exports = Player;

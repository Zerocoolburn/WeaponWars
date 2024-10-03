// backend/models/Inventory.js
const pool = require('../db');

class Inventory {
  static async addItem(userId, weaponId, amount, priceBought) {
    await pool.execute(
      'INSERT INTO inventories (userId, weaponId, amount, priceBought) VALUES (?, ?, ?, ?)',
      [userId, weaponId, amount, priceBought]
    );
  }

  static async getItems(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM inventories WHERE userId = ?',
      [userId]
    );
    return rows;
  }

  static async removeItem(userId, weaponId) {
    await pool.execute(
      'DELETE FROM inventories WHERE userId = ? AND weaponId = ? LIMIT 1',
      [userId, weaponId]
    );
  }
}

module.exports = Inventory;

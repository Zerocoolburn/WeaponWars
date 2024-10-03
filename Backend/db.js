// backend/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Database host
  user: process.env.DB_USER,       // Database user
  password: process.env.DB_PASS,   // Database password
  database: process.env.DB_NAME,   // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4', // Ensure proper encoding
});

module.exports = pool;

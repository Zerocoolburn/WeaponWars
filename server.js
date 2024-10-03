const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

// Root Route (handles '/')
app.get('/', (req, res) => {
  res.send('Welcome to WeaponWars!');
});

// Corrected paths to the API routes
app.use('/api/auth', require('./Backend/routes/authRoutes'));
app.use('/api/game', require('./Backend/routes/gameRoutes'));

// 404 Route (for undefined routes)
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

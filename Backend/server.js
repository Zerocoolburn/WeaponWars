const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/game', gameRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to WeaponWars!');
});

// Error Handling for non-existing routes
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');       // Security headers
const xss = require('xss-clean');       // Prevent XSS attacks
const cors = require('cors');           // Enable CORS
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/game', gameRoutes);

// Error Handler
app.use(errorHandler);

// Socket.io logic
require('./gameLogic/weaponWarsGame')(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

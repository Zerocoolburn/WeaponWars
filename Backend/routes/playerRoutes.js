// backend/routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const playerController = require('../controllers/playerController');

router.get('/', protect, playerController.getPlayer);
router.get('/leaderboard', playerController.getLeaderboard);

module.exports = router;

// backend/controllers/playerController.js
const Player = require('../models/Player');

exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findByUserId(req.user.id);
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Player.getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving leaderboard' });
  }
};

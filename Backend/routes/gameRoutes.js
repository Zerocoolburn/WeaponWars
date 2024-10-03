const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Update user's score
router.post('/update-score', async (req, res) => {
  const { username, score } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ score })
      .eq('username', username);

    if (error) throw error;

    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update score' });
  }
});

module.exports = router;

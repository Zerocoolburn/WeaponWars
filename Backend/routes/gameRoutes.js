// backend/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const gameController = require('../controllers/gameController');

router.post('/buy', protect, gameController.buyWeapon);
router.post('/sell', protect, gameController.sellWeapon);
router.post('/travel', protect, gameController.travelToCity);

module.exports = router;

// backend/controllers/gameController.js
const Game = require('../gameLogic/weaponWarsGame');

exports.buyWeapon = async (req, res) => {
  const { weaponId } = req.body;
  try {
    const updatedPlayer = await Game.buyWeapon(req.user.id, weaponId);
    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sellWeapon = async (req, res) => {
  const { weaponId } = req.body;
  try {
    const updatedPlayer = await Game.sellWeapon(req.user.id, weaponId);
    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.travelToCity = async (req, res) => {
  const { cityName } = req.body;
  try {
    const updatedPlayer = await Game.travelToCity(req.user.id, cityName);
    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// backend/gameLogic/weaponWarsGame.js
const Player = require('../models/Player');
const Inventory = require('../models/Inventory');

module.exports = (io) => {
  const weapons = [
    { id: 1, name: 'Handgun', basePrice: 350 },
    { id: 2, name: 'Assault Rifle', basePrice: 2000 },
    { id: 3, name: 'Sniper Rifle', basePrice: 7500 },
    { id: 4, name: 'Grenades', basePrice: 2500 },
  ];

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('joinGame', async (data) => {
      // Handle player joining
    });

    // Additional socket events
  });

  // Game functions
  const buyWeapon = async (userId, weaponId) => {
    const player = await Player.findByUserId(userId);
    const weapon = weapons.find((w) => w.id === weaponId);
    const price = calculatePrice(weapon.basePrice, player.currentCity);

    if (player.cash >= price) {
      await Inventory.addItem(userId, weaponId, 1, price);
      player.cash -= price;
      await Player.update(player);
      randomEvent(player);
      return player;
    } else {
      throw new Error('Not enough cash');
    }
  };

  const sellWeapon = async (userId, weaponId) => {
    const player = await Player.findByUserId(userId);
    const weapon = weapons.find((w) => w.id === weaponId);
    const inventoryItems = await Inventory.getItems(userId);
    const item = inventoryItems.find((i) => i.weaponId === weaponId);

    if (item) {
      const price = calculatePrice(weapon.basePrice, player.currentCity);
      await Inventory.removeItem(userId, weaponId);
      player.cash += price;
      await Player.update(player);
      randomEvent(player);
      return player;
    } else {
      throw new Error('You do not own this weapon');
    }
  };

  const travelToCity = async (userId, cityName) => {
    const player = await Player.findByUserId(userId);
    if (cities.includes(cityName)) {
      player.currentCity = cityName;
      player.day += 1;
      await Player.update(player);
      randomEvent(player);
      return player;
    } else {
      throw new Error('Invalid city');
    }
  };

  const randomEvent = (player) => {
    const eventChance = Math.random();
    if (eventChance < 0.1) {
      // Police raid
      player.cash -= 1000;
      if (player.cash < 0) player.cash = 0;
    } else if (eventChance < 0.2) {
      // Market fluctuation
      // Adjust weapon prices globally
    }
    // Additional random events
  };

  const calculatePrice = (basePrice, city) => {
    // Price calculation logic based on city and other factors
    return basePrice; // Simplified for this example
  };

  return { buyWeapon, sellWeapon, travelToCity };
};

// frontend/src/components/Game.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Game() {
  const [player, setPlayer] = useState(null);
  const [weapons, setWeapons] = useState([]);
  const [cities, setCities] = useState(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']);
  const [selectedCity, setSelectedCity] = useState('');
  const token = localStorage.getItem('token');
  const API_URL = '/api';

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchPlayerData();
      initializeGame();
    }
  }, []);

  const fetchPlayerData = async () => {
    try {
      const res = await axios.get(`${API_URL}/players`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlayer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const initializeGame = () => {
    setWeapons([
      { id: 1, name: 'Handgun', basePrice: 350 },
      { id: 2, name: 'Assault Rifle', basePrice: 2000 },
      { id: 3, name: 'Sniper Rifle', basePrice: 7500 },
      { id: 4, name: 'Grenades', basePrice: 2500 },
    ]);
  };

  const buyWeapon = async (weaponId) => {
    try {
      await axios.post(
        `${API_URL}/game/buy`,
        { weaponId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPlayerData();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const sellWeapon = async (weaponId) => {
    try {
      await axios.post(
        `${API_URL}/game/sell`,
        { weaponId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPlayerData();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const travelToCity = async () => {
    try {
      await axios.post(
        `${API_URL}/game/travel`,
        { cityName: selectedCity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPlayerData();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  if (!player) return <p>Loading...</p>;

  return (
    <div className="game">
      <h2>Welcome, {player.username}</h2>
      <p>Cash: ${player.cash}</p>
      <p>Current City: {player.currentCity}</p>
      <p>Day: {player.day}</p>

      <h3>Market</h3>
      <ul>
        {weapons.map((weapon) => (
          <li key={weapon.id}>
            {weapon.name} - ${weapon.basePrice}
            <button onClick={() => buyWeapon(weapon.id)}>Buy</button>
          </li>
        ))}
      </ul>

      <h3>Your Inventory</h3>
      {/* Inventory display code goes here */}

      <h3>Travel</h3>
      <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city}>{city}</option>
        ))}
      </select>
      <button onClick={travelToCity}>Travel</button>
    </div>
  );
}

export default Game;

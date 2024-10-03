// frontend/src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const API_URL = '/api/players/leaderboard';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await axios.get(API_URL);
      setLeaderboard(res.data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Global Leaderboard</h2>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.username}>
            {player.username} - ${player.cash}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;

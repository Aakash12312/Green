import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const data = await res.json();
        if (Array.isArray(data)) {
          const topTen = data.sort((a, b) => b.points - a.points).slice(0, 10);
          setLeaders(topTen);
        }
      } catch (err) {
        console.error("❌ Failed to load leaderboard:", err);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container text-center">
        <h1 className="leaderboard-title mb-5">🌿 GoGreen Quest Leaderboard</h1>

        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table table table-borderless">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaders.length > 0 ? (
                leaders.map((user, index) => (
                  <tr key={user._id || index} className="leader-row">
                    <td className="rank">
                      {index + 1 === 1
                        ? "🥇"
                        : index + 1 === 2
                        ? "🥈"
                        : index + 1 === 3
                        ? "🥉"
                        : index + 1}
                    </td>
                    <td className="player-name">{user.name}</td>
                    <td className="points">{user.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="loading-text">
                    Loading leaderboard...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

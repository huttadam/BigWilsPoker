// HomeLeaderboard.js

import React from 'react';
import './HomeLeaderboard.css';

const HomeLeaderboard = ({ players }) => {
  console.log(players);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <abbr title="position">Pos</abbr>
            </th>
            <th>Name</th>
            <th>
              <abbr title="played">Played</abbr>
            </th>
            <th>
              <abbr title="quads">Quads</abbr>
            </th>
            <th>
              <abbr title="seconds">🥈</abbr>
            </th>
            <th>
              <abbr title="Wins">🏆</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.n_name}</td>
              <td>{player.gamesPlayed}</td>
              <td>{player.quadWins}</td>
              <td>{player.seconds}</td>
              <td>{player.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeLeaderboard;

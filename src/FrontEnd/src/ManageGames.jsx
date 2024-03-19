import React, { useState } from 'react';
import './ManageGames.css'; // Import CSS file for styling

const ManageGames = ({ games, setGames, players, setPlayers }) => {
  const [playersPlaying, setPlayersPlaying] = useState([]);
  const [reservedPlayers, setReservedPlayers] = useState([]);
  
  const getPlayersNName = (playerId) => {
    const resPlayer = players.find((player) => playerId === player._id);
    return resPlayer ? resPlayer.n_name : 'Player not found';
  };

  const sortPlayersList = (playersDB, playingPlayers) => {
    return playersDB.filter(player => !playingPlayers.includes(player._id));
  };

  return (
    <div className='page-cont'>
      {games.filter(g => !g.isFinished).map((game, index) => (
        <div key={index} className="card">
          <img src="./src/assets/defaultProfile.jpeg" className="card-img-top" alt="Default profile"/>
          <div className="card-body">
            <h1 className="card-title">Date: {game.date}</h1>
            <h1>Playing</h1>
            <ol>
              {game.playersPlaying.map((playerId, index) => (
                <li key={index} className="list-item">
                  <span className="index">{index + 1}</span>
                  <span className="content">{getPlayersNName(playerId)}</span>
                  <button className="action-button drop-button">Drop</button>    
                </li>
              ))}
            </ol>
            <h1>Reserves</h1>
            <ol>
              {sortPlayersList(players, game.playersPlaying).map((player, index) => (
                <li key={player._id} className="list-item">
                  <span className="index">{index + 1}</span>
                  <span className="content">{player.n_name}</span>
                  <button className="action-button promote-button">Promote</button>
                </li>
              ))}
            </ol>
            <a href="#" className="edit-button">Complete</a>
          </div>
        </div>
      ))}
    </div>  
  );
};

export default ManageGames;



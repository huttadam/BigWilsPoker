import React from 'react';
import './Games.css';

const Games = ({ games, setGames, players, setPlayers }) => {

  // Sort games by date before rendering
  const sortedGames = games.filter(g => g.isFinished).sort((a, b) => new Date(b.date) - new Date(a.date));

  const getPlayersNName = (playerId) => {
    const resPlayer = players.find((player) => String(playerId) === String(player._id));
    console.log(resPlayer, playerId);
    return resPlayer ? resPlayer.n_name : 'Player not found';
  }

  return (
    <>
      <div className='page-cont'>
        {sortedGames.map((game, index) => (
          console.log(game),
          <div key={index} className="card">
            <img src="./src/assets/defaultProfile.jpeg" alt="default profile" className="card-img-top"/>
            <div className="card-body">
              <h1 className="card-title">Date: {game.date}</h1>
              {console.log(game.winner)}
              <p className="card-winner">Winner: {getPlayersNName(game.winner)} </p>
              <p className="card-runnerup">Runner Up: {getPlayersNName(game.runnerUp)}</p>
              <p className="card-eliminated1">Eliminated First: {getPlayersNName(game.firstEliminated)} </p>
              <p className="card-eliminated2">Eliminated Second: {getPlayersNName(game.secondEliminated)}</p>
              <a href="#" className="edit-button">Edit Game</a>
            </div>
          </div>
        ))}
      </div>  
    </>
  );
};

export default Games;


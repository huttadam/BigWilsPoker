import React from 'react';
import './Games.css';

const Games = ({ games, setGames, players, setPlayers }) => {

  const getPlayersNName = (playerId) => {
    const resPlayer = players.find((player) => playerId === player._id);
    return resPlayer ? resPlayer.n_name : 'Player not found';
  }


 

  return (
    <>
      <div className='page-cont'>
        {games.filter(g => g.isFinished == true).map((game, index) => (
          <div key={index} className="card">
            <img src="./src/assets/defaultProfile.jpeg" alt="default profile" className="card-img-top"/>
            <div className="card-body">
              <h1 className="card-title">Date: {game.date}</h1>
              <h2 className="card-winner">Winner: {getPlayersNName(game.winner)} </h2>
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


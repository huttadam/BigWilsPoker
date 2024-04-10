import React, { useState, useEffect } from 'react';
import './CreateGame.css';

const CreateGame = ({ games, setGames, players, setPlayers }) => {
  const [date, setDate] = useState('');
  const [playing, setPlaying] = useState([]);
  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    // Find the previous game that isFinished
    const previousFinishedGame = games.slice().reverse().find(game => game.isFinished);
  
    // If there's a previous finished game, set playingList to its playersPlaying
    const playingList = previousFinishedGame ? players.filter(player => previousFinishedGame.playersPlaying.includes(player._id)) : [];
  
    // Set reservedList to players not in the playingList
    const reservedList = players.filter(player => !playingList.map(p => p._id).includes(player._id));
  
    setPlaying(playingList.slice(0, 10)); // Limit playing list to 10 players
    setReserved(reservedList);
  }, [games, players]);


  const movePlayerToReserved = (index) => {
    const player = playing[index];
    const updatedGames = games.map(game => ({ ...game, playersPlaying: game.playersPlaying.filter(playerId => playerId !== player._id) }));
    setPlaying(prevPlaying => prevPlaying.filter((_, i) => i !== index));
    setReserved(prevReserved => [...prevReserved, player]);
    setGames(updatedGames);
  };

  const movePlayerToPlaying = (index) => {
    const player = reserved[index];
    if (playing.length < 10) {
      const updatedGames = games.map(game => ({
        ...game,
        playersPlaying: [...game.playersPlaying, player._id]
      }));
      setReserved(prevReserved => prevReserved.filter((_, i) => i !== index));
      setPlaying(prevPlaying => [...prevPlaying, player]);
      setGames(updatedGames);
    }
  };

  const handleSaveGame = () => {

    const newGame = {
      date: date,
      playersPlaying: playing
    };

    fetch('http://127.0.0.1:8888/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame),
    })
      .then((res) => res.json())
      .then((data) => setGames([...games, data]));

    setDate('');
  };


  return (
    <div className="page-cont">
      <div className="card">
        <div className="card-body">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="list">
            <div className="playing-list">
              <h2>Playing Players:</h2>
              <ul>
                {playing.map((player, index) => (
                  <li key={player._id} className="list-item">
                    <span className="content">{player.n_name}</span>
                    <button className="action-button" onClick={() => movePlayerToReserved(index)}>Drop</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reserved-list">
              <h2>Reserved Players:</h2>
              <ul>
                {reserved.map((player, index) => (
                  <li key={player._id} className="list-item">
                    <span className="content">{player.n_name}</span>
                    <button className="action-button" onClick={() => movePlayerToPlaying(index)}>Promote</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button className='save-button' onClick={handleSaveGame}>Create</button>
    </div>
  );
};

export default CreateGame;


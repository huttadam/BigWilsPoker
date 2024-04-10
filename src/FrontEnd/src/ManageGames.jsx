import React, { useState, useEffect } from 'react';
import './ManageGames.css'; // Import CSS file for styling
import CreateGame from './CreateGame';
import { Link } from 'react-router-dom'

const ManageGames = ({ games, setGames, players, setPlayers }) => {
  const [playing, setPlaying] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [finishedSettings, setFinishedSettings] = useState(false);

  const [winner, setWinner] = useState("")
  const [runnerUp, setRunnerUp] = useState("")
  const [firstOut, setFirstOut] = useState("")
  const [secondOut, setSecondOut] = useState("")
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!winner && playing.length > 0) {
      setWinner(playing[0]._id);
    }
    if (!runnerUp && playing.length > 0) {
      setRunnerUp(playing[0]._id);
    }
    if (!firstOut && playing.length > 0) {
      setFirstOut(playing[0]._id);
    }
    if (!secondOut && playing.length > 0) {
      setSecondOut(playing[0]._id);
    }
  }, [winner, runnerUp, firstOut, secondOut, playing]);



  useEffect(() => {
    // Separate players into playing and reserved lists
    const playingPlayers = games.filter(game => !game.isFinished).flatMap(game => game.playersPlaying);
    const playingList = players.filter(player => playingPlayers.includes(player._id)).slice(0, 10);
    const reservedList = players.filter(player => !playingPlayers.includes(player._id));
    setPlaying(playingList);
    setReserved(reservedList);
  }, [games, players]);

  const movePlayerToReserved = (index) => {
    const player = playing[index];
    const updatedGames = games.map(game => ({...game, playersPlaying: game.playersPlaying.filter(playerId => playerId !== player._id)}))
    
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

  const enterFinalDetails = () => {
    setFinishedSettings(!finishedSettings);

  }

  const handleIsDoneToggle = () => {
    setIsDone(!isDone)
  };

  const saveGameAsComplete = () => {
    const gameIndex = games.findIndex(g => !g.isFinished)
    const updatedGame = { ...games[gameIndex]};

    updatedGame.winner = winner;
    updatedGame.runnerUp = runnerUp;
    updatedGame.firstEliminated = firstOut;
    updatedGame.secondEliminated = secondOut;
    updatedGame.isFinished = isDone;

    console.log(updatedGame.winner)
    console.log(updatedGame.runnerUp)
    console.log(updatedGame.firstEliminated)
    console.log(updatedGame.secondEliminated)
    // console.log(updatedGame.isFinished)


    const updatedGames = [...games];
    console.log(updatedGames)

    // Replace the old game object with the updated one
    updatedGames[gameIndex] = updatedGame;
    console.log(updatedGame)

    // Update the state with the new games array
    setGames(updatedGames);

    fetch(`http://127.0.0.1:8888/games/${updatedGame._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGame),
      })
      .then(response => {
        if (response.ok) {
          // Handle successful response if needed
        } else {
          // Handle error response if needed
        }
      })
      .catch(error => {
        // Handle fetch error
      });
    
  }


  return (
    <div className='page-cont'>
      <button className="button" type="Link">
        <Link to={'/createGames'} element={<CreateGame games={games} setGames={setGames} players={players} setPlayers={setPlayers} />} >Create Game</Link>
      </button>
      {games.filter(g => !g.isFinished).map((game, index) => (
        <div key={index} className="card">
          <img src="./src/assets/defaultProfile.jpeg" className="card-img-top" alt="Default profile" />
          <div className="card-body">
            <h1 className="card-title">Date: {game.date}</h1>
            <h1>Playing</h1>
            <ol>
              {playing.map((player, playerIndex) => (
                <li key={playerIndex} className="list-item">
                  <span className="content">{player.n_name}</span>
                  <button className="action-button drop-button" onClick={() => movePlayerToReserved(playerIndex)}>Drop</button>
                </li>
              ))}
            </ol>
            <h1>Reserves</h1>
            <ol>
              {reserved.map((player, playerIndex) => (
                <li key={playerIndex} className="list-item">
                  {/* {console.log(reserved)} */}
                  <span className="content">{player.n_name}</span>
                  <button className="action-button promote-button" onClick={() => movePlayerToPlaying(playerIndex)}>Promote</button>
                </li>
              ))}
            </ol>
            <h1 href="#" className="drop-menu" onClick={enterFinalDetails}>Game details</h1>
            <div>
              {finishedSettings && (
                <>
                  <div>
                    <h2>Winner:</h2>
                    <select onChange={e => setWinner(e.target.value)}>
                      {playing.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.n_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h2>Runner Up:</h2>
                    <select onChange={e => setRunnerUp(e.target.value)}>
                      {playing.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.n_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h2>First Eliminated:</h2>
                    <select onChange={e => setFirstOut(e.target.value)}>
                      {playing.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.n_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h2>Second Eliminated:</h2>
                    <select onChange={e => setSecondOut(e.target.value)}>
                      {playing.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.n_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h2>Game Complete:</h2>
                    <label>
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={handleIsDoneToggle}
                      />
                    </label>
                  </div>
                  <a href="#" className="edit-button" onClick={saveGameAsComplete}>Complete</a>
                </>
              )}
            </div>
            <a href="#" className="edit-button">Send Message</a>
          </div>
        </div>
      ))}
    </div>
  );
    
}

export default ManageGames;




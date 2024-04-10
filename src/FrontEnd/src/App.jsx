import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar.jsx';
import HomeLeaderboard from './HomeLeaderboard.jsx';
import Games from "./Games.jsx";
import Timer from './Timer.jsx';
import Players from './Players.jsx';
import NewPlayer from "./NewPlayer.jsx";
import ManageGames from "./ManageGames.jsx";
import CreateGame from "./CreateGame.jsx";
import LogIn from "./LogIn.jsx"; // Import the Login component

function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8888/games', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.log('Failed to find Games');
        }
      } catch (error) {
        console.error('Error finding Games:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8888/players', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPlayers(data);
        } else {
          console.log('Failed to find Players');
        }
      } catch (error) {
        console.error('Error finding Players:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    const userIsLoggedIn = localStorage.getItem('token') !== null;
    setIsLoggedIn(userIsLoggedIn);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/* Render Navbar only if user is logged in */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Render Login component if user is not logged in */}
        {!isLoggedIn && <Route path="/" element={<LogIn onLogin={handleLogin} />} />}
        {/* Render routes if user is logged in */}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Navigate to="/home"/>} />
            <Route path="/home" element={<HomeLeaderboard players={players} />} />
            <Route path="/games" element={<Games games={games} setGames={setGames} players={players} setPlayers={setPlayers} />} />
            <Route path="/blinds" element={<Timer />} />
            <Route path="/players" element={<Players players={players} setPlayers={setPlayers} />} />
            <Route path="/newPlayer" element={<NewPlayer players={players} setPlayers={setPlayers} />} />
            <Route path="/manageGames" element={<ManageGames players={players} games={games} setPlayers={setPlayers} setGames={setGames} />} />
            <Route path="/createGames" element={<CreateGame games={games} setGames={setGames} players={players} setPlayers={setPlayers} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;






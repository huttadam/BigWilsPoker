import React, { useEffect, useState } from "react"
import './App.css'
import { BrowserRouter, Routes, Route,} from "react-router-dom"
import Timer from './Timer.jsx'
import Navbar from './Navbar.jsx'
import HomeLeaderboard from './HomeLeaderboard.jsx'
import Players from './Players.jsx'
import NewPlayer from "./NewPlayer.jsx"
import Games from "./Games.jsx"
import ManageGames from "./ManageGames.jsx"


function App(){
  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])


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


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path= "/" element = {<HomeLeaderboard players= {players} />} />
          <Route path = "/games" element = {<Games games = {games} setGames = {setGames} players = {players} setPlayers ={setPlayers}/>}/>
          <Route path= "/blinds" element = {<Timer/>} />
          <Route path= "/players" element = {<Players players = {players} setPlayers = {setPlayers}/>} />
          <Route path= "/newPlayer" element = {<NewPlayer players = {players} setPlayers = {setPlayers}/>}/>
          <Route path= "/manageGames" element = {<ManageGames players = {players} games = {games} setPlayers = {setPlayers} setGames = {setGames} />} />

         </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
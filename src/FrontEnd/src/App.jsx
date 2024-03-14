import React, { useEffect, useState } from "react"
import './App.css'
import { BrowserRouter, Routes, Route,} from "react-router-dom"
import Timer from './Timer.jsx'
import Navbar from './Navbar.jsx'
import HomeLeaderboard from './HomeLeaderboard.jsx'
import Players from './Players.jsx'
import NewPlayer from "./NewPlayer.jsx"
import Games from "./Games.jsx"


function App(){

  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])


  useEffect(() => {
    fetch('http://127.0.0.1:8888/players')
    .then((res) => res.json())
    .then((data) => setPlayers(data))
  })

  useEffect(() => {
    fetch('http://127.0.0.1:8888/games')
    .then((res) => res.json())
    .then((data) => setGames(data))
  })


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path= "/" element = {<HomeLeaderboard players= {players} />} />
          <Route path = "/games" element = {<Games games = {games} setGames = {setGames}/>}/>
          <Route path= "/blinds" element = {<Timer/>} />
          <Route path= "/players" element = {<Players players = {players} setPlayers = {setPlayers}/>} />
          <Route path= "/newPlayer" element = {<NewPlayer players = {players} setPlayers = {setPlayers}/>}/>

         </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App

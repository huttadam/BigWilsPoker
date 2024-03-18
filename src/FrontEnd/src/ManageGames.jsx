import React from 'react'

const ManageGames = ({games, setGames, players, setPlayers}) => {

     const getPlayersNName = (playerId) => {
      const resPlayer = players.find((player) => playerId === player._id);
      return resPlayer ? resPlayer.n_name : 'Player not found';
    }
  
    return (
      <>
        <div className='page-cont'>
          {games.filter(g => g.isFinished == false).map((game, index) => (
            <div key={index} className="card">
              <img src="./src/assets/defaultProfile.jpeg" className="card-img-top"/>
              <div className="card-body">
                <h1 className="card-title">Date: {game.date}</h1>
                <a href="#" className="edit-button">Complete</a>
              </div>
            </div>
          ))}
        </div>  
      </>
  )
}

export default ManageGames

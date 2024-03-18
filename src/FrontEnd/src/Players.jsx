import React from 'react';
import NewPlayer from './NewPlayer';
import { Link } from 'react-router-dom';
import './Players.css';

const Players = ({ players, setPlayers }) => {

  const handleDelete = async (id) => {    
    try {
      const response = await fetch(`http://127.0.0.1:8888/players/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPlayers(players.filter(player => player._id !== id));
        console.log('Player deleted successfully');
      } else {
        console.log('Failed to delete player');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <abbr title="first-name">First Name</abbr>
              </th>
              <th>
                <abbr title= "last-name"> Last Name</abbr>
              </th>
              <th>
                <abbr title="nick-name">Nick Name</abbr>
              </th>
              <th>
                <abbr title="mobile">Mobile</abbr>
              </th>
              <th>
                <abbr title="delete">Delete</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.f_name}</td>
                <td>{player.l_name}</td>
                <td>{player.n_name}</td>
                <td>{player.mobile}</td>
                <td>
                  <div onClick={() => handleDelete(player._id)}>❌</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/newPlayer" className='button-link'>Add New</Link>
    </>
  )
}

export default Players;

import React, { useState } from 'react';
import './NewPlayer.css'; // Assuming you named your CSS file as NewPlayer.css

const NewPlayer = ({ players, setPlayers }) => {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [nname, setNName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userNewPlayer = {
      f_name: fname,
      l_name: lname,
      n_name: nname,
      mobile: mobile,
    };

    fetch('http://127.0.0.1:8888/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userNewPlayer),
    })
      .then((res) => res.json())
      .then((data) => setPlayers([...players, data]));

    setFName('');
    setLName('');
    setNName('');
    setMobile('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="fname">First Name:</label>
          <input id="fname" type="text" value={fname} required onChange={(e) => setFName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="lname">Last Name:</label>
          <input id="lname" type="text" value={lname} required onChange={(e) => setLName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="nname">Nick Name:</label>
          <input id="nname" type="text" value={nname} required onChange={(e) => setNName(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Mobile:</label>
          <input id="mobile" type="text" value={mobile} required onChange={(e) => setMobile(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewPlayer;
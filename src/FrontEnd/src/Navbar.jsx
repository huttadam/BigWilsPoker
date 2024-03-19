import React, { useRef } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import logo from './assets/logo.png';
import bigWilsLogo from './assets/bigWilsLogo.png';

const Navbar = () => {
  const navbarRef = useRef();

  function toggleHamburger(evt) {
    evt.target.classList.toggle('is-active');
    navbarRef.current.classList.toggle('is-active');
  } // This is the proper place for the function closing brace.

  return (
    <nav className="navbar custom-navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/">
          <img src= {logo} alt="logo" />
        </Link>

        <img src= {bigWilsLogo} alt="logo" />

        <a role="button" onClick={toggleHamburger} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>


      
    
      <div id="navbarBasicExample" onClick={toggleHamburger} ref={navbarRef} className="navbar-menu">
        <div className="navbar-start">
          <Link to="/manageGames" className="navbar-item">Manage</Link>
          <Link to="/games" className="navbar-item">Games</Link>
          <Link to="/players" className="navbar-item">Players</Link>
          <Link to="/blinds" className="navbar-item">Blinds</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import './Header.css';
import logo from '../../assets/img/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container-1440 header-inner">
        <div className="header-left">
          <img src={logo} alt="Vizag Vegetables" />
          <span>Vizag Vegetables</span>
        </div>

        <nav className="header-right">
          <a href="#rythu">Rythubazar info</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;


import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="container-1440 header-inner">
        <NavLink to="/" className="header-left">
          <img src={logo} alt="Vizag Vegetables" />
          <span>Vizag Vegetables</span>
        </NavLink>

        <nav className="header-right">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/rythu-bazar">RythuBazar Info</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

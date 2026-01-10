
import React from 'react';
import './Footer.css';
import logo from '../../assets/img/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-1440 footer-inner">
        <div>
          <img src={logo} alt="" width="40" />
          <p>
            Daily Vizag Rythu Bazar vegetable, fruit & flower prices.
          </p>
        </div>

        <div>
          <h4>Categories</h4>
          <p>Vegetables</p>
          <p>Fruits</p>
          <p>Flowers</p>
        </div>

        <div>
          <h4>Services</h4>
          <p>Prices</p>
          <p>Rythu Bazar Info</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>support@vizagvegetables.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Vizag Vegetables
      </div>
    </footer>
  );
};

export default Footer;

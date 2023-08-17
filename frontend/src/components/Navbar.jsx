import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Zesty Zomato
        </Link>
        <ul className="nav-menu">
          {/* <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/menu" className="nav-links">
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/place-order" className="nav-links">
              Place Order
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/order-list" className="nav-links">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

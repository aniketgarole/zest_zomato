import React from 'react';
import '../styles/Homepage.css';
import Navbar from '../components/Navbar';

const HomePage = () => {
    return (
        <>
        <Navbar/>
      <div className="home-container">
        <div className="hero-content">
          <h1 className="hero-text">Welcome to Zesty Zomato</h1>
          <p className="hero-description">
            Explore our delicious menu and place your order with ease.
          </p>
        </div>
      </div>
        </>
    );
  };

export default HomePage;

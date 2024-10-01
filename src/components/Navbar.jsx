import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logoLink">
          <span role="img" aria-label="heart">❤️</span> CareMate
        </Link>
      </div>
      <div className="navLinks">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/dashboard" className="navLink">Dashboard</Link>
        <Link to="/health" className="navLink">Health Data</Link>
        <Link to="/calls" className="navLink">Appointment</Link>
        <Link to="/faqs" className="navLink">FAQS</Link>
      </div>
      <div className="userIcon">
        <Link to="/login" className="userLink">
          <span role="img" aria-label="user">👤</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

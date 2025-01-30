import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    if (location.pathname !== '/') {
      navigate(`/#${section}`);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <button onClick={() => handleNavigation('about')}>About</button>
        <button onClick={() => handleNavigation('skills')}>Skills</button>
        <button onClick={() => handleNavigation('projects')}>Projects</button>
        <button onClick={() => handleNavigation('contact')}>Contact</button>
      </div>
    </nav>
  );
}

export default Navbar;



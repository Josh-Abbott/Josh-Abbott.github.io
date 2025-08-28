import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import ProjectInfo from './components/ProjectInfo';
import './styles/global.css'; 

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <Router>
      <div className="app-container"> 
        <Navbar show={showNavbar} />
        <Routes>
          <Route path="/" element={<MainPage setShowNavbar={setShowNavbar} />} />
          <Route path="/projects/:projectId" element={<ProjectInfo setShowNavbar={setShowNavbar} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import ProjectInfo from './components/ProjectInfo';

function App() {
  const [showNavbar, setShowNavbar] = useState(false); // false until zoom is done

  return (
    <Router>
      <Navbar show={showNavbar} />
      <Routes>
        <Route path="/" element={<MainPage setShowNavbar={setShowNavbar} />} />
        <Route path="/projects/:projectId" element={<ProjectInfo />} />
      </Routes>
    </Router>
  );
}

export default App;

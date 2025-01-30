import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import ProjectInfo from './components/ProjectInfo';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects/:projectId" element={<ProjectInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
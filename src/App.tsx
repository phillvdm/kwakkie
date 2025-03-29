import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Fortune from './pages/Fortune';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fortune" element={<Fortune />} />
      </Routes>
    </Router>
  );
}

export default App;
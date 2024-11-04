import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FloorPlanExplorer from './components/FloorPlans/FloorPlanExplorer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/floor-plans" element={<FloorPlanExplorer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Home from './pages/home/home';  
import Study_Plan from './pages/study_plan/study_plan';
import Progress_Tracker from './pages/progress_tracker/progress_tracker';
import Credit from './pages/credit/credit';
import { Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Link to = "/home">
        <img
          className="logo"
          src="/logo.png"
          alt="FocusFlow"
          style={{position: 'absolute', top: '14px', left: '15px', width: '55px', height: 'auto', objectFit: 'contain'}}
        />  
      </Link>

      <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
              <Link to="/creators">
                <button>Creators of App</button>
              </Link>
            </div>
      

      </header>

      <div className="App-content">
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/study-plan" element={<Study_Plan />} />
        <Route path="/progress-tracker" element={<Progress_Tracker />} />
        <Route path="/credits" element={<Credit />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>



      <footer className="App-Footer">
        <p>© 2025 FocusFlow. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;


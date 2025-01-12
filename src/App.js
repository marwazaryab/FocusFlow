import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Home from './pages/home/home';  
import { Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul className="space-x-4">
            
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

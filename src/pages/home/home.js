import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <video
        className="intro_screen" 
        src="/intro_screen.mov" 
        autoPlay
        loop
        muted
        type="video/mov"
        style={{ position: 'absolute', top: 70, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <div className="content">
        <h1>FocusFlow!</h1>
        <p>Higher Grades, work quality and lower stress.</p>
        <p>Join your AI study buddy and say goodbye to overwhelming days.</p>

        <div className="button_container">

          <Link to="/study-plan">
            <button className="study_plan " >
              <p> Generate your personalized study plan here</p>
            </button>
          </Link>


        </div>
      </div>




    </div>
  );
}

export default Home;

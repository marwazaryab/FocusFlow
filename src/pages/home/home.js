import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <video
        className="intro_screen" //clas name is for css name to style section
        src="/intro_screen.mov" // TODO switch to mp4 file for more accomidation
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

          <Link to="/progress_tracker">
            <button className='progress_tracker'>
            <p> View your progress tracker here</p>
            </button>
          </Link>

          <Link to="tracker">
            <button className='tracker'>
              <p> View resources on your preferred subject</p>
            </button>
          </Link>



        </div>
      </div>




    </div>
  );
}

export default Home;

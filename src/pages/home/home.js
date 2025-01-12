import React from 'react';
import './home.css'; 

function Home() {
  return (
    <div className="home-page">
      <video 
        className="intro_screen" 
        src="/intro_screen.mov" // TODO switch to mp4 file for more accomidation
        autoPlay 
        loop 
        muted 
        type="video/mov"
        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}
      />
      <div className="content">
        <h1>FocusFlow!</h1>
        <p>Higher Grades, work quality and lower stress.</p>
        <p>Join your AI study buddy and say goodbye to overwhelming days.</p>
      </div>
    </div>
  );
}

export default Home;

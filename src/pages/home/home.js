import React from 'react';
import './home.css'; 

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
        style={{position: 'absolute', top: 70, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}
      />

      <div className="content">
        <h1>FocusFlow!</h1>
        <p>Higher Grades, work quality and lower stress.</p>
        <p>Join your AI study buddy and say goodbye to overwhelming days.</p>

        <div className = "button_container">

          <button className="study_plan " >

          <p> Generate your personalized study plan!</p>

          </button>


          <button className='progress_tracker'>

          <p> View your progress_tracker!</p>

          </button>


          <button className='tracker'>

          <p> Resources!</p>
          
          </button>



      </div>
      </div>

      


    </div>
  );
}

export default Home;

import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import './study_plan.css';

const StudyPlan = () => {
  const [goals, setGoals] = useState('');
  const [deadlines, setDeadlines] = useState('');
  const [preferences, setPreferences] = useState('');
  const [studyPlanData, setStudyPlanData] = useState({});
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
      
        const requestData = {
          goals,
          deadlines,
          preferences,
          date: date.toISOString(), 
        };
      
        try {
          const response = await fetch('http://localhost:5002/api/study_plan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (!response.ok) {
            throw new Error('errror msg: failed to fetch study plan');
          }
      
          const data = await response.json();
      
          setStudyPlanData((prev) => ({
            ...prev,
            [date.toLocaleDateString()]: data, 
          }));
      
          // Clear form inputs
          setGoals('');
          setDeadlines('');
          setPreferences('');
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      

// front end 
  return (
    <div className="study-plan-container">
      <div className="form-container">
        <h1>Generate Your Study Plan</h1>
        <p className="instructions">
          Fill out the fields below to receive a personalized study plan:
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="goals">Goals:</label>
            <textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Enter your study goals"
            />
          </div>

          <div className="input-group">
            <label htmlFor="deadlines">Deadlines:</label>
            <input
              type="text"
              id="deadlines"
              value={deadlines}
              onChange={(e) => setDeadlines(e.target.value)}
              placeholder="Enter your deadlines (mm/dd/yy)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="preferences">Preferences:</label>
            <textarea
              id="preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Enter your study preferences (short/long sessions etc)"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Add to Calendar'} 
          </button>
        </form>
      </div>

      <div className="calendar-container">
        <ReactCalendar
          onChange={handleDateChange}
          value={date}
          className="custom-calendar"
        />
      </div>

      {studyPlanData[date.toLocaleDateString()] && (
        <div className="study-plan-output">
          <h2>Study Plan for {date.toLocaleDateString()}:</h2>
          <div>
            <h3>Goals:</h3>
            <p>{studyPlanData[date.toLocaleDateString()].goals}</p>
          </div>
          <div>
            <h3>Deadlines:</h3>
            <p>{studyPlanData[date.toLocaleDateString()].deadlines}</p>
          </div>
          <div>
            <h3>Preferences:</h3>
            <p>{studyPlanData[date.toLocaleDateString()].preferences}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;

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

  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

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
      const response = await fetch('http://localhost:5003/api/study_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Error: failed to fetch study plan');
      }

      const data = await response.json();
      const { dailyTasks } = data;

      console.log('Returned studyPlanData:', dailyTasks);
      setStudyPlanData(dailyTasks || {});
      setGoals('');
      setDeadlines('');
      setPreferences('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = formatDate(date);

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
              placeholder="Enter your deadlines (mm/dd/yyyy)"
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
            {isLoading ? 'Generating...' : 'Generate Study Plan'}
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

      {studyPlanData && studyPlanData[formattedDate] ? (
        <div className="study-plan-output">
          <h2 className="plan-date">📅 Study Plan for {formattedDate}:</h2>
          <ul className="task-list">
            {studyPlanData[formattedDate]
              .split('\n')
              .filter((task) => task.trim() !== '')
              .map((task, index) => (
                <li key={index} className="task-item">
                  {task}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="study-plan-output">
          <h2>No study plan available for {formattedDate}</h2>
          <p>
            {studyPlanData && Object.keys(studyPlanData).length > 0
              ? 'Select a date with tasks in your study plan.'
              : 'Generate a study plan to display tasks.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;

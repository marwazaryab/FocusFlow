import express from 'express';
import bodyParser from 'body-parser'; // middleware for parsing incoming request bodies
import OpenAI from 'openai';
import cors from 'cors'; // middleware for enavle cors
import { config } from 'dotenv';


// initialization 
config();

const app = express(); // express instance

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
}));
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// function to calculate the number of days between two dates
const calculateDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

// format date as MM/DD/YYYY
const formatDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// API endpoint to generate a study plan - accepts a post
app.post('/api/study_plan', async (req, res) => {
  // extract data from request body
  const { goals, deadlines, preferences } = req.body;

  // validate input fields
  if (!goals || !deadlines || !preferences) {
    return res.status(400).send('Missing required fields: goals, deadlines, or preferences.');
  }

  const deadlineDate = new Date(deadlines); // convert deadlines string to a date objects
  const today = new Date(); // current date

  // validate date format
  if (isNaN(deadlineDate.getTime())) {
    return res.status(400).send('Invalid date format for deadlines. Use MM/DD/YYYY.');
  }

  const daysLeft = calculateDaysBetween(today, deadlineDate); // calculate days for the study plan

  // validate date is in the future
  if (daysLeft <= 0) {
    return res.status(400).send('Deadline must be in the future.');
  }

  // ai prompt after input fields are valid
  try {

    // prompt to pass to open ai api
    const prompt = `
    Create a personalized study plan with Pomodoro sessions for the following:
    - Goals: ${goals}
    - Deadlines: ${deadlines}
    - Preferences: ${preferences}
    - Number of study days: ${daysLeft}

    Please break the plan into manageable daily tasks, assigning specific study topics to each day until the deadline.
    Ensure each day's tasks are separated by new lines.
    `;

    // call openAI's API to generate plan
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    // extract the generated study plan
    const studyPlan = response.choices[0]?.message?.content?.trim();

    // error message if study plan is empty
    if (!studyPlan) {
      throw new Error('Failed to generate a study plan. OpenAI response was empty.');
    }

    // split into daily tasks
    const dailyTasks = splitStudyPlanIntoDays(studyPlan, daysLeft);

    // log the generated daily tasks for debugging
    console.log('Generated Daily Tasks:', dailyTasks);

    res.json({ dailyTasks }); // send the tasks as a JSON response back to the frontend
  } catch (error) {
    // error messages if plan goes wrong 
    console.error('Error generating study plan:', error.message);
    res.status(500).send('Error generating study plan. Please try again.');
  }
});

// split the study plan into daily tasks
const splitStudyPlanIntoDays = (studyPlan, daysLeft) => {
  const tasks = studyPlan.split('\n').filter((task) => task.trim() !== ''); // split tasks by new lines and remove empty lines
  const tasksPerDay = Math.ceil(tasks.length / daysLeft); // calculate number of tasks per day
  const dailyTasks = {}; // object to store tasks for the day

  // loop through number of days left and assign tasks to each day
  for (let i = 0; i < daysLeft; i++) {
    const dailyTask = tasks.slice(i * tasksPerDay, (i + 1) * tasksPerDay).join('\n'); // assign tasks for the day
    const date = new Date(); // current date
    date.setDate(date.getDate() + i); // set the date for each day in the future
    const formattedDate = formatDate(date); // format

    // store the tasks for each day 
    dailyTasks[formattedDate] = dailyTask || 'No specific tasks assigned for this day.'; 
  }

  return dailyTasks;
};

// Start server
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

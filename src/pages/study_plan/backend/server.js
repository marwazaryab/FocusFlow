import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Front end 
}));

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // TODO update this
});

// post request
app.post('/api/study_plan', async (req, res) => {  
  const { goals, deadlines, preferences } = req.body;

  try {
    //open ai prompt
    const prompt = `
    Create a personalized study plan:
    - Goals: ${goals}
    - Deadlines: ${deadlines}
    - Preferences: ${preferences}
  
    Break down the tasks into manageable chunks, and schedule them with Pomodoro sessions and breaks. Provide the schedule in a structured format.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
  
    res.json({ studyPlan: response.choices[0].message.content.trim() });

  } catch (error) {
    console.error('Error generating study plan:', error);
    res.status(500).send('Error generating study plan');
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

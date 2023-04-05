require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

// Serve static files
app.use(express.static('public'));

// Enable CORS for all routes
app.use(cors());

// Accept JSON payloads
app.use(express.json());

// Get the API key from environment variables
const apiKey = process.env.API_KEY;

console.log(`Loaded API key: ${apiKey}`);

// API route for chat
app.post('/api/chat', async (req, res) => {
  const message = req.body.message;

  // Call the ChatGPT API
  const responseMessage = await callChatGPTAPI(message, apiKey);

  res.json({ message: responseMessage });
});

async function callChatGPTAPI(message, apiKey) {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  
    const prompt = `User: ${message}\nAssistant:`;
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 1
      })
    });
  
    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return data.choices[0].text.trim();
    } else {
      console.error('Unexpected API response:', data);
      throw new Error('Unexpected API response');
    }
  }
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

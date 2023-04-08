require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKInMtfNTriHIQprIjJX9trRCM8tr1sYg",
  authDomain: "jon-s-portfolio.firebaseapp.com",
  projectId: "jon-s-portfolio",
  storageBucket: "jon-s-portfolio.appspot.com",
  messagingSenderId: "472363841545",
  appId: "1:472363841545:web:dcbfb7faed87347b8f20d8",
  measurementId: "G-10M12Y1FXM"
};

const admin = require('firebase-admin');

// Load the service account JSON
const serviceAccount = require('./jon-s-portfolio-firebase-adminsdk-zsbj6-6c13faed04.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
});

const storage = admin.storage();

// Serve static files
app.use(express.static('public'));

// Enable CORS for all routes
app.use(cors());

// Accept JSON payloads
app.use(express.json());

// Get the API key from environment variables
const apiKey = process.env.API_KEY;

//console.log(`Loaded API key: ${apiKey}`);

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

app.get('/images', async (req, res) => {
  try {
    const imageRefs = await storage.bucket().getFiles({ prefix: 'Compressed/' });
    const imageURLs = await Promise.all(
      imageRefs[0].map(async (file) => {
        const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
        return url;
      })
    );
    res.json(imageURLs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching images');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


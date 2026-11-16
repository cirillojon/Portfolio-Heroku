require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
//const { createProxyMiddleware } = require('http-proxy-middleware');


//app.use(express.static('public'));


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

// Service account comes from env: FIREBASE_SERVICE_ACCOUNT (raw JSON, e.g. Heroku config var)
// or FIREBASE_SERVICE_ACCOUNT_PATH (path to a local, git-ignored key file).
function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    return require(require('path').resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH));
  }
  throw new Error('Set FIREBASE_SERVICE_ACCOUNT or FIREBASE_SERVICE_ACCOUNT_PATH');
}
const serviceAccount = loadServiceAccount();

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

// Get the OpenAI API key from environment variables
const apiKey = process.env.API_KEY;

// Get the GoogleMaps api key from environment variables
const mapsKey = process.env.MAPS;

// Serve the maps api key to the client-side
app.get('/api/get-api-key', (req, res) => {
  res.json({ mapsKey: mapsKey });
});


//Github
const githubApiBaseUrl = 'https://api.github.com/users/';
const githubApiToken = process.env.GITHUB_API_TOKEN;

app.get('/api/github/:username', async (req, res) => {
    const username = req.params.username;

    const headers = githubApiToken ? { 'Authorization': `Bearer ${githubApiToken}` } : {};

    try {
        const userDataResponse = await fetch(`${githubApiBaseUrl}${username}`, { headers });
        const userData = await userDataResponse.json();

        const reposResponse = await fetch(`${githubApiBaseUrl}${username}/repos`, { headers });
        const repos = await reposResponse.json();

        res.json({
            userData,
            repos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch GitHub data' });
    }
});

//console.log(`Loaded maps key: ${mapsKey}`);

// API route for chat
app.post('/api/chat', async (req, res) => {
  const message = req.body.message;

  try {
    const responseMessage = await callChatGPTAPI(message, apiKey);
    res.json({ message: responseMessage });
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: 'Chat is currently unavailable' });
  }
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
      imageRefs[0].filter((file) => !file.name.endsWith('/')).map(async (file) => {
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

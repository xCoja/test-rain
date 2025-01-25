const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const PORT = 3000;


app.use(cors()); 

// Root route for "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Proxy Server! Use /leaderboard to get data.');
});


app.get('/leaderboard', async (req, res) => {
  try {
    const response = await axios.get('https://api.rain.gg/v1/affiliates/leaderboard', {
      headers: {
        'x-api-key': '0171fa32-067c-4d60-a296-d0b04862cda8',
        accept: 'application/json',
      },
      params: {
        start_date: '2025-01-24T23:00:00.00Z',
        end_date: '2025-02-07T23:00:00.00Z',
        type: 'wagered',
        code: 'jonji',
      },
    });

    // Log the raw apiresponse for debugging
    console.log("Raw API Response:", response.data.results);

    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ error: "No leaderboard data found" });
    }

    // Map the fields correctly
    const validUsers = response.data.results.filter(user => user.wagered && user.avatar && user.username);

    // Sort the valid users by 'wagered' in descending order
    const sortedUsers = validUsers.sort((a, b) => b.wagered - a.wagered);

    // limit up to top 10
    const topUsers = sortedUsers.slice(0, 10);

    console.log("Top Users:", topUsers);

    // Send the top 10 users as response
    res.json({ results: topUsers });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

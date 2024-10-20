// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const { city } = req.query; // Get city from query parameters
  const API_KEY = process.env.OPENWEATHER_API_KEY; // Store your API key in .env file

  if (!city) {
    return res.status(400).send('City name is required');
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data", error);
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

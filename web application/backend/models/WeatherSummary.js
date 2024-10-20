// backend/models/WeatherSummary.js
const mongoose = require("mongoose");

const WeatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: String, required: true }, // Store date as a string (e.g., 'YYYY-MM-DD')
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
});

const WeatherSummary = mongoose.model("WeatherSummary", WeatherSummarySchema);
module.exports = WeatherSummary;

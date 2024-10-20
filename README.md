# Project Overview

This project is divided into two parts:
1. **User Eligibility Rule Parser and Evaluator** - A system for parsing user eligibility rules and evaluating them based on Abstract Syntax Trees (AST).
2. **Weather Monitoring Application** - A weather monitoring app that fetches real-time weather data for Indian metro cities using the OpenWeatherMap API.

## Part 1: User Eligibility Rule Parser and Evaluator

This is a system designed to parse complex eligibility rules for users and evaluate them based on user data. The system uses Abstract Syntax Trees (AST) to represent and evaluate rules.

### Features
- Parse eligibility rules and represent them as ASTs.
- Evaluate rules dynamically based on user attributes (age, department, income, etc.).
- Supports logical operators like AND, OR, and conditional operators such as >, <, =.

### Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Parser**: Custom rule parser to generate ASTs.
- **State Management**: React useState hook for managing dynamic rule sets and user data.

### Setup Instructions

#### 1. Clone the Repository

```bash
https://github.com/sarthakgit21/zeotap-assisgnment
cd eligibility-rule-parser
```
2. Backend Setup

Install the necessary dependencies for the backend:

```bash

npm install
```
3. Frontend Setup

Navigate to the frontend directory and install the dependencies:

```bash

cd client
npm install
```
4. Environment Variables

Create a .env file in the root directory and add necessary configurations for the backend (like server port).
5. Run the Application

    Start the backend server:

```bash

npm start
```
    Start the frontend React app:

```bash

cd client
npm start
```
Example Rule

```txt

(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing') AND (salary > 50000 OR experience > 5)
```
This rule is parsed into an AST and evaluated based on user input.
API Endpoints

    POST /api/parse-rule: Parses the rule into an AST.
    POST /api/rules/evaluate_rule: Evaluates the AST based on user data.

Future Enhancements

    Support for more complex rule parsing (e.g., nested conditions).
    UI improvements for user experience.
    Integration with additional data sources.

Part 2: Weather Monitoring Application

This is a simple weather monitoring app built using the MERN stack (MongoDB, Express, React, Node.js). It fetches weather data from the OpenWeatherMap API based on city names and displays it on the frontend.
Features

    Fetch real-time weather data using city names.
    Displays current weather conditions, temperature, humidity, wind speed, cloud cover, and rain.
    Handles errors and loading states.
    Temperature is displayed in Celsius.

Technologies Used

    Frontend: React.js
    Backend: Node.js with Express.js
    API: OpenWeatherMap API for weather data
    HTTP Client: Axios for making API requests
    Environment Management: dotenv

Setup Instructions
1. Clone the Repository

```bash

git clone https://github.com/yourusername/weather-monitoring-app.git
cd weather-monitoring-app
```
2. Backend Setup

Install dependencies for the backend:

```bash

npm install
```
Create a .env file and add your OpenWeatherMap API key:

```bash

OPENWEATHER_API_KEY=your_openweathermap_api_key
```
Start the backend server:

```bash

npm start
```
3. Frontend Setup

Navigate into the client directory:

```bash

cd client
npm install
```
Start the React app:

```bash

npm start
```
API Endpoint

    GET /api/weather?city={city_name}: Fetches weather data for the specified city.

Example Request:

```bash

GET http://localhost:5000/api/weather?city=Mumbai
```
Future Enhancements

    Add the ability to dynamically change city (through user input).
    Display more weather data (e.g., wind gusts, pressure, sunrise, sunset).
    Support additional weather parameters like forecasts.



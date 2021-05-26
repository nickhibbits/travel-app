// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
const port = 8000;

const server = app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
});


// POST route used if departure date is within a week
app.post("/current", async function (req, res) {
    let data = req.body;
    console.log(data);

    const apiKey = process.env.WEATHERBIT_API_KEY;
    let lat = data.latitude;
    let lon = data.longitude;

    const result = await fetch("https://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+lon+"&key="+apiKey+"&units=I")
    try {
      const response = await result.json();
      console.log("test");
      console.log(response);
      newEntry = {
      temp: response.data[0].temp,
      description: response.data[0].weather.description
    };
    projectData["currentWeather"] = newEntry;
    } catch (error) {
    console.log("error", error);
  }
    console.log(projectData);
});

// POST route used if departure date is past a week
app.post("/future", async function (req, res) {
  let data = req.body;
  console.log(data);

  const apiKey = process.env.WEATHERBIT_API_KEY;
  let lat = data.latitude;
  let lon = data.longitude;

  const result = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"&lon="+lon+"&key="+apiKey+"&units=I")
  try {
    const response = await result.json();
    console.log(response);
    newEntry = {
      temp: response.data[0].temp,
      description: response.data[0].weather.description
  }
  projectData["futureWeather"] = newEntry;
  } catch (error) {
    console.log("error", error);
  }
  console.log(projectData);
});

// POST route to retrieve data from Pixbay
app.post("/picture", async function (req, res) {
    let data = req.body;

    const apiKey = process.env.PIXBAY_API_KEY;
    let city = data.city;

    const result = await fetch("https://pixabay.com/api/?key="+apiKey+"&q="+city+"&category=travel")
    try {
      const response = await result.json();
      console.log(response.hits[0]);
      response.hits[0].webformatHeight = 350;
      response.hits[0].webformatWidth = 375;
      newEntry = {
          picture: response.hits[0].webformatURL,
          height: response.hits[0].webformatHeight,
          width: response.hits[0].webformatWidth
    };
    projectData["pixbay"] = newEntry;
    } catch (error) {
    console.log("error", error);
  }
    console.log(projectData);
});

// GET route to retrieve data used to update UI
app.get("/updatePage", function (req, res) {
    res.send(projectData);
    console.log(projectData);
});

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to handle routes
const express = require("express");

// Start up an instance of app
const app = express();

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

/* Middleware*/
//Configure express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// POST route used if departure date is within a week
app.post("/current", async function (req, res) {
    let data = req.body;

    const apiKey = process.env.WEATHERBIT_API_KEY;
    let lat = data.latitude;
    let lon = data.longitude;

    const result = await fetch("https://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+lon+"&key="+apiKey+"&units=I")
    try {
      const response = await result.json();

      newEntry = {
      temp: response.data[0].temp,
      description: response.data[0].weather.description
    };
    projectData["currentWeather"] = newEntry;
    res.send(projectData);
    } catch (error) {
    console.log("error", error);
  }
});

// POST route used if departure date is past a week
app.post("/future", async function (req, res) {
  let data = req.body;

  const apiKey = process.env.WEATHERBIT_API_KEY;
  let lat = data.latitude;
  let lon = data.longitude;

  const result = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"&lon="+lon+"&key="+apiKey+"&units=I")
  try {
    const response = await result.json();
    // console.log(response);
    newEntry = {
      HiTemp: response.data[0].max_temp,
      LowTemp: response.data[0].low_temp,
  }
  projectData["futureWeather"] = newEntry;
  res.send(projectData);
  } catch (error) {
    console.log("error", error);
  }
});

// POST route to retrieve data from Pixbay
app.post("/picture", async function (req, res) {
    let data = req.body;

    const apiKey = process.env.PIXBAY_API_KEY;
    let city = data.city;

    const result = await fetch("https://pixabay.com/api/?key="+apiKey+"&q="+city+"&category=travel")
    try {
      const response = await result.json();
      const arr = response.hits[0];
      console.log(arr);
      if (arr === undefined || arr.length === 0) {
        newEntry = {
            picture: "No picture available",
        };
        console.log("No picture available");
        projectData["pixbay"] = newEntry;
        res.send(projectData);
      }
      else {
        newEntry = {
            picture: response.hits[0].webformatURL,
        };
        projectData["pixbay"] = newEntry;
        res.send(projectData);
      }
    } catch (error) {
    console.log("error", error);
  }
});

// GET route to retrieve data used to update UI
app.get("/updatePage", function (req, res) {
    res.send(projectData);
});

module.exports = app;

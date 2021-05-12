// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

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

    const apiKey = process.env.API_KEY;
    let lat = data.latitude;
    let lon = data.longitude;

    console.log(userInput);

    const result = await fetch("http://api.weatherbit.io/v2.0/current?lat="+lat+"lon="+lon+"&key="+apiKey)
    try {
      const response = await result.json();
      console.log(response);
      newEntry = {
      temp: response.temp
    };
    projectData["entry"] = newEntry;
    } catch (error) {
    console.log("error", error);
  }
    console.log(projectData);
});

// POST route used if departure date is past a week
app.post("/future", async function (req, res) {
  let data = req.body;
  console.log(data);

  const apiKey = process.env.API_KEY;
  let lat = data.latitude;
  let lon = data.longitude;

  console.log(userInput);

  const result = await fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"lon="+lon+"&key="+apiKey)
  try {
    const response = await result.json();
    console.log(response);
    newEntry = {
    // Extract relevant weather data
  }
  projectData["entry"] = newEntry;
  } catch (error) {
    console.log("error", error);
  }
  console.log(projectData);
});

// POST route to retrieve data from Pixbay
app.post("/picture", async function (req, res) {
    let data = req.body;
    console.log(data);

    // const apiKey = process.env.API_KEY; check how to set new API key
    let city = data.name;

    console.log(userInput);

    const result = await fetch("")
    try {
      const response = await result.json();
      console.log(response);
      newEntry = {

    };
    projectData["entry"] = newEntry;
    } catch (error) {
    console.log("error", error);
  }
    console.log(projectData);
});

// // GET route
// app.get("/updatePage", function (req, res) {
//     res.send(projectData);
//     console.log(projectData);
// });

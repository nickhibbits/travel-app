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


// GET route used if departure date is within a week
app.get("/current", function (req, res) {
    let data = req.body;
    console.log(data);

    // Call Weatherbit 'Current Weather API' with 'data' -- access 'data' to create relevant variables to place in the url, located in the fetch request on line 45
    const requestOptions = {
      method: 'GET',
    };

    const apiKey = process.env.API_KEY;
    // latitude variable
    // longitude variable

    console.log(userInput);

    const result = await fetch()
    try {
      const response = await result.json();
      console.log(response);
      newEntry = {
      // Extract relevant weather data
    };
    projectData["entry"] = newEntry;
    }
    console.log(projectData);
});

// GET route used if departure date is past a week
app.get("/future", function (req, res) {
  let data = req.body;
  console.log(data);

  // Call Weatherbit 'CForecast API (16 day / daily)' with 'data' -- access 'data' to create relevant variables to place in the url, located in the fetch request on line 75
  const requestOptions = {
    method: 'GET',
  };

  const apiKey = process.env.API_KEY;
  // latitude variable
  // longitude variable

  console.log(userInput);

  const result = await fetch()
  try {
    const response = await result.json();
    console.log(response);
    newEntry = {
    // Extract relevant weather data
  };
  projectData["entry"] = newEntry;
  }
  console.log(projectData);
});

// // GET route
// app.get("/updatePage", function (req, res) {
//     res.send(projectData);
//     console.log(projectData);
// });

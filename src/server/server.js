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

// POST route
app.post("/add", function (req, res) {
    let data = req.body;
    newEntry = {
        temperature: data.temperature,
        date: data.date,
        entry: data.entry,
    };
    projectData["entry"] = newEntry;
});

// GET route
app.get("/updatePage", function (req, res) {
    res.send(projectData);
    console.log(projectData);
});

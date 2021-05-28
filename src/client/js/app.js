/* Global Variables */
var moment = require('moment');
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q=";

// IN PROGRESS: performAction to GET coordinates of destination, compare deprture date with current date, and POST date-dependent weather with picture
function performAction(e) {
  e.preventDefault();
    let dest = document.getElementById("dest").value;
    getLocation(baseURL, dest)
    .then(function(data) {
      console.log(data.geonames[0].name);
      console.log(data.geonames[0].lat);
      console.log(data.geonames[0].lng);
      dateCompare(data)
    })
    .then(function(data){
      updateCurrent();
    //   if (dateCompare(data) = true) {
    //     updateCurrent()
    //   }
    //   else (dateCompare(data) = false) {
    //     updateFuture()
    //   }
    });
}

// Access the Geonames API to get coordinates of destination
const getLocation = async (baseURL, loc) => {
    const res = await fetch(baseURL + loc);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// set minimum date for current day
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
}
if(mm<10){
  mm='0'+mm
}
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("depart").setAttribute("min", today);
document.getElementById("return").setAttribute("min", today);
// Compare dates to get either current or future weather from Weatherbit
const dateCompare = function(data) {
    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
    };

    let userDate = new Date(document.getElementById("depart").value);
    // console.log(userDate);
    // console.log(new Date())
    let cutoffDate = new Date().addDays(7);
    let difference = userDate.getTime() - cutoffDate.getTime();
    let differenceByDay = difference / (1000 * 3600 * 24);
    if (differenceByDay <= 0) {
      console.log('input date is within 7 days of current date');
      // console.log(userDate);
      postWeather("http://localhost:8000/current", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
      postPicture("http://localhost:8000/picture", {city:data.geonames[0].name});
      return 1;
    }
    else if (differenceByDay > 0) {
      console.log('input date is more than 7 days away from current date');
      postWeather("http://localhost:8000/future", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
      postPicture("http://localhost:8000/picture", {city:data.geonames[0].name});
      return 0;
    }
}

// POST request to display data returned from Weatherbit API
const postWeather = async (url = "", newInfo = {} ) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(newInfo),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
        // console.log(newData);
    } catch (error) {
        console.log("error", error);
    }
};

// POST request to display picture returned from Pixbay
const postPicture = async (url = "", newInfo = {} ) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(newInfo),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
        // console.log(newData);
    } catch (error) {
        console.log("error", error);
    }
};

// Update UI for current weather forecast
const updateCurrent = async () => {
    const request = await fetch("http://localhost:8000/updatePage");
    let departDate = new Date(document.getElementById("depart").value);
    let returnDate = new Date(document.getElementById("return").value);
    console.log(departDate);
    console.log(returnDate);
    try {
        const allData = await request.json();
        let image = document.getElementById("image");
        image.setAttribute('src', `${allData.pixbay.picture}`);
        image.setAttribute('height', `${allData.pixbay.height}`);
        image.setAttribute('width', `${allData.pixbay.width}`);
        document.getElementById("tripDisplay").innerHTML = `Your trip from ${departDate.getMonth()+1}/${departDate.getDate()+1} to ${returnDate.getMonth()+1}/${returnDate.getDate()+1} is set!`;
        document.getElementById("weatherInput").innerHTML = `Current weather for your Destination is ${allData.currentWeather.temp}°F with ${allData.currentWeather.description}`;
    } catch (error) {
        console.log("error", error);
    }
};

// Update UI for future weather forecast
const updateFuture = async () => {
    const request = await fetch("http://localhost:8000/updatePage");
    let departDate = new Date(document.getElementById("depart").value);
    let returnDate = new Date(document.getElementById("return").value);
    try {
        const allData = await request.json();
        let image = document.getElementById("image");
        image.setAttribute('src', `${allData.pixbay.picture}`);
        image.setAttribute('height', `${allData.pixbay.height}`);
        image.setAttribute('width', `${allData.pixbay.width}`);
        document.getElementById("tripDisplay").innerHTML = `Your trip from ${departDate.getMonth()+1}/${departDate.getDate()+1} to ${returnDate.getMonth()+1}/${returnDate.getDate()+1} is set!`;
        document.getElementById("weatherInput").innerHTML = "Forecast for your Destination" + `${allData[0].futureWeather.temp}` + "°F";
        document.getElementById("weatherDescript").innerHTML = `${allData[0].futureWeather.description}`;
    } catch (error) {
        console.log("error", error);
    }
};

// Export performAction function for webpack entry
export { performAction }

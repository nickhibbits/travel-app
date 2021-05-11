/* Global Variables */
var moment = require('moment');
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q=";

// IN PROGRESS: performAction to GET coordinates of destination, compare deprture date with current date, and POST date-dependent weather with picture
function performAction(e) {
  e.preventDefault();
    let dest = document.getElementById("dest").value;
    getLocation(baseURL, dest)
    .then(function(data) {
      console.log(data.geonames[0].lat);
      console.log(data.geonames[0].lng);
      console.log(data.geonames[0].countryName);
      dateCompare(data)
      // .then(update())
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

// Compare dates to get either current or future weather from Weatherbit
function dateCompare(data) {
    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
    };

    let userDate = new Date(document.getElementById("depart").value);
    console.log(userDate);
    // console.log(new Date())
    let cutoffDate = new Date().addDays(7);
    // console.log(cutoffDate);
    let difference = userDate.getTime() - cutoffDate.getTime();
    let differenceByDay = difference / (1000 * 3600 * 24);
    // console.log(differenceByDay);
    if (differenceByDay <= 0) {
      console.log('input date is within 7 days of current date');
      postWeather("http://localhost:8000/current", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
    }
    else if (differenceByDay > 0) {
      console.log('input date is more than 7 days away from current date');
      postWeather("http://localhost:8000/future", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
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

//
// // Update UI
// const update = async () => {
//     const request = await fetch("/updatePage");
//     try {
//         const allData = await request.json();
//         // console.log(allData);
//         document.getElementById("temp").innerHTML = allData["entry"].temperature;
//         document.getElementById("date").innerHTML = allData["entry"].date;
//         document.getElementById("content").innerHTML = allData["entry"].entry;
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// Export performAction function for webpack entry
export { performAction }

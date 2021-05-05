/* Global Variables */
var moment = require('moment');
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q=";

// Create a new date instance dynamically with JS
// let d = new Date();

// IN PROGRESS: performAction to GET coordinates of destination, compare deprture date with current date, and POST date-dependent weather with picture
function performAction(e) {
  e.preventDefault();
    let dest = document.getElementById("dest").value;
    // update date variable to align with moment documentation
    let date = document.getElementById("depart").value;
    getLocation(baseURL, dest)
    .then(function(data) {
      // console.log(data.geonames[0].lat);
      // console.log(data.geonames[0].lng);
      // console.log(data.geonames[0].countryName);
      console.log(date);
      // console.log(d);

      // if(date > d){
      //     postWeather("/current", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
      //     console.log(`${date} is later than ${d}`)
      // } else if(date < d){
      //     postWeather("/future", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
      //     console.log(`${date} is later than ${d}`)
      // } else{
      //     console.log(`Both dates are equal`)
      // }

      dateCompare(d, date)
      // .then(update())
    });
}

// Export performAction function for webpack entry
export { performAction }

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

// Compare dates to get either current or future weather from Weatherbit
// TODO: 1. Update conditional to determine if the trip date is within 7 days of the current date... 2. Determine if getWeather needs to be POST or GET request
function dateCompare(d1, d2){
    const date1 = moment(d1).format("YYYY-MM-DD").add(7, "days");
    const date2 = moment(d2).format("YYYY-MM-DD")

    // if(date1 > date2){
    if(date1 >= date2){
        // postWeather("/current", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
        console.log(`${d2} is within 7 days of ${d1}`)
    } else if(date1 < date2) {
        // postWeather("/future", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
        console.log(`${d2} is more than 7 days away from ${d1}`)
    } else{
        console.log(`Both dates are equal`)
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

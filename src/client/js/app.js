/* Global Variables */
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q=";

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

// IN PROGRESS: performAction to GET coordinates of destination, compare deprture date with current date, return date-dependent weather with picture
function performAction(e) {
  event.preventDefault();
    let dest = document.getElementById("dest").value;
    let date = document.getElementById("depart").value;
    // console.log(d);
    getLocation(baseURL, dest)
    .then(function(data) {
      console.log(data.geonames[0].lat);
      console.log(data.geonames[0].lng);
      console.log(data.geonames[0].countryName);
      console.log(date);
      console.log(d);

      // TODO: conditional statement to use different routes as first arg in postWeather(), to call different Weatherbit url's on server-side, depending on departure date

      dateCompare(date, d)
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
// TODO: 1. Update conditional to determine if the trip date is within 7 days of the current date... 2. Fix first argument of postWeather to properly talk to the server, and then the according Weatherbit API.
function dateCompare(d1, d2){
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    if(date1 > date2){
        getWeather("/current", {country:data.geonames[0], latitude: data.geonames[0].lat, longitude:data.geonames[0].lng});
        console.log(`${d1} is later than ${d2}`)
    } else if(date1 < date2){
        getWeather("/future", {country:data.geonames[0], latitude: data.geonames[0].lat, longitude:data.geonames[0].lng});
        console.log(`${d2} is later than ${d1}`)
    } else{
        console.log(`Both dates are equal`)
    }
}

// POST request to display data returned from Weatherbit API
const getWeather = async (url = "", newInfo = {} ) => {
    const response = await fetch(url, {
        method: "GET",
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

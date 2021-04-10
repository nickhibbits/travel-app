/* Global Variables */
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q="

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

// IN PROGRESS, GET coordinates of destination, returns weather and a picture
function performAction(e) {
    let dest = document.getElementById("dest").value;
    // let feelings = document.getElementById("feelings").value;
    getLocation(baseURL, dest)
    .then(function (data) {
      console.log(data.geonames[0]);
        postWeather("/add", { country:data.geonames[0], latitude: data.geonames[0].lat, longitude:data.geonames[0].lng});
        // update();
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

// POST request to display data returned from Weatherbit API
const postWeather = async (url = "", newInfo = {}) => {
    console.log(newInfo);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(newInfo),
    });
    console.log(response);
    
  // TODO: function to compare departure date with current date 'd', then return either current weather or the predicted forecast

    // try {
    //     const newData = await response.json();
    //     console.log(newData);
    //     return newData;
    //     // console.log(newData);
    // } catch (error) {
    //     console.log("error", error);
    // }
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

/* Global Variables */
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q="

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

// IN PROGRESS, GET coordinates of destination, returns weather and a picture
function performAction(e) {
    let dest = document.getElementById("zip").value;
    // let feelings = document.getElementById("feelings").value;
    getLocation(baseURL, dest)
    // .then(function (data) {
    //     postData("/add", { temperature: data.main.temp, date: newDate, entry: feelings });
    //     update();
    // });
}

// Export performAction function for webpack entry
export { performAction }

// Access the Geonames API to get coordinates of destination
const getLocation = async (baseURL, loc) => {
    const res = await fetch(baseURL + loc);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// // POST request to grab data returned from OpenWeather API
// const postData = async (url = "", newInfo = {}) => {
//     const response = await fetch(url, {
//         method: "POST",
//         credentials: "same-origin",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         // Body data type must match "Content-Type" header
//         body: JSON.stringify(newInfo),
//     });
//     try {
//         const newData = await response.json();
//         return newData;
//     } catch (error) {
//         console.log("error", error);
//     }
// };
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

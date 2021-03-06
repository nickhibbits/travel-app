import { getLocation } from "./getLocation";
import { dateCompare } from "./dateCompare";
import { updateCurrent } from "./update";
import { updateFuture } from "./update";

/* Global Variables */
var moment = require("moment");
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q=";

// -- Function Flow --
// GET coordinates of destination, compare deprture date with current date, and POST date-dependent weather with picture

function performAction(e) {
    e.preventDefault();
    let dest = document.getElementById("dest").value;
    getLocation(baseURL, dest).then(function (data) {
        dateCompare(data);
    });
}

// Export performAction function for webpack entry
export { performAction };
